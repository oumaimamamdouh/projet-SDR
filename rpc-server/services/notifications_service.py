
# """
# Notifications Service for WorkNet Platform
# Handles all notification-related operations including user notifications, system notifications, and admin functions
# """

# from datetime import datetime
# from typing import List, Dict, Any, Optional, Union
# from bson import ObjectId
# from database.mongodb import get_db
# import logging

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)


# class NotificationService:
#     """Service for handling notifications"""
    
#     # Notification types
#     NOTIFICATION_TYPES = {
#         # User notifications
#         'order_received': 'order_received',
#         'order_accepted': 'order_accepted',
#         'order_declined': 'order_declined',
#         'order_delivered': 'order_delivered',
#         'order_completed': 'order_completed',
#         'order_cancelled': 'order_cancelled',
#         'revision_requested': 'revision_requested',
#         'payment_received': 'payment_received',
#         'withdrawal_processed': 'withdrawal_processed',
        
#         # System notifications
#         'system_announcement': 'system_announcement',
#         'platform_update': 'platform_update',
#         'security_alert': 'security_alert',
        
#         # Message notifications
#         'new_message': 'new_message',
#         'new_review': 'new_review',
#         'review_response': 'review_response',
        
#         # Admin notifications
#         'new_user_registered': 'new_user_registered',
#         'new_dispute': 'new_dispute',
#         'withdrawal_request': 'withdrawal_request'
#     }
    
#     def __init__(self):
#         self.db = get_db()
#         self.notifications_collection = self.db.notifications
    
#     # ==================== USER FUNCTIONS ====================
    
#     def get_user_notifications(self, user_id: str, filters: Optional[Dict] = None) -> Dict:
#         """
#         Get notifications for a specific user with optional filters
        
#         Args:
#             user_id: The user's ID
#             filters: Optional filters (e.g., {'is_read': False, 'type': 'order_received'})
            
#         Returns:
#             Dictionary containing notifications and metadata
#         """
#         try:
#             # Build query
#             query = {'user_id': ObjectId(user_id)}
            
#             # Apply additional filters
#             if filters:
#                 if 'is_read' in filters:
#                     query['is_read'] = filters['is_read']
#                 if 'type' in filters:
#                     query['type'] = filters['type']
#                 if 'start_date' in filters:
#                     query['created_at'] = {'$gte': filters['start_date']}
#                 if 'end_date' in filters:
#                     if 'created_at' in query:
#                         query['created_at']['$lte'] = filters['end_date']
#                     else:
#                         query['created_at'] = {'$lte': filters['end_date']}
            
#             # Get pagination parameters
#             page = filters.get('page', 1) if filters else 1
#             limit = filters.get('limit', 20) if filters else 20
#             skip = (page - 1) * limit
            
#             # Get total count
#             total = self.notifications_collection.count_documents(query)
            
#             # Get notifications with sorting (newest first)
#             notifications = list(
#                 self.notifications_collection.find(query)
#                 .sort('created_at', -1)
#                 .skip(skip)
#                 .limit(limit)
#             )
            
#             # Convert ObjectId to string for JSON serialization
#             for notification in notifications:
#                 notification['_id'] = str(notification['_id'])
#                 notification['user_id'] = str(notification['user_id'])
#                 if 'related_entity_id' in notification:
#                     notification['related_entity_id'] = str(notification['related_entity_id'])
            
#             return {
#                 'success': True,
#                 'notifications': notifications,
#                 'total': total,
#                 'page': page,
#                 'limit': limit,
#                 'total_pages': (total + limit - 1) // limit if limit > 0 else 0
#             }
            
#         except Exception as e:
#             logger.error(f"Error getting user notifications: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to get notifications: {str(e)}"
#             }
    
#     def mark_as_read(self, notification_id: str, user_id: str) -> Dict:
#         """
#         Mark a specific notification as read
        
#         Args:
#             notification_id: The notification ID
#             user_id: The user's ID (for verification)
            
#         Returns:
#             Dictionary with operation result
#         """
#         try:
#             # Verify notification belongs to user
#             notification = self.notifications_collection.find_one({
#                 '_id': ObjectId(notification_id),
#                 'user_id': ObjectId(user_id)
#             })
            
#             if not notification:
#                 return {
#                     'success': False,
#                     'error': 'Notification not found or access denied'
#                 }
            
#             # Update notification
#             update_result = self.notifications_collection.update_one(
#                 {
#                     '_id': ObjectId(notification_id),
#                     'user_id': ObjectId(user_id)
#                 },
#                 {
#                     '$set': {
#                         'is_read': True,
#                         'read_at': datetime.utcnow(),
#                         'updated_at': datetime.utcnow()
#                     }
#                 }
#             )
            
#             if update_result.modified_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Failed to mark notification as read'
#                 }
            
