from bson import ObjectId
from datetime import datetime
from typing import List, Dict, Any, Optional
from .database import db
import logging
import os
import uuid
from werkzeug.utils import secure_filename

class MessageService:
    def __init__(self):
        self.messages_collection = db.get_collection('messages')
        self.orders_collection = db.get_collection('orders')
        self.users_collection = db.get_collection('users')
    
    # ==================== SHARED FUNCTIONS ====================
    
    
    def get_conversations(self, user_id: str) -> dict:
        """Get all conversations for a user"""
        try:
            user_obj_id = ObjectId(user_id)
            
            # Get distinct order_ids where user is sender or receiver
            pipeline = [
                {
                    '$match': {
                        '$or': [
                            {'sender_id': user_obj_id},
                            {'receiver_id': user_obj_id}
                        ]
                    }
                },
                {
                    '$group': {
                        '_id': '$order_id',
                        'last_message': {'$last': '$$ROOT'},
                        'unread_count': {
                            '$sum': {
                                '$cond': [
                                    {
                                        '$and': [
                                            {'$eq': ['$receiver_id', user_obj_id]},
                                            {'$eq': ['$is_read', False]}
                                        ]
                                    },
                                    1,
                                    0
                                ]
                            }
                        }
                    }
                },
                {
                    '$lookup': {
                        'from': 'orders',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'order'
                    }
                },
                {
                    '$unwind': '$order'
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'order.client_id',
                        'foreignField': '_id',
                        'as': 'client'
                    }
                },
                {
                    '$unwind': '$client'
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'order.freelancer_id',
                        'foreignField': '_id',
                        'as': 'freelancer'
                    }
                },
                {
                    '$unwind': '$freelancer'
                },
                {
                    '$lookup': {
                        'from': 'gigs',
                        'localField': 'order.gig_id',
                        'foreignField': '_id',
                        'as': 'gig'
                    }
                },
                {
                    '$unwind': '$gig'
                },
                {
                    '$project': {
                        'order_id': {'$toString': '$_id'},
                        'order': {
                            '_id': {'$toString': '$order._id'},
                            'status': '$order.status',
                            'title': '$order.title',
                            'amount': '$order.amount'
                        },
                        'gig': {
                            '_id': {'$toString': '$gig._id'},
                            'title': '$gig.title',
                            'slug': '$gig.slug'
                        },
                        'client': {
                            '_id': {'$toString': '$client._id'},
                            'username': '$client.username',
                            'full_name': '$client.full_name',
                            'avatar_url': '$client.avatar_url',
                            'role': '$client.role'
                        },
                        'freelancer': {
                            '_id': {'$toString': '$freelancer._id'},
                            'username': '$freelancer.username',
                            'full_name': '$freelancer.full_name',
                            'avatar_url': '$freelancer.avatar_url',
                            'role': '$freelancer.role'
                        },
                        'last_message': {
                            '_id': {'$toString': '$last_message._id'},
                            'content': '$last_message.content',
                            'message_type': '$last_message.message_type',
                            'created_at': '$last_message.created_at',
                            'is_read': '$last_message.is_read',
                            'sender_id': {'$toString': '$last_message.sender_id'}
                        },
                        'unread_count': 1,
                        'other_party': {
                            '$cond': [
                                {'$eq': [user_obj_id, '$order.client_id']},
                                {
                                    '_id': {'$toString': '$freelancer._id'},
                                    'username': '$freelancer.username',
                                    'full_name': '$freelancer.full_name',
                                    'avatar_url': '$freelancer.avatar_url',
                                    'role': '$freelancer.role'
                                },
                                {
                                    '_id': {'$toString': '$client._id'},
                                    'username': '$client.username',
                                    'full_name': '$client.full_name',
                                    'avatar_url': '$client.avatar_url',
                                    'role': '$client.role'
                                }
                            ]
                        }
                    }
                },
                {
                    '$sort': {'last_message.created_at': -1}
                }
            ]
            
            conversations = list(self.messages_collection.aggregate(pipeline))
            
            # Ensure all ObjectId fields are converted to strings
            # This is a safety check in case any ObjectId objects slipped through
            for conv in conversations:
                # Ensure order_id is string
                if isinstance(conv.get('order_id'), ObjectId):
                    conv['order_id'] = str(conv['order_id'])
                
                # Ensure last_message fields are strings
                if conv.get('last_message'):
                    if isinstance(conv['last_message'].get('_id'), ObjectId):
                        conv['last_message']['_id'] = str(conv['last_message']['_id'])
                    if isinstance(conv['last_message'].get('sender_id'), ObjectId):
                        conv['last_message']['sender_id'] = str(conv['last_message']['sender_id'])
                
                # Ensure other_party _id is string
                if conv.get('other_party') and isinstance(conv['other_party'].get('_id'), ObjectId):
                    conv['other_party']['_id'] = str(conv['other_party']['_id'])
            
            return {
                'success': True,
                'conversations': conversations
            }
            
        except Exception as e:
            logging.error(f"Error getting conversations: {e}")
            return {
                'success': False,
                'error': str(e)
            }





    def get_order_messages(self, order_id: str, user_id: str, pagination: dict = None) -> dict:
        """Get messages for an order with pagination"""
        try:
            # Verify user has access to this order
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            user_obj_id = ObjectId(user_id)
            if user_obj_id not in [order['client_id'], order['freelancer_id']]:
                return {
                    'success': False,
                    'error': 'Access denied'
                }
            
            # Get other party info
            other_party_id = order['client_id'] if user_obj_id == order['freelancer_id'] else order['freelancer_id']
            other_party = self.users_collection.find_one(
                {'_id': other_party_id},
                {'password_hash': 0}
            )
            
            # Pagination
            page = int(pagination.get('page', 1)) if pagination else 1
            limit = int(pagination.get('limit', 50)) if pagination else 50
            skip = (page - 1) * limit
            
            query = {'order_id': ObjectId(order_id)}
            
            # Get total count
            total = self.messages_collection.count_documents(query)
            
            # Get messages
            messages = list(self.messages_collection.find(query)
                .skip(skip).limit(limit)
                .sort('created_at', 1))  # Oldest first for chat
            
            # Convert ObjectId to string and populate sender details
            for message in messages:
                message['_id'] = str(message['_id'])
                message['order_id'] = str(message['order_id'])
                message['sender_id'] = str(message['sender_id'])
                message['receiver_id'] = str(message['receiver_id'])
                
                sender = self.users_collection.find_one(
                    {'_id': ObjectId(message['sender_id'])},
                    {'password_hash': 0}
                )
                
                if sender:
                    message['sender'] = {
                        '_id': str(sender['_id']),
                        'username': sender['username'],
                        'full_name': sender['full_name'],
                        'avatar_url': sender.get('avatar_url'),
                        'role': sender['role']
                    }
            
            # Get order details
            order_data = {
                '_id': str(order['_id']),
                'status': order['status'],
                'title': order.get('title', ''),
                'amount': order.get('amount', 0)
            }
            
            # Get gig details
            gig = db.get_collection('gigs').find_one({'_id': order['gig_id']})
            gig_data = None
            if gig:
                gig_data = {
                    '_id': str(gig['_id']),
                    'title': gig['title'],
                    'slug': gig.get('slug', '')
                }
            
            # Other party info
            other_party_data = None
            if other_party:
                other_party_data = {
                    '_id': str(other_party['_id']),
                    'username': other_party['username'],
                    'full_name': other_party['full_name'],
                    'avatar_url': other_party.get('avatar_url'),
                    'role': other_party['role']
                }
            
            return {
                'success': True,
                'messages': messages,
                'order': order_data,
                'gig': gig_data,
                'other_party': other_party_data,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting order messages: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def send_message(self, order_id: str, sender_id: str, message_data: dict) -> dict:
        """Send a new message"""
        try:
            # Verify order exists and user is part of it
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            sender_obj_id = ObjectId(sender_id)
            if sender_obj_id not in [order['client_id'], order['freelancer_id']]:
                return {
                    'success': False,
                    'error': 'Access denied'
                }
            
            # Determine receiver (the other party)
            receiver_id = order['client_id'] if sender_obj_id == order['freelancer_id'] else order['freelancer_id']
            
            # Create message document
            message_doc = {
                'order_id': ObjectId(order_id),
                'sender_id': sender_obj_id,
                'receiver_id': receiver_id,
                'message_type': message_data.get('message_type', 'text'),
                'content': message_data['content'],
                'is_read': False,
                'created_at': datetime.utcnow()
            }
            
            # Add attachment if present
            if message_data.get('attachment_url'):
                message_doc['attachment_url'] = message_data['attachment_url']
                message_doc['attachment_name'] = message_data.get('attachment_name')
            
            # Insert message
            result = self.messages_collection.insert_one(message_doc)
            message_doc['_id'] = str(result.inserted_id)
            
            # Convert ObjectId to string
            message_doc['order_id'] = str(message_doc['order_id'])
            message_doc['sender_id'] = str(message_doc['sender_id'])
            message_doc['receiver_id'] = str(message_doc['receiver_id'])
            
            # Get sender info
            sender = self.users_collection.find_one(
                {'_id': sender_obj_id},
                {'password_hash': 0}
            )
            
            if sender:
                message_doc['sender'] = {
                    '_id': str(sender['_id']),
                    'username': sender['username'],
                    'full_name': sender['full_name'],
                    'avatar_url': sender.get('avatar_url'),
                    'role': sender['role']
                }
            
            return {
                'success': True,
                'message': message_doc
            }
            
        except Exception as e:
            logging.error(f"Error sending message: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def mark_messages_as_read(self, order_id: str, user_id: str) -> dict:
        """Mark all unread messages in an order as read for a user"""
        try:
            # Verify user has access to this order
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            user_obj_id = ObjectId(user_id)
            if user_obj_id not in [order['client_id'], order['freelancer_id']]:
                return {
                    'success': False,
                    'error': 'Access denied'
                }
            
            # Mark messages as read
            result = self.messages_collection.update_many(
                {
                    'order_id': ObjectId(order_id),
                    'receiver_id': user_obj_id,
                    'is_read': False
                },
                {
                    '$set': {
                        'is_read': True,
                        'read_at': datetime.utcnow()
                    }
                }
            )
            
            return {
                'success': True,
                'message': f'{result.modified_count} messages marked as read',
                'count': result.modified_count
            }
            
        except Exception as e:
            logging.error(f"Error marking messages as read: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== FILE MANAGEMENT ====================
    
    def upload_attachment(self, file: dict, order_id: str, user_id: str) -> dict:
        """Upload an attachment file"""
        try:
            # Verify user has access to this order
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            user_obj_id = ObjectId(user_id)
            if user_obj_id not in [order['client_id'], order['freelancer_id']]:
                return {
                    'success': False,
                    'error': 'Access denied'
                }
            
            # Validate file
            if not file or not file.get('filename') or not file.get('data'):
                return {
                    'success': False,
                    'error': 'Invalid file'
                }
            
            # Generate unique filename
            original_filename = secure_filename(file['filename'])
            file_extension = os.path.splitext(original_filename)[1]
            unique_filename = f"{uuid.uuid4().hex}{file_extension}"
            
            # In a real implementation, you would save the file to storage (S3, local, etc.)
            # For this example, we'll just store a placeholder URL
            # In production, you would:
            # 1. Save file to storage (S3, Azure Blob, etc.)
            # 2. Get the URL
            # 3. Store metadata in database
            
            attachment_url = f"https://example.com/uploads/{unique_filename}"
            
            # Create a message for the attachment
            message_doc = {
                'order_id': ObjectId(order_id),
                'sender_id': user_obj_id,
                'receiver_id': order['client_id'] if user_obj_id == order['freelancer_id'] else order['freelancer_id'],
                'message_type': 'file',
                'content': f"Shared file: {original_filename}",
                'attachment_url': attachment_url,
                'attachment_name': original_filename,
                'is_read': False,
                'created_at': datetime.utcnow()
            }
            
            # Insert message
            result = self.messages_collection.insert_one(message_doc)
            message_doc['_id'] = str(result.inserted_id)
            
            # Convert ObjectId to string
            message_doc['order_id'] = str(message_doc['order_id'])
            message_doc['sender_id'] = str(message_doc['sender_id'])
            message_doc['receiver_id'] = str(message_doc['receiver_id'])
            
            return {
                'success': True,
                'message': 'File uploaded successfully',
                'attachment': {
                    'url': attachment_url,
                    'name': original_filename,
                    'message_id': str(result.inserted_id)
                }
            }
            
        except Exception as e:
            logging.error(f"Error uploading attachment: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_attachment(self, message_id: str, user_id: str) -> dict:
        """Delete an attachment"""
        try:
            # Get the message
            message = self.messages_collection.find_one({'_id': ObjectId(message_id)})
            
            if not message:
                return {
                    'success': False,
                    'error': 'Message not found'
                }
            
            # Check if user is sender
            if message['sender_id'] != ObjectId(user_id):
                return {
                    'success': False,
                    'error': 'Only the sender can delete attachments'
                }
            
            # Check if message has attachment
            if message.get('message_type') != 'file' or not message.get('attachment_url'):
                return {
                    'success': False,
                    'error': 'No attachment found'
                }
            
            # In a real implementation, you would delete the file from storage
            # For this example, we'll just remove the attachment fields from the message
            
            self.messages_collection.update_one(
                {'_id': ObjectId(message_id)},
                {
                    '$set': {
                        'message_type': 'text',
                        'content': f"Attachment deleted: {message.get('attachment_name', 'file')}",
                        'attachment_url': None,
                        'attachment_name': None,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            return {
                'success': True,
                'message': 'Attachment deleted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deleting attachment: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== SYSTEM MESSAGES ====================
    
    def send_system_message(self, order_id: str, message_type: str, data: dict = None) -> dict:
        """Send a system message"""
        try:
            # Verify order exists
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            # Determine content based on message type
            content = self._get_system_message_content(message_type, data)
            
            # Create system message for both client and freelancer
            messages = []
            
            for user_id in [order['client_id'], order['freelancer_id']]:
                message_doc = {
                    'order_id': ObjectId(order_id),
                    'sender_id': ObjectId('000000000000000000000000'),  # System user ID
                    'receiver_id': user_id,
                    'message_type': 'system',
                    'content': content,
                    'is_read': False,
                    'created_at': datetime.utcnow()
                }
                
                result = self.messages_collection.insert_one(message_doc)
                message_doc['_id'] = str(result.inserted_id)
                message_doc['order_id'] = str(message_doc['order_id'])
                message_doc['sender_id'] = str(message_doc['sender_id'])
                message_doc['receiver_id'] = str(message_doc['receiver_id'])
                
                messages.append(message_doc)
            
            return {
                'success': True,
                'messages': messages,
                'message': 'System message sent successfully'
            }
            
        except Exception as e:
            logging.error(f"Error sending system message: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _get_system_message_content(self, message_type: str, data: dict = None) -> str:
        """Get system message content based on type"""
        messages = {
            'order_created': 'Order has been created',
            'order_accepted': 'Order has been accepted by freelancer',
            'order_rejected': 'Order has been rejected by freelancer',
            'order_delivered': 'Order has been delivered',
            'order_revision_requested': 'Revision has been requested',
            'order_completed': 'Order has been completed',
            'order_cancelled': 'Order has been cancelled',
            'payment_received': 'Payment has been received',
            'payment_failed': 'Payment has failed',
            'deadline_extended': 'Delivery deadline has been extended',
            'milestone_completed': 'Milestone has been completed',
            'dispute_opened': 'Dispute has been opened',
            'dispute_resolved': 'Dispute has been resolved',
            'review_added': 'Review has been added'
        }
        
        content = messages.get(message_type, 'System notification')
        
        # Add custom data if provided
        if data:
            if message_type == 'deadline_extended' and 'days' in data:
                content = f"Delivery deadline extended by {data['days']} days"
            elif message_type == 'payment_received' and 'amount' in data:
                content = f"Payment of ${data['amount']} received"
        
        return content
    
    # ==================== ADMIN FUNCTIONS ====================
    
    def get_all_messages(self, filters: dict = None) -> dict:
        """Get all messages (admin only)"""
        try:
            query = {}
            
            # Apply filters
            if filters:
                if filters.get('order_id'):
                    query['order_id'] = ObjectId(filters['order_id'])
                    
                if filters.get('sender_id'):
                    query['sender_id'] = ObjectId(filters['sender_id'])
                    
                if filters.get('receiver_id'):
                    query['receiver_id'] = ObjectId(filters['receiver_id'])
                    
                if filters.get('message_type'):
                    query['message_type'] = filters['message_type']
                    
                if filters.get('is_read') is not None:
                    query['is_read'] = filters['is_read'] == 'true'
                    
                if filters.get('start_date'):
                    query['created_at'] = {'$gte': datetime.fromisoformat(filters['start_date'])}
                    
                if filters.get('end_date'):
                    if 'created_at' in query:
                        query['created_at']['$lte'] = datetime.fromisoformat(filters['end_date'])
                    else:
                        query['created_at'] = {'$lte': datetime.fromisoformat(filters['end_date'])}
            
            # Pagination
            page = int(filters.get('page', 1)) if filters else 1
            limit = int(filters.get('limit', 50)) if filters else 50
            skip = (page - 1) * limit
            
            # Get total count
            total = self.messages_collection.count_documents(query)
            
            # Get messages
            messages = list(self.messages_collection.find(query)
                .skip(skip).limit(limit)
                .sort('created_at', -1))
            
            # Convert ObjectId to string and populate details
            for message in messages:
                message['_id'] = str(message['_id'])
                message['order_id'] = str(message['order_id'])
                message['sender_id'] = str(message['sender_id'])
                message['receiver_id'] = str(message['receiver_id'])
                
                # Get sender info
                sender = self.users_collection.find_one(
                    {'_id': ObjectId(message['sender_id'])},
                    {'password_hash': 0}
                )
                
                if sender:
                    message['sender'] = {
                        '_id': str(sender['_id']),
                        'username': sender['username'],
                        'full_name': sender['full_name'],
                        'role': sender['role']
                    }
                
                # Get receiver info
                receiver = self.users_collection.find_one(
                    {'_id': ObjectId(message['receiver_id'])},
                    {'password_hash': 0}
                )
                
                if receiver:
                    message['receiver'] = {
                        '_id': str(receiver['_id']),
                        'username': receiver['username'],
                        'full_name': receiver['full_name'],
                        'role': receiver['role']
                    }
                
                # Get order info
                order = self.orders_collection.find_one({'_id': ObjectId(message['order_id'])})
                if order:
                    message['order'] = {
                        '_id': str(order['_id']),
                        'title': order.get('title', ''),
                        'status': order['status']
                    }
            
            return {
                'success': True,
                'messages': messages,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting all messages: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_message_admin(self, message_id: str) -> dict:
        """Delete a message (admin only)"""
        try:
            # Check if message exists
            message = self.messages_collection.find_one({'_id': ObjectId(message_id)})
            
            if not message:
                return {
                    'success': False,
                    'error': 'Message not found'
                }
            
            # Delete message
            result = self.messages_collection.delete_one({'_id': ObjectId(message_id)})
            
            if result.deleted_count > 0:
                return {
                    'success': True,
                    'message': 'Message deleted successfully'
                }
            else:
                return {
                    'success': False,
                    'error': 'Failed to delete message'
                }
            
        except Exception as e:
            logging.error(f"Error deleting message: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== HELPER FUNCTIONS ====================
    
    def get_unread_count(self, user_id: str) -> dict:
        """Get count of unread messages for a user"""
        try:
            count = self.messages_collection.count_documents({
                'receiver_id': ObjectId(user_id),
                'is_read': False
            })
            
            return {
                'success': True,
                'unread_count': count
            }
            
        except Exception as e:
            logging.error(f"Error getting unread count: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def mark_as_read(self, message_ids: list, user_id: str) -> dict:
        """Mark specific messages as read"""
        try:
            # Convert message_ids to ObjectId
            object_ids = [ObjectId(msg_id) for msg_id in message_ids]
            
            result = self.messages_collection.update_many(
                {
                    '_id': {'$in': object_ids},
                    'receiver_id': ObjectId(user_id)
                },
                {
                    '$set': {
                        'is_read': True,
                        'read_at': datetime.utcnow()
                    }
                }
            )
            
            return {
                'success': True,
                'message': f'{result.modified_count} messages marked as read',
                'count': result.modified_count
            }
            
        except Exception as e:
            logging.error(f"Error marking messages as read: {e}")
            return {
                'success': False,
                'error': str(e)
            }
 
    def get_message_stats(self) -> dict:
        """Get message statistics (admin only)"""
        try:
            # Total messages
            total_messages = self.messages_collection.count_documents({})
            
            # Messages by type
            messages_by_type = list(self.messages_collection.aggregate([
                {
                    '$group': {
                        '_id': '$message_type',
                        'count': {'$sum': 1}
                    }
                }
            ]))
            
            # Unread messages
            unread_messages = self.messages_collection.count_documents({'is_read': False})
            
            # Messages per day (last 30 days) - FIXED DATE CALCULATION
            from datetime import timedelta
            thirty_days_ago = datetime.utcnow() - timedelta(days=30)
            
            messages_per_day = list(self.messages_collection.aggregate([
                {
                    '$match': {
                        'created_at': {'$gte': thirty_days_ago}
                    }
                },
                {
                    '$group': {
                        '_id': {
                            'year': {'$year': '$created_at'},
                            'month': {'$month': '$created_at'},
                            'day': {'$dayOfMonth': '$created_at'}
                        },
                        'count': {'$sum': 1}
                    }
                },
                {
                    '$sort': {'_id': 1}
                },
                {
                    '$limit': 30
                }
            ]))
            
            return {
                'success': True,
                'stats': {
                    'total_messages': total_messages,
                    'unread_messages': unread_messages,
                    'messages_by_type': {
                        item['_id']: item['count'] for item in messages_by_type
                    },
                    'messages_per_day': messages_per_day
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting message stats: {e}")
            return {
                'success': False,
                'error': str(e)
            }