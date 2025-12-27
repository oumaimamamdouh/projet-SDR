

# categories_service.py - UPDATED TO FIX SLUG ISSUE

from bson import ObjectId
from datetime import datetime
from .database import db
import logging
import re

class CategoryService:
    def __init__(self):
        self.categories_collection = db.get_collection('categories')
    
    def _create_slug(self, name):
        """Create URL-friendly slug from category name"""
        # Convert to lowercase
        slug = name.lower()
        # Replace spaces with hyphens
        slug = slug.replace(' ', '-')
        # Remove special characters
        slug = re.sub(r'[^a-z0-9\-]', '', slug)
        # Remove consecutive hyphens
        slug = re.sub(r'\-+', '-', slug)
        # Remove leading/trailing hyphens
        slug = slug.strip('-')
        return slug
    
    def _serialize_category(self, category):
        """Serialize a category for XML-RPC"""
        if not category:
            return None
            
        serialized = {}
        for key, value in category.items():
            if key == '_id' and value:
                serialized[key] = str(value)
            elif isinstance(value, ObjectId):
                serialized[key] = str(value)
            elif isinstance(value, datetime):
                serialized[key] = value.isoformat()
            elif value is None:  # Handle None values
                serialized[key] = ''  # Convert None to empty string for XML-RPC
            else:
                serialized[key] = value
        return serialized
    
    def get_all_categories(self) -> dict:
        """Get all active categories"""
        try:
            print("🔍 Fetching all active categories...")
            
            categories = list(self.categories_collection.find(
                {'is_active': True}
            ).sort('sort_order', 1))
            
            print(f"📊 Found {len(categories)} active categories")
            
            # Serialize all categories
            serialized_categories = [self._serialize_category(cat) for cat in categories]
            
            for category in serialized_categories:
                print(f"  - {category['name']} (ID: {category['_id']})")
            
            return {
                'success': True,
                'categories': serialized_categories
            }
            
        except Exception as e:
            logging.error(f"Error getting categories: {e}")
            print(f"❌ Error in get_all_categories: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_category_by_id(self, category_id: str) -> dict:
        """Get category by ID"""
        try:
            print(f"🔍 Fetching category by ID: {category_id}")
            
            if not ObjectId.is_valid(category_id):
                return {
                    'success': False,
                    'error': 'Invalid category ID format'
                }
            
            category = self.categories_collection.find_one({'_id': ObjectId(category_id)})
            
            if not category:
                return {
                    'success': False,
                    'error': 'Category not found'
                }
            
            # Add slug if not present (for backward compatibility)
            if 'slug' not in category:
                category['slug'] = self._create_slug(category['name'])
            
            serialized_category = self._serialize_category(category)
            print(f"✅ Found category: {serialized_category['name']}")
            
            return {
                'success': True,
                'category': serialized_category
            }
            
        except Exception as e:
            logging.error(f"Error getting category: {e}")
            print(f"❌ Error in get_category_by_id: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_category_by_slug(self, slug: str) -> dict:
        """Get category by slug"""
        try:
            print(f"🔍 Fetching category by slug: {slug}")
            
            # First try to find by slug field
            category = self.categories_collection.find_one({
                'slug': slug,
                'is_active': True
            })
            
            # If not found by slug, try to find by name (for backward compatibility)
            if not category:
                category = self.categories_collection.find_one({
                    'name': {'$regex': f'^{slug}$', '$options': 'i'},
                    'is_active': True
                })
            
            if not category:
                return {
                    'success': False,
                    'error': 'Category not found'
                }
            
            # Ensure slug field exists
            if 'slug' not in category:
                category['slug'] = self._create_slug(category['name'])
            
            serialized_category = self._serialize_category(category)
            print(f"✅ Found category: {serialized_category['name']}")
            
            return {
                'success': True,
                'category': serialized_category
            }
            
        except Exception as e:
            logging.error(f"Error getting category by slug: {e}")
            print(f"❌ Error in get_category_by_slug: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_subcategories(self, parent_id: str) -> dict:
        """Get subcategories for a parent category"""
        try:
            print(f"🔍 Fetching subcategories for parent: {parent_id}")
            
            if not ObjectId.is_valid(parent_id):
                return {
                    'success': False,
                    'error': 'Invalid parent category ID format'
                }
            
            parent_obj_id = ObjectId(parent_id)
            
            print(f"🔍 Querying for subcategories with parent_id: {parent_obj_id}")
            
            subcategories = list(self.categories_collection.find({
                'parent_category_id': parent_obj_id,
                'is_active': True
            }).sort('sort_order', 1))
            
            print(f"📊 Found {len(subcategories)} subcategories")
            
            # Add slugs if not present
            for cat in subcategories:
                if 'slug' not in cat:
                    cat['slug'] = self._create_slug(cat['name'])
            
            serialized_subcategories = [self._serialize_category(cat) for cat in subcategories]
            
            for category in serialized_subcategories:
                print(f"  - {category['name']} (ID: {category['_id']})")
            
            return {
                'success': True,
                'subcategories': serialized_subcategories
            }
            
        except Exception as e:
            logging.error(f"Error getting subcategories: {e}")
            print(f"❌ Error in get_subcategories: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # ========== ADMIN METHODS ==========
    
    def create_category(self, category_data: dict) -> dict:
        """Create a new category (Admin only)"""
        try:
            print(f"➕ Creating new category: {category_data.get('name')}")
            
            # Validate required fields
            required_fields = ['name']
            for field in required_fields:
                if field not in category_data or not category_data[field]:
                    return {
                        'success': False,
                        'error': f'Missing required field: {field}'
                    }
            
            # Create slug from name
            slug = self._create_slug(category_data['name'])
            
            # Check if category with same name already exists
            existing = self.categories_collection.find_one({
                'name': {'$regex': f'^{category_data["name"]}$', '$options': 'i'}
            })
            
            if existing:
                return {
                    'success': False,
                    'error': 'Category with this name already exists'
                }
            
            # Check if category with same slug exists
            existing_slug = self.categories_collection.find_one({'slug': slug})
            if existing_slug:
                # Add counter to make slug unique
                counter = 1
                while self.categories_collection.find_one({'slug': f"{slug}-{counter}"}):
                    counter += 1
                slug = f"{slug}-{counter}"
            
            # Prepare category document
            category_doc = {
                'name': category_data['name'],
                'slug': slug,
                'description': category_data.get('description', ''),
                'icon_url': category_data.get('icon_url', ''),
                'is_active': category_data.get('is_active', True),
                'sort_order': category_data.get('sort_order', 0),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add parent category if provided
            if category_data.get('parent_category_id'):
                if ObjectId.is_valid(category_data['parent_category_id']):
                    category_doc['parent_category_id'] = ObjectId(category_data['parent_category_id'])
                else:
                    return {
                        'success': False,
                        'error': 'Invalid parent category ID'
                    }
            
            # Insert into database
            result = self.categories_collection.insert_one(category_doc)
            
            # Get the created category
            created_category = self.categories_collection.find_one({'_id': result.inserted_id})
            
            serialized_category = self._serialize_category(created_category)
            
            print(f"✅ Category created successfully: {serialized_category['name']}")
            
            return {
                'success': True,
                'message': 'Category created successfully',
                'category': serialized_category
            }
            
        except Exception as e:
            logging.error(f"Error creating category: {e}")
            print(f"❌ Error in create_category: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def update_category(self, category_id: str, update_data: dict) -> dict:
        """Update a category (Admin only)"""
        try:
            print(f"🔄 Updating category: {category_id}")
            
            if not ObjectId.is_valid(category_id):
                return {
                    'success': False,
                    'error': 'Invalid category ID format'
                }
            
            # Check if category exists
            existing_category = self.categories_collection.find_one({'_id': ObjectId(category_id)})
            if not existing_category:
                return {
                    'success': False,
                    'error': 'Category not found'
                }
            
            # Check if name is being changed
            if 'name' in update_data and update_data['name'] != existing_category.get('name'):
                # Check for name conflict
                name_exists = self.categories_collection.find_one({
                    'name': {'$regex': f'^{update_data["name"]}$', '$options': 'i'},
                    '_id': {'$ne': ObjectId(category_id)}
                })
                if name_exists:
                    return {
                        'success': False,
                        'error': 'Another category with this name already exists'
                    }
                
                # Update slug if name changed
                update_data['slug'] = self._create_slug(update_data['name'])
                # Ensure slug is unique
                if 'slug' in update_data:
                    counter = 1
                    original_slug = update_data['slug']
                    while self.categories_collection.find_one({
                        'slug': update_data['slug'],
                        '_id': {'$ne': ObjectId(category_id)}
                    }):
                        update_data['slug'] = f"{original_slug}-{counter}"
                        counter += 1
            
            # Prepare update document
            update_doc = {'updated_at': datetime.utcnow()}
            
            # Add fields to update
            allowed_fields = ['name', 'slug', 'description', 'icon_url', 'is_active', 'sort_order']
            for field in allowed_fields:
                if field in update_data:
                    update_doc[field] = update_data[field]
            
            # Handle parent category
            if 'parent_category_id' in update_data:
                if update_data['parent_category_id']:
                    if ObjectId.is_valid(update_data['parent_category_id']):
                        # Prevent circular reference
                        if update_data['parent_category_id'] == category_id:
                            return {
                                'success': False,
                                'error': 'Category cannot be its own parent'
                            }
                        update_doc['parent_category_id'] = ObjectId(update_data['parent_category_id'])
                    else:
                        return {
                            'success': False,
                            'error': 'Invalid parent category ID'
                        }
                else:
                    update_doc['parent_category_id'] = None
            
            # Update in database
            result = self.categories_collection.update_one(
                {'_id': ObjectId(category_id)},
                {'$set': update_doc}
            )
            
            if result.modified_count == 0:
                return {
                    'success': False,
                    'error': 'No changes made to category'
                }
            
            # Get updated category
            updated_category = self.categories_collection.find_one({'_id': ObjectId(category_id)})
            serialized_category = self._serialize_category(updated_category)
            
            print(f"✅ Category updated successfully: {serialized_category['name']}")
            
            return {
                'success': True,
                'message': 'Category updated successfully',
                'category': serialized_category
            }
            
        except Exception as e:
            logging.error(f"Error updating category: {e}")
            print(f"❌ Error in update_category: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_category(self, category_id: str) -> dict:
        """Delete a category (Admin only)"""
        try:
            print(f"🗑️ Deleting category: {category_id}")
            
            if not ObjectId.is_valid(category_id):
                return {
                    'success': False,
                    'error': 'Invalid category ID format'
                }
            
            # Check if category exists
            category = self.categories_collection.find_one({'_id': ObjectId(category_id)})
            if not category:
                return {
                    'success': False,
                    'error': 'Category not found'
                }
            
            # Check if category has subcategories
            subcategories_count = self.categories_collection.count_documents({
                'parent_category_id': ObjectId(category_id)
            })
            
            if subcategories_count > 0:
                return {
                    'success': False,
                    'error': 'Cannot delete category with subcategories. Delete or move subcategories first.'
                }
            
            # Delete the category
            result = self.categories_collection.delete_one({'_id': ObjectId(category_id)})
            
            if result.deleted_count == 0:
                return {
                    'success': False,
                    'error': 'Failed to delete category'
                }
            
            print(f"✅ Category deleted successfully: {category.get('name')}")
            
            return {
                'success': True,
                'message': 'Category deleted successfully'
            }
            
        except Exception as e:
            logging.error(f"Error deleting category: {e}")
            print(f"❌ Error in delete_category: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    # def update_category_order(self, ordered_categories: list) -> dict:
    #     """Update sort order for categories (Admin only)"""
    #     try:
    #         print(f"🔄 Updating category order for {len(ordered_categories)} categories")
            
    #         if not isinstance(ordered_categories, list):
    #             return {
    #                 'success': False,
    #                 'error': 'ordered_categories must be a list'
    #             }
            
    #         for item in ordered_categories:
    #             if not isinstance(item, dict):
    #                 return {
    #                     'success': False,
    #                     'error': 'Each item must be a dictionary'
    #                 }
                
    #             category_id = item.get('id') or item.get('category_id')
    #             sort_order = item.get('order') or item.get('sort_order')
                
    #             if not category_id or sort_order is None:
    #                 return {
    #                     'success': False,
    #                     'error': 'Each item must have id and order fields'
    #                 }
                
    #             if not ObjectId.is_valid(category_id):
    #                 return {
    #                     'success': False,
    #                     'error': f'Invalid category ID: {category_id}'
    #                 }
            
    #         # Update each category's sort order
    #         for item in ordered_categories:
    #             category_id = item.get('id') or item.get('category_id')
    #             sort_order = item.get('order') or item.get('sort_order')
                
    #             self.categories_collection.update_one(
    #                 {'_id': ObjectId(category_id)},
    #                 {'$set': {
    #                     'sort_order': int(sort_order),
    #                     'updated_at': datetime.utcnow()
    #                 }}
    #             )
            
    #         print("✅ Category order updated successfully")
            
    #         return {
    #             'success': True,
    #             'message': 'Category order updated successfully'
    #         }
            
    #     except Exception as e:
    #         logging.error(f"Error updating category order: {e}")
    #         print(f"❌ Error in update_category_order: {e}")
    #         return {
    #             'success': False,
    #             'error': str(e)
    #         }
    
    # In categories_service.py - update_category_order method (add more debugging)








    # def update_category_order(self, ordered_categories: list) -> dict:
    #     try:
    #         print(f"🔄 Updating category order for {len(ordered_categories)} categories")
    #         print(f"📥 Received data type: {type(ordered_categories)}")
            
    #         # EXTENSIVE DEBUGGING
    #         for i, item in enumerate(ordered_categories):
    #             print(f"\n🔍 Item {i}:")
    #             print(f"  Item type: {type(item)}")
    #             print(f"  Item: {item}")
                
    #             # Handle XML-RPC OrderedDict or regular dict
    #             if hasattr(item, 'items'):
    #                 # Convert to regular dict for easier inspection
    #                 item_dict = dict(item)
    #                 print(f"  As dict: {item_dict}")
                    
    #                 # Check all possible keys
    #                 print(f"  All keys: {list(item_dict.keys())}")
                    
    #                 # Try to get ID from all possible field names
    #                 possible_id_keys = ['id', 'category_id', '_id']
    #                 category_id = None
    #                 for key in possible_id_keys:
    #                     if key in item_dict:
    #                         category_id = item_dict[key]
    #                         print(f"  Found ID in '{key}': {category_id}")
    #                         print(f"    ID type: {type(category_id)}")
    #                         break
                    
    #                 # Try to get order from all possible field names
    #                 possible_order_keys = ['order', 'sort_order']
    #                 sort_order = None
    #                 for key in possible_order_keys:
    #                     if key in item_dict:
    #                         sort_order = item_dict[key]
    #                         print(f"  Found order in '{key}': {sort_order}")
    #                         print(f"    Order type: {type(sort_order)}")
    #                         break
                    
    #                 if not category_id or sort_order is None:
    #                     print(f"❌ Missing required fields in item {i}")
    #                     return {
    #                         'success': False,
    #                         'error': f'Missing required fields in item {i}. Item: {item_dict}'
    #                     }
                    
    #                 # Convert to string and check if valid ObjectId
    #                 id_str = str(category_id)
    #                 print(f"  ID as string: '{id_str}'")
    #                 print(f"  ID string length: {len(id_str)}")
                    
    #                 if not ObjectId.is_valid(id_str):
    #                     print(f"❌ Invalid ObjectId: '{id_str}'")
    #                     print(f"    Expected 24 hex chars, got {len(id_str)} chars")
    #                     return {
    #                         'success': False,
    #                         'error': f'Invalid category ID format: {id_str}'
    #                     }
                    
    #                 print(f"  ✓ Valid ObjectId")
                    
    #             else:
    #                 print(f"❌ Item {i} is not a dictionary-like object: {type(item)}")
    #                 return {
    #                     'success': False,
    #                     'error': f'Item {i} must be a dictionary, got {type(item)}'
    #                 }
            
    #         print("\n✅ All items validated successfully")
            
    #         # Update each category's sort order
    #         for i, item in enumerate(ordered_categories):
    #             item_dict = dict(item) if hasattr(item, 'items') else item
                
    #             # Get values
    #             category_id = item_dict.get('id') or item_dict.get('category_id') or item_dict.get('_id')
    #             sort_order = item_dict.get('order') or item_dict.get('sort_order')
                
    #             self.categories_collection.update_one(
    #                 {'_id': ObjectId(str(category_id))},
    #                 {'$set': {
    #                     'sort_order': int(sort_order),
    #                     'updated_at': datetime.utcnow()
    #                 }}
    #             )
    #             print(f"  Updated category {category_id} to order {sort_order}")
            
    #         print("✅ Category order updated successfully")
            
    #         return {
    #             'success': True,
    #             'message': 'Category order updated successfully'
    #         }
            
    #     except Exception as e:
    #         logging.error(f"Error updating category order: {e}")
    #         print(f"❌ Error in update_category_order: {e}")
    #         import traceback
    #         traceback.print_exc()
    #         return {
    #             'success': False,
    #             'error': str(e)
    #         }


    # REPLACE the current update_category_order method with this DEBUG version:
    def update_category_order(self, ordered_categories: list) -> dict:
        try:
            print(f"\n🔄 ========== DEBUG UPDATE CATEGORY ORDER ==========")
            print(f"📥 Received data type: {type(ordered_categories)}")
            print(f"📥 Is list? {isinstance(ordered_categories, list)}")
            print(f"📥 Length: {len(ordered_categories) if ordered_categories else 0}")
            
            # EXTENSIVE DEBUGGING
            if not ordered_categories:
                print("❌ ERROR: ordered_categories is empty or None")
                return {
                    'success': False,
                    'error': 'No categories provided'
                }
            
            # Print the raw data structure
            print(f"\n📦 RAW DATA RECEIVED:")
            import pprint
            pp = pprint.PrettyPrinter(indent=2)
            pp.pprint(ordered_categories)
            
            # Check first item thoroughly
            print(f"\n🔍 INSPECTING FIRST ITEM:")
            first_item = ordered_categories[0]
            print(f"  First item type: {type(first_item)}")
            
            # Try different ways to access the data
            if hasattr(first_item, '__getitem__'):
                print(f"  Has __getitem__: Yes")
                print(f"  Can access with dict(): {hasattr(first_item, 'items')}")
                
                if hasattr(first_item, 'items'):
                    item_dict = dict(first_item)
                    print(f"  As dict: {item_dict}")
                    print(f"  Dict keys: {list(item_dict.keys())}")
                    
                    # Check all possible ID keys
                    for key in ['id', '_id', 'category_id']:
                        if key in item_dict:
                            value = item_dict[key]
                            print(f"    Found '{key}': {repr(value)}")
                            print(f"    Type: {type(value)}")
                            print(f"    Length: {len(str(value)) if value else 0}")
                            print(f"    Is string? {isinstance(value, str)}")
                            
                            # Check ObjectId validity
                            id_str = str(value)
                            print(f"    As string: '{id_str}'")
                            print(f"    Is valid ObjectId? {ObjectId.is_valid(id_str)}")
                            
                            if not ObjectId.is_valid(id_str):
                                print(f"    ❌ INVALID ObjectId format!")
                                print(f"    Expected 24 hex chars, got {len(id_str)}")
                                print(f"    Characters: {[c for c in id_str]}")
                else:
                    print(f"  Cannot convert to dict, trying direct access...")
                    print(f"  Available attributes: {dir(first_item)}")
                    
                    # Try to access as XML-RPC OrderedDict
                    try:
                        print(f"  Trying to access with get()...")
                        category_id = first_item.get('id') or first_item.get('_id') or first_item.get('category_id')
                        print(f"  Got ID: {category_id}")
                        print(f"  ID type: {type(category_id)}")
                    except Exception as e:
                        print(f"  Error accessing: {e}")
            else:
                print(f"  First item is not indexable: {type(first_item)}")
                print(f"  First item: {first_item}")
            
            print(f"\n🔍 CHECKING ObjectId.is_valid LOGIC:")
            
            # Test with a known valid ID from your database
            test_ids = [
                '692dbb7515355c3dedcfb35e',  # Web Development from your DB
                '693d7eff1a768746c8c8fb5a',  # Created in test
                '123456789012345678901234',  # Valid format
                'invalid-id',                # Invalid format
            ]
            
            for test_id in test_ids:
                is_valid = ObjectId.is_valid(test_id)
                print(f"  '{test_id}' -> valid: {is_valid}, length: {len(test_id)}")
            
            print(f"\n✅ DEBUG COMPLETE")
            print(f"=========================================\n")
            
            # Now try to process the data
            print(f"🔄 Now attempting to process categories...")
            
            for i, item in enumerate(ordered_categories):
                print(f"\n📝 Processing item {i}:")
                
                # Convert to dict if needed
                if hasattr(item, 'items'):
                    item_dict = dict(item)
                else:
                    item_dict = item
                    
                print(f"  Item dict: {item_dict}")
                
                # Try all possible ID field names
                category_id = None
                for key in ['id', '_id', 'category_id']:
                    if key in item_dict:
                        category_id = item_dict[key]
                        print(f"  Found ID in '{key}': {category_id}")
                        break
                
                if not category_id:
                    print(f"❌ No ID found in item {i}")
                    return {
                        'success': False,
                        'error': f'Missing ID in item {i}'
                    }
                
                # Convert to string
                id_str = str(category_id)
                print(f"  ID as string: '{id_str}'")
                print(f"  String length: {len(id_str)}")
                print(f"  Is valid ObjectId? {ObjectId.is_valid(id_str)}")
                
                if not ObjectId.is_valid(id_str):
                    print(f"❌ Invalid ObjectId format: '{id_str}'")
                    return {
                        'success': False,
                        'error': f'Invalid category ID format: {id_str}'
                    }
                
                # Get order
                order = item_dict.get('order') or item_dict.get('sort_order')
                print(f"  Order value: {order}")
                
                if order is None:
                    print(f"❌ No order found in item {i}")
                    return {
                        'success': False,
                        'error': f'Missing order in item {i}'
                    }
            
            print(f"\n✅ All items validated successfully")
            
            # If we get here, update the database
            for i, item in enumerate(ordered_categories):
                if hasattr(item, 'items'):
                    item_dict = dict(item)
                else:
                    item_dict = item
                
                category_id = item_dict.get('id') or item_dict.get('_id') or item_dict.get('category_id')
                order = item_dict.get('order') or item_dict.get('sort_order')
                
                print(f"  Updating category {category_id} to order {order}")
                
                self.categories_collection.update_one(
                    {'_id': ObjectId(str(category_id))},
                    {'$set': {
                        'sort_order': int(order),
                        'updated_at': datetime.utcnow()
                    }}
                )
            
            print("✅ Category order updated successfully")
            
            return {
                'success': True,
                'message': 'Category order updated successfully'
            }
            
        except Exception as e:
            logging.error(f"Error updating category order: {e}")
            print(f"❌ Error in update_category_order: {e}")
            import traceback
            traceback.print_exc()
            return {
                'success': False,
                'error': str(e)
            }

    def toggle_category_status(self, category_id: str) -> dict:
        """Toggle category active status (Admin only)"""
        try:
            print(f"🔄 Toggling status for category: {category_id}")
            
            if not ObjectId.is_valid(category_id):
                return {
                    'success': False,
                    'error': 'Invalid category ID format'
                }
            
            # Get current category
            category = self.categories_collection.find_one({'_id': ObjectId(category_id)})
            if not category:
                return {
                    'success': False,
                    'error': 'Category not found'
                }
            
            # Toggle status
            new_status = not category.get('is_active', True)
            
            # Update status
            self.categories_collection.update_one(
                {'_id': ObjectId(category_id)},
                {'$set': {'is_active': new_status, 'updated_at': datetime.utcnow()}}
            )
            
            status_text = "active" if new_status else "inactive"
            print(f"✅ Category status toggled to: {status_text}")
            
            return {
                'success': True,
                'message': f'Category is now {status_text}',
                'is_active': new_status
            }
            
        except Exception as e:
            logging.error(f"Error toggling category status: {e}")
            print(f"❌ Error in toggle_category_status: {e}")
            return {
                'success': False,
                'error': str(e)
            }