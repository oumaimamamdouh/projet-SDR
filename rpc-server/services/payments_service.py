# from bson import ObjectId
# from datetime import datetime
# from .database import db
# import logging

# class PaymentService:
#     def __init__(self):
#         self.payments_collection = db.get_collection('payments')
#         self.orders_collection = db.get_collection('orders')
    
#     def create_payment(self, payment_data: dict) -> dict:
#         """Create a new payment record"""
#         try:
#             # Verify order exists
#             order = self.orders_collection.find_one({'_id': ObjectId(payment_data['order_id'])})
            
#             if not order:
#                 return {
#                     'success': False,
#                     'error': 'Order not found'
#                 }
            
#             # Verify client owns the order
#             if str(order['client_id']) != payment_data['client_id']:
#                 return {
#                     'success': False,
#                     'error': 'Access denied'
#                 }
            
#             # Calculate platform fee and freelancer earnings (20% platform fee)
#             amount = float(payment_data['amount'])
#             platform_fee = amount * 0.20
#             freelancer_earnings = amount - platform_fee
            
#             # Add calculated fields
#             payment_data['platform_fee'] = platform_fee
#             payment_data['freelancer_earnings'] = freelancer_earnings
#             payment_data['currency'] = payment_data.get('currency', 'USD')
#             payment_data['status'] = 'pending'
#             payment_data['created_at'] = datetime.utcnow()
#             payment_data['updated_at'] = datetime.utcnow()
            
#             # Convert string IDs to ObjectId
#             payment_data['order_id'] = ObjectId(payment_data['order_id'])
#             payment_data['client_id'] = ObjectId(payment_data['client_id'])
            
#             # Insert payment
#             result = self.payments_collection.insert_one(payment_data)
#             payment_data['_id'] = str(result.inserted_id)
            
#             return {
#                 'success': True,
#                 'payment': payment_data
#             }
            
#         except Exception as e:
#             logging.error(f"Error creating payment: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def update_payment_status(self, payment_id: str, status: str, transaction_id: str = None) -> dict:
#         """Update payment status"""
#         try:
#             update_data = {
#                 'status': status,
#                 'updated_at': datetime.utcnow()
#             }
            
#             if transaction_id:
#                 update_data['transaction_id'] = transaction_id
            
#             if status == 'completed':
#                 update_data['completed_at'] = datetime.utcnow()
                
#                 # Update order status to confirmed when payment is completed
#                 payment = self.payments_collection.find_one({'_id': ObjectId(payment_id)})
#                 if payment:
#                     self.orders_collection.update_one(
#                         {'_id': payment['order_id']},
#                         {'$set': {'status': 'confirmed'}}
#                     )
            
#             result = self.payments_collection.update_one(
#                 {'_id': ObjectId(payment_id)},
#                 {'$set': update_data}
#             )
            
#             if result.modified_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Payment not found or no changes made'
#                 }
            
#             return {
#                 'success': True,
#                 'message': 'Payment status updated successfully'
#             }
            
#         except Exception as e:
#             logging.error(f"Error updating payment status: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def get_user_payments(self, user_id: str, user_role: str, filters: dict = None) -> dict:
#         """Get payments for a user"""
#         try:
#             if user_role == 'client':
#                 query = {'client_id': ObjectId(user_id)}
#             else:
#                 # For freelancers, we need to get payments via orders
#                 orders = list(self.orders_collection.find(
#                     {'freelancer_id': ObjectId(user_id)},
#                     {'_id': 1}
#                 ))
#                 order_ids = [order['_id'] for order in orders]
#                 query = {'order_id': {'$in': order_ids}}
            
#             if filters and filters.get('status'):
#                 query['status'] = filters['status']
            
#             # Pagination
#             page = int(filters.get('page', 1)) if filters else 1
#             limit = int(filters.get('limit', 10)) if filters else 10
#             skip = (page - 1) * limit
            
#             # Get total count
#             total = self.payments_collection.count_documents(query)
            
#             # Get payments
#             payments = list(self.payments_collection.find(query)
#                 .skip(skip).limit(limit)
#                 .sort('created_at', -1))
            
#             # Convert ObjectId to string and populate order details
#             for payment in payments:
#                 payment['_id'] = str(payment['_id'])
                
#                 order = self.orders_collection.find_one({'_id': payment['order_id']})
#                 if order:
#                     payment['order'] = {
#                         '_id': str(order['_id']),
#                         'title': order['title'],
#                         'order_number': order.get('order_number')
#                     }
            
#             return {
#                 'success': True,
#                 'payments': payments,
#                 'pagination': {
#                     'page': page,
#                     'limit': limit,
#                     'total': total,
#                     'pages': (total + limit - 1) // limit
#                 }
#             }
            
#         except Exception as e:
#             logging.error(f"Error getting payments: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }


from bson import ObjectId
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from .database import db
import logging

