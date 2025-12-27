


from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler
import logging
from services.user_service import UserService
from services.gig_service import GigService
from services.order_service import OrderService
from services.categories_service import CategoryService  
from services.favorites_service import FavoriteService
from services.messages_service import MessageService
from services.reviews_service import ReviewService  
from services.payments_service import PaymentService
from services.notifications_service import NotificationService


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)

class WorkNetRPCServer:
    def __init__(self, host='localhost', port=8000):
        self.host = host
        self.port = port
        self.server = SimpleXMLRPCServer(
            (host, port),
            requestHandler=RequestHandler,
            allow_none=True
        )
        self.server.register_introspection_functions()
        
        # Initialize services
        self.user_service = UserService()
        self.gig_service = GigService()
        self.order_service = OrderService()
        self.category_service = CategoryService()
        self.favorite_service = FavoriteService()
        self.message_service = MessageService()
        self.review_service = ReviewService() 
        self.payment_service = PaymentService()
        self.notification_service = NotificationService()


        # Register RPC methods
        self._register_methods()
    
    def _register_methods(self):
        """Register all RPC methods"""
        
        # User methods - Register service methods directly
        self.server.register_function(self.user_service.create_user, 'create_user')
        self.server.register_function(self.user_service.authenticate_user, 'authenticate_user')
        self.server.register_function(self.user_service.get_user_by_id, 'get_user_by_id')
        self.server.register_function(self.user_service.update_user_profile, 'update_user_profile')
        self.server.register_function(self.user_service.search_freelancers, 'search_freelancers')
        self.server.register_function(self.user_service.login_user, 'login_user')
        self.server.register_function(self.user_service.logout_user, 'logout_user')
        self.server.register_function(self.user_service.refresh_token, 'refresh_token')
        self.server.register_function(self.user_service.forgot_password, 'forgot_password')
        self.server.register_function(self.user_service.reset_password, 'reset_password')
        self.server.register_function(self.user_service.get_user_profile, 'get_user_profile')
        self.server.register_function(self.user_service.get_user_by_email, 'get_user_by_email')
        self.server.register_function(self.user_service.update_user_avatar, 'update_user_avatar')
        self.server.register_function(self.user_service.change_password, 'change_password')
        self.server.register_function(self.user_service.deactivate_account, 'deactivate_account')
        self.server.register_function(self.user_service.delete_account, 'delete_account')
        self.server.register_function(self.user_service.update_freelancer_skills, 'update_freelancer_skills')
        self.server.register_function(self.user_service.update_freelancer_portfolio, 'update_freelancer_portfolio')
        self.server.register_function(self.user_service.get_freelancer_public_profile, 'get_freelancer_public_profile')
        self.server.register_function(self.user_service.update_client_company, 'update_client_company')
        self.server.register_function(self.user_service.get_all_users, 'get_all_users')
        self.server.register_function(self.user_service.update_user_status, 'update_user_status')
        self.server.register_function(self.user_service.delete_user, 'delete_user')
        self.server.register_function(self.user_service.validate_token, 'validate_token')

        
        # Gig methods - Keep wrapper methods for compatibility
        self.server.register_function(self.create_gig, 'create_gig')
        self.server.register_function(self.get_gig_by_id, 'get_gig_by_id')
        self.server.register_function(self.get_gig_by_slug, 'get_gig_by_slug')
        self.server.register_function(self.search_gigs, 'search_gigs')
        self.server.register_function(self.get_all_gigs, 'get_all_gigs')
        self.server.register_function(self.get_featured_gigs, 'get_featured_gigs')
        self.server.register_function(self.get_related_gigs, 'get_related_gigs')
        self.server.register_function(self.update_gig, 'update_gig')
        self.server.register_function(self.delete_gig, 'delete_gig')
        self.server.register_function(self.get_my_gigs, 'get_my_gigs')
        self.server.register_function(self.toggle_gig_status, 'toggle_gig_status')
        self.server.register_function(self.update_gig_images, 'update_gig_images')
        self.server.register_function(self.get_gig_analytics, 'get_gig_analytics')
        
        # Admin gig methods
        self.server.register_function(self.get_all_gigs_admin, 'get_all_gigs_admin')
        self.server.register_function(self.update_gig_status_admin, 'update_gig_status_admin')
        self.server.register_function(self.feature_gig, 'feature_gig')
        
        # Order methods - Keep wrapper methods for compatibility
        self.server.register_function(self.create_order, 'create_order')
        self.server.register_function(self.get_user_orders, 'get_user_orders')
        self.server.register_function(self.update_order_status, 'update_order_status')
        self.server.register_function(self.create_order_client, 'create_order_client')
        self.server.register_function(self.get_my_orders, 'get_my_orders')
        self.server.register_function(self.get_order_by_id, 'get_order_by_id')
        self.server.register_function(self.cancel_order, 'cancel_order')
        self.server.register_function(self.request_revision, 'request_revision')
        self.server.register_function(self.accept_delivery, 'accept_delivery')
        self.server.register_function(self.escalate_to_dispute, 'escalate_to_dispute')
        self.server.register_function(self.get_freelancer_orders, 'get_freelancer_orders')
        self.server.register_function(self.accept_order, 'accept_order')
        self.server.register_function(self.decline_order, 'decline_order')
        self.server.register_function(self.start_order_work, 'start_order_work')
        self.server.register_function(self.deliver_order, 'deliver_order')
        self.server.register_function(self.update_order_progress, 'update_order_progress')
        self.server.register_function(self.get_order_timeline, 'get_order_timeline')
        self.server.register_function(self.extend_deadline, 'extend_deadline')
        self.server.register_function(self.get_all_orders_admin, 'get_all_orders_admin')
        self.server.register_function(self.update_order_admin, 'update_order_admin')
        self.server.register_function(self.resolve_dispute, 'resolve_dispute')
        self.server.register_function(self.get_order_stats, 'get_order_stats')
        
        
        # Category methods - Keep wrapper methods for compatibility
        self.server.register_function(self.get_all_categories, 'get_all_categories')
        self.server.register_function(self.get_category_by_id, 'get_category_by_id')
        self.server.register_function(self.get_category_by_slug, 'get_category_by_slug')
        self.server.register_function(self.get_subcategories, 'get_subcategories')
        self.server.register_function(self.create_category, 'create_category')
        self.server.register_function(self.update_category, 'update_category')
        self.server.register_function(self.delete_category, 'delete_category')
        self.server.register_function(self.update_category_order, 'update_category_order')
        self.server.register_function(self.toggle_category_status, 'toggle_category_status')

        # Favorite methods (using FavoriteService)
        self.server.register_function(self.add_gig_to_favorites, 'add_gig_to_favorites')
        self.server.register_function(self.remove_gig_from_favorites, 'remove_gig_from_favorites')
        self.server.register_function(self.get_user_favorites, 'get_user_favorites')
        self.server.register_function(self.is_favorite, 'is_favorite')
        self.server.register_function(self.clear_favorites, 'clear_favorites')
        self.server.register_function(self.get_favorites_count, 'get_favorites_count')

        # Message methods - Keep wrapper methods for compatibility
        self.server.register_function(self.get_conversations, 'get_conversations')
        self.server.register_function(self.get_order_messages, 'get_order_messages')
        self.server.register_function(self.send_message, 'send_message')
        self.server.register_function(self.mark_messages_as_read, 'mark_messages_as_read')
        self.server.register_function(self.upload_attachment, 'upload_attachment')
        self.server.register_function(self.delete_attachment, 'delete_attachment')
        self.server.register_function(self.send_system_message, 'send_system_message')
        self.server.register_function(self.get_all_messages, 'get_all_messages')
        self.server.register_function(self.delete_message_admin, 'delete_message_admin')
        self.server.register_function(self.get_unread_count, 'get_unread_count')
        self.server.register_function(self.get_message_stats, 'get_message_stats')
        
        # Review methods - Keep wrapper methods for compatibility
        self.server.register_function(self.create_review_client, 'create_review_client')
        self.server.register_function(self.update_review_client, 'update_review_client')
        self.server.register_function(self.delete_review_client, 'delete_review_client')
        self.server.register_function(self.respond_to_review, 'respond_to_review')
        self.server.register_function(self.get_gig_reviews, 'get_gig_reviews')
        self.server.register_function(self.get_freelancer_reviews, 'get_freelancer_reviews')
        self.server.register_function(self.get_review_stats, 'get_review_stats')
        self.server.register_function(self.get_all_reviews_admin, 'get_all_reviews_admin')
        self.server.register_function(self.delete_review_admin, 'delete_review_admin')
        self.server.register_function(self.toggle_review_visibility, 'toggle_review_visibility')

        # Payment methods - Only register methods that actually exist in PaymentService
        # REMOVED: create_payment, update_payment_status (3 params), get_user_payments
        self.server.register_function(self.create_payment_intent, 'create_payment_intent')
        self.server.register_function(self.process_payment, 'process_payment')
        self.server.register_function(self.get_payment_history, 'get_payment_history')
        self.server.register_function(self.get_payment_details, 'get_payment_details')
        self.server.register_function(self.request_refund, 'request_refund')
        self.server.register_function(self.get_earnings, 'get_earnings')
        self.server.register_function(self.request_withdrawal, 'request_withdrawal')
        self.server.register_function(self.get_withdrawal_history, 'get_withdrawal_history')
        self.server.register_function(self.get_revenue_analytics, 'get_revenue_analytics')
        self.server.register_function(self.get_all_payments, 'get_all_payments')
        self.server.register_function(self.process_withdrawal, 'process_withdrawal')
        # Note: update_payment_status with 2 parameters exists (admin version)
        self.server.register_function(self.payment_service.update_payment_status, 'update_payment_status')
        self.server.register_function(self.get_platform_earnings, 'get_platform_earnings')
        
        # Notification methods - Register all notification functions
        self._register_notification_methods()
    
    def _register_notification_methods(self):
        """Register notification RPC methods"""
        
        # User notification methods
        self.server.register_function(self.get_user_notifications, 'get_user_notifications')
        self.server.register_function(self.mark_notification_as_read, 'mark_notification_as_read')
        self.server.register_function(self.mark_all_notifications_as_read, 'mark_all_notifications_as_read')
        self.server.register_function(self.delete_notification, 'delete_notification')
        self.server.register_function(self.get_unread_notification_count, 'get_unread_notification_count')
        
        # System notification methods
        self.server.register_function(self.create_notification, 'create_notification')
        self.server.register_function(self.send_bulk_notification, 'send_bulk_notification')
        
        # Admin notification methods
        self.server.register_function(self.get_all_notifications, 'get_all_notifications')
        self.server.register_function(self.send_platform_notification, 'send_platform_notification')
        
        # Helper notification methods
        self.server.register_function(self.notify_order_received, 'notify_order_received')
        self.server.register_function(self.notify_order_accepted, 'notify_order_accepted')
        self.server.register_function(self.notify_order_delivered, 'notify_order_delivered')
        self.server.register_function(self.notify_payment_received, 'notify_payment_received')
        self.server.register_function(self.notify_new_message, 'notify_new_message')
        self.server.register_function(self.cleanup_old_notifications, 'cleanup_old_notifications')
    
    # ==================== GIG RPC METHODS ====================
    
    def create_gig(self, freelancer_id, gig_data):
        return self.gig_service.create_gig(freelancer_id, gig_data)
    
    def get_gig_by_id(self, gig_id):
        return self.gig_service.get_gig_by_id(gig_id)
    
    def get_gig_by_slug(self, slug):
        return self.gig_service.get_gig_by_slug(slug)
    
    def search_gigs(self, search_query=None, filters=None):
        """RPC method to search gigs - FIXED parameter order"""
        return self.gig_service.search_gigs(search_query, filters)
    
    def get_all_gigs(self, filters=None, pagination=None):
        return self.gig_service.get_all_gigs(filters, pagination)
    
    def get_featured_gigs(self):
        return self.gig_service.get_featured_gigs()
    
    def get_related_gigs(self, gig_id, category_id=None):
        return self.gig_service.get_related_gigs(gig_id, category_id)
    
    def update_gig(self, gig_id, freelancer_id, update_data):
        return self.gig_service.update_gig(gig_id, freelancer_id, update_data)
    
    def delete_gig(self, gig_id, freelancer_id):
        return self.gig_service.delete_gig(gig_id, freelancer_id)
    
    def get_my_gigs(self, freelancer_id, filters=None):
        return self.gig_service.get_my_gigs(freelancer_id, filters)
    
    def toggle_gig_status(self, gig_id, freelancer_id, status):
        return self.gig_service.toggle_gig_status(gig_id, freelancer_id, status)
    
    def update_gig_images(self, gig_id, freelancer_id, images):
        return self.gig_service.update_gig_images(gig_id, freelancer_id, images)
    
    def get_gig_analytics(self, gig_id, freelancer_id):
        return self.gig_service.get_gig_analytics(gig_id, freelancer_id)
    
    # ==================== ORDER RPC METHODS ====================
    ####################################""
    def create_order(self, client_id, order_data):
        return self.order_service.create_order(client_id, order_data)
    #############################chayma
    def get_user_orders(self, user_id, user_role, filters=None):
        return self.order_service.get_user_orders(user_id, user_role, filters)
    
    def update_order_status(self, order_id, status, user_id=None):
        return self.order_service.update_order_status(order_id, status, user_id)
    
    def create_order_client(self, client_id, order_data):
        return self.order_service.create_order(client_id, order_data)
    
    def get_my_orders(self, client_id, filters=None):
        return self.order_service.get_my_orders(client_id, filters)
    
    def get_order_by_id(self, order_id, user_id):
        return self.order_service.get_order_by_id(order_id, user_id)
    
    def cancel_order(self, order_id, client_id, reason=None):
        return self.order_service.cancel_order(order_id, client_id, reason)
    
    def request_revision(self, order_id, client_id, revision_notes):
        return self.order_service.request_revision(order_id, client_id, revision_notes)
    
    def accept_delivery(self, order_id, client_id):
        return self.order_service.accept_delivery(order_id, client_id)
    
    def escalate_to_dispute(self, order_id, client_id, dispute_data):
        return self.order_service.escalate_to_dispute(order_id, client_id, dispute_data)
    
    def get_freelancer_orders(self, freelancer_id, filters=None):
        return self.order_service.get_freelancer_orders(freelancer_id, filters)
    
    def accept_order(self, order_id, freelancer_id):
        return self.order_service.accept_order(order_id, freelancer_id)
    
    def decline_order(self, order_id, freelancer_id, reason=None):
        return self.order_service.decline_order(order_id, freelancer_id, reason)
    
    def start_order_work(self, order_id, freelancer_id):
        return self.order_service.start_order_work(order_id, freelancer_id)
    
    def deliver_order(self, order_id, freelancer_id, delivery_data):
        return self.order_service.deliver_order(order_id, freelancer_id, delivery_data)
    
    def update_order_progress(self, order_id, freelancer_id, progress_data):
        return self.order_service.update_order_progress(order_id, freelancer_id, progress_data)
    
    def get_order_timeline(self, order_id):
        return self.order_service.get_order_timeline(order_id)
    
    def extend_deadline(self, order_id, user_id, extension_data):
        return self.order_service.extend_deadline(order_id, user_id, extension_data)
    
    def get_all_orders_admin(self, filters=None, pagination=None):
        return self.order_service.get_all_orders_admin(filters, pagination)
    
    def update_order_admin(self, order_id, update_data):
        return self.order_service.update_order_admin(order_id, update_data)
    
    def resolve_dispute(self, order_id, resolution_data):
        return self.order_service.resolve_dispute(order_id, resolution_data)
    
    def get_order_stats(self, user_id=None, user_role=None):
        return self.order_service.get_order_stats(user_id, user_role)
    
    # ==================== CATEGORY RPC METHODS ====================
    
    def get_all_categories(self):
        return self.category_service.get_all_categories()
    
    def get_category_by_id(self, category_id):
        return self.category_service.get_category_by_id(category_id)
    
    def get_category_by_slug(self, slug):
        return self.category_service.get_category_by_slug(slug)
    
    def get_subcategories(self, parent_id):
        return self.category_service.get_subcategories(parent_id)
    
    def create_category(self, category_data):
        return self.category_service.create_category(category_data)
    
    def update_category(self, category_id, update_data):
        return self.category_service.update_category(category_id, update_data)
    
    def delete_category(self, category_id):
        return self.category_service.delete_category(category_id)
    
    def update_category_order(self, ordered_categories):
        return self.category_service.update_category_order(ordered_categories)
    
    def toggle_category_status(self, category_id):
        return self.category_service.toggle_category_status(category_id)
    
    # ==================== FAVORITE RPC METHODS ====================
    
    def add_gig_to_favorites(self, user_id, gig_id):
        return self.favorite_service.add_to_favorites(user_id, gig_id)
    
    def remove_gig_from_favorites(self, user_id, gig_id):
        return self.favorite_service.remove_from_favorites(user_id, gig_id)
    
    def get_user_favorites(self, user_id, filters=None):
        return self.favorite_service.get_user_favorites(user_id, filters)
    
    def is_favorite(self, user_id, gig_id):
        return self.favorite_service.is_favorite(user_id, gig_id)
    
    def clear_favorites(self, user_id):
        return self.favorite_service.clear_favorites(user_id)
    
    def get_favorites_count(self, user_id):
        return self.favorite_service.get_favorites_count(user_id)
    
    # ==================== MESSAGE RPC METHODS ====================
    
    def get_conversations(self, user_id):
        return self.message_service.get_conversations(user_id)

    def get_order_messages(self, order_id, user_id, pagination=None):
        return self.message_service.get_order_messages(order_id, user_id, pagination)

    def send_message(self, order_id, sender_id, message_data):
        return self.message_service.send_message(order_id, sender_id, message_data)

    def mark_messages_as_read(self, order_id, user_id):
        return self.message_service.mark_messages_as_read(order_id, user_id)

    def upload_attachment(self, file, order_id, user_id):
        return self.message_service.upload_attachment(file, order_id, user_id)

    def delete_attachment(self, message_id, user_id):
        return self.message_service.delete_attachment(message_id, user_id)

    def send_system_message(self, order_id, message_type, data=None):
        return self.message_service.send_system_message(order_id, message_type, data)

    def get_all_messages(self, filters=None):
        return self.message_service.get_all_messages(filters)

    def delete_message_admin(self, message_id):
        return self.message_service.delete_message_admin(message_id)

    def get_unread_count(self, user_id):
        return self.message_service.get_unread_count(user_id)

    def get_message_stats(self):
        return self.message_service.get_message_stats()
    
    # ==================== REVIEW RPC METHODS ====================
    
    def create_review_client(self, order_id: str, client_id: str, review_data: dict):
        """Client creates a review for a completed order"""
        return self.review_service.create_review(order_id, client_id, review_data)
    
    def update_review_client(self, review_id: str, client_id: str, update_data: dict):
        """Client updates their review"""
        return self.review_service.update_review(review_id, client_id, update_data)
    
    def delete_review_client(self, review_id: str, client_id: str):
        """Client deletes their review"""
        return self.review_service.delete_review(review_id, client_id)
    
    def respond_to_review(self, review_id: str, freelancer_id: str, response: str):
        """Freelancer responds to a review"""
        return self.review_service.respond_to_review(review_id, freelancer_id, response)
    
    def get_gig_reviews(self, gig_id: str, filters: dict = None):
        """Get reviews for a specific gig (uses ReviewService)"""
        return self.review_service.get_gig_reviews(gig_id, filters)
    
    def get_freelancer_reviews(self, freelancer_id: str, filters: dict = None):
        """Get reviews for a freelancer"""
        return self.review_service.get_freelancer_reviews(freelancer_id, filters)
    
    def get_review_stats(self, freelancer_id: str):
        """Get review statistics for a freelancer"""
        return self.review_service.get_review_stats(freelancer_id)
    
    def get_all_reviews_admin(self, filters: dict = None, pagination: dict = None):
        """Admin: Get all reviews with filters"""
        return self.review_service.get_all_reviews(filters, pagination)
    
    def delete_review_admin(self, review_id: str):
        """Admin: Delete any review"""
        return self.review_service.delete_review_admin(review_id)
    
    def toggle_review_visibility(self, review_id: str, is_public: bool):
        """Admin: Toggle review visibility"""
        return self.review_service.toggle_review_visibility(review_id, is_public)
    
    # ==================== NOTIFICATION RPC METHODS ====================
    
    def get_user_notifications(self, user_id: str, filters: dict = None) -> dict:
        """Get notifications for a specific user"""
        return self.notification_service.get_user_notifications(user_id, filters)
    
    def mark_notification_as_read(self, notification_id: str, user_id: str) -> dict:
        """Mark a notification as read"""
        return self.notification_service.mark_as_read(notification_id, user_id)
    
    def mark_all_notifications_as_read(self, user_id: str) -> dict:
        """Mark all user notifications as read"""
        return self.notification_service.mark_all_as_read(user_id)
    
    def delete_notification(self, notification_id: str, user_id: str) -> dict:
        """Delete a notification"""
        return self.notification_service.delete_notification(notification_id, user_id)
    
    def get_unread_notification_count(self, user_id: str) -> dict:
        """Get count of unread notifications"""
        return self.notification_service.get_unread_count(user_id)
    
    def create_notification(self, notification_data: dict) -> dict:
        """Create a new notification"""
        return self.notification_service.create_notification(notification_data)
    
    def send_bulk_notification(self, user_ids: list, notification_data: dict) -> dict:
        """Send notification to multiple users"""
        return self.notification_service.send_bulk_notification(user_ids, notification_data)
    
    def get_all_notifications(self, filters: dict = None) -> dict:
        """Get all notifications (admin)"""
        return self.notification_service.get_all_notifications(filters)
    
    def send_platform_notification(self, notification_data: dict) -> dict:
        """Send platform-wide notification"""
        return self.notification_service.send_platform_notification(notification_data)
    
    # Helper notification methods
    def notify_order_received(self, freelancer_id: str, order_id: str, order_title: str) -> dict:
        """Notify freelancer of new order"""
        return self.notification_service.notify_order_received(freelancer_id, order_id, order_title)
    
    def notify_order_accepted(self, client_id: str, order_id: str) -> dict:
        """Notify client of order acceptance"""
        return self.notification_service.notify_order_accepted(client_id, order_id)
    
    def notify_order_delivered(self, client_id: str, order_id: str) -> dict:
        """Notify client of order delivery"""
        return self.notification_service.notify_order_delivered(client_id, order_id)
    
    def notify_payment_received(self, freelancer_id: str, order_id: str, amount: float) -> dict:
        """Notify freelancer of payment"""
        return self.notification_service.notify_payment_received(freelancer_id, order_id, amount)
    
    def notify_new_message(self, recipient_id: str, sender_name: str, order_id: str) -> dict:
        """Notify user of new message"""
        return self.notification_service.notify_new_message(recipient_id, sender_name, order_id)
    
    def cleanup_old_notifications(self, days_old: int = 30) -> dict:
        """Clean up old notifications"""
        return self.notification_service.cleanup_old_notifications(days_old)
    
    # ==================== ADMIN GIG METHODS ====================
    
    def get_all_gigs_admin(self, filters=None, pagination=None):
        return self.gig_service.get_all_gigs_admin(filters, pagination)
    
    def update_gig_status_admin(self, gig_id, status):
        return self.gig_service.update_gig_status_admin(gig_id, status)
    
    def feature_gig(self, gig_id, featured):
        return self.gig_service.feature_gig(gig_id, featured)
    
    # ==================== PAYMENT RPC METHODS ====================
    
    def create_payment_intent(self, order_id: str, client_id: str, payment_method: str):
        """Create a payment intent for an order"""
        return self.payment_service.create_payment_intent(order_id, client_id, payment_method)
    
    def process_payment(self, order_id: str, client_id: str, payment_data: dict):
        """Process a payment"""
        return self.payment_service.process_payment(order_id, client_id, payment_data)
    
    def get_payment_history(self, user_id: str, filters: dict = None):
        """Get payment history for a user"""
        return self.payment_service.get_payment_history(user_id, filters)
    
    def get_payment_details(self, payment_id: str, user_id: str):
        """Get details of a specific payment"""
        return self.payment_service.get_payment_details(payment_id, user_id)
    
    def request_refund(self, order_id: str, client_id: str, reason: str):
        """Request a refund for an order"""
        return self.payment_service.request_refund(order_id, client_id, reason)
    
    def get_earnings(self, freelancer_id: str, filters: dict = None):
        """Get earnings for a freelancer"""
        return self.payment_service.get_earnings(freelancer_id, filters)
    
    def request_withdrawal(self, freelancer_id: str, withdrawal_data: dict):
        """Request a withdrawal of earnings"""
        return self.payment_service.request_withdrawal(freelancer_id, withdrawal_data)
    
    def get_withdrawal_history(self, freelancer_id: str):
        """Get withdrawal history for a freelancer"""
        return self.payment_service.get_withdrawal_history(freelancer_id)
    
    def get_revenue_analytics(self, freelancer_id: str, period: str = 'month'):
        """Get revenue analytics for a freelancer"""
        return self.payment_service.get_revenue_analytics(freelancer_id, period)
    
    def get_all_payments(self, filters: dict = None, pagination: dict = None):
        """Get all payments (admin only)"""
        return self.payment_service.get_all_payments(filters, pagination)
    
    def process_withdrawal(self, withdrawal_id: str, status: str):
        """Process a withdrawal request (admin only)"""
        return self.payment_service.process_withdrawal(withdrawal_id, status)
    
    # Note: update_payment_status is registered directly above (line 147)
    
    def get_platform_earnings(self, period: str = 'month'):
        """Get platform earnings analytics (admin only)"""
        return self.payment_service.get_platform_earnings(period)
    
    def start_server(self):
        """Start the RPC server"""
        print(f"🚀 Starting WorkNet RPC Server on {self.host}:{self.port}")
        print("📡 RPC Methods available:")
        print("  👤 User: create_user, authenticate_user, get_user_by_id, update_user_profile, search_freelancers")
        print("        login_user, logout_user, refresh_token, forgot_password, reset_password")
        print("       get_user_profile, get_user_by_email,update_user_avatar, change_password, deactivate_account, delete_account")
        print("       update_freelancer_skills, update_freelancer_portfolio, get_freelancer_public_profile")
        print("       update_client_company, get_all_users, update_user_status, delete_user,validate_token")
        print("  💼 Gig: create_gig, get_gig_by_id, get_gig_by_slug, search_gigs, get_all_gigs")
        print("     get_featured_gigs, get_related_gigs, get_gig_reviews, update_gig, delete_gig")
        print("     get_my_gigs, toggle_gig_status, update_gig_images, get_gig_analytics")
        print("  📦 Order: create_order, get_user_orders, update_order_status, create_order_client")
        print("     get_my_orders, get_order_by_id, cancel_order, request_revision, accept_delivery")
        print("     escalate_to_dispute, get_freelancer_orders, accept_order, decline_order, start_order_work")
        print("     deliver_order, update_order_progress, get_order_timeline, extend_deadline")
        print("     get_all_orders_admin, update_order_admin, resolve_dispute, get_order_stats")
        print("  📁 Category: get_all_categories, get_category_by_id, get_category_by_slug, get_subcategories")
        print("     create_category, update_category, delete_category, update_category_order, toggle_category_status")
        print("  ❤️  Favorites: add_gig_to_favorites, remove_gig_from_favorites, get_user_favorites")
        print("     is_favorite, clear_favorites, get_favorites_count")
        print("  💬 Messages: get_conversations, get_order_messages, send_message, mark_messages_as_read")
        print("     upload_attachment, delete_attachment, send_system_message, get_all_messages")
        print("     delete_message_admin, get_unread_count, get_message_stats")
        print("  ⭐ Reviews: create_review_client, update_review_client, delete_review_client, respond_to_review")
        print("     get_gig_reviews, get_freelancer_reviews, get_review_stats")
        print("     get_all_reviews_admin, delete_review_admin, toggle_review_visibility")
        print("  🔔 Notifications: get_user_notifications, mark_notification_as_read, mark_all_notifications_as_read")
        print("     delete_notification, get_unread_notification_count, create_notification, send_bulk_notification")
        print("     get_all_notifications, send_platform_notification, notify_order_received, notify_order_accepted")
        print("     notify_order_delivered, notify_payment_received, notify_new_message, cleanup_old_notifications")
        print("  💳 Payments: create_payment_intent, process_payment, get_payment_history, get_payment_details")
        print("     request_refund, get_earnings, request_withdrawal, get_withdrawal_history")
        print("     get_revenue_analytics, get_all_payments, process_withdrawal, update_payment_status")
        print("     get_platform_earnings")
        print("  👑 Admin: get_all_gigs_admin, update_gig_status_admin, feature_gig")
        print("⏹️  Press Ctrl+C to stop the server")
        
        try:
            self.server.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Shutting down RPC server...")
        finally:
            self.server.server_close()

if __name__ == "__main__":
    # Create and start the RPC server
    rpc_server = WorkNetRPCServer('0.0.0.0', 8000)
    rpc_server.start_server()