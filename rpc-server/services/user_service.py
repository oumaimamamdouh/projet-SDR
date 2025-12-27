import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from bson import ObjectId
from dotenv import load_dotenv
from .database import db
import logging
from typing import List, Dict, Any, Optional

# Load environment variables
load_dotenv()

class UserService:
    def __init__(self):
        self.users_collection = db.get_collection('users')
        self.JWT_SECRET = os.getenv('JWT_SECRET', 'fallback-secret-key-change-me')
        self.JWT_REFRESH_SECRET = os.getenv('JWT_REFRESH_SECRET', 'fallback-refresh-secret-key-change-me')
        
        if self.JWT_SECRET == 'fallback-secret-key-change-me':
            logging.warning("🚨 Using default JWT secret! Change JWT_SECRET in production!")
    
    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    def verify_password(self, password: str, hashed: str) -> bool:
        """Verify a password against its hash"""
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    
    # ==================== AUTHENTICATION METHODS ====================
    

    
    def login_user(self, credentials: dict) -> dict:
        """Login user with email and password"""
        email = credentials.get('email')
        password = credentials.get('password')
        
        if not email or not password:
            return {
                'success': False,
                'error': 'Email and password are required'
            }
        
        return self.authenticate_user(email, password)
    
    def logout_user(self, user_id: str) -> dict:
        """Logout user - In RPC context, token invalidation is client-side"""
        try:
            # Update last login timestamp
            self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': {'last_login': datetime.utcnow()}}
            )
            
            return {
                'success': True,
                'message': 'User logged out successfully'
            }
        except Exception as e:
            logging.error(f"Error during logout: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def refresh_token(self, refresh_token: str) -> dict:
        """Refresh access token using refresh token"""
        try:
            # Decode refresh token
            payload = jwt.decode(refresh_token, self.JWT_REFRESH_SECRET, algorithms=['HS256'])
            
            # Verify user exists and is active
            user = self.users_collection.find_one({
                '_id': ObjectId(payload['user_id']),
                'is_active': True
            })
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found or inactive'
                }
            
            # Generate new access token
            token_payload = {
                'user_id': str(user['_id']),
                'email': user['email'],
                'role': user['role'],
                'exp': datetime.utcnow() + timedelta(days=7)
            }
            
            new_token = jwt.encode(token_payload, self.JWT_SECRET, algorithm='HS256')
            
            return {
                'success': True,
                'token': new_token,
                'user': {
                    '_id': str(user['_id']),
                    'email': user['email'],
                    'username': user['username'],
                    'role': user['role'],
                    'full_name': user['full_name']
                }
            }
            
        except jwt.ExpiredSignatureError:
            return {
                'success': False,
                'error': 'Refresh token expired'
            }
        except jwt.InvalidTokenError:
            return {
                'success': False,
                'error': 'Invalid refresh token'
            }
        except Exception as e:
            logging.error(f"Error refreshing token: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def forgot_password(self, email: str) -> dict:
        """Initiate password reset process"""
        try:
            # Find user by email
            user = self.users_collection.find_one({'email': email})
            
            if not user:
                # Don't reveal that user doesn't exist for security
                return {
                    'success': True,
                    'message': 'If an account exists with this email, you will receive a reset link'
                }
            
            # In a real implementation, you would:
            # 1. Generate a reset token
            # 2. Store it in database with expiry
            # 3. Send email with reset link
            
            reset_token = jwt.encode(
                {
                    'user_id': str(user['_id']),
                    'email': user['email'],
                    'type': 'password_reset',
                    'exp': datetime.utcnow() + timedelta(hours=1)
                },
                self.JWT_SECRET,
                algorithm='HS256'
            )
            
            # For now, just return success (email sending would be implemented separately)
            return {
                'success': True,
                'message': 'Password reset email sent',
                'token': reset_token  # In production, don't return token in response
            }
            
        except Exception as e:
            logging.error(f"Error in forgot_password: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def reset_password(self, token: str, new_password: str) -> dict:
        """Reset password using token"""
        try:
            # Decode and verify token
            payload = jwt.decode(token, self.JWT_SECRET, algorithms=['HS256'])
            
            if payload.get('type') != 'password_reset':
                return {
                    'success': False,
                    'error': 'Invalid token type'
                }
            
            user_id = payload['user_id']
            
            # Hash new password
            password_hash = self.hash_password(new_password)
            
            # Update password
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {
                    '$set': {
                        'password_hash': password_hash,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            return {
                'success': True,
                'message': 'Password reset successfully'
            }
            
        except jwt.ExpiredSignatureError:
            return {
                'success': False,
                'error': 'Reset token has expired'
            }
        except jwt.InvalidTokenError:
            return {
                'success': False,
                'error': 'Invalid reset token'
            }
        except Exception as e:
            logging.error(f"Error resetting password: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== USER MANAGEMENT METHODS ====================
    
    def create_user(self, user_data: dict) -> dict:
        """Create a new user"""
        try:
            # Check if user already exists
            existing_user = self.users_collection.find_one({
                '$or': [
                    {'email': user_data['email']},
                    {'username': user_data['username']}
                ]
            })
            
            if existing_user:
                return {
                    'success': False,
                    'error': 'User with this email or username already exists'
                }
            
            # Hash password
            user_data['password_hash'] = self.hash_password(user_data['password'])
            del user_data['password']  # Remove plain text password
            
            # Add timestamps and defaults
            user_data['created_at'] = datetime.utcnow()
            user_data['updated_at'] = datetime.utcnow()
            user_data['is_verified'] = False
            user_data['is_active'] = True
            user_data['rating'] = 0.0
            user_data['total_reviews'] = 0
            user_data['completed_orders'] = 0
            
            # Set default values for optional fields
            user_data.setdefault('skills', [])
            user_data.setdefault('languages', [])
            user_data.setdefault('hourly_rate', 0.0)
            user_data.setdefault('response_time', 24)
            
            # Insert user
            result = self.users_collection.insert_one(user_data)
            
            # Return user without password hash
            user_data['_id'] = str(result.inserted_id)
            del user_data['password_hash']
            
            return {
                'success': True,
                'user': user_data
            }
            
        except Exception as e:
            logging.error(f"Error creating user: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def authenticate_user(self, email: str, password: str) -> dict:
        """Authenticate user and return JWT token"""
        try:
            # Find user by email
            user = self.users_collection.find_one({'email': email})
            
            if not user:
                return {
                    'success': False,
                    'error': 'Invalid credentials'
                }
            
            # Verify password
            if not self.verify_password(password, user['password_hash']):
                return {
                    'success': False,
                    'error': 'Invalid credentials'
                }
            
            # Update last login
            self.users_collection.update_one(
                {'_id': user['_id']},
                {'$set': {'last_login': datetime.utcnow()}}
            )
            
            # Generate JWT token
            token_payload = {
                'user_id': str(user['_id']),
                'email': user['email'],
                'role': user['role'],
                'exp': datetime.utcnow() + timedelta(days=7)
            }
            
            token = jwt.encode(token_payload, self.JWT_SECRET, algorithm='HS256')
            
            # Generate refresh token
            refresh_payload = {
                'user_id': str(user['_id']),
                'exp': datetime.utcnow() + timedelta(days=30)
            }
            refresh_token = jwt.encode(refresh_payload, self.JWT_REFRESH_SECRET, algorithm='HS256')
            
            # Return user data without password
            user_data = {
                '_id': str(user['_id']),
                'email': user['email'],
                'username': user['username'],
                'role': user['role'],
                'full_name': user['full_name'],
                'avatar_url': user.get('avatar_url'),
                'rating': user.get('rating', 0.0),
                'completed_orders': user.get('completed_orders', 0),
                'is_verified': user.get('is_verified', False)
            }
            
            return {
                'success': True,
                'user': user_data,
                'token': token,
                'refresh_token': refresh_token
            }
            
        except Exception as e:
            logging.error(f"Error authenticating user: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_user_profile(self, user_id: str) -> dict:
        """Get user profile by ID (alias for get_user_by_id)"""
        return self.get_user_by_id(user_id)
    
    def update_user_profile(self, user_id: str, update_data: dict) -> dict:
        """Update user profile"""
        try:
            # Remove fields that shouldn't be updated
            update_data.pop('_id', None)
            update_data.pop('email', None)
            update_data.pop('password_hash', None)
            update_data.pop('role', None)
            
            # Add updated_at timestamp
            update_data['updated_at'] = datetime.utcnow()
            
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': update_data}
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'User not found or no changes made'
                }
            
            # Return updated user
            return self.get_user_by_id(user_id)
            
        except Exception as e:
            logging.error(f"Error updating user: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_user_avatar(self, user_id: str, image_url: str) -> dict:
        """Update user avatar URL"""
        try:
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {
                    '$set': {
                        'avatar_url': image_url,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            return {
                'success': True,
                'message': 'Avatar updated successfully',
                'avatar_url': image_url
            }
            
        except Exception as e:
            logging.error(f"Error updating avatar: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def change_password(self, user_id: str, old_password: str, new_password: str) -> dict:
        """Change user password"""
        try:
            # Get user with password hash
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            # Verify old password
            if not self.verify_password(old_password, user['password_hash']):
                return {
                    'success': False,
                    'error': 'Current password is incorrect'
                }
            
            # Hash new password
            new_password_hash = self.hash_password(new_password)
            
            # Update password
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {
                    '$set': {
                        'password_hash': new_password_hash,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to update password'
                }
            
            return {
                'success': True,
                'message': 'Password changed successfully'
            }
            
        except Exception as e:
            logging.error(f"Error changing password: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def deactivate_account(self, user_id: str) -> dict:
        """Deactivate user account"""
        try:
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {
                    '$set': {
                        'is_active': False,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            return {
                'success': True,
                'message': 'Account deactivated successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deactivating account: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_account(self, user_id: str) -> dict:
        """Delete user account permanently"""
        try:
            result = self.users_collection.delete_one({'_id': ObjectId(user_id)})
            
            if result.deleted_count == 0:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            return {
                'success': True,
                'message': 'Account deleted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deleting account: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== FREELANCER SPECIFIC METHODS ====================
    
    def update_freelancer_skills(self, user_id: str, skills: List[str]) -> dict:
        """Update freelancer's skills"""
        try:
            # Verify user is a freelancer
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            if user.get('role') != 'freelancer':
                return {
                    'success': False,
                    'error': 'User is not a freelancer'
                }
            
            # Update skills
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {
                    '$set': {
                        'skills': skills,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to update skills'
                }
            
            return {
                'success': True,
                'message': 'Skills updated successfully',
                'skills': skills
            }
            
        except Exception as e:
            logging.error(f"Error updating skills: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_freelancer_portfolio(self, user_id: str, portfolio_items: List[dict]) -> dict:
        """Update freelancer's portfolio items"""
        try:
            # Note: In a real implementation, you might have a separate portfolio collection
            # For now, we'll add portfolio items to user document
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            if user.get('role') != 'freelancer':
                return {
                    'success': False,
                    'error': 'User is not a freelancer'
                }
            
            # Update portfolio (store in separate field)
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {
                    '$set': {
                        'portfolio_items': portfolio_items,
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to update portfolio'
                }
            
            return {
                'success': True,
                'message': 'Portfolio updated successfully',
                'portfolio_items': portfolio_items
            }
            
        except Exception as e:
            logging.error(f"Error updating portfolio: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_freelancer_public_profile(self, username: str) -> dict:
        """Get freelancer's public profile by username"""
        try:
            user = self.users_collection.find_one({
                'username': username,
                'role': 'freelancer',
                'is_active': True
            })
            
            if not user:
                return {
                    'success': False,
                    'error': 'Freelancer not found'
                }
            
            # Return public profile data (exclude sensitive information)
            public_profile = {
                '_id': str(user['_id']),
                'username': user['username'],
                'full_name': user['full_name'],
                'avatar_url': user.get('avatar_url'),
                'bio': user.get('bio'),
                'skills': user.get('skills', []),
                'hourly_rate': user.get('hourly_rate', 0.0),
                'rating': user.get('rating', 0.0),
                'total_reviews': user.get('total_reviews', 0),
                'completed_orders': user.get('completed_orders', 0),
                'response_time': user.get('response_time', 24),
                'languages': user.get('languages', []),
                'country': user.get('country'),
                'city': user.get('city'),
                'member_since': user.get('created_at'),
                'last_active': user.get('last_login'),
                'portfolio_items': user.get('portfolio_items', [])
            }
            
            return {
                'success': True,
                'profile': public_profile
            }
            
        except Exception as e:
            logging.error(f"Error getting freelancer profile: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def search_freelancers(self, filters: dict) -> dict:
        """Search for freelancers with filters"""
        try:
            query = {'role': 'freelancer', 'is_active': True}
            
            # Apply filters
            if filters.get('skills'):
                query['skills'] = {'$in': filters['skills']}
            
            if filters.get('min_rating'):
                query['rating'] = {'$gte': float(filters['min_rating'])}
            
            if filters.get('country'):
                query['country'] = {'$regex': filters['country'], '$options': 'i'}
            
            if filters.get('city'):
                query['city'] = {'$regex': filters['city'], '$options': 'i'}
            
            if filters.get('max_hourly_rate'):
                query['hourly_rate'] = {'$lte': float(filters['max_hourly_rate'])}
            
            if filters.get('min_orders'):
                query['completed_orders'] = {'$gte': int(filters['min_orders'])}
            
            if filters.get('languages'):
                query['languages'] = {'$in': filters['languages']}
            
            # Pagination
            page = int(filters.get('page', 1))
            limit = int(filters.get('limit', 10))
            skip = (page - 1) * limit
            
            # Sorting
            sort_field = filters.get('sort_by', 'rating')
            sort_direction = -1 if filters.get('sort_order', 'desc') == 'desc' else 1
            sort_query = [(sort_field, sort_direction)]
            
            # Get total count
            total = self.users_collection.count_documents(query)
            
            # Get users
            freelancers = list(self.users_collection.find(
                query,
                {
                    'password_hash': 0,
                    'email': 0,
                    'phone_number': 0,
                    'is_verified': 0
                }
            ).skip(skip).limit(limit).sort(sort_query))
            
            # Convert ObjectId to string
            for freelancer in freelancers:
                freelancer['_id'] = str(freelancer['_id'])
            
            return {
                'success': True,
                'freelancers': freelancers,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error searching freelancers: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== CLIENT SPECIFIC METHODS ====================
    
    def update_client_company(self, user_id: str, company_data: dict) -> dict:
        """Update client's company information"""
        try:
            # Verify user is a client
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            if user.get('role') != 'client':
                return {
                    'success': False,
                    'error': 'User is not a client'
                }
            
            # Prepare update data
            update_fields = {
                'updated_at': datetime.utcnow()
            }
            
            if 'company_name' in company_data:
                update_fields['company_name'] = company_data['company_name']
            if 'company_size' in company_data:
                update_fields['company_size'] = company_data['company_size']
            
            # Update company info
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': update_fields}
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to update company information'
                }
            
            return {
                'success': True,
                'message': 'Company information updated successfully',
                'company_data': company_data
            }
            
        except Exception as e:
            logging.error(f"Error updating company info: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== ADMIN METHODS ====================
    
    def get_all_users(self, filters: dict = None, pagination: dict = None) -> dict:
        """Get all users with filters (admin only)"""
        try:
            filters = filters or {}
            pagination = pagination or {}
            
            query = {}
            
            # Apply filters
            if filters.get('role'):
                query['role'] = filters['role']
            
            if filters.get('is_active') is not None:
                query['is_active'] = filters['is_active'] == 'true'
            
            if filters.get('is_verified') is not None:
                query['is_verified'] = filters['is_verified'] == 'true'
            
            if filters.get('search'):
                search_term = filters['search']
                query['$or'] = [
                    {'email': {'$regex': search_term, '$options': 'i'}},
                    {'username': {'$regex': search_term, '$options': 'i'}},
                    {'full_name': {'$regex': search_term, '$options': 'i'}}
                ]
            
            if filters.get('country'):
                query['country'] = {'$regex': filters['country'], '$options': 'i'}
            
            if filters.get('city'):
                query['city'] = {'$regex': filters['city'], '$options': 'i'}
            
            if filters.get('date_from'):
                query['created_at'] = {'$gte': datetime.fromisoformat(filters['date_from'])}
            
            if filters.get('date_to'):
                if 'created_at' in query:
                    query['created_at']['$lte'] = datetime.fromisoformat(filters['date_to'])
                else:
                    query['created_at'] = {'$lte': datetime.fromisoformat(filters['date_to'])}
            
            # Pagination
            page = int(pagination.get('page', 1))
            limit = int(pagination.get('limit', 20))
            skip = (page - 1) * limit
            
            # Get total count
            total = self.users_collection.count_documents(query)
            
            # Sorting
            sort_field = filters.get('sort_by', 'created_at')
            sort_direction = -1 if filters.get('sort_order', 'desc') == 'desc' else 1
            
            # Get users (exclude password hash for security)
            users = list(self.users_collection.find(
                query,
                {'password_hash': 0}
            ).skip(skip).limit(limit).sort(sort_field, sort_direction))
            
            # Convert ObjectId to string
            for user in users:
                user['_id'] = str(user['_id'])
            
            return {
                'success': True,
                'users': users,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logging.error(f"Error getting all users: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # def get_user_by_id(self, user_id: str) -> dict:
    #     """Get user by ID"""
    #     try:
    #         user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
    #         if not user:
    #             return {
    #                 'success': False,
    #                 'error': 'User not found'
    #             }
            
    #         # Remove password hash
    #         user['_id'] = str(user['_id'])
    #         if 'password_hash' in user:
    #             del user['password_hash']
            
    #         return {
    #             'success': True,
    #             'user': user
    #         }
            
    #     except Exception as e:
    #         logging.error(f"Error getting user: {e}")
    #         return {
    #             'success': False,
    #             'error': str(e)
    #         }
    # user_service.py - Modifiez la méthode get_user_by_id
    def get_user_by_id(self, user_id: str) -> dict:
        """Get user by ID"""
        try:
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            # Remove password hash
            user['_id'] = str(user['_id'])
            if 'password_hash' in user:
                del user['password_hash']
            
            # Ensure portfolio_items exists as an array
            if 'portfolio_items' not in user:
                user['portfolio_items'] = []
            
            return {
                'success': True,
                'user': user
            }
            
        except Exception as e:
            logging.error(f"Error getting user: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_user_status(self, user_id: str, status: str) -> dict:
        """Update user status (admin only)"""
        try:
            valid_statuses = ['active', 'inactive', 'suspended', 'verified']
            
            if status not in valid_statuses:
                return {
                    'success': False,
                    'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'
                }
            
            update_data = {'updated_at': datetime.utcnow()}
            
            if status == 'active':
                update_data['is_active'] = True
            elif status == 'inactive':
                update_data['is_active'] = False
            elif status == 'suspended':
                update_data['is_active'] = False
                # You might want to add a suspension reason field
            elif status == 'verified':
                update_data['is_verified'] = True
            
            result = self.users_collection.update_one(
                {'_id': ObjectId(user_id)},
                {'$set': update_data}
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            return {
                'success': True,
                'message': f'User status updated to {status}'
            }
            
        except Exception as e:
            logging.error(f"Error updating user status: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_user(self, user_id: str) -> dict:
        """Delete user (admin only)"""
        try:
            # Check if user exists
            user = self.users_collection.find_one({'_id': ObjectId(user_id)})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            # Instead of hard delete, you might want to soft delete
            # For now, we'll do hard delete
            result = self.users_collection.delete_one({'_id': ObjectId(user_id)})
            
            if result.deleted_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to delete user'
                }
            
            return {
                'success': True,
                'message': 'User deleted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deleting user: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ==================== HELPER METHODS ====================
    
    def generate_token(self, user_id: str, user_data: dict, expiry_days: int = 7) -> str:
        """Generate JWT token for user"""
        token_payload = {
            'user_id': user_id,
            'email': user_data['email'],
            'role': user_data['role'],
            'exp': datetime.utcnow() + timedelta(days=expiry_days)
        }
        
        return jwt.encode(token_payload, self.JWT_SECRET, algorithm='HS256')
    
    def validate_token(self, token: str) -> dict:
        """Validate JWT token"""
        try:
            payload = jwt.decode(token, self.JWT_SECRET, algorithms=['HS256'])
            return {
                'success': True,
                'payload': payload
            }
        except jwt.ExpiredSignatureError:
            return {
                'success': False,
                'error': 'Token has expired'
            }
        except jwt.InvalidTokenError:
            return {
                'success': False,
                'error': 'Invalid token'
            }
    
    def get_user_by_email(self, email: str) -> dict:
        """Get user by email"""
        try:
            user = self.users_collection.find_one({'email': email})
            
            if not user:
                return {
                    'success': False,
                    'error': 'User not found'
                }
            
            # Remove sensitive information
            user['_id'] = str(user['_id'])
            if 'password_hash' in user:
                del user['password_hash']
            
            return {
                'success': True,
                'user': user
            }
                
        except Exception as e:
            logging.error(f"Error getting user by email: {e}")
            return {
                'success': False,
                'error': str(e)
            }
   