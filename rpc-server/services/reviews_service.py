# from bson import ObjectId
# from datetime import datetime
# from .database import db
# import logging

# class ReviewService:
#     def __init__(self):
#         self.reviews_collection = db.get_collection('reviews')
#         self.users_collection = db.get_collection('users')
#         self.orders_collection = db.get_collection('orders')
#         self.gigs_collection = db.get_collection('gigs')
    
#     # Client Functions
    
#     def create_review(self, order_id: str, client_id: str, review_data: dict) -> dict:
#         """Client creates a review for a completed order"""
#         try:
#             # Verify order exists and is completed
#             order = self.orders_collection.find_one({
#                 '_id': ObjectId(order_id),
#                 'status': 'completed',
#                 'client_id': ObjectId(client_id)
#             })
            
#             if not order:
#                 return {
#                     'success': False,
#                     'error': 'Order not found, not completed, or you are not the client'
#                 }
            
#             # Check if review already exists for this order
#             existing_review = self.reviews_collection.find_one({
#                 'order_id': ObjectId(order_id)
#             })
            
#             if existing_review:
#                 return {
#                     'success': False,
#                     'error': 'Review already exists for this order'
#                 }
            
#             # Verify the gig exists
#             gig = self.gigs_collection.find_one({
#                 '_id': ObjectId(review_data.get('gig_id'))
#             })
            
#             if not gig:
#                 return {
#                     'success': False,
#                     'error': 'Gig not found'
#                 }
            
#             # Prepare review data
#             review_data['order_id'] = ObjectId(order_id)
#             review_data['reviewer_id'] = ObjectId(client_id)
#             review_data['reviewee_id'] = ObjectId(order['freelancer_id'])
#             review_data['gig_id'] = ObjectId(review_data.get('gig_id'))
            
#             # Calculate overall rating
#             ratings = [
#                 review_data['rating_communication'],
#                 review_data['rating_quality'], 
#                 review_data['rating_deadline']
#             ]
#             review_data['overall_rating'] = round(sum(ratings) / len(ratings), 1)
            
#             # Add timestamps
#             review_data['created_at'] = datetime.utcnow()
#             review_data['updated_at'] = datetime.utcnow()
#             review_data['is_verified'] = True
#             review_data['is_public'] = True
            
#             # Insert review
#             result = self.reviews_collection.insert_one(review_data)
#             review_id = str(result.inserted_id)
            
#             # Update freelancer rating and review count
#             self._update_freelancer_rating(review_data['reviewee_id'])
            
#             # Update gig rating
#             self._update_gig_rating(review_data['gig_id'])
            
#             # Get the inserted review from database to ensure proper formatting
#             inserted_review = self.reviews_collection.find_one({'_id': result.inserted_id})
            
#             return {
#                 'success': True,
#                 'review': self._format_review(inserted_review)
#             }
            
#         except Exception as e:
#             logging.error(f"Error creating review: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def update_review(self, review_id: str, client_id: str, update_data: dict) -> dict:
#         """Client updates their review"""
#         try:
#             # Verify review exists and belongs to client
#             review = self.reviews_collection.find_one({
#                 '_id': ObjectId(review_id),
#                 'reviewer_id': ObjectId(client_id)
#             })
            
#             if not review:
#                 return {
#                     'success': False,
#                     'error': 'Review not found or access denied'
#                 }
            
#             # Remove fields that shouldn't be updated
#             update_data.pop('order_id', None)
#             update_data.pop('reviewer_id', None)
#             update_data.pop('reviewee_id', None)
#             update_data.pop('gig_id', None)
            
#             # Recalculate overall rating if rating fields are updated
#             if any(key in update_data for key in ['rating_communication', 'rating_quality', 'rating_deadline']):
#                 ratings = [
#                     update_data.get('rating_communication', review.get('rating_communication')),
#                     update_data.get('rating_quality', review.get('rating_quality')),
#                     update_data.get('rating_deadline', review.get('rating_deadline'))
#                 ]
#                 update_data['overall_rating'] = round(sum(ratings) / len(ratings), 1)
            
#             # Update review
#             update_data['updated_at'] = datetime.utcnow()
            
#             result = self.reviews_collection.update_one(
#                 {'_id': ObjectId(review_id)},
#                 {'$set': update_data}
#             )
            
#             if result.modified_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'No changes made'
#                 }
            
#             # Update freelancer rating
#             self._update_freelancer_rating(review['reviewee_id'])
            
#             # Update gig rating if gig_id exists
#             if 'gig_id' in review:
#                 self._update_gig_rating(review['gig_id'])
            
#             # Get updated review
#             updated_review = self.reviews_collection.find_one({'_id': ObjectId(review_id)})
            
#             return {
#                 'success': True,
#                 'review': self._format_review(updated_review)
#             }
            
#         except Exception as e:
#             logging.error(f"Error updating review: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def delete_review(self, review_id: str, client_id: str) -> dict:
#         """Client deletes their review"""
#         try:
#             # Verify review exists and belongs to client
#             review = self.reviews_collection.find_one({
#                 '_id': ObjectId(review_id),
#                 'reviewer_id': ObjectId(client_id)
#             })
            
#             if not review:
#                 return {
#                     'success': False,
#                     'error': 'Review not found or access denied'
#                 }
            
#             # Delete review
#             result = self.reviews_collection.delete_one({'_id': ObjectId(review_id)})
            
#             if result.deleted_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Review not found'
#                 }
            
#             # Update freelancer rating
#             self._update_freelancer_rating(review['reviewee_id'])
            
#             # Update gig rating if gig_id exists
#             if 'gig_id' in review:
#                 self._update_gig_rating(review['gig_id'])
            
#             return {
#                 'success': True,
#                 'message': 'Review deleted successfully'
#             }
            
#         except Exception as e:
#             logging.error(f"Error deleting review: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     # Freelancer Functions
    
#     def respond_to_review(self, review_id: str, freelancer_id: str, response: str) -> dict:
#         """Freelancer responds to a review"""
#         try:
#             review = self.reviews_collection.find_one({'_id': ObjectId(review_id)})
            
#             if not review:
#                 return {
#                     'success': False,
#                     'error': 'Review not found'
#                 }
            
#             # Verify freelancer owns the review
#             if review['reviewee_id'] != ObjectId(freelancer_id):
#                 return {
#                     'success': False,
#                     'error': 'Access denied'
#                 }
            
#             # Update review with response
#             result = self.reviews_collection.update_one(
#                 {'_id': ObjectId(review_id)},
#                 {
#                     '$set': {
#                         'owner_response': response,
#                         'responded_at': datetime.utcnow(),
#                         'updated_at': datetime.utcnow()
#                     }
#                 }
#             )
            
#             if result.modified_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Review not found or no changes made'
#                 }
            
#             return {
#                 'success': True,
#                 'message': 'Response added successfully'
#             }
            
#         except Exception as e:
#             logging.error(f"Error responding to review: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     # Public Functions
    