#             return {
#                 'success': True,
#                 'message': 'Notification marked as read'
#             }
            
#         except Exception as e:
#             logger.error(f"Error marking notification as read: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to mark notification as read: {str(e)}"
#             }
    
#     def mark_all_as_read(self, user_id: str) -> Dict:
#         """
#         Mark all unread notifications for a user as read
        
#         Args:
#             user_id: The user's ID
            
#         Returns:
#             Dictionary with operation result
#         """
#         try:
#             # Update all unread notifications for user
#             update_result = self.notifications_collection.update_many(
#                 {
#                     'user_id': ObjectId(user_id),
#                     'is_read': False
#                 },
#                 {
#                     '$set': {
#                         'is_read': True,
#                         'read_at': datetime.utcnow(),
#                         'updated_at': datetime.utcnow()
#                     }
#                 }
#             )
            
#             return {
#                 'success': True,
#                 'message': f'Marked {update_result.modified_count} notifications as read',
#                 'count': update_result.modified_count
#             }
            
#         except Exception as e:
#             logger.error(f"Error marking all notifications as read: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to mark notifications as read: {str(e)}"
#             }
    
#     def delete_notification(self, notification_id: str, user_id: str) -> Dict:
#         """
#         Delete a specific notification
        
#         Args:
#             notification_id: The notification ID
#             user_id: The user's ID (for verification)
            
#         Returns:
#             Dictionary with operation result
#         """
#         try:
#             # Verify notification belongs to user
#             notification = self.notifications_collection.find_one({
#                 '_id': ObjectId(notification_id),
#                 'user_id': ObjectId(user_id)
#             })
            
#             if not notification:
#                 return {
#                     'success': False,
#                     'error': 'Notification not found or access denied'
#                 }
            
#             # Delete notification
#             delete_result = self.notifications_collection.delete_one({
#                 '_id': ObjectId(notification_id),
#                 'user_id': ObjectId(user_id)
#             })
            
#             if delete_result.deleted_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Failed to delete notification'
#                 }
            
#             return {
#                 'success': True,
#                 'message': 'Notification deleted successfully'
#             }
            
#         except Exception as e:
#             logger.error(f"Error deleting notification: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to delete notification: {str(e)}"
#             }
    
#     def get_unread_count(self, user_id: str) -> Dict:
#         """
#         Get count of unread notifications for a user
        
#         Args:
#             user_id: The user's ID
            
#         Returns:
#             Dictionary with unread count
#         """
#         try:
#             count = self.notifications_collection.count_documents({
#                 'user_id': ObjectId(user_id),
#                 'is_read': False
#             })
            
#             return {
#                 'success': True,
#                 'count': count
#             }
            
#         except Exception as e:
#             logger.error(f"Error getting unread count: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to get unread count: {str(e)}"
#             }
    
#     # ==================== SYSTEM FUNCTIONS ====================
    
#     def create_notification(self, notification_data: Dict) -> Dict:
#         """
#         Create a new notification (system function)
        
#         Args:
#             notification_data: Dictionary containing notification data
            
#         Returns:
#             Dictionary with created notification
#         """
#         try:
#             # Validate required fields
#             required_fields = ['user_id', 'type', 'title', 'message']
#             for field in required_fields:
#                 if field not in notification_data:
#                     return {
#                         'success': False,
#                         'error': f"Missing required field: {field}"
#                     }
            
#             # Prepare notification document
#             notification_doc = {
#                 'user_id': ObjectId(notification_data['user_id']),
#                 'type': notification_data['type'],
#                 'title': notification_data['title'],
#                 'message': notification_data['message'],
#                 'is_read': False,
#                 'created_at': datetime.utcnow(),
#                 'updated_at': datetime.utcnow()
#             }
            
#             # Add optional fields
#             optional_fields = [
#                 'action_url', 'related_entity_type', 
#                 'related_entity_id', 'metadata'
#             ]
            
#             for field in optional_fields:
#                 if field in notification_data:
#                     if field == 'related_entity_id' and notification_data[field]:
#                         notification_doc[field] = ObjectId(notification_data[field])
#                     else:
#                         notification_doc[field] = notification_data[field]
            
#             # Insert notification
#             result = self.notifications_collection.insert_one(notification_doc)
            
#             # Get the created notification
#             created_notification = self.notifications_collection.find_one(
#                 {'_id': result.inserted_id}
#             )
            
#             # Convert ObjectId to string
#             created_notification['_id'] = str(created_notification['_id'])
#             created_notification['user_id'] = str(created_notification['user_id'])
#             if 'related_entity_id' in created_notification:
#                 created_notification['related_entity_id'] = str(created_notification['related_entity_id'])
            
#             return {
#                 'success': True,
#                 'notification': created_notification,
#                 'message': 'Notification created successfully'
#             }
            
