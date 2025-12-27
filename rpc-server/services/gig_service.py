

from bson import ObjectId
from datetime import datetime
from typing import List, Dict, Any
from .database import db
import logging
import re
from slugify import slugify  # You might need to install: pip install python-slugify

class GigService:
    def __init__(self):
        self.gigs_collection = db.get_collection('gigs')
        self.users_collection = db.get_collection('users')
        self.categories_collection = db.get_collection('categories')
        # Supprimé: self.reviews_collection = db.get_collection('reviews')
        # La fonction get_gig_reviews a été déplacée vers ReviewService
    
    # ==================== PUBLIC FUNCTIONS ====================
    
    def get_all_gigs(self, filters: dict = None, pagination: dict = None) -> dict:
        """Get all gigs with filters and pagination"""
        try:
            query = {}
            
            # Apply filters
            if filters:
                if filters.get('status'):
                    query['status'] = filters['status']
                else:
                    query['status'] = 'active'
                    
                if filters.get('category_id'):
                    query['category_id'] = ObjectId(filters['category_id'])
                    
                if filters.get('freelancer_id'):
                    query['freelancer_id'] = ObjectId(filters['freelancer_id'])
                    
                if filters.get('min_price'):
                    query['base_price'] = {'$gte': float(filters['min_price'])}
                    
                if filters.get('max_price'):
                    if 'base_price' in query:
                        query['base_price']['$lte'] = float(filters['max_price'])
                    else:
                        query['base_price'] = {'$lte': float(filters['max_price'])}
                    
                if filters.get('is_featured'):
                    query['is_featured'] = filters['is_featured'] == 'true'
                    
                if filters.get('is_urgent'):
                    query['is_urgent'] = filters['is_urgent'] == 'true'
                    
                if filters.get('min_rating'):
                    query['gig_rating'] = {'$gte': float(filters['min_rating'])}
            
            # Default to active gigs if no status filter
            if 'status' not in query:
                query['status'] = 'active'
            
            # Set up pagination
            page = pagination.get('page', 1) if pagination else 1
            limit = pagination.get('limit', 12) if pagination else 12
            skip = (page - 1) * limit
            
            # Set up sorting
            sort_field = pagination.get('sort_by', 'created_at') if pagination else 'created_at'
            sort_order = -1 if pagination and pagination.get('sort_order') == 'desc' else 1
            sort = [(sort_field, sort_order)]
            
            # Get total count
            total = self.gigs_collection.count_documents(query)
            
            # Get gigs
            gigs = list(self.gigs_collection.find(query)
                        .skip(skip)
                        .limit(limit)
                        .sort(sort))
            
            # Process and populate gigs
            gigs_response = self._process_gigs_list(gigs)
            
            return {
                'success': True,
                'gigs': gigs_response,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting all gigs: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_gig_by_id(self, gig_id: str) -> dict:
        """Get gig by ID"""
        try:
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            return self._process_single_gig(gig)
            
        except Exception as e:
            logging.error(f"Error getting gig: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_gig_by_slug(self, slug: str) -> dict:
        """Get gig by slug"""
        try:
            gig = self.gigs_collection.find_one({'slug': slug, 'status': 'active'})
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            return self._process_single_gig(gig)
            
        except Exception as e:
            logging.error(f"Error getting gig by slug: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def search_gigs(self,  search_query: str = None,filters: dict = None) -> dict:
        """Search gigs with text search and filters"""
        try:
            query = {'status': 'active'}
            
            # Text search
            if search_query:
                query['$text'] = {'$search': search_query}
            
            # Apply filters
            if filters:
                if filters.get('category_id'):
                    query['category_id'] = ObjectId(filters['category_id'])
                    
                if filters.get('min_price'):
                    query['base_price'] = {'$gte': float(filters['min_price'])}
                    
                if filters.get('max_price'):
                    if 'base_price' in query:
                        query['base_price']['$lte'] = float(filters['max_price'])
                    else:
                        query['base_price'] = {'$lte': float(filters['max_price'])}
                        
                if filters.get('delivery_days'):
                    query['delivery_days'] = {'$lte': int(filters['delivery_days'])}
                    
                if filters.get('pricing_type'):
                    query['pricing_type'] = filters['pricing_type']
                    
                if filters.get('is_urgent'):
                    query['is_urgent'] = filters['is_urgent'] == 'true'
            
            # Pagination
            page = filters.get('page', 1) if filters else 1
            limit = filters.get('limit', 12) if filters else 12
            skip = (page - 1) * limit
            
            # Sort by relevance if text search, otherwise by created date
            if search_query:
                sort = [('score', {'$meta': 'textScore'})]
            else:
                sort_field = filters.get('sort_by', 'created_at') if filters else 'created_at'
                sort_order = -1 if filters and filters.get('sort_order') == 'desc' else 1
                sort = [(sort_field, sort_order)]
            
            # Get total count
            total = self.gigs_collection.count_documents(query)
            
            # Get gigs
            if search_query:
                gigs = list(self.gigs_collection.find(
                    query, 
                    {'score': {'$meta': 'textScore'}}
                ).skip(skip).limit(limit).sort(sort))
            else:
                gigs = list(self.gigs_collection.find(query).skip(skip).limit(limit).sort(sort))
            
            # Process and populate gigs
            gigs_response = self._process_gigs_list(gigs)
            
            return {
                'success': True,
                'gigs': gigs_response,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error searching gigs: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_featured_gigs(self) -> dict:
        """Get featured gigs"""
        try:
            query = {
                'status': 'active',
                'is_featured': True
            }
            
            # Get featured gigs, limited to 12
            gigs = list(self.gigs_collection.find(query)
                        .sort('created_at', -1)
                        .limit(12))
            
            gigs_response = self._process_gigs_list(gigs)
            
            return {
                'success': True,
                'gigs': gigs_response
            }
            
        except Exception as e:
            logging.error(f"Error getting featured gigs: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_related_gigs(self, gig_id: str, category_id: str = None) -> dict:
        """Get related gigs"""
        try:
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            # Use provided category_id or get from gig
            cat_id = ObjectId(category_id) if category_id else gig['category_id']
            
            # Query for related gigs (same category, excluding current gig)
            query = {
                '_id': {'$ne': ObjectId(gig_id)},
                'category_id': cat_id,
                'status': 'active'
            }
            
            # Get related gigs
            gigs = list(self.gigs_collection.find(query)
                        .sort([('gig_rating', -1), ('total_orders', -1)])
                        .limit(6))
            
            gigs_response = self._process_gigs_list(gigs)
            
            return {
                'success': True,
                'gigs': gigs_response
            }
            
        except Exception as e:
            logging.error(f"Error getting related gigs: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # NOTE: La fonction get_gig_reviews a été déplacée vers ReviewService
    # Utilisez review_service.get_gig_reviews() à la place
    
    # ==================== FREELANCER FUNCTIONS ====================
    
    def create_gig(self, freelancer_id: str, gig_data: dict) -> dict:
        """Create a new gig"""
        try:
            # Verify freelancer exists and is a freelancer
            freelancer = self.users_collection.find_one({
                '_id': ObjectId(freelancer_id),
                'role': 'freelancer'
            })
            
            if not freelancer:
                return {
                    'success': False,
                    'error': 'Freelancer not found or not authorized'
                }
            
            # Verify category exists
            if 'category_id' in gig_data:
                category = self.categories_collection.find_one({
                    '_id': ObjectId(gig_data['category_id'])
                })
                
                if not category:
                    return {
                        'success': False,
                        'error': 'Category not found'
                    }
            
            # Generate slug
            slug = self._generate_unique_slug(gig_data['title'])
            
            # Prepare gig document
            gig_doc = {
                'freelancer_id': ObjectId(freelancer_id),
                'title': gig_data['title'],
                'description': gig_data['description'],
                'base_price': float(gig_data['base_price']),
                'delivery_days': int(gig_data['delivery_days']),
                'slug': slug,
                'status': gig_data.get('status', 'draft'),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add optional fields
            optional_fields = [
                'category_id', 'currency', 'pricing_type', 'revisions_included',
                'extra_revision_price', 'package_details', 'images_url',
                'video_url', 'requirements_description', 'search_tags',
                'is_urgent'
            ]
            
            for field in optional_fields:
                if field in gig_data:
                    if field in ['category_id']:
                        gig_doc[field] = ObjectId(gig_data[field])
                    elif field in ['revisions_included']:
                        gig_doc[field] = int(gig_data[field])
                    elif field in ['base_price', 'extra_revision_price']:
                        gig_doc[field] = float(gig_data[field])
                    else:
                        gig_doc[field] = gig_data[field]
            
            # Set defaults
            gig_doc.setdefault('currency', 'USD')
            gig_doc.setdefault('pricing_type', 'fixed')
            gig_doc.setdefault('revisions_included', 1)
            gig_doc.setdefault('search_tags', [])
            gig_doc.setdefault('images_url', [])
            gig_doc.setdefault('is_featured', False)
            gig_doc.setdefault('is_urgent', False)
            gig_doc.setdefault('total_orders', 0)
            gig_doc.setdefault('total_earning', 0.0)
            gig_doc.setdefault('gig_rating', 0.0)
            gig_doc.setdefault('gig_reviews', 0)
            
            # Set published_at if status is active
            if gig_doc['status'] == 'active':
                gig_doc['published_at'] = datetime.utcnow()
            
            # Insert gig
            result = self.gigs_collection.insert_one(gig_doc)
            
            # Get the created gig
            created_gig = self.gigs_collection.find_one({'_id': result.inserted_id})
            
            return self._process_single_gig(created_gig)
            
        except Exception as e:
            logging.error(f"Error creating gig: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_gig(self, gig_id: str, freelancer_id: str, update_data: dict) -> dict:
        """Update a gig"""
        try:
            # Check if gig exists and belongs to freelancer
            gig = self.gigs_collection.find_one({
                '_id': ObjectId(gig_id),
                'freelancer_id': ObjectId(freelancer_id)
            })
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found or not authorized'
                }
            
            # Prepare update document
            update_doc = {'updated_at': datetime.utcnow()}
            
            # Update fields
            updatable_fields = [
                'title', 'description', 'category_id', 'base_price',
                'delivery_days', 'currency', 'pricing_type', 'revisions_included',
                'extra_revision_price', 'package_details', 'requirements_description',
                'search_tags', 'video_url', 'status', 'is_urgent'
            ]
            
            for field in updatable_fields:
                if field in update_data:
                    if field in ['category_id']:
                        update_doc[field] = ObjectId(update_data[field])
                    elif field in ['base_price', 'extra_revision_price']:
                        update_doc[field] = float(update_data[field])
                    elif field in ['delivery_days', 'revisions_included']:
                        update_doc[field] = int(update_data[field])
                    else:
                        update_doc[field] = update_data[field]
            
            # Update slug if title changed
            if 'title' in update_data:
                update_doc['slug'] = self._generate_unique_slug(update_data['title'], gig_id)
            
            # Set published_at if status changed to active
            if update_data.get('status') == 'active' and gig['status'] != 'active':
                update_doc['published_at'] = datetime.utcnow()
            
            # Update gig
            self.gigs_collection.update_one(
                {'_id': ObjectId(gig_id)},
                {'$set': update_doc}
            )
            
            # Get updated gig
            updated_gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            return self._process_single_gig(updated_gig)
            
        except Exception as e:
            logging.error(f"Error updating gig: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_gig(self, gig_id: str, freelancer_id: str) -> dict:
        """Delete a gig"""
        try:
            # Check if gig exists and belongs to freelancer
            gig = self.gigs_collection.find_one({
                '_id': ObjectId(gig_id),
                'freelancer_id': ObjectId(freelancer_id)
            })
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found or not authorized'
                }
            
            # Check if gig has orders
            if gig.get('total_orders', 0) > 0:
                return {
                    'success': False,
                    'error': 'Cannot delete gig with existing orders'
                }
            
            # Delete gig
            result = self.gigs_collection.delete_one({'_id': ObjectId(gig_id)})
            
            if result.deleted_count > 0:
                return {
                    'success': True,
                    'message': 'Gig deleted successfully'
                }
            else:
                return {
                    'success': False,
                    'error': 'Failed to delete gig'
                }
            
        except Exception as e:
            logging.error(f"Error deleting gig: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_my_gigs(self, freelancer_id: str, filters: dict = None) -> dict:
        """Get freelancer's gigs"""
        try:
            query = {'freelancer_id': ObjectId(freelancer_id)}
            
            # Apply filters
            if filters:
                if filters.get('status'):
                    query['status'] = filters['status']
                    
                if filters.get('category_id'):
                    query['category_id'] = ObjectId(filters['category_id'])
            
            # Pagination
            page = filters.get('page', 1) if filters else 1
            limit = filters.get('limit', 20) if filters else 20
            skip = (page - 1) * limit
            
            # Get total count
            total = self.gigs_collection.count_documents(query)
            
            # Get gigs
            gigs = list(self.gigs_collection.find(query)
                        .skip(skip)
                        .limit(limit)
                        .sort('created_at', -1))
            
            gigs_response = self._process_gigs_list(gigs, include_freelancer=False)
            
            return {
                'success': True,
                'gigs': gigs_response,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting my gigs: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def toggle_gig_status(self, gig_id: str, freelancer_id: str, status: str) -> dict:
        """Toggle gig status"""
        try:
            # Check if gig exists and belongs to freelancer
            gig = self.gigs_collection.find_one({
                '_id': ObjectId(gig_id),
                'freelancer_id': ObjectId(freelancer_id)
            })
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found or not authorized'
                }
            
            # Validate status
            valid_statuses = ['active', 'paused', 'draft']
            if status not in valid_statuses:
                return {
                    'success': False,
                    'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'
                }
            
            # Update status
            update_data = {
                'status': status,
                'updated_at': datetime.utcnow()
            }
            
            # Set published_at if activating gig
            if status == 'active' and gig['status'] != 'active':
                update_data['published_at'] = datetime.utcnow()
            
            self.gigs_collection.update_one(
                {'_id': ObjectId(gig_id)},
                {'$set': update_data}
            )
            
            # Get updated gig
            updated_gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            return {
                'success': True,
                'gig': self._process_single_gig(updated_gig)['gig']
            }
            
        except Exception as e:
            logging.error(f"Error toggling gig status: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_gig_images(self, gig_id: str, freelancer_id: str, images: list) -> dict:
        """Update gig images"""
        try:
            # Check if gig exists and belongs to freelancer
            gig = self.gigs_collection.find_one({
                '_id': ObjectId(gig_id),
                'freelancer_id': ObjectId(freelancer_id)
            })
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found or not authorized'
                }
            
            # Update images
            self.gigs_collection.update_one(
                {'_id': ObjectId(gig_id)},
                {
                    '$set': {
                        'images_url': images,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            # Get updated gig
            updated_gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            return {
                'success': True,
                'gig': self._process_single_gig(updated_gig)['gig']
            }
            
        except Exception as e:
            logging.error(f"Error updating gig images: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_gig_analytics(self, gig_id: str, freelancer_id: str) -> dict:
        """Get gig analytics"""
        try:
            # Check if gig exists and belongs to freelancer
            gig = self.gigs_collection.find_one({
                '_id': ObjectId(gig_id),
                'freelancer_id': ObjectId(freelancer_id)
            })
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found or not authorized'
                }
            
            # Get orders data (you need to adjust based on your orders collection)
            # This is a simplified example
            orders_collection = db.get_collection('orders')
            
            # Count orders by status
            orders_stats = list(orders_collection.aggregate([
                {'$match': {'gig_id': ObjectId(gig_id)}},
                {'$group': {
                    '_id': '$status',
                    'count': {'$sum': 1},
                    'total_amount': {'$sum': '$amount'}
                }}
            ]))
            
            # Get monthly orders
            monthly_orders = list(orders_collection.aggregate([
                {'$match': {'gig_id': ObjectId(gig_id), 'status': 'completed'}},
                {'$group': {
                    '_id': {
                        'year': {'$year': '$created_at'},
                        'month': {'$month': '$created_at'}
                    },
                    'count': {'$sum': 1},
                    'revenue': {'$sum': '$amount'}
                }},
                {'$sort': {'_id.year': -1, '_id.month': -1}},
                {'$limit': 6}
            ]))
            
            # Get recent reviews - Utiliser le ReviewService pour cela
            # Cette partie devra être mise à jour pour utiliser review_service
            recent_reviews = []  # Placeholder - à remplacer par l'appel au service de reviews
            
            analytics = {
                'gig_stats': {
                    'total_orders': gig.get('total_orders', 0),
                    'total_earning': gig.get('total_earning', 0),
                    'gig_rating': gig.get('gig_rating', 0),
                    'gig_reviews': gig.get('gig_reviews', 0)
                },
                'orders_by_status': {
                    item['_id']: {
                        'count': item['count'],
                        'total_amount': item.get('total_amount', 0)
                    } for item in orders_stats
                },
                'monthly_stats': monthly_orders,
                'recent_reviews': recent_reviews
            }
            
            return {
                'success': True,
                'analytics': analytics
            }
            
        except Exception as e:
            logging.error(f"Error getting gig analytics: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== ADMIN FUNCTIONS ====================
    
    def get_all_gigs_admin(self, filters: dict = None, pagination: dict = None) -> dict:
        """Get all gigs for admin"""
        try:
            query = {}
            
            # Apply filters
            if filters:
                if filters.get('status'):
                    query['status'] = filters['status']
                    
                if filters.get('freelancer_id'):
                    query['freelancer_id'] = ObjectId(filters['freelancer_id'])
                    
                if filters.get('category_id'):
                    query['category_id'] = ObjectId(filters['category_id'])
                    
                if filters.get('is_featured'):
                    query['is_featured'] = filters['is_featured'] == 'true'
                    
                if filters.get('search'):
                    query['$text'] = {'$search': filters['search']}
            
            # Pagination
            page = pagination.get('page', 1) if pagination else 1
            limit = pagination.get('limit', 50) if pagination else 50
            skip = (page - 1) * limit
            
            # Sorting
            sort_field = pagination.get('sort_by', 'created_at') if pagination else 'created_at'
            sort_order = -1 if pagination and pagination.get('sort_order') == 'desc' else 1
            sort = [(sort_field, sort_order)]
            
            # Get total count
            total = self.gigs_collection.count_documents(query)
            
            # Get gigs
            gigs = list(self.gigs_collection.find(query)
                        .skip(skip)
                        .limit(limit)
                        .sort(sort))
            
            gigs_response = self._process_gigs_list(gigs, include_freelancer=True)
            
            return {
                'success': True,
                'gigs': gigs_response,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting all gigs admin: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_gig_status_admin(self, gig_id: str, status: str) -> dict:
        """Update gig status (admin)"""
        try:
            # Check if gig exists
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            # Validate status
            valid_statuses = ['active', 'paused', 'draft', 'rejected']
            if status not in valid_statuses:
                return {
                    'success': False,
                    'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'
                }
            
            # Update status
            update_data = {
                'status': status,
                'updated_at': datetime.utcnow()
            }
            
            self.gigs_collection.update_one(
                {'_id': ObjectId(gig_id)},
                {'$set': update_data}
            )
            
            # Get updated gig
            updated_gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            return {
                'success': True,
                'gig': self._process_single_gig(updated_gig)['gig']
            }
            
        except Exception as e:
            logging.error(f"Error updating gig status admin: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def feature_gig(self, gig_id: str, featured: bool) -> dict:
        """Feature/unfeature a gig (admin)"""
        try:
            # Check if gig exists
            gig = self.gigs_collection.find_one({'_id': ObjectId(gig_id)})
            
            if not gig:
                return {
                    'success': False,
                    'error': 'Gig not found'
                }
            
            # Update featured status
            self.gigs_collection.update_one(
                {'_id': ObjectId(gig_id)},
                {
                    '$set': {
                        'is_featured': featured,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            return {
                'success': True,
                'message': f'Gig {"featured" if featured else "unfeatured"} successfully'
            }
            
        except Exception as e:
            logging.error(f"Error featuring gig: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== HELPER FUNCTIONS ====================
    
    def _process_single_gig(self, gig: dict) -> dict:
        """Process a single gig document"""
        try:
            if not gig:
                return {'success': False, 'error': 'Gig not found'}
            
            gig_response = gig.copy()
            gig_response['_id'] = str(gig['_id'])
            
            # Convert ObjectId fields to string
            for field in ['freelancer_id', 'category_id']:
                if field in gig_response and gig_response[field]:
                    gig_response[field] = str(gig_response[field])
            
            # Populate freelancer details
            freelancer = self.users_collection.find_one(
                {'_id': gig['freelancer_id']},
                {'password_hash': 0}
            )
            
            if freelancer:
                gig_response['freelancer'] = {
                    '_id': str(freelancer['_id']),
                    'username': freelancer['username'],
                    'full_name': freelancer['full_name'],
                    'avatar_url': freelancer.get('avatar_url'),
                    'rating': freelancer.get('rating', 0.0),
                    'country': freelancer.get('country'),
                    'member_since': freelancer.get('created_at')
                }
            
            # Populate category details
            category = self.categories_collection.find_one(
                {'_id': gig['category_id']}
            )
            
            if category:
                gig_response['category'] = {
                    '_id': str(category['_id']),
                    'name': category['name'],
                    'slug': category.get('slug'),
                    'icon': category.get('icon')
                }
            
            return {
                'success': True,
                'gig': gig_response
            }
            
        except Exception as e:
            logging.error(f"Error processing gig: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _process_gigs_list(self, gigs: list, include_freelancer: bool = True) -> list:
        """Process a list of gig documents"""
        try:
            gigs_response = []
            
            for gig in gigs:
                gig_dict = gig.copy()
                gig_dict['_id'] = str(gig['_id'])
                
                # Convert ObjectId fields to string
                for field in ['freelancer_id', 'category_id']:
                    if field in gig_dict and gig_dict[field]:
                        gig_dict[field] = str(gig_dict[field])
                
                # Populate freelancer details if requested
                if include_freelancer:
                    freelancer = self.users_collection.find_one(
                        {'_id': gig['freelancer_id']},
                        {'username': 1, 'full_name': 1, 'avatar_url': 1, 'rating': 1}
                    )
                    
                    if freelancer:
                        gig_dict['freelancer'] = {
                            '_id': str(freelancer['_id']),
                            'username': freelancer['username'],
                            'full_name': freelancer['full_name'],
                            'avatar_url': freelancer.get('avatar_url'),
                            'rating': freelancer.get('rating', 0.0)
                        }
                
                gigs_response.append(gig_dict)
            
            return gigs_response
            
        except Exception as e:
            logging.error(f"Error processing gigs list: {e}")
            return []
    
    def _generate_unique_slug(self, title: str, exclude_gig_id: str = None) -> str:
        """Generate a unique slug from title"""
        # Generate base slug
        slug = slugify(title)
        
        # Check if slug exists
        query = {'slug': slug}
        if exclude_gig_id:
            query['_id'] = {'$ne': ObjectId(exclude_gig_id)}
        
        existing = self.gigs_collection.find_one(query)
        
        # If slug exists, append counter
        counter = 1
        base_slug = slug
        while existing:
            slug = f"{base_slug}-{counter}"
            query['slug'] = slug
            existing = self.gigs_collection.find_one(query)
            counter += 1
        
        return slug