#     def get_gig_reviews(self, gig_id: str, filters: dict = None) -> dict:
#         """Get reviews for a specific gig"""
#         try:
#             query = {'gig_id': ObjectId(gig_id), 'is_public': True}
            
#             # Apply rating filter
#             if filters and 'min_rating' in filters:
#                 query['overall_rating'] = {'$gte': float(filters['min_rating'])}
            
#             # Pagination
#             page = int(filters.get('page', 1)) if filters else 1
#             limit = int(filters.get('limit', 10)) if filters else 10
#             skip = (page - 1) * limit
            
#             # Get total count
#             total = self.reviews_collection.count_documents(query)
            
#             # Get reviews
#             reviews_cursor = self.reviews_collection.find(query).skip(skip).limit(limit)
            
#             # Sort
#             sort_by = filters.get('sort_by', 'created_at') if filters else 'created_at'
#             sort_order = -1 if sort_by == 'created_at' else -1
#             reviews_cursor = reviews_cursor.sort(sort_by, sort_order)
            
#             reviews = list(reviews_cursor)
            
#             # Format reviews with user details
#             formatted_reviews = []
#             for review in reviews:
#                 formatted_reviews.append(self._populate_review_details(review))
            
#             return {
#                 'success': True,
#                 'reviews': formatted_reviews,
#                 'pagination': {
#                     'page': page,
#                     'limit': limit,
#                     'total': total,
#                     'pages': (total + limit - 1) // limit
#                 }
#             }
            
#         except Exception as e:
#             logging.error(f"Error getting gig reviews: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def get_freelancer_reviews(self, freelancer_id: str, filters: dict = None) -> dict:
#         """Get reviews for a freelancer"""
#         try:
#             query = {'reviewee_id': ObjectId(freelancer_id), 'is_public': True}
            
#             # Apply filters
#             if filters:
#                 if 'min_rating' in filters:
#                     query['overall_rating'] = {'$gte': float(filters['min_rating'])}
#                 if 'has_response' in filters:
#                     if filters['has_response']:
#                         query['owner_response'] = {'$exists': True, '$ne': ''}
#                     else:
#                         query['owner_response'] = {'$exists': False}
#                 if 'is_verified' in filters:
#                     query['is_verified'] = bool(filters['is_verified'])
            
#             # Pagination
#             page = int(filters.get('page', 1)) if filters else 1
#             limit = int(filters.get('limit', 10)) if filters else 10
#             skip = (page - 1) * limit
            
#             # Get total count
#             total = self.reviews_collection.count_documents(query)
            
#             # Get reviews
#             reviews_cursor = self.reviews_collection.find(query).skip(skip).limit(limit)
            
#             # Sort
#             sort_by = filters.get('sort_by', 'created_at') if filters else 'created_at'
#             sort_order = -1 if sort_by == 'created_at' else -1
#             reviews_cursor = reviews_cursor.sort(sort_by, sort_order)
            
#             reviews = list(reviews_cursor)
            
#             # Format reviews with user and gig details
#             formatted_reviews = []
#             for review in reviews:
#                 formatted_reviews.append(self._populate_review_details(review, include_gig=True))
            
#             return {
#                 'success': True,
#                 'reviews': formatted_reviews,
#                 'pagination': {
#                     'page': page,
#                     'limit': limit,
#                     'total': total,
#                     'pages': (total + limit - 1) // limit
#                 }
#             }
            
#         except Exception as e:
#             logging.error(f"Error getting freelancer reviews: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def get_review_stats(self, freelancer_id: str) -> dict:
#         """Get review statistics for a freelancer"""
#         try:
#             # Get all reviews for freelancer
#             reviews = list(self.reviews_collection.find({
#                 'reviewee_id': ObjectId(freelancer_id),
#                 'is_public': True
#             }))
            
#             if not reviews:
#                 return {
#                     'success': True,
#                     'stats': {
#                         'total_reviews': 0,
#                         'average_rating': 0,
#                         'rating_distribution': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
#                         'average_communication': 0,
#                         'average_quality': 0,
#                         'average_deadline': 0,
#                         'response_rate': 0,
#                         'verified_reviews': 0
#                     }
#                 }
            
#             # Calculate statistics
#             total_reviews = len(reviews)
            
#             # Average ratings
#             avg_overall = sum(r['overall_rating'] for r in reviews) / total_reviews
#             avg_communication = sum(r.get('rating_communication', avg_overall) for r in reviews) / total_reviews
#             avg_quality = sum(r.get('rating_quality', avg_overall) for r in reviews) / total_reviews
#             avg_deadline = sum(r.get('rating_deadline', avg_overall) for r in reviews) / total_reviews
            
#             # Rating distribution
#             distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
#             for review in reviews:
#                 rating = round(review['overall_rating'])
#                 if 1 <= rating <= 5:
#                     distribution[rating] += 1
            
#             # Response rate
#             responded_reviews = sum(1 for r in reviews if r.get('owner_response'))
#             response_rate = (responded_reviews / total_reviews) * 100 if total_reviews > 0 else 0
            
#             # Verified reviews
#             verified_reviews = sum(1 for r in reviews if r.get('is_verified', False))
            
#             stats = {
#                 'total_reviews': total_reviews,
#                 'average_rating': round(avg_overall, 2),
#                 'rating_distribution': distribution,
#                 'average_communication': round(avg_communication, 2),
#                 'average_quality': round(avg_quality, 2),
#                 'average_deadline': round(avg_deadline, 2),
#                 'response_rate': round(response_rate, 2),
#                 'verified_reviews': verified_reviews,
#                 'with_response': responded_reviews
#             }
            
#             return {
#                 'success': True,
#                 'stats': stats
#             }
            
#         except Exception as e:
#             logging.error(f"Error getting review stats: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     # Admin Functions
    
#     def get_all_reviews(self, filters: dict = None, pagination: dict = None) -> dict:
#         """Admin: Get all reviews with filters"""
#         try:
#             query = {}
            
#             # Apply filters
#             if filters:
#                 if 'freelancer_id' in filters:
#                     query['reviewee_id'] = ObjectId(filters['freelancer_id'])
#                 if 'client_id' in filters:
#                     query['reviewer_id'] = ObjectId(filters['client_id'])
#                 if 'gig_id' in filters:
#                     query['gig_id'] = ObjectId(filters['gig_id'])
#                 if 'order_id' in filters:
#                     query['order_id'] = ObjectId(filters['order_id'])
#                 if 'min_rating' in filters:
#                     query['overall_rating'] = {'$gte': float(filters['min_rating'])}
#                 if 'max_rating' in filters:
#                     if 'overall_rating' in query:
#                         query['overall_rating']['$lte'] = float(filters['max_rating'])
#                     else:
#                         query['overall_rating'] = {'$lte': float(filters['max_rating'])}
#                 if 'has_response' in filters:
#                     if filters['has_response']:
#                         query['owner_response'] = {'$exists': True, '$ne': ''}
#                     else:
#                         query['owner_response'] = {'$exists': False}
#                 if 'is_public' in filters:
#                     query['is_public'] = bool(filters['is_public'])
#                 if 'is_verified' in filters:
#                     query['is_verified'] = bool(filters['is_verified'])
#                 if 'date_from' in filters:
#                     query['created_at'] = {'$gte': datetime.fromisoformat(filters['date_from'])}
#                 if 'date_to' in filters:
#                     if 'created_at' in query:
#                         query['created_at']['$lte'] = datetime.fromisoformat(filters['date_to'])
#                     else:
#                         query['created_at'] = {'$lte': datetime.fromisoformat(filters['date_to'])}
            