#         except Exception as e:
#             logger.error(f"Error creating notification: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to create notification: {str(e)}"
#             }
    
#     def send_bulk_notification(self, user_ids: List[str], notification_data: Dict) -> Dict:
#         """
#         Send notification to multiple users
        
#         Args:
#             user_ids: List of user IDs
#             notification_data: Dictionary containing notification data
            
#         Returns:
#             Dictionary with operation result
#         """
#         try:
#             # Validate required fields
#             required_fields = ['type', 'title', 'message']
#             for field in required_fields:
#                 if field not in notification_data:
#                     return {
#                         'success': False,
#                         'error': f"Missing required field: {field}"
#                     }
            
#             notifications = []
#             current_time = datetime.utcnow()
            
#             # Create notification for each user
#             for user_id in user_ids:
#                 notification_doc = {
#                     'user_id': ObjectId(user_id),
#                     'type': notification_data['type'],
#                     'title': notification_data['title'],
#                     'message': notification_data['message'],
#                     'is_read': False,
#                     'created_at': current_time,
#                     'updated_at': current_time
#                 }
                
#                 # Add optional fields
#                 optional_fields = [
#                     'action_url', 'related_entity_type', 
#                     'related_entity_id', 'metadata'
#                 ]
                
#                 for field in optional_fields:
#                     if field in notification_data:
#                         if field == 'related_entity_id' and notification_data[field]:
#                             notification_doc[field] = ObjectId(notification_data[field])
#                         else:
#                             notification_doc[field] = notification_data[field]
                
#                 notifications.append(notification_doc)
            
#             # Insert all notifications
#             if notifications:
#                 result = self.notifications_collection.insert_many(notifications)
                
#                 return {
#                     'success': True,
#                     'message': f'Notification sent to {len(result.inserted_ids)} users',
#                     'count': len(result.inserted_ids)
#                 }
#             else:
#                 return {
#                     'success': False,
#                     'error': 'No users to notify'
#                 }
            
#         except Exception as e:
#             logger.error(f"Error sending bulk notification: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to send bulk notification: {str(e)}"
#             }
    
#     # ==================== ADMIN FUNCTIONS ====================
    
#     def get_all_notifications(self, filters: Optional[Dict] = None) -> Dict:
#         """
#         Get all notifications (admin function)
        
#         Args:
#             filters: Optional filters (e.g., {'user_id': '...', 'type': '...'})
            
#         Returns:
#             Dictionary containing all notifications and metadata
#         """
#         try:
#             # Build query
#             query = {}
            
#             # Apply filters
#             if filters:
#                 if 'user_id' in filters:
#                     query['user_id'] = ObjectId(filters['user_id'])
#                 if 'type' in filters:
#                     query['type'] = filters['type']
#                 if 'is_read' in filters:
#                     query['is_read'] = filters['is_read']
#                 if 'start_date' in filters:
#                     query['created_at'] = {'$gte': filters['start_date']}
#                 if 'end_date' in filters:
#                     if 'created_at' in query:
#                         query['created_at']['$lte'] = filters['end_date']
#                     else:
#                         query['created_at'] = {'$lte': filters['end_date']}
            
#             # Get pagination parameters
#             page = filters.get('page', 1) if filters else 1
#             limit = filters.get('limit', 50) if filters else 50
#             skip = (page - 1) * limit
            
#             # Get total count
#             total = self.notifications_collection.count_documents(query)
            
#             # Get notifications with sorting (newest first)
#             notifications = list(
#                 self.notifications_collection.find(query)
#                 .sort('created_at', -1)
#                 .skip(skip)
#                 .limit(limit)
#             )
            
#             # Convert ObjectId to string for JSON serialization
#             for notification in notifications:
#                 notification['_id'] = str(notification['_id'])
#                 notification['user_id'] = str(notification['user_id'])
#                 if 'related_entity_id' in notification:
#                     notification['related_entity_id'] = str(notification['related_entity_id'])
            
#             # Get statistics
#             stats = {
#                 'total': total,
#                 'unread': self.notifications_collection.count_documents({'is_read': False}),
#                 'by_type': {}
#             }
            
#             # Count by type
#             pipeline = [
#                 {'$group': {'_id': '$type', 'count': {'$sum': 1}}}
#             ]
#             type_counts = list(self.notifications_collection.aggregate(pipeline))
            
#             for type_count in type_counts:
#                 stats['by_type'][type_count['_id']] = type_count['count']
            
#             return {
#                 'success': True,
#                 'notifications': notifications,
#                 'stats': stats,
#                 'total': total,
#                 'page': page,
#                 'limit': limit,
#                 'total_pages': (total + limit - 1) // limit if limit > 0 else 0
#             }
            
#         except Exception as e:
#             logger.error(f"Error getting all notifications: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to get notifications: {str(e)}"
#             }
    
