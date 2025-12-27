# favorites_service.py - COMPLETE VERSION
from bson import ObjectId
from datetime import datetime
from .database import db
import logging

class FavoriteService:
    def __init__(self):
        self.favorites_collection = db.get_collection('favorites')
        self.gigs_collection = db.get_collection('gigs')
        self.users_collection = db.get_collection('users')
    
    def _serialize_favorite(self, favorite):
        """Serialize favorite data for RPC response"""
        if not favorite:
            return None
            
        serialized = {}
        for key, value in favorite.items():
            if isinstance(value, ObjectId):
                serialized[key] = str(value)
            elif isinstance(value, datetime):
                serialized[key] = value.isoformat()
            elif value is None:
                serialized[key] = ''
            else:
                serialized[key] = value
        return serialized
    
    def add_to_favorites(self, user_id: str, gig_id: str) -> dict:
        """Add a gig to user's favorites"""
        try:
            print(f"➕ Adding gig {gig_id} to favorites for user {user_id}")
            
            # Validate IDs
            if not ObjectId.is_valid(user_id):
                return {'success': False, 'error': 'Invalid user ID'}
            if not ObjectId.is_valid(gig_id):
                return {'success': False, 'error': 'Invalid gig ID'}
            
            # Verify gig exists
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            if not gig:
                return {'success': False, 'error': 'Gig not found'}
            
            # Verify user exists
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            if not user:
                return {'success': False, 'error': 'User not found'}
            
            # Check if already in favorites
            existing_favorite = self.favorites_collection.find_one({
                'user_id': ObjectId(user_id),
                'gig_id': ObjectId(gig_id)
            })
            
            if existing_favorite:
                return {'success': False, 'error': 'Gig already in favorites'}
            
            # Add to favorites
            favorite_data = {
                'user_id': ObjectId(user_id),
                'gig_id': ObjectId(gig_id),
                'created_at': datetime.utcnow()
            }
            
            result = self.favorites_collection.insert_one(favorite_data)
            
            print(f"✅ Gig added to favorites: {result.inserted_id}")
            return {
                'success': True,
                'message': 'Gig added to favorites',
                'favorite_id': str(result.inserted_id)
            }
            
        except Exception as e:
            logging.error(f"Error adding to favorites: {e}")
            return {'success': False, 'error': str(e)}
    
    def remove_from_favorites(self, user_id: str, gig_id: str) -> dict:
        """Remove a gig from user's favorites"""
        try:
            print(f"➖ Removing gig {gig_id} from favorites for user {user_id}")
            
            # Validate IDs
            if not ObjectId.is_valid(user_id):
                return {'success': False, 'error': 'Invalid user ID'}
            if not ObjectId.is_valid(gig_id):
                return {'success': False, 'error': 'Invalid gig ID'}
            
            result = self.favorites_collection.delete_one({
                'user_id': ObjectId(user_id),
                'gig_id': ObjectId(gig_id)
            })
            
            if result.deleted_count == 0:
                return {'success': False, 'error': 'Favorite not found'}
            
            print(f"✅ Gig removed from favorites")
            return {'success': True, 'message': 'Gig removed from favorites'}
            
        except Exception as e:
            logging.error(f"Error removing from favorites: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_user_favorites(self, user_id: str, filters: dict = None) -> dict:
        """Get user's favorite gigs"""
        try:
            print(f"📋 Getting favorites for user {user_id}")
            
            if not ObjectId.is_valid(user_id):
                return {'success': False, 'error': 'Invalid user ID'}
            
            # Verify user exists
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            if not user:
                return {'success': False, 'error': 'User not found'}
            
            # Pagination
            page = int(filters.get('page', 1)) if filters else 1
            limit = int(filters.get('limit', 12)) if filters else 12
            skip = (page - 1) * limit
            
            query = {'user_id': ObjectId(user_id)}
            
            # Get total count
            total = self.favorites_collection.count_documents(query)
            
            # Get favorites with gig details
            favorites = list(self.favorites_collection.aggregate([
                {'$match': query},
                {'$sort': {'created_at': -1}},
                {'$skip': skip},
                {'$limit': limit},
                {
                    '$lookup': {
                        'from': 'gigs',
                        'localField': 'gig_id',
                        'foreignField': '_id',
                        'as': 'gig'
                    }
                },
                {'$unwind': {'path': '$gig', 'preserveNullAndEmptyArrays': True}},
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'gig.freelancer_id',
                        'foreignField': '_id',
                        'as': 'freelancer'
                    }
                },
                {'$unwind': {'path': '$freelancer', 'preserveNullAndEmptyArrays': True}}
            ]))
            
            # Format response
            favorite_gigs = []
            for fav in favorites:
                if not fav.get('gig'):
                    continue  # Skip if gig was deleted
                    
                gig = fav['gig']
                freelancer = fav.get('freelancer', {})
                
                favorite_gigs.append({
                    'favorite_id': str(fav['_id']),
                    'gig': {
                        '_id': str(gig['_id']),
                        'title': gig.get('title', ''),
                        'description': gig.get('description', ''),
                        'base_price': gig.get('base_price', 0),
                        'currency': gig.get('currency', 'USD'),
                        'delivery_days': gig.get('delivery_days', 7),
                        'images_url': gig.get('images_url', []),
                        'gig_rating': gig.get('gig_rating', 0.0),
                        'gig_reviews': gig.get('gig_reviews', 0),
                        'category_id': str(gig.get('category_id', '')) if gig.get('category_id') else ''
                    },
                    'freelancer': {
                        '_id': str(freelancer.get('_id', '')) if freelancer else '',
                        'username': freelancer.get('username', ''),
                        'full_name': freelancer.get('full_name', ''),
                        'avatar_url': freelancer.get('avatar_url', ''),
                        'rating': freelancer.get('rating', 0.0),
                        'country': freelancer.get('country', '')
                    },
                    'added_at': fav['created_at'].isoformat() if fav.get('created_at') else ''
                })
            
            print(f"✅ Found {len(favorite_gigs)} favorite gigs")
            return {
                'success': True,
                'favorites': favorite_gigs,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit if total > 0 else 0
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting favorites: {e}")
            return {'success': False, 'error': str(e)}
    
    def is_favorite(self, user_id: str, gig_id: str) -> dict:
        """Check if a gig is in user's favorites"""
        try:
            print(f"🔍 Checking if gig {gig_id} is favorite for user {user_id}")
            
            if not ObjectId.is_valid(user_id):
                return {'success': False, 'error': 'Invalid user ID'}
            if not ObjectId.is_valid(gig_id):
                return {'success': False, 'error': 'Invalid gig ID'}
            
            favorite = self.favorites_collection.find_one({
                'user_id': ObjectId(user_id),
                'gig_id': ObjectId(gig_id)
            })
            
            is_fav = favorite is not None
            print(f"✅ Check complete: is_favorite = {is_fav}")
            
            return {
                'success': True,
                'is_favorite': is_fav,
                'favorite_id': str(favorite['_id']) if favorite else None
            }
            
        except Exception as e:
            logging.error(f"Error checking favorite: {e}")
            return {'success': False, 'error': str(e)}
    
    def clear_favorites(self, user_id: str) -> dict:
        """Remove all favorites for a user"""
        try:
            print(f"🗑️ Clearing all favorites for user {user_id}")
            
            if not ObjectId.is_valid(user_id):
                return {'success': False, 'error': 'Invalid user ID'}
            
            # Verify user exists
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            if not user:
                return {'success': False, 'error': 'User not found'}
            
            result = self.favorites_collection.delete_many({
                'user_id': ObjectId(user_id)
            })
            
            print(f"✅ Cleared {result.deleted_count} favorites")
            return {
                'success': True,
                'message': f'Cleared {result.deleted_count} favorites',
                'deleted_count': result.deleted_count
            }
            
        except Exception as e:
            logging.error(f"Error clearing favorites: {e}")
            return {'success': False, 'error': str(e)}
    
    def get_favorites_count(self, user_id: str) -> dict:
        """Get count of user's favorites"""
        try:
            if not ObjectId.is_valid(user_id):
                return {'success': False, 'error': 'Invalid user ID'}
            
            count = self.favorites_collection.count_documents({
                'user_id': ObjectId(user_id)
            })
            
            return {
                'success': True,
                'count': count
            }
            
        except Exception as e:
            logging.error(f"Error getting favorites count: {e}")
            return {'success': False, 'error': str(e)}