#             # Pagination
#             page = int(pagination.get('page', 1)) if pagination else 1
#             limit = int(pagination.get('limit', 50)) if pagination else 50
#             skip = (page - 1) * limit
            
#             # Get total count
#             total = self.reviews_collection.count_documents(query)
            
#             # Get reviews
#             reviews_cursor = self.reviews_collection.find(query).skip(skip).limit(limit)
            
#             # Sort
#             sort_by = filters.get('sort_by', 'created_at') if filters else 'created_at'
#             sort_order = -1 if sort_by == 'created_at' else 1
#             reviews_cursor = reviews_cursor.sort(sort_by, sort_order)
            
#             reviews = list(reviews_cursor)
            
#             # Format reviews with full details
#             formatted_reviews = []
#             for review in reviews:
#                 formatted_reviews.append(self._populate_review_details(review, include_gig=True, include_order=True))
            
#             return {
#                 'success': True,
#                 'reviews': formatted_reviews,
#                 'pagination': {
#                     'page': page,
#                     'limit': limit,
#                     'total': total,
#                     'pages': (total + limit - 1) // limit
#                 }
#             }
            
#         except Exception as e:
#             logging.error(f"Error getting all reviews: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def delete_review_admin(self, review_id: str) -> dict:
#         """Admin: Delete any review"""
#         try:
#             # Get review before deletion
#             review = self.reviews_collection.find_one({'_id': ObjectId(review_id)})
            
#             if not review:
#                 return {
#                     'success': False,
#                     'error': 'Review not found'
#                 }
            
#             # Delete review
#             result = self.reviews_collection.delete_one({'_id': ObjectId(review_id)})
            
#             if result.deleted_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Review not found'
#                 }
            
#             # Update freelancer rating
#             self._update_freelancer_rating(review['reviewee_id'])
            
#             # Update gig rating if gig_id exists
#             if 'gig_id' in review:
#                 self._update_gig_rating(review['gig_id'])
            
#             return {
#                 'success': True,
#                 'message': 'Review deleted successfully'
#             }
            
#         except Exception as e:
#             logging.error(f"Error deleting review (admin): {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def toggle_review_visibility(self, review_id: str, is_public: bool) -> dict:
#         """Admin: Toggle review visibility"""
#         try:
#             result = self.reviews_collection.update_one(
#                 {'_id': ObjectId(review_id)},
#                 {
#                     '$set': {
#                         'is_public': is_public,
#                         'updated_at': datetime.utcnow()
#                     }
#                 }
#             )
            
#             if result.modified_count == 0:
#                 return {
#                     'success': False,
#                     'error': 'Review not found or no changes made'
#                 }
            
#             return {
#                 'success': True,
#                 'message': f'Review {"made public" if is_public else "hidden"} successfully'
#             }
            
#         except Exception as e:
#             logging.error(f"Error toggling review visibility: {e}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     # Helper Methods
    
#     def _update_freelancer_rating(self, freelancer_id: ObjectId):
#         """Update freelancer's average rating and review count"""
#         try:
#             # Get all public reviews for this freelancer
#             reviews = list(self.reviews_collection.find({
#                 'reviewee_id': freelancer_id,
#                 'is_public': True
#             }))
            
#             total_reviews = len(reviews)
            
#             if total_reviews > 0:
#                 total_rating = sum(review['overall_rating'] for review in reviews)
#                 avg_rating = total_rating / total_reviews
                
#                 # Update freelancer
#                 self.users_collection.update_one(
#                     {'_id': freelancer_id},
#                     {
#                         '$set': {
#                             'rating': round(avg_rating, 2),
#                             'total_reviews': total_reviews
#                         }
#                     }
#                 )
#             else:
#                 # Reset if no reviews
#                 self.users_collection.update_one(
#                     {'_id': freelancer_id},
#                     {
#                         '$set': {
#                             'rating': 0,
#                             'total_reviews': 0
#                         }
#                     }
#                 )
                
#         except Exception as e:
#             logging.error(f"Error updating freelancer rating: {e}")
    
#     def _update_gig_rating(self, gig_id: ObjectId):
#         """Update gig's average rating and review count"""
#         try:
#             # Get all public reviews for this gig
#             reviews = list(self.reviews_collection.find({
#                 'gig_id': gig_id,
#                 'is_public': True
#             }))
            
#             total_reviews = len(reviews)
            
#             if total_reviews > 0:
#                 total_rating = sum(review['overall_rating'] for review in reviews)
#                 avg_rating = total_rating / total_reviews
                
#                 # Update gig
#                 self.gigs_collection.update_one(
#                     {'_id': gig_id},
#                     {
#                         '$set': {
#                             'gig_rating': round(avg_rating, 2),
#                             'gig_reviews': total_reviews
#                         }
#                     }
#                 )
#             else:
#                 # Reset if no reviews
#                 self.gigs_collection.update_one(
#                     {'_id': gig_id},
#                     {
#                         '$set': {
#                             'gig_rating': 0,
#                             'gig_reviews': 0
#                         }
#                     }
#                 )
                
#         except Exception as e:
#             logging.error(f"Error updating gig rating: {e}")
    
#     def _populate_review_details(self, review: dict, include_gig: bool = False, include_order: bool = False) -> dict:
#         """Populate review with user, gig, and order details"""
#         try:
#             # Convert ObjectId to string
#             review['_id'] = str(review['_id'])
            
#             # Get reviewer details
#             reviewer = self.users_collection.find_one(
#                 {'_id': review['reviewer_id']},
#                 {'password_hash': 0, 'email': 0}
#             )
            
#             if reviewer:
#                 review['reviewer'] = {
#                     '_id': str(reviewer['_id']),
#                     'username': reviewer['username'],
#                     'full_name': reviewer['full_name'],
#                     'avatar_url': reviewer.get('avatar_url'),
#                     'country': reviewer.get('country'),
#                     'total_reviews': reviewer.get('total_reviews', 0)
#                 }
            
#             # Get reviewee (freelancer) details
#             reviewee = self.users_collection.find_one(
#                 {'_id': review['reviewee_id']},
#                 {'password_hash': 0, 'email': 0}
#             )
            
#             if reviewee:
#                 review['freelancer'] = {
#                     '_id': str(reviewee['_id']),
#                     'username': reviewee['username'],
#                     'full_name': reviewee['full_name'],
#                     'avatar_url': reviewee.get('avatar_url'),
#                     'country': reviewee.get('country'),
#                     'rating': reviewee.get('rating', 0)
#                 }
            