#     def send_platform_notification(self, notification_data: Dict) -> Dict:
#         """
#         Send platform-wide notification to all users (admin function)
        
#         Args:
#             notification_data: Dictionary containing notification data
            
#         Returns:
#             Dictionary with operation result
#         """
#         try:
#             # Validate required fields
#             required_fields = ['type', 'title', 'message']
#             for field in required_fields:
#                 if field not in notification_data:
#                     return {
#                         'success': False,
#                         'error': f"Missing required field: {field}"
#                     }
            
#             # Get all active users
#             users_collection = self.db.users
#             active_users = users_collection.find(
#                 {'is_active': True},
#                 {'_id': 1}
#             )
            
#             user_ids = [str(user['_id']) for user in active_users]
            
#             if not user_ids:
#                 return {
#                     'success': False,
#                     'error': 'No active users found'
#                 }
            
#             # Send bulk notification
#             return self.send_bulk_notification(user_ids, notification_data)
            
#         except Exception as e:
#             logger.error(f"Error sending platform notification: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to send platform notification: {str(e)}"
#             }
    
#     # ==================== HELPER FUNCTIONS ====================
    
#     def notify_order_received(self, freelancer_id: str, order_id: str, order_title: str) -> Dict:
#         """
#         Send notification when freelancer receives a new order
        
#         Args:
#             freelancer_id: The freelancer's ID
#             order_id: The order ID
#             order_title: The order title
            
#         Returns:
#             Dictionary with operation result
#         """
#         notification_data = {
#             'user_id': freelancer_id,
#             'type': self.NOTIFICATION_TYPES['order_received'],
#             'title': 'New Order Received',
#             'message': f"You have received a new order: '{order_title}'",
#             'action_url': f'/orders/{order_id}',
#             'related_entity_type': 'order',
#             'related_entity_id': order_id
#         }
        
#         return self.create_notification(notification_data)
    
#     def notify_order_accepted(self, client_id: str, order_id: str) -> Dict:
#         """
#         Send notification when order is accepted by freelancer
        
#         Args:
#             client_id: The client's ID
#             order_id: The order ID
            
#         Returns:
#             Dictionary with operation result
#         """
#         notification_data = {
#             'user_id': client_id,
#             'type': self.NOTIFICATION_TYPES['order_accepted'],
#             'title': 'Order Accepted',
#             'message': 'Your order has been accepted and work has started',
#             'action_url': f'/orders/{order_id}',
#             'related_entity_type': 'order',
#             'related_entity_id': order_id
#         }
        
#         return self.create_notification(notification_data)
    
#     def notify_order_delivered(self, client_id: str, order_id: str) -> Dict:
#         """
#         Send notification when order is delivered
        
#         Args:
#             client_id: The client's ID
#             order_id: The order ID
            
#         Returns:
#             Dictionary with operation result
#         """
#         notification_data = {
#             'user_id': client_id,
#             'type': self.NOTIFICATION_TYPES['order_delivered'],
#             'title': 'Order Delivered',
#             'message': 'Your order has been delivered. Please review it.',
#             'action_url': f'/orders/{order_id}',
#             'related_entity_type': 'order',
#             'related_entity_id': order_id
#         }
        
#         return self.create_notification(notification_data)
    
#     def notify_payment_received(self, freelancer_id: str, order_id: str, amount: float) -> Dict:
#         """
#         Send notification when payment is received
        
#         Args:
#             freelancer_id: The freelancer's ID
#             order_id: The order ID
#             amount: The payment amount
            
#         Returns:
#             Dictionary with operation result
#         """
#         notification_data = {
#             'user_id': freelancer_id,
#             'type': self.NOTIFICATION_TYPES['payment_received'],
#             'title': 'Payment Received',
#             'message': f'Payment of ${amount:.2f} has been credited to your account',
#             'action_url': f'/earnings',
#             'related_entity_type': 'order',
#             'related_entity_id': order_id
#         }
        
#         return self.create_notification(notification_data)
    
#     def notify_new_message(self, recipient_id: str, sender_name: str, order_id: str) -> Dict:
#         """
#         Send notification for new message
        
#         Args:
#             recipient_id: The recipient's ID
#             sender_name: The sender's name
#             order_id: The order ID
            
#         Returns:
#             Dictionary with operation result
#         """
#         notification_data = {
#             'user_id': recipient_id,
#             'type': self.NOTIFICATION_TYPES['new_message'],
#             'title': 'New Message',
#             'message': f'You have a new message from {sender_name}',
#             'action_url': f'/messages/{order_id}',
#             'related_entity_type': 'order',
#             'related_entity_id': order_id
#         }
        
#         return self.create_notification(notification_data)
    