class PaymentService:
    def __init__(self):
        self.payments_collection = db.get_collection('payments')
        self.orders_collection = db.get_collection('orders')
        self.users_collection = db.get_collection('users')
        self.withdrawals_collection = db.get_collection('withdrawals')
    
    # ==================== CLIENT FUNCTIONS ====================
    
    # def create_payment_intent(self, order_id: str, client_id: str, payment_method: str) -> dict:
    #     """Create a payment intent for an order"""
    #     try:
    #         # Verify order exists and belongs to client
    #         order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
    #         if not order:
    #             return {'success': False, 'error': 'Order not found'}
            
    #         if str(order['client_id']) != client_id:
    #             return {'success': False, 'error': 'Access denied'}
            
    #         # Check if payment already exists for this order
    #         existing_payment = self.payments_collection.find_one({
    #             'order_id': ObjectId(order_id),
    #             'status': {'$in': ['completed', 'processing']}
    #         })
            
    #         if existing_payment:
    #             return {
    #                 'success': False,
    #                 'error': 'Payment already exists for this order'
    #             }
            
    #         # Calculate platform fee (20%)
    #         # amount = float(order['total_price'])
    #         amount = float(order['total_amount'])
    #         platform_fee = round(amount * 0.20, 2)
    #         freelancer_earnings = round(amount - platform_fee, 2)
            
    #         # Create payment intent
    #         payment_intent = {
    #             'order_id': ObjectId(order_id),
    #             'client_id': ObjectId(client_id),
    #             'freelancer_id': order['freelancer_id'],
    #             'amount': amount,
    #             'currency': 'USD',
    #             'payment_method': payment_method,
    #             'status': 'pending',
    #             'platform_fee': platform_fee,
    #             'freelancer_earnings': freelancer_earnings,
    #             'intent_created_at': datetime.utcnow(),
    #             'expires_at': datetime.utcnow() + timedelta(hours=24),
    #             'created_at': datetime.utcnow(),
    #             'updated_at': datetime.utcnow()
    #         }
            
    #         result = self.payments_collection.insert_one(payment_intent)
            
    #         return {
    #             'success': True,
    #             'payment_intent_id': str(result.inserted_id),
    #             'amount': amount,
    #             'currency': 'USD',
    #             'client_secret': f'pi_{result.inserted_id}_secret'  # Mock secret
    #         }
            
    #     except Exception as e:
    #         logging.error(f"Error creating payment intent: {e}")
    #         return {'success': False, 'error': str(e)}

    def create_payment_intent(self, order_id: str, client_id: str, payment_method: str) -> dict:
        """Create a payment intent for an order"""
        try:
            # Verify order exists and belongs to client
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            if not order:
                return {'success': False, 'error': 'Order not found'}
            
            if str(order['client_id']) != client_id:
                return {'success': False, 'error': 'Access denied'}
            
            # Check if payment already exists for this order
            existing_payment = self.payments_collection.find_one({
                'order_id': ObjectId(order_id),
                'status': {'$in': ['completed', 'processing']}
            })
            
            if existing_payment:
                return {
                    'success': False,
                    'error': 'Payment already exists for this order'
                }
            
            # Calculate platform fee (20% of freelancer's amount)
            freelancer_amount = float(order['amount'])  # Freelancer's price
            platform_fee = round(freelancer_amount * 0.20, 2)  # 20% platform fee
            total_amount = float(order['total_amount'])  # Total amount client pays
            freelancer_earnings = round(total_amount - platform_fee, 2)
            
            # Create payment intent
            payment_intent = {
                'order_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'freelancer_id': order['freelancer_id'],
                'amount': total_amount,  # Total amount client pays
                'currency': 'USD',
                'payment_method': payment_method,
                'status': 'pending',
                'platform_fee': platform_fee,
                'freelancer_earnings': freelancer_earnings,
                'intent_created_at': datetime.utcnow(),
                'expires_at': datetime.utcnow() + timedelta(hours=24),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            result = self.payments_collection.insert_one(payment_intent)
            
            return {
                'success': True,
                'payment_intent_id': str(result.inserted_id),
                'amount': total_amount,
                'currency': 'USD',
                'client_secret': f'pi_{result.inserted_id}_secret'  # Mock secret
            }
            
        except Exception as e:
            logging.error(f"Error creating payment intent: {e}")
            return {'success': False, 'error': str(e)}  
    def process_payment(self, order_id: str, client_id: str, payment_data: dict) -> dict:
        """Process a payment"""
        try:
            # Verify order exists and belongs to client
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            if not order:
                return {'success': False, 'error': 'Order not found'}
            
            if str(order['client_id']) != client_id:
                return {'success': False, 'error': 'Access denied'}
            
            # Find pending payment for this order
            payment = self.payments_collection.find_one({
                'order_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'status': 'pending'
            })
            
            if not payment:
                return {'success': False, 'error': 'No pending payment found'}
            
            # Check if payment intent is expired
            if payment.get('expires_at') and payment['expires_at'] < datetime.utcnow():
                # Update payment status to expired
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'status': 'expired', 'updated_at': datetime.utcnow()}}
                )
                return {'success': False, 'error': 'Payment intent expired'}
            
            # Mock payment processing
            # In a real implementation, you would integrate with Stripe, PayPal, etc.
            transaction_id = f"TXN_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{payment['_id']}"
            
            update_data = {
                'status': 'completed',
                'transaction_id': transaction_id,
                'payment_method': payment_data.get('payment_method', payment.get('payment_method', 'credit_card')),
                'card_last4': payment_data.get('card_last4'),
                'card_brand': payment_data.get('card_brand'),
                'ip_address': payment_data.get('ip_address'),
                'user_agent': payment_data.get('user_agent'),
                'completed_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Update payment
            result = self.payments_collection.update_one(
                {'_id': payment['_id']},
                {'$set': update_data}
            )
            
            if result.modified_count > 0:
                # Update order status
                self.orders_collection.update_one(
                    {'_id': ObjectId(order_id)},
                    {'$set': {'status': 'confirmed', 'updated_at': datetime.utcnow()}}
                )
                
                return {
                    'success': True,
                    'transaction_id': transaction_id,
                    'message': 'Payment processed successfully'
                }
            else:
                return {'success': False, 'error': 'Failed to update payment'}
            
        except Exception as e:
            logging.error(f"Error processing payment: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_payment_history(self, user_id: str, filters: Optional[dict] = None) -> dict:
        """Get payment history for a user"""
        try:
            # Determine user role and build query
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            if not user:
                return {'success': False, 'error': 'User not found'}
            
            query = {}
            if user.get('role') == 'client':
                query['client_id'] = ObjectId(user_id)
            elif user.get('role') == 'freelancer':
                # Get payments via orders
                orders = list(self.orders_collection.find(
                    {'freelancer_id': ObjectId(user_id)},
                    {'_id': 1}
                ))
                order_ids = [order['_id'] for order in orders]
                query['order_id'] = {'$in': order_ids}
            else:
                # Admin - get all payments
                pass
            
            # Apply filters
            if filters:
                if filters.get('status'):
                    query['status'] = filters['status']
                if filters.get('payment_method'):
                    query['payment_method'] = filters['payment_method']
                if filters.get('start_date') and filters.get('end_date'):
                    query['created_at'] = {
                        '$gte': filters['start_date'],
                        '$lte': filters['end_date']
                    }
                if filters.get('min_amount'):
                    query['amount'] = {'$gte': float(filters['min_amount'])}
                if filters.get('max_amount'):
                    if 'amount' in query:
                        query['amount']['$lte'] = float(filters['max_amount'])
                    else:
                        query['amount'] = {'$lte': float(filters['max_amount'])}
            
            # Pagination
            page = int(filters.get('page', 1)) if filters else 1
            limit = int(filters.get('limit', 10)) if filters else 10
            skip = (page - 1) * limit
            
            # Get total count
            total = self.payments_collection.count_documents(query)
            
            # Get payments with sorting
            sort_field = filters.get('sort_by', 'created_at') if filters else 'created_at'
            sort_order = -1 if filters and filters.get('sort_order') == 'desc' else 1
            
            payments = list(self.payments_collection.find(query)
                .skip(skip)
                .limit(limit)
                .sort(sort_field, sort_order))
            
            # Convert ObjectId to string and populate order details
            for payment in payments:
                payment['_id'] = str(payment['_id'])
                payment['order_id'] = str(payment['order_id'])
                payment['client_id'] = str(payment['client_id'])
                payment['freelancer_id'] = str(payment.get('freelancer_id', ''))
                
                # Populate order details
                order = self.orders_collection.find_one({'_id': ObjectId(payment['order_id'])})
                if order:
                    payment['order'] = {
                        '_id': str(order['_id']),
                        'title': order['title'],
                        'order_number': order.get('order_number', '')
                    }
                
                # Populate freelancer details
                if payment.get('freelancer_id'):
                    freelancer = self.users_collection.find_one({'_id': ObjectId(payment['freelancer_id'])})
                    if freelancer:
                        payment['freelancer'] = {
                            'name': freelancer.get('full_name', ''),
                            'username': freelancer.get('username', '')
                        }
            
            return {
                'success': True,
                'payments': payments,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting payment history: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_payment_details(self, payment_id: str, user_id: str) -> dict:
        """Get details of a specific payment"""
        try:
            payment = self.payments_collection.find_one({'_id': ObjectId(payment_id)})
            if not payment:
                return {'success': False, 'error': 'Payment not found'}
            
            # Check access
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            if not user:
                return {'success': False, 'error': 'User not found'}
            
            user_role = user.get('role')
            has_access = False
            
            if user_role == 'admin':
                has_access = True
            elif user_role == 'client' and str(payment['client_id']) == user_id:
                has_access = True
            elif user_role == 'freelancer':
                # Check if freelancer is associated with the order
                order = self.orders_collection.find_one({'_id': payment['order_id']})
                if order and str(order['freelancer_id']) == user_id:
                    has_access = True
            
            if not has_access:
                return {'success': False, 'error': 'Access denied'}
            
            # Convert ObjectId to string
            payment['_id'] = str(payment['_id'])
            payment['order_id'] = str(payment['order_id'])
            payment['client_id'] = str(payment['client_id'])
            
            # Populate order details
            order = self.orders_collection.find_one({'_id': payment['order_id']})
            if order:
                order['_id'] = str(order['_id'])
                order['client_id'] = str(order['client_id'])
                order['freelancer_id'] = str(order['freelancer_id'])
                payment['order'] = order
            
            # Populate user details
            client = self.users_collection.find_one({'_id': payment['client_id']})
            if client:
                client['_id'] = str(client['_id'])
                payment['client'] = {
                    'name': client.get('full_name', ''),
                    'email': client.get('email', '')
                }
            
            if order:
                freelancer = self.users_collection.find_one({'_id': ObjectId(order['freelancer_id'])})
                if freelancer:
                    freelancer['_id'] = str(freelancer['_id'])
                    payment['freelancer'] = {
                        'name': freelancer.get('full_name', ''),
                        'email': freelancer.get('email', '')
                    }
            
            return {
                'success': True,
                'payment': payment
            }
            
        except Exception as e:
            logging.error(f"Error getting payment details: {e}")
            return {'success': False, 'error': str(e)}
    
    def request_refund(self, order_id: str, client_id: str, reason: str) -> dict:
        """Request a refund for an order"""
        try:
            # Verify order exists and belongs to client
            order = self.orders_collection.find_one({'_id': ObjectId(order_id)})
            if not order:
                return {'success': False, 'error': 'Order not found'}
            
            if str(order['client_id']) != client_id:
                return {'success': False, 'error': 'Access denied'}
            
            # Check if order is eligible for refund
            if order['status'] not in ['completed', 'delivered', 'confirmed']:
                return {'success': False, 'error': 'Order is not eligible for refund'}
            
            # Find completed payment
            payment = self.payments_collection.find_one({
                'order_id': ObjectId(order_id),
                'client_id': ObjectId(client_id),
                'status': 'completed'
            })
            
            if not payment:
                return {'success': False, 'error': 'No completed payment found'}
            
            # Check if refund was already requested
            if payment.get('refund_requested'):
                return {'success': False, 'error': 'Refund already requested'}
            
            # Check if payment was completed within refund period (30 days)
            refund_period = timedelta(days=30)
            if datetime.utcnow() - payment.get('completed_at', datetime.utcnow()) > refund_period:
                return {'success': False, 'error': 'Refund period has expired'}
            
            # Create refund request
            refund_request = {
                'refund_requested': True,
                'refund_requested_at': datetime.utcnow(),
                'refund_reason': reason,
                'refund_status': 'pending',
                'updated_at': datetime.utcnow()
            }
            
            # Update payment
            result = self.payments_collection.update_one(
                {'_id': payment['_id']},
                {'$set': refund_request}
            )
            
            if result.modified_count > 0:
                return {
                    'success': True,
                    'message': 'Refund request submitted successfully',
                    'refund_id': f"REF_{payment['_id']}"
                }
            else:
                return {'success': False, 'error': 'Failed to submit refund request'}
            
        except Exception as e:
            logging.error(f"Error requesting refund: {e}")
            return {'success': False, 'error': str(e)}
    
    # ==================== FREELANCER FUNCTIONS ====================
    
    def get_earnings(self, freelancer_id: str, filters: Optional[dict] = None) -> dict:
        """Get earnings for a freelancer"""
        try:
            # Verify freelancer exists
            freelancer = self.users_collection.find_one({'_id': ObjectId(freelancer_id)})
            if not freelancer or freelancer.get('role') != 'freelancer':
                return {'success': False, 'error': 'Freelancer not found'}
            
            # Get all orders for this freelancer
            orders = list(self.orders_collection.find(
                {'freelancer_id': ObjectId(freelancer_id)},
                {'_id': 1}
            ))
            order_ids = [order['_id'] for order in orders]
            
            if not order_ids:
                return {
                    'success': True,
                    'earnings': [],
                    'total_earnings': 0,
                    'stats': {
                        'total_earnings': 0,
                        'completed_payments': 0,
                        'pending_payments': 0,
                        'average_order_value': 0
                    }
                }
            
            # Build query for payments
            query = {
                'order_id': {'$in': order_ids},
                'status': {'$in': ['completed', 'processing']}
            }
            
            # Apply filters
            if filters:
                if filters.get('status'):
                    query['status'] = filters['status']
                if filters.get('start_date') and filters.get('end_date'):
                    query['completed_at'] = {
                        '$gte': filters['start_date'],
                        '$lte': filters['end_date']
                    }
                elif filters.get('period'):
                    # Handle period filters (day, week, month, year)
                    period = filters['period']
                    end_date = datetime.utcnow()
                    if period == 'day':
                        start_date = end_date - timedelta(days=1)
                    elif period == 'week':
                        start_date = end_date - timedelta(weeks=1)
                    elif period == 'month':
                        start_date = end_date - timedelta(days=30)
                    elif period == 'year':
                        start_date = end_date - timedelta(days=365)
                    else:
                        start_date = end_date - timedelta(days=30)
                    
                    query['completed_at'] = {'$gte': start_date, '$lte': end_date}
            
            # Get payments
            payments = list(self.payments_collection.find(query).sort('completed_at', -1))
            
            # Calculate statistics
            total_earnings = sum(p.get('freelancer_earnings', 0) for p in payments if p.get('freelancer_earnings'))
            completed_payments = len([p for p in payments if p['status'] == 'completed'])
            pending_payments = len([p for p in payments if p['status'] == 'processing'])
            average_order_value = total_earnings / len(payments) if payments else 0
            
            # Format earnings data
            # earnings_data = []
            # for payment in payments:
            #     payment['_id'] = str(payment['_id'])
            #     payment['order_id'] = str(payment['order_id'])
                
            #     # Get order details
            #     order = self.orders_collection.find_one({'_id': payment['order_id']})
            #     if order:
            #         payment['order_title'] = order.get('title', '')
            #         payment['order_number'] = order.get('order_number', '')
                
            #     earnings_data.append(payment)
            earnings_data = []
            for payment in payments:
                payment['_id'] = str(payment['_id'])
                payment['order_id'] = str(payment['order_id'])
                
                # Also convert freelancer_id and client_id if they exist
                if payment.get('freelancer_id'):
                    payment['freelancer_id'] = str(payment['freelancer_id'])
                if payment.get('client_id'):
                    payment['client_id'] = str(payment['client_id'])
                
                # Get order details
                order = self.orders_collection.find_one({'_id': ObjectId(payment['order_id'])})
                if order:
                    payment['order_title'] = order.get('title', '')
                    payment['order_number'] = order.get('order_number', '')
                
                earnings_data.append(payment)
            
            return {
                'success': True,
                'earnings': earnings_data,
                'total_earnings': round(total_earnings, 2),
                'stats': {
                    'total_earnings': round(total_earnings, 2),
                    'completed_payments': completed_payments,
                    'pending_payments': pending_payments,
                    'average_order_value': round(average_order_value, 2)
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting earnings: {e}")
            return {'success': False, 'error': str(e)}
    
    def request_withdrawal(self, freelancer_id: str, withdrawal_data: dict) -> dict:
        """Request a withdrawal of earnings"""
        try:
            # Verify freelancer exists
            freelancer = self.users_collection.find_one({'_id': ObjectId(freelancer_id)})
            if not freelancer or freelancer.get('role') != 'freelancer':
                return {'success': False, 'error': 'Freelancer not found'}
            
            # Check available balance
            available_balance = self._calculate_available_balance(freelancer_id)
            withdrawal_amount = float(withdrawal_data.get('amount', 0))
            
            if withdrawal_amount <= 0:
                return {'success': False, 'error': 'Invalid withdrawal amount'}
            
            if withdrawal_amount > available_balance:
                return {'success': False, 'error': 'Insufficient balance'}
            
            # Check minimum withdrawal amount
            if withdrawal_amount < 20:  # Minimum $20
                return {'success': False, 'error': 'Minimum withdrawal amount is $20'}
            
            # Create withdrawal request
            withdrawal_request = {
                'freelancer_id': ObjectId(freelancer_id),
                'amount': withdrawal_amount,
                'currency': 'USD',
                'payment_method': withdrawal_data.get('payment_method', 'bank_transfer'),
                'status': 'pending',
                'requested_at': datetime.utcnow(),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add payment method details based on method
            payment_method = withdrawal_data.get('payment_method')
            if payment_method == 'bank_transfer':
                withdrawal_request['bank_details'] = {
                    'account_holder': withdrawal_data.get('account_holder'),
                    'account_number': withdrawal_data.get('account_number'),
                    'bank_name': withdrawal_data.get('bank_name'),
                    'routing_number': withdrawal_data.get('routing_number')
                }
            elif payment_method == 'paypal':
                withdrawal_request['paypal_email'] = withdrawal_data.get('paypal_email')
            elif payment_method == 'crypto':
                withdrawal_request['crypto_wallet'] = {
                    'wallet_address': withdrawal_data.get('wallet_address'),
                    'currency': withdrawal_data.get('crypto_currency', 'BTC')
                }
            
            # Insert withdrawal request
            result = self.withdrawals_collection.insert_one(withdrawal_request)
            
            # Mark payments as pending withdrawal
            self._mark_payments_for_withdrawal(freelancer_id, withdrawal_amount)
            
            return {
                'success': True,
                'withdrawal_id': str(result.inserted_id),
                'message': 'Withdrawal request submitted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error requesting withdrawal: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_withdrawal_history(self, freelancer_id: str) -> dict:
        """Get withdrawal history for a freelancer"""
        try:
            # Verify freelancer exists
            freelancer = self.users_collection.find_one({'_id': ObjectId(freelancer_id)})
            if not freelancer or freelancer.get('role') != 'freelancer':
                return {'success': False, 'error': 'Freelancer not found'}
            
            # Get withdrawals
            withdrawals = list(self.withdrawals_collection.find(
                {'freelancer_id': ObjectId(freelancer_id)}
            ).sort('requested_at', -1))
            
            # Format withdrawals
            for withdrawal in withdrawals:
                withdrawal['_id'] = str(withdrawal['_id'])
                withdrawal['freelancer_id'] = str(withdrawal['freelancer_id'])
                
                # Format dates
                if 'requested_at' in withdrawal:
                    withdrawal['requested_at'] = withdrawal['requested_at'].isoformat()
                if 'processed_at' in withdrawal:
                    withdrawal['processed_at'] = withdrawal['processed_at'].isoformat()
                if 'created_at' in withdrawal:
                    withdrawal['created_at'] = withdrawal['created_at'].isoformat()
                if 'updated_at' in withdrawal:
                    withdrawal['updated_at'] = withdrawal['updated_at'].isoformat()
            
            # Calculate statistics
            total_withdrawn = sum(w['amount'] for w in withdrawals if w['status'] == 'completed')
            pending_withdrawals = sum(w['amount'] for w in withdrawals if w['status'] == 'pending')
            
            return {
                'success': True,
                'withdrawals': withdrawals,
                'stats': {
                    'total_withdrawn': round(total_withdrawn, 2),
                    'pending_withdrawals': round(pending_withdrawals, 2),
                    'total_count': len(withdrawals),
                    'completed_count': len([w for w in withdrawals if w['status'] == 'completed'])
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting withdrawal history: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_revenue_analytics(self, freelancer_id: str, period: str = 'month') -> dict:
        """Get revenue analytics for a freelancer"""
        try:
            # Verify freelancer exists
            freelancer = self.users_collection.find_one({'_id': ObjectId(freelancer_id)})
            if not freelancer or freelancer.get('role') != 'freelancer':
                return {'success': False, 'error': 'Freelancer not found'}
            
            # Get all orders for this freelancer
            orders = list(self.orders_collection.find(
                {'freelancer_id': ObjectId(freelancer_id)},
                {'_id': 1}
            ))
            order_ids = [order['_id'] for order in orders]
            
            if not order_ids:
                return self._get_empty_analytics()
            
            # Calculate date ranges based on period
            end_date = datetime.utcnow()
            if period == 'day':
                start_date = end_date - timedelta(days=1)
                interval = 'hour'
            elif period == 'week':
                start_date = end_date - timedelta(weeks=1)
                interval = 'day'
            elif period == 'month':
                start_date = end_date - timedelta(days=30)
                interval = 'day'
            elif period == 'year':
                start_date = end_date - timedelta(days=365)
                interval = 'month'
            else:
                start_date = end_date - timedelta(days=30)
                interval = 'day'
            
            # Get payments in date range
            payments = list(self.payments_collection.find({
                'order_id': {'$in': order_ids},
                'status': 'completed',
                'completed_at': {'$gte': start_date, '$lte': end_date}
            }))
            
            # Generate time series data
            time_series = self._generate_time_series(start_date, end_date, interval)
            
            # Calculate metrics
            total_revenue = sum(p.get('freelancer_earnings', 0) for p in payments)
            platform_fees = sum(p.get('platform_fee', 0) for p in payments)
            total_orders = len(payments)
            average_order_value = total_revenue / total_orders if total_orders > 0 else 0
            
            # Group by time interval
            for data_point in time_series:
                matching_payments = [
                    p for p in payments 
                    if self._is_in_interval(p.get('completed_at'), data_point['timestamp'], interval)
                ]
                
                data_point['revenue'] = sum(p.get('freelancer_earnings', 0) for p in matching_payments)
                data_point['orders'] = len(matching_payments)
                data_point['fees'] = sum(p.get('platform_fee', 0) for p in matching_payments)
            
            return {
                'success': True,
                'analytics': {
                    'time_series': time_series,
                    'summary': {
                        'total_revenue': round(total_revenue, 2),
                        'platform_fees': round(platform_fees, 2),
                        'net_earnings': round(total_revenue, 2),
                        'total_orders': total_orders,
                        'average_order_value': round(average_order_value, 2)
                    },
                    'period': period,
                    'interval': interval
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting revenue analytics: {e}")
            return {'success': False, 'error': str(e)}
    
    # ==================== ADMIN FUNCTIONS ====================
    
    # def get_all_payments(self, filters: Optional[dict] = None, pagination: Optional[dict] = None) -> dict:
    #     """Get all payments (admin only)"""
    #     try:
    #         query = {}
            
    #         # Apply filters
    #         if filters:
    #             if filters.get('status'):
    #                 query['status'] = filters['status']
    #             if filters.get('payment_method'):
    #                 query['payment_method'] = filters['payment_method']
    #             if filters.get('client_id'):
    #                 query['client_id'] = ObjectId(filters['client_id'])
    #             if filters.get('freelancer_id'):
    #                 # Get orders by freelancer
    #                 orders = list(self.orders_collection.find(
    #                     {'freelancer_id': ObjectId(filters['freelancer_id'])},
    #                     {'_id': 1}
    #                 ))
    #                 order_ids = [order['_id'] for order in orders]
    #                 query['order_id'] = {'$in': order_ids}
    #             if filters.get('start_date') and filters.get('end_date'):
    #                 query['created_at'] = {
    #                     '$gte': filters['start_date'],
    #                     '$lte': filters['end_date']
    #                 }
    #             if filters.get('min_amount'):
    #                 query['amount'] = {'$gte': float(filters['min_amount'])}
    #             if filters.get('max_amount'):
    #                 if 'amount' in query:
    #                     query['amount']['$lte'] = float(filters['max_amount'])
    #                 else:
    #                     query['amount'] = {'$lte': float(filters['max_amount'])}
            
    #         # Pagination
    #         page = pagination.get('page', 1) if pagination else 1
    #         limit = pagination.get('limit', 20) if pagination else 20
    #         skip = (page - 1) * limit
            
    #         # Get total count
    #         total = self.payments_collection.count_documents(query)
            
    #         # Get payments with sorting
    #         sort_field = filters.get('sort_by', 'created_at') if filters else 'created_at'
    #         sort_order = -1 if filters and filters.get('sort_order') == 'desc' else 1
            
    #         payments = list(self.payments_collection.find(query)
    #             .skip(skip)
    #             .limit(limit)
    #             .sort(sort_field, sort_order))
            
    #         # Format payments
    #         # for payment in payments:
    #         #     payment['_id'] = str(payment['_id'])
    #         #     payment['order_id'] = str(payment['order_id'])
    #         #     payment['client_id'] = str(payment['client_id'])
                
    #         #     # Populate client details
    #         #     client = self.users_collection.find_one({'_id': ObjectId(payment['client_id'])})
    #         #     if client:
    #         #         payment['client_name'] = client.get('full_name', '')
    #         #         payment['client_email'] = client.get('email', '')
                
    #         #     # Populate order details
    #         #     order = self.orders_collection.find_one({'_id': ObjectId(payment['order_id'])})
    #         #     if order:
    #         #         payment['order_title'] = order.get('title', '')
    #         #         payment['order_number'] = order.get('order_number', '')
                    
    #         #         # Populate freelancer details
    #         #         freelancer = self.users_collection.find_one({'_id': ObjectId(order['freelancer_id'])})
    #         #         if freelancer:
    #         #             payment['freelancer_name'] = freelancer.get('full_name', '')
    #         #             payment['freelancer_email'] = freelancer.get('email', '')


    #         # In the get_all_payments function, update the payment formatting section:

    #         # Format payments
    #         for payment in payments:
    #             payment['_id'] = str(payment['_id'])
    #             payment['order_id'] = str(payment['order_id'])
    #             payment['client_id'] = str(payment['client_id'])
                
    #             # Populate client details
    #             client = self.users_collection.find_one({'_id': ObjectId(payment['client_id'])})
    #             if client:
    #                 payment['client_name'] = client.get('full_name', '')
    #                 payment['client_email'] = client.get('email', '')
                
    #             # Populate order details
    #             order = self.orders_collection.find_one({'_id': ObjectId(payment['order_id'])})
    #             if order:
    #                 payment['order_title'] = order.get('title', '')
    #                 payment['order_number'] = order.get('order_number', '')
                    
    #                 # Populate freelancer details - CONVERT TO STRING
    #                 if 'freelancer_id' in order:
    #                     freelancer_id_str = str(order['freelancer_id'])
    #                     freelancer = self.users_collection.find_one({'_id': ObjectId(freelancer_id_str)})
    #                     if freelancer:
    #                         payment['freelancer_name'] = freelancer.get('full_name', '')
    #                         payment['freelancer_email'] = freelancer.get('email', '')
                
    #             # Also make sure any other ObjectId fields are converted
    #             if 'freelancer_id' in payment:
    #                 payment['freelancer_id'] = str(payment['freelancer_id'])
            
    #         return {
    #             'success': True,
    #             'payments': payments,
    #             'pagination': {
    #                 'page': page,
    #                 'limit': limit,
    #                 'total': total,
    #                 'pages': (total + limit - 1) // limit
    #             },
    #             'stats': self._get_payment_stats()
    #         }
            
    #     except Exception as e:
    #         logging.error(f"Error getting all payments: {e}")
    #         return {'success': False, 'error': str(e)}
    
    def get_all_payments(self, filters: Optional[dict] = None, pagination: Optional[dict] = None) -> dict:
        """Get all payments (admin only)"""
        try:
            query = {}
            
            # Apply filters
            if filters:
                if filters.get('status'):
                    query['status'] = filters['status']
                if filters.get('payment_method'):
                    query['payment_method'] = filters['payment_method']
                if filters.get('client_id'):
                    query['client_id'] = ObjectId(filters['client_id'])
                if filters.get('freelancer_id'):
                    # Get orders by freelancer
                    orders = list(self.orders_collection.find(
                        {'freelancer_id': ObjectId(filters['freelancer_id'])},
                        {'_id': 1}
                    ))
                    order_ids = [order['_id'] for order in orders]
                    query['order_id'] = {'$in': order_ids}
                if filters.get('start_date') and filters.get('end_date'):
                    query['created_at'] = {
                        '$gte': filters['start_date'],
                        '$lte': filters['end_date']
                    }
                if filters.get('min_amount'):
                    query['amount'] = {'$gte': float(filters['min_amount'])}
                if filters.get('max_amount'):
                    if 'amount' in query:
                        query['amount']['$lte'] = float(filters['max_amount'])
                    else:
                        query['amount'] = {'$lte': float(filters['max_amount'])}
            
            # Pagination
            page = pagination.get('page', 1) if pagination else 1
            limit = pagination.get('limit', 20) if pagination else 20
            skip = (page - 1) * limit
            
            # Get total count
            total = self.payments_collection.count_documents(query)
            
            # Get payments with sorting
            sort_field = filters.get('sort_by', 'created_at') if filters else 'created_at'
            sort_order = -1 if filters and filters.get('sort_order') == 'desc' else 1
            
            payments = list(self.payments_collection.find(query)
                .skip(skip)
                .limit(limit)
                .sort(sort_field, sort_order))
            
            # Format payments - COMPREHENSIVE ObjectId conversion
            formatted_payments = []
            for payment in payments:
                # Create a new dictionary to avoid modifying the original
                formatted_payment = {}
                
                # Convert all fields to serializable types
                for key, value in payment.items():
                    if isinstance(value, ObjectId):
                        formatted_payment[key] = str(value)
                    elif isinstance(value, datetime):
                        formatted_payment[key] = value.isoformat()
                    elif isinstance(value, list):
                        # Handle lists that might contain ObjectIds
                        formatted_list = []
                        for item in value:
                            if isinstance(item, ObjectId):
                                formatted_list.append(str(item))
                            else:
                                formatted_list.append(item)
                        formatted_payment[key] = formatted_list
                    elif isinstance(value, dict):
                        # Handle nested dictionaries
                        formatted_dict = {}
                        for sub_key, sub_value in value.items():
                            if isinstance(sub_value, ObjectId):
                                formatted_dict[sub_key] = str(sub_value)
                            elif isinstance(sub_value, datetime):
                                formatted_dict[sub_key] = sub_value.isoformat()
                            else:
                                formatted_dict[sub_key] = sub_value
                        formatted_payment[key] = formatted_dict
                    else:
                        formatted_payment[key] = value
                
                # Ensure critical fields are strings
                if '_id' in formatted_payment:
                    formatted_payment['_id'] = str(formatted_payment['_id'])
                if 'order_id' in formatted_payment:
                    formatted_payment['order_id'] = str(formatted_payment['order_id'])
                if 'client_id' in formatted_payment:
                    formatted_payment['client_id'] = str(formatted_payment['client_id'])
                if 'freelancer_id' in formatted_payment:
                    formatted_payment['freelancer_id'] = str(formatted_payment['freelancer_id'])
                
                # Populate client details
                if 'client_id' in formatted_payment:
                    client = self.users_collection.find_one({'_id': ObjectId(formatted_payment['client_id'])})
                    if client:
                        formatted_payment['client_name'] = client.get('full_name', '')
                        formatted_payment['client_email'] = client.get('email', '')
                
                # Populate order details
                if 'order_id' in formatted_payment:
                    order = self.orders_collection.find_one({'_id': ObjectId(formatted_payment['order_id'])})
                    if order:
                        formatted_payment['order_title'] = order.get('title', '')
                        formatted_payment['order_number'] = order.get('order_number', '')
                        
                        # Populate freelancer details from order
                        if 'freelancer_id' in order:
                            freelancer_id_str = str(order['freelancer_id'])
                            freelancer = self.users_collection.find_one({'_id': ObjectId(freelancer_id_str)})
                            if freelancer:
                                formatted_payment['freelancer_name'] = freelancer.get('full_name', '')
                                formatted_payment['freelancer_email'] = freelancer.get('email', '')
                
                formatted_payments.append(formatted_payment)
            
            # Get stats - ensure all values are serializable
            stats = self._get_payment_stats()
            serializable_stats = {}
            for key, value in stats.items():
                if isinstance(value, (int, float)):
                    serializable_stats[key] = value
                else:
                    serializable_stats[key] = str(value)
            
            return {
                'success': True,
                'payments': formatted_payments,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                },
                'stats': serializable_stats
            }
            
        except Exception as e:
            logging.error(f"Error getting all payments: {e}")
            return {'success': False, 'error': str(e)}
    def process_withdrawal(self, withdrawal_id: str, status: str) -> dict:
        """Process a withdrawal request (admin only)"""
        try:
            # Find withdrawal
            withdrawal = self.withdrawals_collection.find_one({'_id': ObjectId(withdrawal_id)})
            if not withdrawal:
                return {'success': False, 'error': 'Withdrawal not found'}
            
            # Update withdrawal status
            update_data = {
                'status': status,
                'updated_at': datetime.utcnow()
            }
            
            if status == 'completed':
                update_data['processed_at'] = datetime.utcnow()
                # Mark payments as withdrawn
                self._mark_payments_as_withdrawn(str(withdrawal['freelancer_id']), withdrawal['amount'])
            elif status == 'rejected':
                update_data['rejection_reason'] = 'Administrative decision'
                # Release payments for withdrawal
                self._release_payments_for_withdrawal(str(withdrawal['freelancer_id']), withdrawal['amount'])
            
            result = self.withdrawals_collection.update_one(
                {'_id': ObjectId(withdrawal_id)},
                {'$set': update_data}
            )
            
            if result.modified_count > 0:
                return {
                    'success': True,
                    'message': f'Withdrawal {status} successfully'
                }
            else:
                return {'success': False, 'error': 'Failed to update withdrawal'}
            
        except Exception as e:
            logging.error(f"Error processing withdrawal: {e}")
            return {'success': False, 'error': str(e)}
    
    def update_payment_status(self, payment_id: str, status: str) -> dict:
        """Update payment status (admin only)"""
        try:
            # Find payment
            payment = self.payments_collection.find_one({'_id': ObjectId(payment_id)})
            if not payment:
                return {'success': False, 'error': 'Payment not found'}
            
            # Validate status transition
            valid_transitions = {
                'pending': ['processing', 'completed', 'failed', 'cancelled'],
                'processing': ['completed', 'failed', 'refunded'],
                'completed': ['refunded'],
                'failed': ['pending', 'cancelled'],
                'refunded': [],
                'cancelled': []
            }
            
            current_status = payment['status']
            if status not in valid_transitions.get(current_status, []):
                return {'success': False, 'error': f'Invalid status transition from {current_status} to {status}'}
            
            # Update payment
            update_data = {
                'status': status,
                'updated_at': datetime.utcnow()
            }
            
            if status == 'completed' and current_status != 'completed':
                update_data['completed_at'] = datetime.utcnow()
                # Update order status
                self.orders_collection.update_one(
                    {'_id': payment['order_id']},
                    {'$set': {'status': 'confirmed', 'updated_at': datetime.utcnow()}}
                )
            elif status == 'refunded':
                update_data['refunded_at'] = datetime.utcnow()
                # Update order status
                self.orders_collection.update_one(
                    {'_id': payment['order_id']},
                    {'$set': {'status': 'refunded', 'updated_at': datetime.utcnow()}}
                )
            
            result = self.payments_collection.update_one(
                {'_id': ObjectId(payment_id)},
                {'$set': update_data}
            )
            
            if result.modified_count > 0:
                return {
                    'success': True,
                    'message': f'Payment status updated to {status}'
                }
            else:
                return {'success': False, 'error': 'Failed to update payment'}
            
        except Exception as e:
            logging.error(f"Error updating payment status: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_platform_earnings(self, period: str = 'month') -> dict:
        """Get platform earnings analytics (admin only)"""
        try:
            # Calculate date ranges based on period
            end_date = datetime.utcnow()
            if period == 'day':
                start_date = end_date - timedelta(days=1)
                interval = 'hour'
            elif period == 'week':
                start_date = end_date - timedelta(weeks=1)
                interval = 'day'
            elif period == 'month':
                start_date = end_date - timedelta(days=30)
                interval = 'day'
            elif period == 'year':
                start_date = end_date - timedelta(days=365)
                interval = 'month'
            else:
                start_date = end_date - timedelta(days=30)
                interval = 'day'
            
            # Get payments in date range
            payments = list(self.payments_collection.find({
                'status': 'completed',
                'completed_at': {'$gte': start_date, '$lte': end_date}
            }))
            
            # Generate time series data
            time_series = self._generate_time_series(start_date, end_date, interval)
            
            # Calculate metrics
            total_revenue = sum(p.get('amount', 0) for p in payments)
            platform_earnings = sum(p.get('platform_fee', 0) for p in payments)
            freelancer_earnings = sum(p.get('freelancer_earnings', 0) for p in payments)
            total_orders = len(payments)
            
            # Group by time interval
            for data_point in time_series:
                matching_payments = [
                    p for p in payments 
                    if self._is_in_interval(p.get('completed_at'), data_point['timestamp'], interval)
                ]
                
                data_point['revenue'] = sum(p.get('amount', 0) for p in matching_payments)
                data_point['platform_fee'] = sum(p.get('platform_fee', 0) for p in matching_payments)
                data_point['freelancer_earnings'] = sum(p.get('freelancer_earnings', 0) for p in matching_payments)
                data_point['orders'] = len(matching_payments)
            
            # Get payment method distribution
            payment_methods = {}
            for payment in payments:
                method = payment.get('payment_method', 'unknown')
                payment_methods[method] = payment_methods.get(method, 0) + payment.get('amount', 0)
            
            # Get status distribution
            all_payments = list(self.payments_collection.find({}))
            status_distribution = {}
            for payment in all_payments:
                status = payment.get('status', 'unknown')
                status_distribution[status] = status_distribution.get(status, 0) + 1
            
            return {
                'success': True,
                'analytics': {
                    'time_series': time_series,
                    'summary': {
                        'total_revenue': round(total_revenue, 2),
                        'platform_earnings': round(platform_earnings, 2),
                        'freelancer_earnings': round(freelancer_earnings, 2),
                        'total_orders': total_orders,
                        'average_order_value': round(total_revenue / total_orders, 2) if total_orders > 0 else 0
                    },
                    'distribution': {
                        'payment_methods': payment_methods,
                        'status': status_distribution
                    },
                    'period': period,
                    'interval': interval
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting platform earnings: {e}")
            return {'success': False, 'error': str(e)}
    
    # ==================== HELPER METHODS ====================
    
    def _calculate_available_balance(self, freelancer_id: str) -> float:
        """Calculate available balance for withdrawal"""
        # Get completed payments not yet withdrawn
        orders = list(self.orders_collection.find(
            {'freelancer_id': ObjectId(freelancer_id)},
            {'_id': 1}
        ))
        order_ids = [order['_id'] for order in orders]
        
        if not order_ids:
            return 0
        
        payments = list(self.payments_collection.find({
            'order_id': {'$in': order_ids},
            'status': 'completed',
            'withdrawal_status': {'$ne': 'withdrawn'}
        }))
        
        return sum(p.get('freelancer_earnings', 0) for p in payments)
    
    def _mark_payments_for_withdrawal(self, freelancer_id: str, amount: float):
        """Mark payments as pending withdrawal"""
        orders = list(self.orders_collection.find(
            {'freelancer_id': ObjectId(freelancer_id)},
            {'_id': 1}
        ))
        order_ids = [order['_id'] for order in orders]
        
        if not order_ids:
            return
        
        # Find payments to mark
        payments = list(self.payments_collection.find({
            'order_id': {'$in': order_ids},
            'status': 'completed',
            'withdrawal_status': {'$ne': 'withdrawn'}
        }).sort('completed_at', 1))
        
        remaining_amount = amount
        for payment in payments:
            if remaining_amount <= 0:
                break
            
            payment_amount = payment.get('freelancer_earnings', 0)
            if payment_amount <= remaining_amount:
                # Mark entire payment
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'withdrawal_status': 'pending_withdrawal', 'updated_at': datetime.utcnow()}}
                )
                remaining_amount -= payment_amount
            else:
                # Partial withdrawal - create a split payment
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'withdrawal_status': 'partially_withdrawn', 'updated_at': datetime.utcnow()}}
                )
                remaining_amount = 0
    
    def _mark_payments_as_withdrawn(self, freelancer_id: str, amount: float):
        """Mark payments as withdrawn"""
        orders = list(self.orders_collection.find(
            {'freelancer_id': ObjectId(freelancer_id)},
            {'_id': 1}
        ))
        order_ids = [order['_id'] for order in orders]
        
        if not order_ids:
            return
        
        # Find pending withdrawal payments
        payments = list(self.payments_collection.find({
            'order_id': {'$in': order_ids},
            'withdrawal_status': {'$in': ['pending_withdrawal', 'partially_withdrawn']}
        }).sort('completed_at', 1))
        
        remaining_amount = amount
        for payment in payments:
            if remaining_amount <= 0:
                break
            
            payment_amount = payment.get('freelancer_earnings', 0)
            if payment_amount <= remaining_amount:
                # Mark as withdrawn
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'withdrawal_status': 'withdrawn', 'updated_at': datetime.utcnow()}}
                )
                remaining_amount -= payment_amount
            else:
                # Partial withdrawal already handled
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'withdrawal_status': 'withdrawn', 'updated_at': datetime.utcnow()}}
                )
                remaining_amount = 0
    
    def _release_payments_for_withdrawal(self, freelancer_id: str, amount: float):
        """Release payments from withdrawal status"""
        orders = list(self.orders_collection.find(
            {'freelancer_id': ObjectId(freelancer_id)},
            {'_id': 1}
        ))
        order_ids = [order['_id'] for order in orders]
        
        if not order_ids:
            return
        
        # Find pending withdrawal payments
        payments = list(self.payments_collection.find({
            'order_id': {'$in': order_ids},
            'withdrawal_status': {'$in': ['pending_withdrawal', 'partially_withdrawn']}
        }).sort('completed_at', -1))
        
        remaining_amount = amount
        for payment in payments:
            if remaining_amount <= 0:
                break
            
            payment_amount = payment.get('freelancer_earnings', 0)
            if payment_amount <= remaining_amount:
                # Release payment
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'withdrawal_status': None, 'updated_at': datetime.utcnow()}}
                )
                remaining_amount -= payment_amount
            else:
                # Partial release
                self.payments_collection.update_one(
                    {'_id': payment['_id']},
                    {'$set': {'withdrawal_status': None, 'updated_at': datetime.utcnow()}}
                )
                remaining_amount = 0
    
    # def _get_payment_stats(self) -> dict:
    #     """Get payment statistics for admin dashboard"""
    #     total_payments = self.payments_collection.count_documents({})
    #     completed_payments = self.payments_collection.count_documents({'status': 'completed'})
    #     pending_payments = self.payments_collection.count_documents({'status': 'pending'})
    #     failed_payments = self.payments_collection.count_documents({'status': 'failed'})
        
    #     # Calculate revenue
    #     pipeline = [
    #         {'$match': {'status': 'completed'}},
    #         {'$group': {
    #             '_id': None,
    #             'total_revenue': {'$sum': '$amount'},
    #             'total_fees': {'$sum': '$platform_fee'},
    #             'total_earnings': {'$sum': '$freelancer_earnings'}
    #         }}
    #     ]
        
    #     revenue_data = list(self.payments_collection.aggregate(pipeline))
    #     if revenue_data:
    #         revenue = revenue_data[0]
    #         total_revenue = revenue['total_revenue']
    #         total_fees = revenue['total_fees']
    #         total_earnings = revenue['total_earnings']
    #     else:
    #         total_revenue = total_fees = total_earnings = 0
        
    #     return {
    #         'total_payments': total_payments,
    #         'completed_payments': completed_payments,
    #         'pending_payments': pending_payments,
    #         'failed_payments': failed_payments,
    #         'total_revenue': round(total_revenue, 2),
    #         'platform_fees': round(total_fees, 2),
    #         'freelancer_earnings': round(total_earnings, 2)
    #     }

    def _get_payment_stats(self) -> dict:
        """Get payment statistics for admin dashboard"""
        try:
            total_payments = self.payments_collection.count_documents({})
            completed_payments = self.payments_collection.count_documents({'status': 'completed'})
            pending_payments = self.payments_collection.count_documents({'status': 'pending'})
            failed_payments = self.payments_collection.count_documents({'status': 'failed'})
            
            # Calculate revenue
            pipeline = [
                {'$match': {'status': 'completed'}},
                {'$group': {
                    '_id': None,
                    'total_revenue': {'$sum': '$amount'},
                    'total_fees': {'$sum': '$platform_fee'},
                    'total_earnings': {'$sum': '$freelancer_earnings'}
                }}
            ]
            
            revenue_data = list(self.payments_collection.aggregate(pipeline))
            if revenue_data:
                revenue = revenue_data[0]
                total_revenue = float(revenue.get('total_revenue', 0))
                total_fees = float(revenue.get('total_fees', 0))
                total_earnings = float(revenue.get('total_earnings', 0))
            else:
                total_revenue = total_fees = total_earnings = 0.0
            
            return {
                'total_payments': int(total_payments),
                'completed_payments': int(completed_payments),
                'pending_payments': int(pending_payments),
                'failed_payments': int(failed_payments),
                'total_revenue': float(total_revenue),
                'platform_fees': float(total_fees),
                'freelancer_earnings': float(total_earnings)
            }
        except Exception as e:
            logging.error(f"Error getting payment stats: {e}")
            return {
                'total_payments': 0,
                'completed_payments': 0,
                'pending_payments': 0,
                'failed_payments': 0,
                'total_revenue': 0.0,
                'platform_fees': 0.0,
                'freelancer_earnings': 0.0
            }
    
    def _generate_time_series(self, start_date: datetime, end_date: datetime, interval: str) -> list:
        """Generate time series data for analytics"""
        time_series = []
        
        if interval == 'hour':
            current = start_date.replace(minute=0, second=0, microsecond=0)
            while current <= end_date:
                time_series.append({
                    'timestamp': current.isoformat(),
                    'label': current.strftime('%H:00'),
                    'revenue': 0,
                    'orders': 0,
                    'fees': 0
                })
                current += timedelta(hours=1)
        
        elif interval == 'day':
            current = start_date.replace(hour=0, minute=0, second=0, microsecond=0)
            while current <= end_date:
                time_series.append({
                    'timestamp': current.isoformat(),
                    'label': current.strftime('%b %d'),
                    'revenue': 0,
                    'orders': 0,
                    'fees': 0
                })
                current += timedelta(days=1)
        
        elif interval == 'month':
            current = start_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            while current <= end_date:
                time_series.append({
                    'timestamp': current.isoformat(),
                    'label': current.strftime('%b %Y'),
                    'revenue': 0,
                    'orders': 0,
                    'fees': 0
                })
                # Move to next month
                if current.month == 12:
                    current = current.replace(year=current.year + 1, month=1)
                else:
                    current = current.replace(month=current.month + 1)
        
        return time_series
    
    def _is_in_interval(self, date: datetime, interval_start: str, interval: str) -> bool:
        """Check if a date falls within an interval"""
        if not date:
            return False
        
        interval_dt = datetime.fromisoformat(interval_start.replace('Z', '+00:00'))
        
        if interval == 'hour':
            interval_end = interval_dt + timedelta(hours=1)
        elif interval == 'day':
            interval_end = interval_dt + timedelta(days=1)
        elif interval == 'month':
            # Calculate end of month
            if interval_dt.month == 12:
                interval_end = interval_dt.replace(year=interval_dt.year + 1, month=1)
            else:
                interval_end = interval_dt.replace(month=interval_dt.month + 1)
        else:
            interval_end = interval_dt + timedelta(days=1)
        
        return interval_dt <= date < interval_end
    
    def _get_empty_analytics(self) -> dict:
        """Return empty analytics structure"""
        return {
            'success': True,
            'analytics': {
                'time_series': [],
                'summary': {
                    'total_revenue': 0,
                    'platform_fees': 0,
                    'net_earnings': 0,
                    'total_orders': 0,
                    'average_order_value': 0
                },
                'period': 'month',
                'interval': 'day'
            }
        }