#             # Get gig details if requested
#             if include_gig and 'gig_id' in review:
#                 gig = self.gigs_collection.find_one(
#                     {'_id': review['gig_id']}
#                 )
                
#                 if gig:
#                     review['gig'] = {
#                         '_id': str(gig['_id']),
#                         'title': gig['title'],
#                         'slug': gig.get('slug'),
#                         'base_price': gig.get('base_price')
#                     }
            
#             # Get order details if requested
#             if include_order:
#                 order = self.orders_collection.find_one(
#                     {'_id': review['order_id']}
#                 )
                
#                 if order:
#                     review['order'] = {
#                         '_id': str(order['_id']),
#                         'status': order.get('status'),
#                         'total_amount': order.get('total_amount'),
#                         'created_at': order.get('created_at')
#                     }
            
#             # Convert other ObjectIds to strings
#             for field in ['order_id', 'reviewer_id', 'reviewee_id', 'gig_id']:
#                 if field in review and isinstance(review[field], ObjectId):
#                     review[field] = str(review[field])
            
#             # Convert dates to ISO string
#             for field in ['created_at', 'updated_at', 'responded_at']:
#                 if field in review and isinstance(review[field], datetime):
#                     review[field] = review[field].isoformat()
            
#             return review
            
#         except Exception as e:
#             logging.error(f"Error populating review details: {e}")
#             return review
    
#     # def _format_review(self, review: dict) -> dict:
#     #     """Format a review with basic details"""
#     #     formatted = {}
        
#     #     # Convert ObjectId to string
#     #     for key, value in review.items():
#     #         if isinstance(value, ObjectId):
#     #             formatted[key] = str(value)
#     #         elif isinstance(value, datetime):
#     #             formatted[key] = value.isoformat()
#     #         else:
#     #             formatted[key] = value
        
#     #     return formatted
#     def _format_review(self, review: dict) -> dict:
#         """Format a review with basic details"""
#         if not review:
#             return {}
            
#         formatted = {}
        
#         for key, value in review.items():
#             if key == '_id' and isinstance(value, ObjectId):
#                 formatted[key] = str(value)
#             elif isinstance(value, ObjectId):
#                 # Convert other ObjectIds to strings
#                 formatted[key] = str(value)
#             elif isinstance(value, datetime):
#                 formatted[key] = value.isoformat()
#             elif isinstance(value, dict):
#                 # Recursively format nested dictionaries
#                 formatted[key] = self._format_review(value)
#             elif isinstance(value, list):
#                 # Handle lists - format each item if it's a dict
#                 formatted[key] = []
#                 for item in value:
#                     if isinstance(item, dict):
#                         formatted[key].append(self._format_review(item))
#                     elif isinstance(item, ObjectId):
#                         formatted[key].append(str(item))
#                     elif isinstance(item, datetime):
#                         formatted[key].append(item.isoformat())
#                     else:
#                         formatted[key].append(item)
#             else:
#                 formatted[key] = value
        
#         return formatted

from bson import ObjectId
from datetime import datetime
from .database import db
import logging