#     def cleanup_old_notifications(self, days_old: int = 30) -> Dict:
#         """
#         Clean up notifications older than specified days
        
#         Args:
#             days_old: Number of days (notifications older than this will be deleted)
            
#         Returns:
#             Dictionary with cleanup result
#         """
#         try:
#             from datetime import datetime, timedelta
            
#             cutoff_date = datetime.utcnow() - timedelta(days=days_old)
            
#             # Delete notifications older than cutoff date
#             delete_result = self.notifications_collection.delete_many({
#                 'created_at': {'$lt': cutoff_date},
#                 'is_read': True  # Only delete read notifications
#             })
            
#             return {
#                 'success': True,
#                 'message': f'Deleted {delete_result.deleted_count} old notifications',
#                 'count': delete_result.deleted_count
#             }
            
#         except Exception as e:
#             logger.error(f"Error cleaning up old notifications: {str(e)}")
#             return {
#                 'success': False,
#                 'error': f"Failed to clean up notifications: {str(e)}"
#             }


"""
Notifications Service for WorkNet Platform
Handles all notification-related operations including user notifications, system notifications, and admin functions
"""

from datetime import datetime
from typing import List, Dict, Any, Optional, Union
from bson import ObjectId
from services.database import db  # Updated import
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class NotificationService:
    """Service for handling notifications"""
    
    # Notification types
    NOTIFICATION_TYPES = {
        # User notifications
        'order_received': 'order_received',
        'order_accepted': 'order_accepted',
        'order_declined': 'order_declined',
        'order_delivered': 'order_delivered',
        'order_completed': 'order_completed',
        'order_cancelled': 'order_cancelled',
        'revision_requested': 'revision_requested',
        'payment_received': 'payment_received',
        'withdrawal_processed': 'withdrawal_processed',
        
        # System notifications
        'system_announcement': 'system_announcement',
        'platform_update': 'platform_update',
        'security_alert': 'security_alert',
        
        # Message notifications
        'new_message': 'new_message',
        'new_review': 'new_review',
        'review_response': 'review_response',
        
        # Admin notifications
        'new_user_registered': 'new_user_registered',
        'new_dispute': 'new_dispute',
        'withdrawal_request': 'withdrawal_request'
    }
    
    def __init__(self):
        # Get database instance and collection
        self.db = db
        self.notifications_collection = self.db.get_collection("notifications")
        self.users_collection = self.db.get_collection("users")
    
    # ==================== USER FUNCTIONS ====================
    
    def get_user_notifications(self, user_id: str, filters: Optional[Dict] = None) -> Dict:
        """
        Get notifications for a specific user with optional filters
        
        Args:
            user_id: The user's ID
            filters: Optional filters (e.g., {'is_read': False, 'type': 'order_received'})
            
        Returns:
            Dictionary containing notifications and metadata
        """
        try:
            # Build query
            query = {'user_id': ObjectId(user_id)}
            
            # Apply additional filters
            if filters:
                if 'is_read' in filters:
                    query['is_read'] = filters['is_read']
                if 'type' in filters:
                    query['type'] = filters['type']
                if 'start_date' in filters:
                    query['created_at'] = {'$gte': filters['start_date']}
                if 'end_date' in filters:
                    if 'created_at' in query:
                        query['created_at']['$lte'] = filters['end_date']
                    else:
                        query['created_at'] = {'$lte': filters['end_date']}
            
            # Get pagination parameters
            page = filters.get('page', 1) if filters else 1
            limit = filters.get('limit', 20) if filters else 20
            skip = (page - 1) * limit
            
            # Get total count
            total = self.notifications_collection.count_documents(query)
            
            # Get notifications with sorting (newest first)
            notifications = list(
                self.notifications_collection.find(query)
                .sort('created_at', -1)
                .skip(skip)
                .limit(limit)
            )
            
            # Convert ObjectId to string for JSON serialization
            for notification in notifications:
                notification['_id'] = str(notification['_id'])
                notification['user_id'] = str(notification['user_id'])
                if 'related_entity_id' in notification:
                    notification['related_entity_id'] = str(notification['related_entity_id'])
            
            return {
                'success': True,
                'notifications': notifications,
                'total': total,
                'page': page,
                'limit': limit,
                'total_pages': (total + limit - 1) // limit if limit > 0 else 0
            }
            
        except Exception as e:
            logger.error(f"Error getting user notifications: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to get notifications: {str(e)}"
            }
    
    def mark_as_read(self, notification_id: str, user_id: str) -> Dict:
        """
        Mark a specific notification as read
        
        Args:
            notification_id: The notification ID
            user_id: The user's ID (for verification)
            
        Returns:
            Dictionary with operation result
        """
        try:
            # Verify notification belongs to user
            notification = self.notifications_collection.find_one({
                '_id': ObjectId(notification_id),
                'user_id': ObjectId(user_id)
            })
            
            if not notification:
                return {
                    'success': False,
                    'error': 'Notification not found or access denied'
                }
            
            # Update notification
            update_result = self.notifications_collection.update_one(
                {
                    '_id': ObjectId(notification_id),
                    'user_id': ObjectId(user_id)
                },
                {
                    '$set': {
                        'is_read': True,
                        'read_at': datetime.utcnow(),
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if update_result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to mark notification as read'
                }
            
            return {
                'success': True,
                'message': 'Notification marked as read'
            }
            
        except Exception as e:
            logger.error(f"Error marking notification as read: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to mark notification as read: {str(e)}"
            }
    
    def mark_all_as_read(self, user_id: str) -> Dict:
        """
        Mark all unread notifications for a user as read
        
        Args:
            user_id: The user's ID
            
        Returns:
            Dictionary with operation result
        """
        try:
            # Update all unread notifications for user
            update_result = self.notifications_collection.update_many(
                {
                    'user_id': ObjectId(user_id),
                    'is_read': False
                },
                {
                    '$set': {
                        'is_read': True,
                        'read_at': datetime.utcnow(),
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            return {
                'success': True,
                'message': f'Marked {update_result.modified_count} notifications as read',
                'count': update_result.modified_count
            }
            
        except Exception as e:
            logger.error(f"Error marking all notifications as read: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to mark notifications as read: {str(e)}"
            }
    
    def delete_notification(self, notification_id: str, user_id: str) -> Dict:
        """
        Delete a specific notification
        
        Args:
            notification_id: The notification ID
            user_id: The user's ID (for verification)
            
        Returns:
            Dictionary with operation result
        """
        try:
            # Verify notification belongs to user
            notification = self.notifications_collection.find_one({
                '_id': ObjectId(notification_id),
                'user_id': ObjectId(user_id)
            })
            
            if not notification:
                return {
                    'success': False,
                    'error': 'Notification not found or access denied'
                }
            
            # Delete notification
            delete_result = self.notifications_collection.delete_one({
                '_id': ObjectId(notification_id),
                'user_id': ObjectId(user_id)
            })
            
            if delete_result.deleted_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to delete notification'
                }
            
            return {
                'success': True,
                'message': 'Notification deleted successfully'
            }
            
        except Exception as e:
            logger.error(f"Error deleting notification: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to delete notification: {str(e)}"
            }
    
    def get_unread_count(self, user_id: str) -> Dict:
        """
        Get count of unread notifications for a user
        
        Args:
            user_id: The user's ID
            
        Returns:
            Dictionary with unread count
        """
        try:
            count = self.notifications_collection.count_documents({
                'user_id': ObjectId(user_id),
                'is_read': False
            })
            
            return {
                'success': True,
                'count': count
            }
            
        except Exception as e:
            logger.error(f"Error getting unread count: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to get unread count: {str(e)}"
            }
    
    # ==================== SYSTEM FUNCTIONS ====================
    
    def create_notification(self, notification_data: Dict) -> Dict:
        """
        Create a new notification (system function)
        
        Args:
            notification_data: Dictionary containing notification data
            
        Returns:
            Dictionary with created notification
        """
        try:
            # Validate required fields
            required_fields = ['user_id', 'type', 'title', 'message']
            for field in required_fields:
                if field not in notification_data:
                    return {
                        'success': False,
                        'error': f"Missing required field: {field}"
                    }
            
            # Prepare notification document
            notification_doc = {
                'user_id': ObjectId(notification_data['user_id']),
                'type': notification_data['type'],
                'title': notification_data['title'],
                'message': notification_data['message'],
                'is_read': False,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add optional fields
            optional_fields = [
                'action_url', 'related_entity_type', 
                'related_entity_id', 'metadata'
            ]
            
            for field in optional_fields:
                if field in notification_data:
                    if field == 'related_entity_id' and notification_data[field]:
                        notification_doc[field] = ObjectId(notification_data[field])
                    else:
                        notification_doc[field] = notification_data[field]
            
            # Insert notification
            result = self.notifications_collection.insert_one(notification_doc)
            
            # Get the created notification
            created_notification = self.notifications_collection.find_one(
                {'_id': result.inserted_id}
            )
            
            # Convert ObjectId to string
            if created_notification:
                created_notification['_id'] = str(created_notification['_id'])
                created_notification['user_id'] = str(created_notification['user_id'])
                if 'related_entity_id' in created_notification:
                    created_notification['related_entity_id'] = str(created_notification['related_entity_id'])
            
                return {
                    'success': True,
                    'notification': created_notification,
                    'message': 'Notification created successfully'
                }
            else:
                return {
                    'success': False,
                    'error': 'Failed to create notification'
                }
            
        except Exception as e:
            logger.error(f"Error creating notification: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to create notification: {str(e)}"
            }
    
    def send_bulk_notification(self, user_ids: List[str], notification_data: Dict) -> Dict:
        """
        Send notification to multiple users
        
        Args:
            user_ids: List of user IDs
            notification_data: Dictionary containing notification data
            
        Returns:
            Dictionary with operation result
        """
        try:
            # Validate required fields
            required_fields = ['type', 'title', 'message']
            for field in required_fields:
                if field not in notification_data:
                    return {
                        'success': False,
                        'error': f"Missing required field: {field}"
                    }
            
            notifications = []
            current_time = datetime.utcnow()
            
            # Create notification for each user
            for user_id in user_ids:
                notification_doc = {
                    'user_id': ObjectId(user_id),
                    'type': notification_data['type'],
                    'title': notification_data['title'],
                    'message': notification_data['message'],
                    'is_read': False,
                    'created_at': current_time,
                    'updated_at': current_time
                }
                
                # Add optional fields
                optional_fields = [
                    'action_url', 'related_entity_type', 
                    'related_entity_id', 'metadata'
                ]
                
                for field in optional_fields:
                    if field in notification_data:
                        if field == 'related_entity_id' and notification_data[field]:
                            notification_doc[field] = ObjectId(notification_data[field])
                        else:
                            notification_doc[field] = notification_data[field]
                
                notifications.append(notification_doc)
            
            # Insert all notifications
            if notifications:
                result = self.notifications_collection.insert_many(notifications)
                
                return {
                    'success': True,
                    'message': f'Notification sent to {len(result.inserted_ids)} users',
                    'count': len(result.inserted_ids)
                }
            else:
                return {
                    'success': False,
                    'error': 'No users to notify'
                }
            
        except Exception as e:
            logger.error(f"Error sending bulk notification: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to send bulk notification: {str(e)}"
            }
    
    # ==================== ADMIN FUNCTIONS ====================
    
    def get_all_notifications(self, filters: Optional[Dict] = None) -> Dict:
        """
        Get all notifications (admin function)
        
        Args:
            filters: Optional filters (e.g., {'user_id': '...', 'type': '...'})
            
        Returns:
            Dictionary containing all notifications and metadata
        """
        try:
            # Build query
            query = {}
            
            # Apply filters
            if filters:
                if 'user_id' in filters:
                    query['user_id'] = ObjectId(filters['user_id'])
                if 'type' in filters:
                    query['type'] = filters['type']
                if 'is_read' in filters:
                    query['is_read'] = filters['is_read']
                if 'start_date' in filters:
                    query['created_at'] = {'$gte': filters['start_date']}
                if 'end_date' in filters:
                    if 'created_at' in query:
                        query['created_at']['$lte'] = filters['end_date']
                    else:
                        query['created_at'] = {'$lte': filters['end_date']}
            
            # Get pagination parameters
            page = filters.get('page', 1) if filters else 1
            limit = filters.get('limit', 50) if filters else 50
            skip = (page - 1) * limit
            
            # Get total count
            total = self.notifications_collection.count_documents(query)
            
            # Get notifications with sorting (newest first)
            notifications = list(
                self.notifications_collection.find(query)
                .sort('created_at', -1)
                .skip(skip)
                .limit(limit)
            )
            
            # Convert ObjectId to string for JSON serialization
            for notification in notifications:
                notification['_id'] = str(notification['_id'])
                notification['user_id'] = str(notification['user_id'])
                if 'related_entity_id' in notification:
                    notification['related_entity_id'] = str(notification['related_entity_id'])
            
            # Get statistics
            stats = {
                'total': total,
                'unread': self.notifications_collection.count_documents({'is_read': False}),
                'by_type': {}
            }
            
            # Count by type
            pipeline = [
                {'$group': {'_id': '$type', 'count': {'$sum': 1}}}
            ]
            type_counts = list(self.notifications_collection.aggregate(pipeline))
            
            for type_count in type_counts:
                stats['by_type'][type_count['_id']] = type_count['count']
            
            return {
                'success': True,
                'notifications': notifications,
                'stats': stats,
                'total': total,
                'page': page,
                'limit': limit,
                'total_pages': (total + limit - 1) // limit if limit > 0 else 0
            }
            
        except Exception as e:
            logger.error(f"Error getting all notifications: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to get notifications: {str(e)}"
            }
    
    def send_platform_notification(self, notification_data: Dict) -> Dict:
        """
        Send platform-wide notification to all users (admin function)
        
        Args:
            notification_data: Dictionary containing notification data
            
        Returns:
            Dictionary with operation result
        """
        try:
            # Validate required fields
            required_fields = ['type', 'title', 'message']
            for field in required_fields:
                if field not in notification_data:
                    return {
                        'success': False,
                        'error': f"Missing required field: {field}"
                    }
            
            # Get all active users
            active_users = self.users_collection.find(
                {'is_active': True},
                {'_id': 1}
            )
            
            user_ids = [str(user['_id']) for user in active_users]
            
            if not user_ids:
                return {
                    'success': False,
                    'error': 'No active users found'
                }
            
            # Send bulk notification
            return self.send_bulk_notification(user_ids, notification_data)
            
        except Exception as e:
            logger.error(f"Error sending platform notification: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to send platform notification: {str(e)}"
            }
    
    # ==================== HELPER FUNCTIONS ====================
    
    def notify_order_received(self, freelancer_id: str, order_id: str, order_title: str) -> Dict:
        """
        Send notification when freelancer receives a new order
        
        Args:
            freelancer_id: The freelancer's ID
            order_id: The order ID
            order_title: The order title
            
        Returns:
            Dictionary with operation result
        """
        notification_data = {
            'user_id': freelancer_id,
            'type': self.NOTIFICATION_TYPES['order_received'],
            'title': 'New Order Received',
            'message': f"You have received a new order: '{order_title}'",
            'action_url': f'/orders/{order_id}',
            'related_entity_type': 'order',
            'related_entity_id': order_id
        }
        
        return self.create_notification(notification_data)
    
    def notify_order_accepted(self, client_id: str, order_id: str) -> Dict:
        """
        Send notification when order is accepted by freelancer
        
        Args:
            client_id: The client's ID
            order_id: The order ID
            
        Returns:
            Dictionary with operation result
        """
        notification_data = {
            'user_id': client_id,
            'type': self.NOTIFICATION_TYPES['order_accepted'],
            'title': 'Order Accepted',
            'message': 'Your order has been accepted and work has started',
            'action_url': f'/orders/{order_id}',
            'related_entity_type': 'order',
            'related_entity_id': order_id
        }
        
        return self.create_notification(notification_data)
    
    def notify_order_delivered(self, client_id: str, order_id: str) -> Dict:
        """
        Send notification when order is delivered
        
        Args:
            client_id: The client's ID
            order_id: The order ID
            
        Returns:
            Dictionary with operation result
        """
        notification_data = {
            'user_id': client_id,
            'type': self.NOTIFICATION_TYPES['order_delivered'],
            'title': 'Order Delivered',
            'message': 'Your order has been delivered. Please review it.',
            'action_url': f'/orders/{order_id}',
            'related_entity_type': 'order',
            'related_entity_id': order_id
        }
        
        return self.create_notification(notification_data)
    
    def notify_payment_received(self, freelancer_id: str, order_id: str, amount: float) -> Dict:
        """
        Send notification when payment is received
        
        Args:
            freelancer_id: The freelancer's ID
            order_id: The order ID
            amount: The payment amount
            
        Returns:
            Dictionary with operation result
        """
        notification_data = {
            'user_id': freelancer_id,
            'type': self.NOTIFICATION_TYPES['payment_received'],
            'title': 'Payment Received',
            'message': f'Payment of ${amount:.2f} has been credited to your account',
            'action_url': f'/earnings',
            'related_entity_type': 'order',
            'related_entity_id': order_id
        }
        
        return self.create_notification(notification_data)
    
    def notify_new_message(self, recipient_id: str, sender_name: str, order_id: str) -> Dict:
        """
        Send notification for new message
        
        Args:
            recipient_id: The recipient's ID
            sender_name: The sender's name
            order_id: The order ID
            
        Returns:
            Dictionary with operation result
        """
        notification_data = {
            'user_id': recipient_id,
            'type': self.NOTIFICATION_TYPES['new_message'],
            'title': 'New Message',
            'message': f'You have a new message from {sender_name}',
            'action_url': f'/messages/{order_id}',
            'related_entity_type': 'order',
            'related_entity_id': order_id
        }
        
        return self.create_notification(notification_data)
    
    def cleanup_old_notifications(self, days_old: int = 30) -> Dict:
        """
        Clean up notifications older than specified days
        
        Args:
            days_old: Number of days (notifications older than this will be deleted)
            
        Returns:
            Dictionary with cleanup result
        """
        try:
            from datetime import datetime, timedelta
            
            cutoff_date = datetime.utcnow() - timedelta(days=days_old)
            
            # Delete notifications older than cutoff date
            delete_result = self.notifications_collection.delete_many({
                'created_at': {'$lt': cutoff_date},
                'is_read': True  # Only delete read notifications
            })
            
            return {
                'success': True,
                'message': f'Deleted {delete_result.deleted_count} old notifications',
                'count': delete_result.deleted_count
            }
            
        except Exception as e:
            logger.error(f"Error cleaning up old notifications: {str(e)}")
            return {
                'success': False,
                'error': f"Failed to clean up notifications: {str(e)}"
            }