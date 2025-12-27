# services/order_service.py - VERSION COMPLÈTE ET CORRIGÉE
import os
import logging
import random
from datetime import datetime, timedelta
from bson import ObjectId
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from .database import db

# Load environment variables
load_dotenv()

class OrderService:
    def __init__(self):
        self.orders_collection = db.get_collection('orders')
        self.gigs_collection = db.get_collection('gigs')
        self.users_collection = db.get_collection('users')
        
        # Configure logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    # ==================== MÉTHODES UTILITAIRES ====================
    
    def _generate_order_number(self) -> str:
        """Génère un numéro de commande unique"""
        while True:
            # Format: ORD-YYYYMMDD-XXXX
            date_str = datetime.now().strftime("%Y%m%d")
            random_num = random.randint(1000, 9999)
            order_number = f"ORD-{date_str}-{random_num}"
            
            # Vérifier l'unicité
            existing = self.orders_collection.find_one({"order_number": order_number})
            if not existing:
                return order_number
    
    def _parse_mongodb_date(self, date_field):
        """Parse MongoDB date field (handles both datetime and $date format)"""
        if date_field is None:
            return None
        
        if isinstance(date_field, dict) and '$date' in date_field:
            # Format MongoDB: {"$date": "ISO_STRING"}
            date_str = date_field['$date']
            # Remove milliseconds if present
            if '.' in date_str:
                date_str = date_str.split('.')[0] + 'Z'
            return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        elif isinstance(date_field, datetime):
            return date_field
        elif isinstance(date_field, str):
            # Handle string dates
            if 'T' in date_field:
                return datetime.fromisoformat(date_field.replace('Z', '+00:00'))
            else:
                # Simple date string
                return datetime.fromisoformat(date_field)
        return date_field
    
    def _convert_objectid_to_string(self, data):
        """Convert ObjectId to string in data"""
        if isinstance(data, dict):
            for key, value in data.items():
                if isinstance(value, ObjectId):
                    data[key] = str(value)
                elif isinstance(value, dict):
                    self._convert_objectid_to_string(value)
                elif isinstance(value, list):
                    for i, item in enumerate(value):
                        if isinstance(item, ObjectId):
                            value[i] = str(item)
                        elif isinstance(item, dict):
                            self._convert_objectid_to_string(item)
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    self._convert_objectid_to_string(item)
        return data
    
    def _prepare_order_for_response(self, order):
        """Prepare order document for API response"""
        if not order:
            return None
        
        # Convert ObjectId to string
        order = self._convert_objectid_to_string(order.copy())
        
        # Parse dates
        date_fields = ['created_at', 'updated_at', 'deadline', 'confirmed_at', 
                      'started_at', 'delivered_at', 'completed_at', 'cancelled_at']
        for field in date_fields:
            if field in order and order[field]:
                order[field] = self._parse_mongodb_date(order[field])
                if isinstance(order[field], datetime):
                    order[field] = order[field].isoformat()
        
        return order
    
    def _extract_category_value(self, gig: Dict) -> str:
        """Extrait la valeur category d'un gig (gère string et object)"""
        category_value = gig.get('category')
        
        if category_value is None:
            return ''
        
        if isinstance(category_value, dict):
            # Si c'est un objet, extraire le slug ou name
            if 'slug' in category_value:
                return category_value['slug']
            elif 'name' in category_value:
                return category_value['name']
            else:
                return str(category_value)
        
        # Sinon, c'est déjà une string
        return str(category_value)
    
    def _get_gig_price(self, gig: Dict, package_name: str = None) -> float:
        """Get price from gig based on package or default"""
        gig_packages = gig.get('packages', {})
        
        # If gig has packages
        if gig_packages:
            if isinstance(gig_packages, dict):
                # Packages as dict
                if package_name and package_name in gig_packages:
                    package_details = gig_packages[package_name]
                    return float(package_details.get('price', 0))
                elif gig_packages:
                    # Get first package price
                    first_package = next(iter(gig_packages.values()))
                    return float(first_package.get('price', 0))
            elif isinstance(gig_packages, list):
                # Packages as list
                if package_name:
                    for package in gig_packages:
                        if isinstance(package, dict) and package.get('name') == package_name:
                            return float(package.get('price', 0))
                elif gig_packages:
                    # Get first package price
                    first_package = gig_packages[0]
                    return float(first_package.get('price', 0))
        
        # If no packages or package not found, try direct price fields
        price_fields = ['price', 'base_price', 'starting_price', 'amount']
        for field in price_fields:
            if field in gig and gig[field]:
                try:
                    price = float(gig[field])
                    if price > 0:
                        return price
                except (ValueError, TypeError):
                    continue
        
        # Default price
        return 50.0
    
    def check_gig_compatibility(self, gig_id: str) -> Dict:
        """Vérifie si un gig est compatible avec OrderService"""
        try:
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            # Vérifier les champs de prix
            price = self._get_gig_price(gig)
            
            # Vérifier les packages
            has_packages = 'packages' in gig and gig['packages']
            
            # Vérifier la category
            category_value = gig.get('category')
            category_issue = None
            if category_value is not None and isinstance(category_value, dict):
                category_issue = 'Category is object, should be string'
            
            compatibility = {
                'gig_id': str(gig['_id']),
                'title': gig.get('title', 'Unknown'),
                'has_price': price > 0,
                'price': price,
                'category_issue': category_issue,
                'category_value': category_value,
                'has_packages': has_packages,
                'freelancer_id': str(gig.get('freelancer_id', '')),
                'recommended_action': 'OK' if (price > 0 and not category_issue) else 'Check issues'
            }
            
            return {
                'success': True,
                'compatibility': compatibility
            }
            
        except Exception as e:
            self.logger.error(f"Error checking gig compatibility: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODES PRINCIPALES ====================
    
    def create_order(self, client_id: str, order_data: Dict) -> Dict:
        """Create a new order (client initiates)"""
        try:
            self.logger.info(f"Creating order for client {client_id}")
            self.logger.info(f"Order data keys: {list(order_data.keys())}")
            
            # Validate required fields
            if 'gig_id' not in order_data:
                return {
                    'success': False,
                    'error': 'Missing required field: gig_id'
                }
            
            # Get gig details
            gig_id = order_data['gig_id']
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            # Get client details
            client = self.users_collection.find_one({'_id': ObjectId(client_id)})
            if not client:
                return {
                    'success': False,
                    'error': 'Client not found'
                }
            
            # Get freelancer ID from gig
            freelancer_id = gig.get('freelancer_id')
            if not freelancer_id:
                return {
                    'success': False,
                    'error': 'Gig has no freelancer assigned'
                }
            
            # Determine price
            package_name = order_data.get('package', 'basic')
            price = self._get_gig_price(gig, package_name)
            
            if price <= 0:
                self.logger.warning(f"Using default price for gig {gig_id}")
                price = 50.0
            
            # Calculate deadline
            deadline_str = order_data.get('deadline')
            if deadline_str:
                deadline = datetime.fromisoformat(deadline_str.replace('Z', '+00:00'))
            else:
                # Default: 7 days from now
                deadline = datetime.utcnow() + timedelta(days=7)
            
            # Generate order number
            order_number = self._generate_order_number()
            
            # Extract gig category
            gig_category = self._extract_category_value(gig)
            
            # Create order document
            order_doc = {
                'order_number': order_number,
                'client_id': ObjectId(client_id),
                'freelancer_id': ObjectId(str(freelancer_id)),
                'gig_id': ObjectId(gig_id),
                'title': gig.get('title', 'Custom Service'),
                'description': order_data.get('requirements', ''),
                'package': package_name,
                'price': float(price),
                'currency': 'USD',
                'service_fee': float(price * 0.20),  # 20% service fee
                'total_amount': float(price * 1.20),  # Price + 20%
                'requirements': order_data.get('requirements', ''),
                'deadline': deadline,
                'status': 'pending',
                'revision_count': 0,
                'max_revisions': order_data.get('max_revisions', 2),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
                'is_active': True,
                'is_orphaned': False,
                'needs_review': False,
                'attachments': order_data.get('attachments', []),
                'timeline': [
                    {
                        'action': 'created',
                        'by': ObjectId(client_id),
                        'role': 'client',
                        'timestamp': datetime.utcnow(),
                        'message': 'Order created'
                    }
                ],
                'gig': {
                    'title': gig.get('title'),
                    'slug': gig.get('slug'),
                    'category': gig_category,
                    'images': gig.get('images', [])
                }
            }
            
            # Insert order
            result = self.orders_collection.insert_one(order_doc)
            order_id = str(result.inserted_id)
            
            # Get the created order
            created_order = self.orders_collection.find_one({'_id': result.inserted_id})
            prepared_order = self._prepare_order_for_response(created_order)
            
            self.logger.info(f"Order created successfully: {order_id}")
            
            return {
                'success': True,
                'order': prepared_order,
                'order_id': order_id,
                'message': 'Order created successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error creating order: {str(e)}", exc_info=True)
            return {
                'success': False,
                'error': f'Failed to create order: {str(e)}'
            }
    
    # ==================== MÉTHODES CLIENT ====================
    
    def create_order_client(self, client_id: str, order_data: Dict) -> Dict:
        """Alias pour create_order (compatibilité RPC)"""
        return self.create_order(client_id, order_data)
    
    def get_my_orders(self, client_id: str, filters: Dict = None) -> Dict:
        """Get orders for a specific client"""
        try:
            filters = filters or {}
            query = {'client_id': ObjectId(client_id), 'is_active': True}
            
            # Apply filters
            if filters.get('status') and filters['status'] != 'all':
                query['status'] = filters['status']
            
            if filters.get('date_from'):
                query['created_at'] = {'$gte': self._parse_mongodb_date(filters['date_from'])}
            
            if filters.get('date_to'):
                if 'created_at' in query:
                    query['created_at']['$lte'] = self._parse_mongodb_date(filters['date_to'])
                else:
                    query['created_at'] = {'$lte': self._parse_mongodb_date(filters['date_to'])}
            
            # Pagination
            page = int(filters.get('page', 1))
            limit = int(filters.get('limit', 10))
            skip = (page - 1) * limit
            
            # Get total count
            total = self.orders_collection.count_documents(query)
            
            # Get orders
            orders_cursor = self.orders_collection.find(query).skip(skip).limit(limit).sort('created_at', -1)
            orders = []
            
            for order in orders_cursor:
                prepared_order = self._prepare_order_for_response(order)
                if prepared_order:
                    orders.append(prepared_order)
            
            return {
                'success': True,
                'orders': orders,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error getting client orders: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_order_by_id(self, order_id: str, user_id: str) -> Dict:
        """Get order details by ID with user verification"""
        try:
            order = self.orders_collection.find_one({'_id': ObjectId(order_id), 'is_active': True})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            # Check if user has access to this order
            user_obj_id = ObjectId(user_id)
            user_role = None
            
            if order['client_id'] == user_obj_id:
                user_role = 'client'
            elif order['freelancer_id'] == user_obj_id:
                user_role = 'freelancer'
            else:
                # Check if user is admin
                user = self.users_collection.find_one({'_id': user_obj_id})
                if not user or user.get('role') != 'admin':
                    return {
                        'success': False,
                        'error': 'Access denied'
                    }
                user_role = 'admin'
            
            # Get related user info
            client = self.users_collection.find_one({'_id': order['client_id']})
            freelancer = self.users_collection.find_one({'_id': order['freelancer_id']})
            gig = self.gigs_collection.find_one({'_id': order['gig_id']})
            
            # Prepare order for response
            prepared_order = self._prepare_order_for_response(order)
            
            # Add user details
            if client:
                prepared_order['client_info'] = {
                    '_id': str(client['_id']),
                    'username': client.get('username'),
                    'full_name': client.get('full_name'),
                    'avatar_url': client.get('avatar_url'),
                    'email': client.get('email')
                }
            
            if freelancer:
                prepared_order['freelancer_info'] = {
                    '_id': str(freelancer['_id']),
                    'username': freelancer.get('username'),
                    'full_name': freelancer.get('full_name'),
                    'avatar_url': freelancer.get('avatar_url'),
                    'email': freelancer.get('email'),
                    'rating': freelancer.get('rating', 0.0)
                }
            
            if gig:
                prepared_order['gig_info'] = {
                    '_id': str(gig['_id']),
                    'title': gig.get('title'),
                    'slug': gig.get('slug'),
                    'images': gig.get('images', []),
                    'description': gig.get('description', '')
                }
            
            return {
                'success': True,
                'order': prepared_order,
                'user_role': user_role
            }
            
        except Exception as e:
            self.logger.error(f"Error getting order: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def cancel_order(self, order_id: str, client_id: str, reason: str = None) -> Dict:
        """Client cancels an order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'is_active': True
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found or access denied'
                }
            
            # Check if order can be cancelled
            if order['status'] not in ['pending', 'accepted']:
                return {
                    'success': False,
                    'error': f'Order cannot be cancelled in {order["status"]} status'
                }
            
            # Update order
            update_data = {
                'status': 'cancelled',
                'cancellation_reason': reason,
                'cancelled_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'cancelled',
                'by': ObjectId(client_id),
                'role': 'client',
                'timestamp': datetime.utcnow(),
                'message': f'Order cancelled. Reason: {reason}' if reason else 'Order cancelled'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to cancel order'
                }
            
            self.logger.info(f"Order {order_id} cancelled by client {client_id}")
            
            return {
                'success': True,
                'message': 'Order cancelled successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error cancelling order: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def request_revision(self, order_id: str, client_id: str, revision_notes: str) -> Dict:
        """Client requests revision on delivered order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'is_active': True
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found or access denied'
                }
            
            # Check if order is in delivered status
            if order['status'] != 'delivered':
                return {
                    'success': False,
                    'error': f'Revision can only be requested on delivered orders. Current status: {order["status"]}'
                }
            
            # Update revision count
            revision_count = order.get('revision_count', 0) + 1
            max_revisions = order.get('max_revisions', 2)
            
            if revision_count > max_revisions:
                return {
                    'success': False,
                    'error': f'Maximum revisions ({max_revisions}) reached'
                }
            
            # Update order
            update_data = {
                'status': 'revision_requested',
                'revision_notes': revision_notes,
                'revision_count': revision_count,
                'revision_requested_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'revision_requested',
                'by': ObjectId(client_id),
                'role': 'client',
                'timestamp': datetime.utcnow(),
                'message': f'Revision {revision_count}/{max_revisions} requested: {revision_notes}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to request revision'
                }
            
            self.logger.info(f"Revision requested for order {order_id} by client {client_id}")
            
            return {
                'success': True,
                'message': 'Revision requested successfully',
                'revision_count': revision_count,
                'max_revisions': max_revisions
            }
            
        except Exception as e:
            self.logger.error(f"Error requesting revision: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def accept_delivery(self, order_id: str, client_id: str) -> Dict:
        """Client accepts delivered order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'is_active': True
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found or access denied'
                }
            
            # Check if order is in delivered status
            if order['status'] != 'delivered':
                return {
                    'success': False,
                    'error': f'Delivery can only be accepted on delivered orders. Current status: {order["status"]}'
                }
            
            # Update order
            update_data = {
                'status': 'completed',
                'completed_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'accepted',
                'by': ObjectId(client_id),
                'role': 'client',
                'timestamp': datetime.utcnow(),
                'message': 'Delivery accepted and order completed'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to accept delivery'
                }
            
            self.logger.info(f"Delivery accepted for order {order_id} by client {client_id}")
            
            return {
                'success': True,
                'message': 'Delivery accepted successfully. Order completed.'
            }
            
        except Exception as e:
            self.logger.error(f"Error accepting delivery: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def escalate_to_dispute(self, order_id: str, client_id: str, dispute_data: Dict) -> Dict:
        """Client escalates order to dispute"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'is_active': True
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found or access denied'
                }
            
            # Check if order can be disputed
            if order['status'] in ['completed', 'cancelled', 'disputed']:
                return {
                    'success': False,
                    'error': f'Order cannot be disputed in {order["status"]} status'
                }
            
            # Validate dispute data
            if not dispute_data.get('reason'):
                return {
                    'success': False,
                    'error': 'Dispute reason is required'
                }
            
            # Update order
            update_data = {
                'status': 'disputed',
                'dispute': {
                    'reason': dispute_data['reason'],
                    'description': dispute_data.get('description', ''),
                    'evidence': dispute_data.get('evidence', []),
                    'raised_by': 'client',
                    'raised_at': datetime.utcnow(),
                    'status': 'open'
                },
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'disputed',
                'by': ObjectId(client_id),
                'role': 'client',
                'timestamp': datetime.utcnow(),
                'message': f'Order disputed. Reason: {dispute_data["reason"]}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to escalate to dispute'
                }
            
            self.logger.info(f"Order {order_id} disputed by client {client_id}")
            
            return {
                'success': True,
                'message': 'Order escalated to dispute successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error escalating to dispute: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODES FREELANCER ====================
    
    def get_freelancer_orders(self, freelancer_id: str, filters: Dict = None) -> Dict:
        """Get orders for a specific freelancer"""
        try:
            filters = filters or {}
            query = {'freelancer_id': ObjectId(freelancer_id), 'is_active': True}
            
            # Apply filters
            if filters.get('status') and filters['status'] != 'all':
                query['status'] = filters['status']
            
            if filters.get('date_from'):
                query['created_at'] = {'$gte': self._parse_mongodb_date(filters['date_from'])}
            
            if filters.get('date_to'):
                if 'created_at' in query:
                    query['created_at']['$lte'] = self._parse_mongodb_date(filters['date_to'])
                else:
                    query['created_at'] = {'$lte': self._parse_mongodb_date(filters['date_to'])}
            
            # Pagination
            page = int(filters.get('page', 1))
            limit = int(filters.get('limit', 10))
            skip = (page - 1) * limit
            
            # Get total count
            total = self.orders_collection.count_documents(query)
            
            # Get orders
            orders_cursor = self.orders_collection.find(query).skip(skip).limit(limit).sort('created_at', -1)
            orders = []
            
            for order in orders_cursor:
                prepared_order = self._prepare_order_for_response(order)
                if prepared_order:
                    # Get client info
                    client = self.users_collection.find_one({'_id': order['client_id']})
                    if client:
                        prepared_order['client_info'] = {
                            '_id': str(client['_id']),
                            'username': client.get('username'),
                            'full_name': client.get('full_name'),
                            'avatar_url': client.get('avatar_url')
                        }
                    orders.append(prepared_order)
            
            return {
                'success': True,
                'orders': orders,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error getting freelancer orders: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def accept_order(self, order_id: str, freelancer_id: str) -> Dict:
        """Freelancer accepts an order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'freelancer_id': ObjectId(freelancer_id),
                'is_active': True,
                'status': 'pending'
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found, not pending, or access denied'
                }
            
            # Update order
            update_data = {
                'status': 'accepted',
                'confirmed_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'accepted',
                'by': ObjectId(freelancer_id),
                'role': 'freelancer',
                'timestamp': datetime.utcnow(),
                'message': 'Order accepted by freelancer'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to accept order'
                }
            
            self.logger.info(f"Order {order_id} accepted by freelancer {freelancer_id}")
            
            return {
                'success': True,
                'message': 'Order accepted successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error accepting order: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def decline_order(self, order_id: str, freelancer_id: str, reason: str = None) -> Dict:
        """Freelancer declines an order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'freelancer_id': ObjectId(freelancer_id),
                'is_active': True,
                'status': 'pending'
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found, not pending, or access denied'
                }
            
            # Update order
            update_data = {
                'status': 'declined',
                'declined_at': datetime.utcnow(),
                'decline_reason': reason,
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'declined',
                'by': ObjectId(freelancer_id),
                'role': 'freelancer',
                'timestamp': datetime.utcnow(),
                'message': f'Order declined. Reason: {reason}' if reason else 'Order declined'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to decline order'
                }
            
            self.logger.info(f"Order {order_id} declined by freelancer {freelancer_id}")
            
            return {
                'success': True,
                'message': 'Order declined successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error declining order: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def start_order_work(self, order_id: str, freelancer_id: str) -> Dict:
        """Freelancer starts working on an order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'freelancer_id': ObjectId(freelancer_id),
                'is_active': True,
                'status': 'accepted'
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found, not accepted, or access denied'
                }
            
            # Update order
            update_data = {
                'status': 'in_progress',
                'started_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'work_started',
                'by': ObjectId(freelancer_id),
                'role': 'freelancer',
                'timestamp': datetime.utcnow(),
                'message': 'Work started on the order'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to start order work'
                }
            
            self.logger.info(f"Work started on order {order_id} by freelancer {freelancer_id}")
            
            return {
                'success': True,
                'message': 'Order work started successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error starting order work: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def deliver_order(self, order_id: str, freelancer_id: str, delivery_data: Dict) -> Dict:
        """Freelancer delivers completed order"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'freelancer_id': ObjectId(freelancer_id),
                'is_active': True
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found or access denied'
                }
            
            # Check if order is in progress or revision_requested status
            if order['status'] not in ['in_progress', 'revision_requested']:
                return {
                    'success': False,
                    'error': f'Order cannot be delivered in {order["status"]} status'
                }
            
            # Validate delivery data
            if not delivery_data.get('message'):
                return {
                    'success': False,
                    'error': 'Delivery message is required'
                }
            
            # Update order
            update_data = {
                'status': 'delivered',
                'delivered_at': datetime.utcnow(),
                'delivery_files': delivery_data.get('attachments', []),
                'delivery_message': delivery_data['message'],
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'delivered',
                'by': ObjectId(freelancer_id),
                'role': 'freelancer',
                'timestamp': datetime.utcnow(),
                'message': f'Order delivered: {delivery_data["message"]}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to deliver order'
                }
            
            self.logger.info(f"Order {order_id} delivered by freelancer {freelancer_id}")
            
            return {
                'success': True,
                'message': 'Order delivered successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error delivering order: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_order_progress(self, order_id: str, freelancer_id: str, progress_data: Dict) -> Dict:
        """Freelancer updates order progress"""
        try:
            # Find order
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'freelancer_id': ObjectId(freelancer_id),
                'is_active': True,
                'status': 'in_progress'
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found, not in progress, or access denied'
                }
            
            # Validate progress data
            progress = int(progress_data.get('progress', 0))
            message = progress_data.get('message', 'Progress update')
            
            if progress < 0 or progress > 100:
                return {
                    'success': False,
                    'error': 'Progress must be between 0 and 100'
                }
            
            # Update order
            update_data = {
                'progress_percentage': progress,
                'progress_message': message,
                'progress_updated_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'progress_updated',
                'by': ObjectId(freelancer_id),
                'role': 'freelancer',
                'timestamp': datetime.utcnow(),
                'message': f'Progress updated to {progress}%: {message}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to update progress'
                }
            
            self.logger.info(f"Progress updated for order {order_id} by freelancer {freelancer_id}")
            
            return {
                'success': True,
                'message': 'Order progress updated successfully',
                'progress': progress
            }
            
        except Exception as e:
            self.logger.error(f"Error updating order progress: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODES PARTAGÉES ====================
    
    def get_order_timeline(self, order_id: str) -> Dict:
        """Get order timeline/activity log"""
        try:
            order = self.orders_collection.find_one(
                {'_id': ObjectId(order_id), 'is_active': True},
                {'timeline': 1, 'status': 1, 'created_at': 1, 'order_number': 1}
            )
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            # Prepare timeline
            timeline = []
            for entry in order.get('timeline', []):
                if isinstance(entry, dict):
                    entry_copy = entry.copy()
                    if 'by' in entry_copy and entry_copy['by']:
                        entry_copy['by'] = str(entry_copy['by'])
                    if 'timestamp' in entry_copy:
                        entry_copy['timestamp'] = self._parse_mongodb_date(entry_copy['timestamp'])
                        if isinstance(entry_copy['timestamp'], datetime):
                            entry_copy['timestamp'] = entry_copy['timestamp'].isoformat()
                    timeline.append(entry_copy)
            
            return {
                'success': True,
                'timeline': timeline,
                'order_number': order.get('order_number'),
                'status': order.get('status'),
                'created_at': self._parse_mongodb_date(order.get('created_at'))
            }
            
        except Exception as e:
            self.logger.error(f"Error getting order timeline: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def extend_deadline(self, order_id: str, user_id: str, extension_data: Dict) -> Dict:
        """Extend order deadline (client or freelancer)"""
        try:
            order = self.orders_collection.find_one({'_id': ObjectId(order_id), 'is_active': True})
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            # Check if user has access to this order
            user_obj_id = ObjectId(user_id)
            user_role = None
            
            if order['client_id'] == user_obj_id:
                user_role = 'client'
            elif order['freelancer_id'] == user_obj_id:
                user_role = 'freelancer'
            else:
                return {
                    'success': False,
                    'error': 'Access denied'
                }
            
            # Validate extension data
            if not extension_data.get('new_deadline'):
                return {
                    'success': False,
                    'error': 'New deadline is required'
                }
            
            new_deadline = self._parse_mongodb_date(extension_data['new_deadline'])
            current_deadline = self._parse_mongodb_date(order['deadline'])
            
            if new_deadline <= current_deadline:
                return {
                    'success': False,
                    'error': 'New deadline must be later than current deadline'
                }
            
            # Check if order is in a state that allows deadline extension
            if order['status'] not in ['accepted', 'in_progress']:
                return {
                    'success': False,
                    'error': f'Deadline cannot be extended in {order["status"]} status'
                }
            
            # Update order
            update_data = {
                'deadline': new_deadline,
                'updated_at': datetime.utcnow()
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'deadline_extended',
                'by': user_obj_id,
                'role': user_role,
                'timestamp': datetime.utcnow(),
                'message': f'Deadline extended to {new_deadline.isoformat()}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to extend deadline'
                }
            
            self.logger.info(f"Deadline extended for order {order_id} by {user_role} {user_id}")
            
            return {
                'success': True,
                'message': 'Deadline extended successfully',
                'new_deadline': new_deadline.isoformat()
            }
            
        except Exception as e:
            self.logger.error(f"Error extending deadline: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODES ADMIN ====================
    
    def get_all_orders_admin(self, filters: Dict = None, pagination: Dict = None) -> Dict:
        """Get all orders (admin only)"""
        try:
            filters = filters or {}
            pagination = pagination or {}
            
            query = {'is_active': True}
            
            # Apply filters
            if filters.get('status') and filters['status'] != 'all':
                query['status'] = filters['status']
            
            if filters.get('date_from'):
                query['created_at'] = {'$gte': self._parse_mongodb_date(filters['date_from'])}
            
            if filters.get('date_to'):
                if 'created_at' in query:
                    query['created_at']['$lte'] = self._parse_mongodb_date(filters['date_to'])
                else:
                    query['created_at'] = {'$lte': self._parse_mongodb_date(filters['date_to'])}
            
            if filters.get('client_id'):
                query['client_id'] = ObjectId(filters['client_id'])
            
            if filters.get('freelancer_id'):
                query['freelancer_id'] = ObjectId(filters['freelancer_id'])
            
            if filters.get('search'):
                search_term = filters['search']
                query['$or'] = [
                    {'order_number': {'$regex': search_term, '$options': 'i'}},
                    {'title': {'$regex': search_term, '$options': 'i'}},
                    {'description': {'$regex': search_term, '$options': 'i'}}
                ]
            
            # Pagination
            page = int(pagination.get('page', 1))
            limit = int(pagination.get('limit', 20))
            skip = (page - 1) * limit
            
            # Get total count
            total = self.orders_collection.count_documents(query)
            
            # Get orders
            orders_cursor = self.orders_collection.find(query).skip(skip).limit(limit).sort('created_at', -1)
            orders = []
            
            for order in orders_cursor:
                prepared_order = self._prepare_order_for_response(order)
                if prepared_order:
                    orders.append(prepared_order)
            
            return {
                'success': True,
                'orders': orders,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error getting all orders: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_order_admin(self, order_id: str, update_data: Dict) -> Dict:
        """Admin updates order details"""
        try:
            # Remove fields that shouldn't be updated
            protected_fields = ['_id', 'client_id', 'freelancer_id', 'gig_id', 'created_at']
            for field in protected_fields:
                update_data.pop(field, None)
            
            # Add updated timestamp
            update_data['updated_at'] = datetime.utcnow()
            
            # Parse date fields if present
            date_fields = ['deadline', 'delivered_at', 'completed_at', 'cancelled_at']
            for field in date_fields:
                if field in update_data and update_data[field]:
                    update_data[field] = self._parse_mongodb_date(update_data[field])
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {'$set': update_data}
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Order not found or no changes made'
                }
            
            # Add to timeline
            timeline_entry = {
                'action': 'admin_updated',
                'by': None,
                'role': 'admin',
                'timestamp': datetime.utcnow(),
                'message': 'Order updated by administrator'
            }
            
            self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {'$push': {'timeline': timeline_entry}}
            )
            
            self.logger.info(f"Order {order_id} updated by admin")
            
            return {
                'success': True,
                'message': 'Order updated successfully'
            }
            
        except Exception as e:
            self.logger.error(f"Error updating order: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def resolve_dispute(self, order_id: str, resolution_data: Dict) -> Dict:
        """Admin resolves a disputed order"""
        try:
            # Validate resolution data
            if not resolution_data.get('resolution'):
                return {
                    'success': False,
                    'error': 'Resolution details are required'
                }
            
            order = self.orders_collection.find_one({
                '_id': ObjectId(order_id),
                'status': 'disputed',
                'is_active': True
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Disputed order not found'
                }
            
            # Determine winner and amounts
            winner = resolution_data.get('winner', 'split')
            amount_to_client = float(resolution_data.get('amount_to_client', 0))
            amount_to_freelancer = float(resolution_data.get('amount_to_freelancer', 0))
            
            if winner == 'client':
                amount_to_freelancer = 0
            elif winner == 'freelancer':
                amount_to_client = 0
            
            # Update order
            update_data = {
                'status': 'dispute_resolved',
                'updated_at': datetime.utcnow(),
                'dispute.resolution': resolution_data['resolution'],
                'dispute.resolved_by': 'admin',
                'dispute.resolved_at': datetime.utcnow(),
                'dispute.winner': winner,
                'dispute.amount_to_client': amount_to_client,
                'dispute.amount_to_freelancer': amount_to_freelancer
            }
            
            # Add to timeline
            timeline_entry = {
                'action': 'dispute_resolved',
                'by': None,
                'role': 'admin',
                'timestamp': datetime.utcnow(),
                'message': f'Dispute resolved. Winner: {winner}. {resolution_data["resolution"]}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to resolve dispute'
                }
            
            self.logger.info(f"Dispute resolved for order {order_id}")
            
            return {
                'success': True,
                'message': 'Dispute resolved successfully',
                'winner': winner,
                'amount_to_client': amount_to_client,
                'amount_to_freelancer': amount_to_freelancer
            }
            
        except Exception as e:
            self.logger.error(f"Error resolving dispute: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODES STATISTIQUES ====================
    
    def get_order_stats(self, user_id: str = None, user_role: str = None) -> Dict:
        """Get order statistics for a user or overall"""
        try:
            query = {'is_active': True}
            
            if user_id and user_role:
                if user_role == 'client':
                    query['client_id'] = ObjectId(user_id)
                elif user_role == 'freelancer':
                    query['freelancer_id'] = ObjectId(user_id)
            
            # Get counts by status
            status_counts = {}
            statuses = ['pending', 'accepted', 'in_progress', 'delivered', 'completed', 'cancelled', 'disputed']
            
            for status in statuses:
                count_query = query.copy()
                count_query['status'] = status
                status_counts[status] = self.orders_collection.count_documents(count_query)
            
            # Get total earnings
            total_earnings = 0
            completed_query = query.copy()
            completed_query['status'] = 'completed'
            
            completed_orders = self.orders_collection.find(completed_query, {'price': 1})
            for order in completed_orders:
                total_earnings += order.get('price', 0)
            
            # Get recent activity
            recent_orders_cursor = self.orders_collection.find(
                query,
                {'_id': 1, 'order_number': 1, 'title': 1, 'status': 1, 'created_at': 1, 'price': 1}
            ).sort('created_at', -1).limit(5)
            
            recent_orders = []
            for order in recent_orders_cursor:
                prepared_order = self._prepare_order_for_response(order)
                if prepared_order:
                    recent_orders.append(prepared_order)
            
            return {
                'success': True,
                'stats': {
                    'total_orders': sum(status_counts.values()),
                    'status_counts': status_counts,
                    'total_earnings': total_earnings,
                    'recent_orders': recent_orders
                }
            }
            
        except Exception as e:
            self.logger.error(f"Error getting order stats: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODES DE COMPATIBILITÉ RPC ====================
    
    def get_user_orders(self, user_id: str, user_role: str, filters: Dict = None) -> Dict:
        """Compatibilité RPC - Get orders for a user based on role"""
        if user_role == 'client':
            return self.get_my_orders(user_id, filters)
        elif user_role == 'freelancer':
            return self.get_freelancer_orders(user_id, filters)
        elif user_role == 'admin':
            return self.get_all_orders_admin(filters)
        else:
            return {
                'success': False,
                'error': f'Invalid user role: {user_role}'
            }
    
    def update_order_status(self, order_id: str, status: str, user_id: str = None) -> Dict:
        """Compatibilité RPC - Update order status"""
        try:
            # Validate status
            valid_statuses = ['pending', 'accepted', 'in_progress', 'delivered', 'completed', 'cancelled', 'disputed']
            if status not in valid_statuses:
                return {
                    'success': False,
                    'error': f'Invalid status. Must be one of: {valid_statuses}'
                }
            
            # Find order
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found'
                }
            
            # Check permissions if user_id provided
            if user_id:
                user_obj_id = ObjectId(user_id)
                if order['client_id'] != user_obj_id and order['freelancer_id'] != user_obj_id:
                    # Check if admin
                    user = self.users_collection.find_one({'_id': user_obj_id})
                    if not user or user.get('role') != 'admin':
                        return {
                            'success': False,
                            'error': 'Access denied'
                        }
            
            # Update order
            update_data = {
                'status': status,
                'updated_at': datetime.utcnow()
            }
            
            # Add status-specific fields
            if status == 'accepted':
                update_data['confirmed_at'] = datetime.utcnow()
            elif status == 'in_progress':
                update_data['started_at'] = datetime.utcnow()
            elif status == 'delivered':
                update_data['delivered_at'] = datetime.utcnow()
            elif status == 'completed':
                update_data['completed_at'] = datetime.utcnow()
            elif status == 'cancelled':
                update_data['cancelled_at'] = datetime.utcnow()
            
            # Add to timeline
            timeline_entry = {
                'action': f'status_changed',
                'by': ObjectId(user_id) if user_id else None,
                'role': 'system',
                'timestamp': datetime.utcnow(),
                'message': f'Order status changed to {status}'
            }
            
            result = self.orders_collection.update_one(
                {'_id': ObjectId(order_id)},
                {
                    '$set': update_data,
                    '$push': {'timeline': timeline_entry}
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to update order status'
                }
            
            return {
                'success': True,
                'message': f'Order status updated to {status}'
            }
            
        except Exception as e:
            self.logger.error(f"Error updating order status: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== MÉTHODE DE TEST ====================
    
    def test_connection(self) -> Dict:
        """Test connection and list available methods"""
        methods = []
        for method_name in dir(self):
            if not method_name.startswith('_') and callable(getattr(self, method_name)):
                methods.append(method_name)
        
        return {
            'success': True,
            'connected': True,
            'methods': methods,
            'timestamp': datetime.utcnow().isoformat()
        }