class ReviewService:
    def __init__(self):
        self.reviews_collection = db.get_collection('reviews')
        self.users_collection = db.get_collection('users')
        self.orders_collection = db.get_collection('orders')
        self.gigs_collection = db.get_collection('gigs')
    
    # Helper methods for ID handling
    def _convert_to_objectid(self, id_value):
        """Convert ID to ObjectId if it's a valid string, otherwise return as is"""
        if isinstance(id_value, str):
            try:
                return ObjectId(id_value)
            except:
                return id_value
        return id_value
    
    def _convert_to_string(self, id_value):
        """Convert ID to string if it's ObjectId, otherwise return as is"""
        if isinstance(id_value, ObjectId):
            return str(id_value)
        return id_value
    
    def _compare_ids(self, id1, id2):
        """Compare two IDs regardless of type"""
        str1 = str(id1) if isinstance(id1, ObjectId) else id1
        str2 = str(id2) if isinstance(id2, ObjectId) else id2
        return str1 == str2
    
    def _normalize_id_field(self, document, field_name):
        """Normalize a field in document to ObjectId if possible"""
        if field_name in document and document[field_name]:
            if isinstance(document[field_name], str):
                try:
                    document[field_name] = ObjectId(document[field_name])
                except:
                    pass
        return document
    
    # Client Functions
    
    def create_review(self, order_id: str, client_id: str, review_data: dict) -> dict:
        """Client creates a review for a completed order"""
        try:
            # Convert IDs to ObjectId
            try:
                client_obj_id = ObjectId(client_id)
                order_obj_id = ObjectId(order_id)
            except Exception as e:
                return {
                    'success': False,
                    'error': f'Invalid ID format: {str(e)}'
                }
            
            # Verify order exists and is completed
            order = self.orders_collection.find_one({
                '_id': order_obj_id,
                'status': 'completed'
            })
            
            if not order:
                return {
                    'success': False,
                    'error': 'Order not found or not completed'
                }
            
            # Check if client owns the order
            order_client_id = order.get('client_id')
            
            # Normalize order_client_id to string for comparison
            if isinstance(order_client_id, ObjectId):
                order_client_str = str(order_client_id)
            elif isinstance(order_client_id, str):
                order_client_str = order_client_id
            else:
                return {
                    'success': False,
                    'error': 'Invalid client ID in order'
                }
            
            if order_client_str != client_id:
                return {
                    'success': False,
                    'error': 'You are not the client for this order'
                }
            
            # Check if review already exists for this order
            existing_review = self.reviews_collection.find_one({
                'order_id': order_obj_id
            })
            
            if existing_review:
                return {
                    'success': False,
                    'error': 'Review already exists for this order'
                }
            
            # Get gig_id from review data and verify gig exists
            gig_id_input = review_data.get('gig_id')
            if not gig_id_input:
                return {
                    'success': False,
                    'error': 'Gig ID is required'
                }
            
            # Try to get gig by ObjectId first, then by string
            try:
                gig = self.gigs_collection.find_one({
                    '_id': ObjectId(gig_id_input)
                })
            except:
                gig = None
            
            if not gig:
                gig = self.gigs_collection.find_one({
                    '_id': gig_id_input
                })
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            # Get freelancer_id from order
            freelancer_id = order.get('freelancer_id')
            if not freelancer_id:
                return {
                    'success': False,
                    'error': 'Order does not have a freelancer'
                }
            
            # Prepare review data
            review_data['order_id'] = order_obj_id
            review_data['reviewer_id'] = client_obj_id
            review_data['reviewee_id'] = self._convert_to_objectid(freelancer_id)
            review_data['gig_id'] = self._convert_to_objectid(gig_id_input)
            
            # Validate required rating fields
            required_ratings = ['rating_communication', 'rating_quality', 'rating_deadline']
            for field in required_ratings:
                if field not in review_data:
                    return {
                        'success': False,
                        'error': f'Missing required field: {field}'
                    }
                
                rating = review_data[field]
                if not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
                    return {
                        'success': False,
                        'error': f'{field} must be a number between 1 and 5'
                    }
            
            # Calculate overall rating
            ratings = [
                float(review_data['rating_communication']),
                float(review_data['rating_quality']), 
                float(review_data['rating_deadline'])
            ]
            review_data['overall_rating'] = round(sum(ratings) / len(ratings), 1)
            
            # Add required text fields if missing
            if 'comment' not in review_data:
                review_data['comment'] = ''
            
            # Add timestamps
            review_data['created_at'] = datetime.utcnow()
            review_data['updated_at'] = datetime.utcnow()
            review_data['is_verified'] = True
            review_data['is_public'] = True
            
            # Insert review
            result = self.reviews_collection.insert_one(review_data)
            review_id = str(result.inserted_id)
            
            # Update freelancer rating and review count
            self._update_freelancer_rating(review_data['reviewee_id'])
            
            # Update gig rating
            self._update_gig_rating(review_data['gig_id'])
            
            # Get the inserted review from database to ensure proper formatting
            inserted_review = self.reviews_collection.find_one({'_id': result.inserted_id})
            
            return {
                'success': True,
                'review': self._format_review(inserted_review)
            }
            
        except Exception as e:
            logging.error(f"Error creating review: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_review(self, review_id: str, client_id: str, update_data: dict) -> dict:
        """Client updates their review"""
        try:
            # Convert IDs
            try:
                review_obj_id = ObjectId(review_id)
                client_obj_id = ObjectId(client_id)
            except Exception as e:
                return {
                    'success': False,
                    'error': f'Invalid ID format: {str(e)}'
                }
            
            # Verify review exists and belongs to client
            review = self.reviews_collection.find_one({
                '_id': review_obj_id
            })
            
            if not review:
                return {
                    'success': False,
                    'error': 'Review not found'
                }
            
            # Check if client owns the review
            if not self._compare_ids(review.get('reviewer_id'), client_id):
                return {
                    'success': False,
                    'error': 'Access denied - you do not own this review'
                }
            
            # Remove fields that shouldn't be updated
            protected_fields = ['order_id', 'reviewer_id', 'reviewee_id', 'gig_id', '_id', 'created_at', 'is_verified']
            for field in protected_fields:
                update_data.pop(field, None)
            
            # Recalculate overall rating if rating fields are updated
            rating_fields_updated = False
            rating_values = []
            
            for field in ['rating_communication', 'rating_quality', 'rating_deadline']:
                if field in update_data:
                    rating_fields_updated = True
                    rating = update_data[field]
                    if not isinstance(rating, (int, float)) or rating < 1 or rating > 5:
                        return {
                            'success': False,
                            'error': f'{field} must be a number between 1 and 5'
                        }
                    rating_values.append(float(rating))
                else:
                    # Use existing value from review
                    rating_values.append(float(review.get(field, 3)))
            
            if rating_fields_updated:
                update_data['overall_rating'] = round(sum(rating_values) / len(rating_values), 1)
            
            # Update review
            update_data['updated_at'] = datetime.utcnow()
            
            result = self.reviews_collection.update_one(
                {'_id': review_obj_id},
                {'$set': update_data}
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'No changes made'
                }
            
            # Update freelancer rating
            self._update_freelancer_rating(review['reviewee_id'])
            
            # Update gig rating if gig_id exists
            if 'gig_id' in review:
                self._update_gig_rating(review['gig_id'])
            
            # Get updated review
            updated_review = self.reviews_collection.find_one({'_id': review_obj_id})
            
            return {
                'success': True,
                'review': self._format_review(updated_review)
            }
            
        except Exception as e:
            logging.error(f"Error updating review: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_review(self, review_id: str, client_id: str) -> dict:
        """Client deletes their review"""
        try:
            # Convert IDs
            try:
                review_obj_id = ObjectId(review_id)
                client_obj_id = ObjectId(client_id)
            except Exception as e:
                return {
                    'success': False,
                    'error': f'Invalid ID format: {str(e)}'
                }
            
            # Verify review exists
            review = self.reviews_collection.find_one({
                '_id': review_obj_id
            })
            
            if not review:
                return {
                    'success': False,
                    'error': 'Review not found'
                }
            
            # Check if client owns the review
            if not self._compare_ids(review.get('reviewer_id'), client_id):
                return {
                    'success': False,
                    'error': 'Access denied - you do not own this review'
                }
            
            # Get reviewee_id and gig_id before deletion
            reviewee_id = review.get('reviewee_id')
            gig_id = review.get('gig_id')
            
            # Delete review
            result = self.reviews_collection.delete_one({'_id': review_obj_id})
            
            if result.deleted_count == 0:
                return {
                    'success': False,
                    'error': 'Review not found'
                }
            
            # Update freelancer rating
            if reviewee_id:
                self._update_freelancer_rating(reviewee_id)
            
            # Update gig rating if gig_id exists
            if gig_id:
                self._update_gig_rating(gig_id)
            
            return {
                'success': True,
                'message': 'Review deleted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deleting review: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # Freelancer Functions
    
    def respond_to_review(self, review_id: str, freelancer_id: str, response: str) -> dict:
        """Freelancer responds to a review"""
        try:
            # Convert IDs
            try:
                review_obj_id = ObjectId(review_id)
                freelancer_obj_id = ObjectId(freelancer_id)
            except Exception as e:
                return {
                    'success': False,
                    'error': f'Invalid ID format: {str(e)}'
                }
            
            review = self.reviews_collection.find_one({'_id': review_obj_id})
            
            if not review:
                return {
                    'success': False,
                    'error': 'Review not found'
                }
            
            # Verify freelancer owns the review (is the reviewee)
            if not self._compare_ids(review.get('reviewee_id'), freelancer_id):
                return {
                    'success': False,
                    'error': 'Access denied - you are not the reviewee'
                }
            
            # Validate response
            response = str(response).strip()
            if not response:
                return {
                    'success': False,
                    'error': 'Response cannot be empty'
                }
            
            if len(response) > 1000:
                return {
                    'success': False,
                    'error': 'Response too long (max 1000 characters)'
                }
            
            # Update review with response
            result = self.reviews_collection.update_one(
                {'_id': review_obj_id},
                {
                    '$set': {
                        'owner_response': response,
                        'responded_at': datetime.utcnow(),
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Review not found or no changes made'
                }
            
            return {
                'success': True,
                'message': 'Response added successfully'
            }
            
        except Exception as e:
            logging.error(f"Error responding to review: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # Public Functions
    
    def get_gig_reviews(self, gig_id: str, filters: dict = None) -> dict:
        """Get reviews for a specific gig"""
        try:
            # Convert gig_id to ObjectId for query
            try:
                gig_obj_id = ObjectId(gig_id)
            except:
                # Try to find gig by string ID first
                gig = self.gigs_collection.find_one({'_id': gig_id})
                if not gig:
                    return {
                        'success': False,
                        'error': 'Gig not found'
                    }
                gig_obj_id = gig['_id']
            
            # Build query
            query = {'gig_id': gig_obj_id, 'is_public': True}
            
            # Apply rating filter
            if filters and 'min_rating' in filters:
                try:
                    min_rating = float(filters['min_rating'])
                    if 1 <= min_rating <= 5:
                        query['overall_rating'] = {'$gte': min_rating}
                except:
                    pass
            
            # Apply additional filters
            if filters:
                if 'has_response' in filters:
                    if filters['has_response']:
                        query['owner_response'] = {'$exists': True, '$ne': ''}
                    else:
                        query['owner_response'] = {'$exists': False}
                if 'is_verified' in filters:
                    query['is_verified'] = bool(filters['is_verified'])
            
            # Pagination
            try:
                page = int(filters.get('page', 1)) if filters else 1
                limit = int(filters.get('limit', 10)) if filters else 10
                if page < 1:
                    page = 1
                if limit < 1 or limit > 100:
                    limit = 10
                skip = (page - 1) * limit
            except:
                page = 1
                limit = 10
                skip = 0
            
            # Get total count
            total = self.reviews_collection.count_documents(query)
            
            # Determine sort order
            sort_by = filters.get('sort_by', 'created_at') if filters else 'created_at'
            sort_order = -1 if sort_by == 'created_at' else -1
            
            # Get reviews with sorting
            reviews_cursor = self.reviews_collection.find(query).sort(sort_by, sort_order).skip(skip).limit(limit)
            
            reviews = list(reviews_cursor)
            
            # Format reviews with user details
            formatted_reviews = []
            for review in reviews:
                formatted_reviews.append(self._populate_review_details(review))
            
            return {
                'success': True,
                'reviews': formatted_reviews,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit if limit > 0 else 0
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting gig reviews: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_freelancer_reviews(self, freelancer_id: str, filters: dict = None) -> dict:
        """Get reviews for a freelancer"""
        try:
            # Convert freelancer_id to ObjectId for query
            try:
                freelancer_obj_id = ObjectId(freelancer_id)
            except:
                # Try to find freelancer by string ID
                freelancer = self.users_collection.find_one({'_id': freelancer_id, 'role': 'freelancer'})
                if not freelancer:
                    return {
                        'success': False,
                        'error': 'Freelancer not found'
                    }
                freelancer_obj_id = freelancer['_id']
            
            # Build query
            query = {'reviewee_id': freelancer_obj_id, 'is_public': True}
            
            # Apply filters
            if filters:
                if 'min_rating' in filters:
                    try:
                        min_rating = float(filters['min_rating'])
                        if 1 <= min_rating <= 5:
                            query['overall_rating'] = {'$gte': min_rating}
                    except:
                        pass
                if 'has_response' in filters:
                    if filters['has_response']:
                        query['owner_response'] = {'$exists': True, '$ne': ''}
                    else:
                        query['owner_response'] = {'$exists': False}
                if 'is_verified' in filters:
                    query['is_verified'] = bool(filters['is_verified'])
            
            # Pagination
            try:
                page = int(filters.get('page', 1)) if filters else 1
                limit = int(filters.get('limit', 10)) if filters else 10
                if page < 1:
                    page = 1
                if limit < 1 or limit > 100:
                    limit = 10
                skip = (page - 1) * limit
            except:
                page = 1
                limit = 10
                skip = 0
            
            # Get total count
            total = self.reviews_collection.count_documents(query)
            
            # Determine sort order
            sort_by = filters.get('sort_by', 'created_at') if filters else 'created_at'
            sort_order = -1 if sort_by == 'created_at' else -1
            
            # Get reviews with sorting
            reviews_cursor = self.reviews_collection.find(query).sort(sort_by, sort_order).skip(skip).limit(limit)
            
            reviews = list(reviews_cursor)
            
            # Format reviews with user and gig details
            formatted_reviews = []
            for review in reviews:
                formatted_reviews.append(self._populate_review_details(review, include_gig=True))
            
            return {
                'success': True,
                'reviews': formatted_reviews,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit if limit > 0 else 0
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting freelancer reviews: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_review_stats(self, freelancer_id: str) -> dict:
        """Get review statistics for a freelancer"""
        try:
            # Convert freelancer_id to ObjectId for query
            try:
                freelancer_obj_id = ObjectId(freelancer_id)
            except:
                # Try to find freelancer by string ID
                freelancer = self.users_collection.find_one({'_id': freelancer_id, 'role': 'freelancer'})
                if not freelancer:
                    return {
                        'success': False,
                        'error': 'Freelancer not found'
                    }
                freelancer_obj_id = freelancer['_id']
            
            # Get all public reviews for this freelancer
            # Try query with ObjectId first
            reviews = list(self.reviews_collection.find({
                'reviewee_id': freelancer_obj_id,
                'is_public': True
            }))
            
            # Also try with string ID
            if not reviews:
                reviews = list(self.reviews_collection.find({
                    'reviewee_id': str(freelancer_obj_id),
                    'is_public': True
                }))
            
            if not reviews:
                return {
                    'success': True,
                    'stats': {
                        'total_reviews': 0,
                        'average_rating': 0,
                        'rating_distribution': {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                        'average_communication': 0,
                        'average_quality': 0,
                        'average_deadline': 0,
                        'response_rate': 0,
                        'verified_reviews': 0,
                        'with_response': 0
                    }
                }
            
            # Calculate statistics
            total_reviews = len(reviews)
            
            # Initialize sums
            sum_overall = 0
            sum_communication = 0
            sum_quality = 0
            sum_deadline = 0
            
            # Rating distribution
            distribution = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0}
            
            # Response and verification counts
            responded_count = 0
            verified_count = 0
            
            for review in reviews:
                # Overall rating
                overall = review.get('overall_rating', 0)
                sum_overall += overall
                
                # Round for distribution
                rating_key = str(int(round(overall)))
                if rating_key in distribution:
                    distribution[rating_key] += 1
                
                # Individual ratings
                sum_communication += review.get('rating_communication', overall)
                sum_quality += review.get('rating_quality', overall)
                sum_deadline += review.get('rating_deadline', overall)
                
                # Response and verification
                if review.get('owner_response'):
                    responded_count += 1
                if review.get('is_verified', False):
                    verified_count += 1
            
            # Calculate averages
            avg_overall = sum_overall / total_reviews
            avg_communication = sum_communication / total_reviews
            avg_quality = sum_quality / total_reviews
            avg_deadline = sum_deadline / total_reviews
            
            # Response rate
            response_rate = (responded_count / total_reviews) * 100 if total_reviews > 0 else 0
            
            stats = {
                'total_reviews': total_reviews,
                'average_rating': round(avg_overall, 2),
                'rating_distribution': distribution,
                'average_communication': round(avg_communication, 2),
                'average_quality': round(avg_quality, 2),
                'average_deadline': round(avg_deadline, 2),
                'response_rate': round(response_rate, 2),
                'verified_reviews': verified_count,
                'with_response': responded_count
            }
            
            return {
                'success': True,
                'stats': stats
            }
            
        except Exception as e:
            logging.error(f"Error getting review stats: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # Admin Functions
    
    def get_all_reviews(self, filters: dict = None, pagination: dict = None) -> dict:
        """Admin: Get all reviews with filters"""
        try:
            query = {}
            
            # Apply filters
            if filters:
                if 'freelancer_id' in filters:
                    try:
                        query['reviewee_id'] = ObjectId(filters['freelancer_id'])
                    except:
                        query['reviewee_id'] = filters['freelancer_id']
                if 'client_id' in filters:
                    try:
                        query['reviewer_id'] = ObjectId(filters['client_id'])
                    except:
                        query['reviewer_id'] = filters['client_id']
                if 'gig_id' in filters:
                    try:
                        query['gig_id'] = ObjectId(filters['gig_id'])
                    except:
                        query['gig_id'] = filters['gig_id']
                if 'order_id' in filters:
                    try:
                        query['order_id'] = ObjectId(filters['order_id'])
                    except:
                        query['order_id'] = filters['order_id']
                
                # Rating filters
                if 'min_rating' in filters:
                    try:
                        min_rating = float(filters['min_rating'])
                        if 'overall_rating' in query:
                            if isinstance(query['overall_rating'], dict):
                                query['overall_rating']['$gte'] = min_rating
                            else:
                                query['overall_rating'] = {'$gte': min_rating, '$lte': query['overall_rating']}
                        else:
                            query['overall_rating'] = {'$gte': min_rating}
                    except:
                        pass
                
                if 'max_rating' in filters:
                    try:
                        max_rating = float(filters['max_rating'])
                        if 'overall_rating' in query:
                            if isinstance(query['overall_rating'], dict):
                                query['overall_rating']['$lte'] = max_rating
                            else:
                                query['overall_rating'] = {'$gte': query['overall_rating'], '$lte': max_rating}
                        else:
                            query['overall_rating'] = {'$lte': max_rating}
                    except:
                        pass
                
                # Boolean filters
                if 'has_response' in filters:
                    if filters['has_response']:
                        query['owner_response'] = {'$exists': True, '$ne': ''}
                    else:
                        query['owner_response'] = {'$exists': False}
                if 'is_public' in filters:
                    query['is_public'] = bool(filters['is_public'])
                if 'is_verified' in filters:
                    query['is_verified'] = bool(filters['is_verified'])
                
                # Date filters
                if 'date_from' in filters:
                    try:
                        date_from = datetime.fromisoformat(filters['date_from'].replace('Z', '+00:00'))
                        if 'created_at' in query:
                            if isinstance(query['created_at'], dict):
                                query['created_at']['$gte'] = date_from
                            else:
                                query['created_at'] = {'$gte': date_from, '$lte': query['created_at']}
                        else:
                            query['created_at'] = {'$gte': date_from}
                    except:
                        pass
                
                if 'date_to' in filters:
                    try:
                        date_to = datetime.fromisoformat(filters['date_to'].replace('Z', '+00:00'))
                        if 'created_at' in query:
                            if isinstance(query['created_at'], dict):
                                query['created_at']['$lte'] = date_to
                            else:
                                query['created_at'] = {'$gte': query['created_at'], '$lte': date_to}
                        else:
                            query['created_at'] = {'$lte': date_to}
                    except:
                        pass
            
            # Pagination
            try:
                page = int(pagination.get('page', 1)) if pagination else 1
                limit = int(pagination.get('limit', 50)) if pagination else 50
                if page < 1:
                    page = 1
                if limit < 1 or limit > 200:
                    limit = 50
                skip = (page - 1) * limit
            except:
                page = 1
                limit = 50
                skip = 0
            
            # Get total count
            total = self.reviews_collection.count_documents(query)
            
            # Determine sort order
            sort_by = filters.get('sort_by', 'created_at') if filters else 'created_at'
            sort_order = -1 if sort_by == 'created_at' else 1
            
            # Get reviews with sorting
            reviews_cursor = self.reviews_collection.find(query).sort(sort_by, sort_order).skip(skip).limit(limit)
            
            reviews = list(reviews_cursor)
            
            # Format reviews with full details
            formatted_reviews = []
            for review in reviews:
                formatted_reviews.append(self._populate_review_details(review, include_gig=True, include_order=True))
            
            return {
                'success': True,
                'reviews': formatted_reviews,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit if limit > 0 else 0
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting all reviews: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_review_admin(self, review_id: str) -> dict:
        """Admin: Delete any review"""
        try:
            # Convert review_id
            try:
                review_obj_id = ObjectId(review_id)
            except:
                return {
                    'success': False,
                    'error': 'Invalid review ID format'
                }
            
            # Get review before deletion
            review = self.reviews_collection.find_one({'_id': review_obj_id})
            
            if not review:
                return {
                    'success': False,
                    'error': 'Review not found'
                }
            
            # Get reviewee_id and gig_id before deletion
            reviewee_id = review.get('reviewee_id')
            gig_id = review.get('gig_id')
            
            # Delete review
            result = self.reviews_collection.delete_one({'_id': review_obj_id})
            
            if result.deleted_count == 0:
                return {
                    'success': False,
                    'error': 'Review not found'
                }
            
            # Update freelancer rating
            if reviewee_id:
                self._update_freelancer_rating(reviewee_id)
            
            # Update gig rating if gig_id exists
            if gig_id:
                self._update_gig_rating(gig_id)
            
            return {
                'success': True,
                'message': 'Review deleted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deleting review (admin): {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def toggle_review_visibility(self, review_id: str, is_public: bool) -> dict:
        """Admin: Toggle review visibility"""
        try:
            # Convert review_id
            try:
                review_obj_id = ObjectId(review_id)
            except:
                return {
                    'success': False,
                    'error': 'Invalid review ID format'
                }
            
            result = self.reviews_collection.update_one(
                {'_id': review_obj_id},
                {
                    '$set': {
                        'is_public': bool(is_public),
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Review not found or no changes made'
                }
            
            # If hiding a review, update ratings
            if not is_public:
                review = self.reviews_collection.find_one({'_id': review_obj_id})
                if review:
                    reviewee_id = review.get('reviewee_id')
                    gig_id = review.get('gig_id')
                    
                    if reviewee_id:
                        self._update_freelancer_rating(reviewee_id)
                    if gig_id:
                        self._update_gig_rating(gig_id)
            
            return {
                'success': True,
                'message': f'Review {"made public" if is_public else "hidden"} successfully'
            }
            
        except Exception as e:
            logging.error(f"Error toggling review visibility: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # Helper Methods
    
    def _update_freelancer_rating(self, freelancer_id):
        """Update freelancer's average rating and review count"""
        try:
            # Convert to ObjectId if it's a string
            freelancer_obj_id = self._convert_to_objectid(freelancer_id)
            
            # Build query for reviewee_id - try both ObjectId and string
            query = {
                'is_public': True,
                '$or': [
                    {'reviewee_id': freelancer_obj_id},
                    {'reviewee_id': str(freelancer_obj_id)}
                ]
            }
            
            # Get all public reviews for this freelancer
            reviews = list(self.reviews_collection.find(query))
            
            total_reviews = len(reviews)
            
            if total_reviews > 0:
                total_rating = sum(review['overall_rating'] for review in reviews)
                avg_rating = total_rating / total_reviews
                
                # Update freelancer
                self.users_collection.update_one(
                    {'_id': freelancer_obj_id},
                    {
                        '$set': {
                            'rating': round(avg_rating, 2),
                            'total_reviews': total_reviews
                        }
                    }
                )
            else:
                # Reset if no reviews
                self.users_collection.update_one(
                    {'_id': freelancer_obj_id},
                    {
                        '$set': {
                            'rating': 0,
                            'total_reviews': 0
                        }
                    }
                )
                
        except Exception as e:
            logging.error(f"Error updating freelancer rating: {e}")
    
    def _update_gig_rating(self, gig_id):
        """Update gig's average rating and review count"""
        try:
            # Convert to ObjectId if it's a string
            gig_obj_id = self._convert_to_objectid(gig_id)
            
            # Build query for gig_id - try both ObjectId and string
            query = {
                'is_public': True,
                '$or': [
                    {'gig_id': gig_obj_id},
                    {'gig_id': str(gig_obj_id)}
                ]
            }
            
            # Get all public reviews for this gig
            reviews = list(self.reviews_collection.find(query))
            
            total_reviews = len(reviews)
            
            if total_reviews > 0:
                total_rating = sum(review['overall_rating'] for review in reviews)
                avg_rating = total_rating / total_reviews
                
                # Update gig
                self.gigs_collection.update_one(
                    {'_id': gig_obj_id},
                    {
                        '$set': {
                            'gig_rating': round(avg_rating, 2),
                            'gig_reviews': total_reviews
                        }
                    }
                )
            else:
                # Reset if no reviews
                self.gigs_collection.update_one(
                    {'_id': gig_obj_id},
                    {
                        '$set': {
                            'gig_rating': 0,
                            'gig_reviews': 0
                        }
                    }
                )
                
        except Exception as e:
            logging.error(f"Error updating gig rating: {e}")
    
    def _populate_review_details(self, review: dict, include_gig: bool = False, include_order: bool = False) -> dict:
        """Populate review with user, gig, and order details"""
        try:
            if not review:
                return {}
            
            # Create a copy to avoid modifying the original
            populated = dict(review)
            
            # Convert ObjectId to string for _id
            if '_id' in populated and isinstance(populated['_id'], ObjectId):
                populated['_id'] = str(populated['_id'])
            
            # Get reviewer details
            reviewer_id = populated.get('reviewer_id')
            if reviewer_id:
                reviewer = self.users_collection.find_one(
                    {'_id': self._convert_to_objectid(reviewer_id)},
                    {'password_hash': 0, 'email': 0}
                )
                
                if reviewer:
                    populated['reviewer'] = {
                        '_id': str(reviewer['_id']) if isinstance(reviewer['_id'], ObjectId) else reviewer['_id'],
                        'username': reviewer.get('username', ''),
                        'full_name': reviewer.get('full_name', ''),
                        'avatar_url': reviewer.get('avatar_url', ''),
                        'country': reviewer.get('country', ''),
                        'total_reviews': reviewer.get('total_reviews', 0),
                        'rating': reviewer.get('rating', 0)
                    }
            
            # Get reviewee (freelancer) details
            reviewee_id = populated.get('reviewee_id')
            if reviewee_id:
                reviewee = self.users_collection.find_one(
                    {'_id': self._convert_to_objectid(reviewee_id)},
                    {'password_hash': 0, 'email': 0}
                )
                
                if reviewee:
                    populated['freelancer'] = {
                        '_id': str(reviewee['_id']) if isinstance(reviewee['_id'], ObjectId) else reviewee['_id'],
                        'username': reviewee.get('username', ''),
                        'full_name': reviewee.get('full_name', ''),
                        'avatar_url': reviewee.get('avatar_url', ''),
                        'country': reviewee.get('country', ''),
                        'rating': reviewee.get('rating', 0),
                        'total_reviews': reviewee.get('total_reviews', 0),
                        'completed_orders': reviewee.get('completed_orders', 0)
                    }
            
            # Get gig details if requested
            if include_gig:
                gig_id = populated.get('gig_id')
                if gig_id:
                    gig = self.gigs_collection.find_one(
                        {'_id': self._convert_to_objectid(gig_id)}
                    )
                    
                    if gig:
                        populated['gig'] = {
                            '_id': str(gig['_id']) if isinstance(gig['_id'], ObjectId) else gig['_id'],
                            'title': gig.get('title', ''),
                            'slug': gig.get('slug', ''),
                            'base_price': gig.get('base_price', 0),
                            'description': gig.get('description', ''),
                            'freelancer_id': gig.get('freelancer_id')
                        }
            
            # Get order details if requested
            if include_order:
                order_id = populated.get('order_id')
                if order_id:
                    order = self.orders_collection.find_one(
                        {'_id': self._convert_to_objectid(order_id)}
                    )
                    
                    if order:
                        populated['order'] = {
                            '_id': str(order['_id']) if isinstance(order['_id'], ObjectId) else order['_id'],
                            'order_number': order.get('order_number', ''),
                            'status': order.get('status', ''),
                            'total_amount': order.get('total_amount', 0),
                            'created_at': order.get('created_at'),
                            'deadline': order.get('deadline')
                        }
            
            # Convert other ObjectIds to strings
            for field in ['order_id', 'reviewer_id', 'reviewee_id', 'gig_id']:
                if field in populated and isinstance(populated[field], ObjectId):
                    populated[field] = str(populated[field])
            
            # Convert dates to ISO string
            for field in ['created_at', 'updated_at', 'responded_at']:
                if field in populated and isinstance(populated[field], datetime):
                    populated[field] = populated[field].isoformat()
            
            return populated
            
        except Exception as e:
            logging.error(f"Error populating review details: {e}")
            # Return basic formatted review if population fails
            return self._format_review(review)
    
    def _format_review(self, review: dict) -> dict:
        """Format a review with basic details"""
        if not review:
            return {}
            
        formatted = {}
        
        for key, value in review.items():
            if key == '_id' and isinstance(value, ObjectId):
                formatted[key] = str(value)
            elif isinstance(value, ObjectId):
                # Convert other ObjectIds to strings
                formatted[key] = str(value)
            elif isinstance(value, datetime):
                formatted[key] = value.isoformat()
            elif isinstance(value, dict):
                # Recursively format nested dictionaries
                formatted[key] = self._format_review(value)
            elif isinstance(value, list):
                # Handle lists - format each item if it's a dict
                formatted[key] = []
                for item in value:
                    if isinstance(item, dict):
                        formatted[key].append(self._format_review(item))
                    elif isinstance(item, ObjectId):
                        formatted[key].append(str(item))
                    elif isinstance(item, datetime):
                        formatted[key].append(item.isoformat())
                    else:
                        formatted[key].append(item)
            else:
                formatted[key] = value
        
        return formatted