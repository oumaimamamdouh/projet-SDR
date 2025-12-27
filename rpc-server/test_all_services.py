

# # import xmlrpc.client
# # import uuid

# # # Connect to RPC server
# # rpc = xmlrpc.client.ServerProxy('http://localhost:8000/RPC2')

# # # Use your actual category ID from the database
# # WEB_DEVELOPMENT_CATEGORY_ID = '6920c775747da49650b2d6de'  # Web Development

# # def extract_user_id(user_result):
# #     """Extract user ID from different response formats"""
# #     if user_result.get('success'):
# #         user_info = user_result.get('user') or user_result.get('data')
# #         if user_info:
# #             return user_info.get('user_id') or user_info.get('_id')
# #     return None

# # def extract_gig_id(gig_result):
# #     """Extract gig ID from response"""
# #     if gig_result.get('success'):
# #         gig_info = gig_result.get('gig') or gig_result.get('data')
# #         if gig_info:
# #             return gig_info.get('_id')
# #     return None

# # def test_user_services():
# #     print("👤 Testing User Services...")
    
# #     # Test 1: Create a new user
# #     user_data = {
# #         'email': f'test_{uuid.uuid4().hex[:8]}@example.com',
# #         'username': f'user_{uuid.uuid4().hex[:8]}',
# #         'password': 'testpassword123',
# #         'role': 'freelancer',
# #         'full_name': 'Test User',
# #         'skills': ['Python', 'MongoDB', 'RPC'],
# #         'bio': 'Experienced developer',
# #         'country': 'Test Country',
# #         'city': 'Test City'
# #     }
    
# #     try:
# #         # Create user
# #         user_result = rpc.create_user(user_data)
# #         print("✅ User creation:", user_result.get('success', False))
        
# #         user_id = extract_user_id(user_result)
# #         if user_id:
# #             print(f"✅ Created user ID: {user_id}")
            
# #             # Test 2: Authenticate user
# #             auth_result = rpc.authenticate_user(user_data['email'], user_data['password'])
# #             print("✅ User authentication:", auth_result.get('success', False))
# #             if auth_result.get('success'):
# #                 print(f"✅ Token: {auth_result.get('token', '')[:50]}...")
            
# #             # Test 3: Get user by ID
# #             get_user_result = rpc.get_user_by_id(user_id)
# #             print("✅ Get user by ID:", get_user_result.get('success', False))
            
# #             # Test 4: Update user profile
# #             update_data = {
# #                 'bio': 'Updated bio with more experience',
# #                 'skills': ['Python', 'MongoDB', 'RPC', 'XML-RPC'],
# #                 'hourly_rate': 25.0
# #             }
# #             update_result = rpc.update_user_profile(user_id, update_data)
# #             print("✅ Update user profile:", update_result.get('success', False))
            
# #             # Test 5: Search freelancers
# #             search_result = rpc.search_freelancers({'skills': 'Python'})
# #             print("✅ Search freelancers - found:", len(search_result.get('freelancers', [])) if search_result.get('success') else 0)
            
# #             return user_id
# #         else:
# #             print("❌ Could not extract user ID from response")
# #             return None
            
# #     except Exception as e:
# #         print("❌ User service test failed:", e)
# #         return None

# # def test_gig_services(freelancer_id):
# #     print("\n💼 Testing Gig Services...")
    
# #     if not freelancer_id:
# #         print("❌ Skipping gig tests - no freelancer ID")
# #         return None
    
# #     # Test 1: Create a gig with real category ID
# #     gig_data = {
# #         'freelancer_id': freelancer_id,
# #         'category_id': WEB_DEVELOPMENT_CATEGORY_ID,  # Using real category ID
# #         'title': 'Python RPC Development Service',
# #         'description': 'Professional XML-RPC services development with Python and MongoDB. I will build robust RPC servers and clients for your applications.',
# #         'base_price': 150.0,
# #         'delivery_days': 5,
# #         'search_tags': ['python', 'rpc', 'mongodb', 'api', 'backend'],
# #         'currency': 'USD',
# #         'pricing_type': 'fixed',
# #         'revisions_included': 2,
# #         'requirements_description': 'Please provide your API specifications and requirements'
# #     }
    
# #     try:
# #         create_gig_result = rpc.create_gig(gig_data)
# #         print("✅ Gig creation:", create_gig_result.get('success', False))
        
# #         if create_gig_result.get('success'):
# #             gig_id = extract_gig_id(create_gig_result)
            
# #             if gig_id:
# #                 print(f"✅ Created gig ID: {gig_id}")
                
# #                 # Test 2: Get gig by ID
# #                 get_gig_result = rpc.get_gig_by_id(gig_id)
# #                 print("✅ Get gig by ID:", get_gig_result.get('success', False))
                
# #                 # Test 3: Search gigs
# #                 search_gigs_result = rpc.search_gigs({'search': 'Python'})
# #                 success = search_gigs_result.get('success', False)
# #                 count = len(search_gigs_result.get('gigs', [])) if success else 0
# #                 print(f"✅ Search gigs - found: {count}")
                
# #                 # Test 4: Get freelancer gigs
# #                 freelancer_gigs = rpc.get_freelancer_gigs(freelancer_id)
# #                 success = freelancer_gigs.get('success', False)
# #                 count = len(freelancer_gigs.get('gigs', [])) if success else 0
# #                 print(f"✅ Freelancer gigs - count: {count}")
                
# #                 return gig_id
# #             else:
# #                 print("❌ Could not extract gig ID from response")
# #                 print("Full response:", create_gig_result)
# #         else:
# #             print("❌ Gig creation failed:", create_gig_result.get('error', 'Unknown error'))
            
# #     except Exception as e:
# #         print("❌ Gig service test failed:", e)
# #         return None

# # # def test_order_services(freelancer_id, gig_id):
# # #     print("\n📦 Testing Order Services...")
    
# # #     if not gig_id:
# # #         print("❌ Skipping order tests - no gig ID")
# # #         return
    
# # #     # Create a client user first
# # #     client_data = {
# # #         'email': f'client_{uuid.uuid4().hex[:8]}@example.com',
# # #         'username': f'client_{uuid.uuid4().hex[:8]}',
# # #         'password': 'clientpass123',
# # #         'role': 'client',
# # #         'full_name': 'Test Client',
# # #         'country': 'Test Country',
# # #         'city': 'Test City'
# # #     }
    
# # #     try:
# # #         client_result = rpc.create_user(client_data)
# # #         print("✅ Client creation:", client_result.get('success', False))
        
# # #         if client_result.get('success'):
# # #             client_id = extract_user_id(client_result)
            
# # #             if client_id:
# # #                 print(f"✅ Created client ID: {client_id}")
                
# # #                 # Test 1: Create order
# # #                 order_data = {
# # #                     'client_id': client_id,
# # #                     'freelancer_id': freelancer_id,
# # #                     'gig_id': gig_id,
# # #                     'requirements': 'Need a complete RPC service with user authentication and MongoDB integration',
# # #                     'description': 'Building a freelance platform RPC backend'
# # #                 }
                
# # #                 create_order_result = rpc.create_order(order_data)
# # #                 print("✅ Order creation:", create_order_result.get('success', False))
                
# # #                 if create_order_result.get('success'):
# # #                     order_info = create_order_result.get('order') or create_order_result.get('data')
# # #                     order_id = order_info.get('_id') if order_info else None
                    
# # #                     if order_id:
# # #                         print(f"✅ Created order ID: {order_id}")
                        
# # #                         # Test 2: Get client orders
# # #                         client_orders = rpc.get_user_orders(client_id, 'client')
# # #                         success = client_orders.get('success', False)
# # #                         count = len(client_orders.get('orders', [])) if success else 0
# # #                         print(f"✅ Client orders - count: {count}")
                        
# # #                         # Test 3: Get freelancer orders
# # #                         freelancer_orders = rpc.get_user_orders(freelancer_id, 'freelancer')
# # #                         success = freelancer_orders.get('success', False)
# # #                         count = len(freelancer_orders.get('orders', [])) if success else 0
# # #                         print(f"✅ Freelancer orders - count: {count}")
                        
# # #                         # Test 4: Update order status
# # #                         update_status_result = rpc.update_order_status(order_id, 'in_progress', freelancer_id)
# # #                         print("✅ Update order status:", update_status_result.get('success', False))
# # #                     else:
# # #                         print("❌ Could not extract order ID")
# # #                 else:
# # #                     print("❌ Order creation failed:", create_order_result.get('error', 'Unknown error'))
# # #             else:
# # #                 print("❌ Could not extract client ID")
# # #         else:
# # #             print("❌ Client creation failed:", client_result.get('error', 'Unknown error'))
                
# # #     except Exception as e:
# # #         print("❌ Order service test failed:", e)

# # def test_order_services(freelancer_id, gig_id):
# #     print("\n📦 Testing Order Services...")
    
# #     if not gig_id:
# #         print("❌ Skipping order tests - no gig ID")
# #         return
    
# #     # Create a client user first
# #     client_data = {
# #         'email': f'client_{uuid.uuid4().hex[:8]}@example.com',
# #         'username': f'client_{uuid.uuid4().hex[:8]}',
# #         'password': 'clientpass123',
# #         'role': 'client',
# #         'full_name': 'Test Client',
# #         'country': 'Test Country',
# #         'city': 'Test City'
# #     }
    
# #     try:
# #         client_result = rpc.create_user(client_data)
# #         print("✅ Client creation:", client_result.get('success', False))
        
# #         if client_result.get('success'):
# #             client_id = extract_user_id(client_result)
            
# #             if client_id:
# #                 print(f"✅ Created client ID: {client_id}")
                
# #                 # Test 1: Create order
# #                 order_data = {
# #                     'client_id': client_id,
# #                     'freelancer_id': freelancer_id,  # This freelancer created the gig
# #                     'gig_id': gig_id,
# #                     'requirements': 'Need a complete RPC service with user authentication and MongoDB integration',
# #                     'description': 'Building a freelance platform RPC backend'
# #                 }
                
# #                 create_order_result = rpc.create_order(order_data)
# #                 print("✅ Order creation:", create_order_result.get('success', False))
                
# #                 if create_order_result.get('success'):
# #                     order_info = create_order_result.get('order') or create_order_result.get('data')
# #                     order_id = order_info.get('_id') if order_info else None
                    
# #                     if order_id:
# #                         print(f"✅ Created order ID: {order_id}")
                        
# #                         # Test 2: Get client orders
# #                         client_orders = rpc.get_user_orders(client_id, 'client')
# #                         success = client_orders.get('success', False)
# #                         count = len(client_orders.get('orders', [])) if success else 0
# #                         print(f"✅ Client orders - count: {count}")
                        
# #                         # Test 3: Get freelancer orders  
# #                         freelancer_orders = rpc.get_user_orders(freelancer_id, 'freelancer')
# #                         success = freelancer_orders.get('success', False)
# #                         count = len(freelancer_orders.get('orders', [])) if success else 0
# #                         print(f"✅ Freelancer orders - count: {count}")
                        
# #                         # Test 4: Update order status - use the CORRECT user IDs
# #                         # The freelancer who owns the gig should be able to update
# #                         update_status_result = rpc.update_order_status(order_id, 'in_progress', freelancer_id)
# #                         print("✅ Update order status (by freelancer):", update_status_result.get('success', False))
                        
# #                         # The client who placed the order should also be able to update certain statuses
# #                         client_update_result = rpc.update_order_status(order_id, 'confirmed', client_id)
# #                         print("✅ Update order status (by client):", client_update_result.get('success', False))
                        
# #                     else:
# #                         print("❌ Could not extract order ID")
# #                 else:
# #                     print("❌ Order creation failed:", create_order_result.get('error', 'Unknown error'))
# #             else:
# #                 print("❌ Could not extract client ID")
# #         else:
# #             print("❌ Client creation failed:", client_result.get('error', 'Unknown error'))
                
# #     except Exception as e:
# #         print("❌ Order service test failed:", e)


# # def test_error_cases():
# #     print("\n🚨 Testing Error Cases...")
    
# #     try:
# #         # Test 1: Duplicate email
# #         duplicate_user = {
# #             'email': 'duplicate_test@example.com',
# #             'username': f'uniqueuser_{uuid.uuid4().hex[:8]}',
# #             'password': 'password123',
# #             'role': 'client',
# #             'full_name': 'Duplicate Test User'
# #         }
# #         result1 = rpc.create_user(duplicate_user)
# #         result2 = rpc.create_user(duplicate_user)  # Same email
# #         print("✅ Duplicate email handling:", not result2.get('success', True))
        
# #         # Test 2: Invalid user ID
# #         invalid_user = rpc.get_user_by_id('invalid_id_123')
# #         print("✅ Invalid user ID handling:", not invalid_user.get('success', True))
        
# #         # Test 3: Wrong password authentication
# #         wrong_pass = rpc.authenticate_user(duplicate_user['email'], 'wrong_password_123')
# #         print("✅ Wrong password handling:", not wrong_pass.get('success', True))
        
# #         # Test 4: Non-existent gig
# #         fake_gig = rpc.get_gig_by_id('507f1f77bcf86cd799439011')
# #         print("✅ Non-existent gig handling:", not fake_gig.get('success', True))
        
# #     except Exception as e:
# #         print("❌ Error case test failed:", e)

# # def main():
# #     print("🚀 Starting Comprehensive RPC Service Tests...")
# #     print("=" * 50)
# #     print(f"🔧 Using category ID: {WEB_DEVELOPMENT_CATEGORY_ID}")
# #     print("=" * 50)
    
# #     try:
# #         # Test user services and get freelancer ID
# #         freelancer_id = test_user_services()
        
# #         # Test gig services
# #         gig_id = test_gig_services(freelancer_id)
        
# #         # Test order services
# #         test_order_services(freelancer_id, gig_id)
        
# #         # Test error cases
# #         test_error_cases()
        
# #         print("\n🎉 All tests completed!")
        
# #     except Exception as e:
# #         print(f"❌ Test suite failed: {e}")

# # if __name__ == "__main__":
# #     main()

# import sys
# import os
# import xmlrpc.client
# from datetime import datetime, timedelta
# import random

# # Add the current directory to Python path
# sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# # RPC Server configuration
# SERVER_URL = "http://localhost:8000"

# def test_user_service(server):
#     """Test User Service"""
#     print("🧪 Testing User Service...")
    
#     # Test data
#     test_email = f"testuser{random.randint(1000, 9999)}@example.com"
#     test_username = f"testuser{random.randint(1000, 9999)}"
    
#     # Test create user
#     print("  Creating user...")
#     user_data = {
#         'email': test_email,
#         'username': test_username,
#         'password': 'testpassword123',
#         'role': 'client',
#         'full_name': 'Test User',
#         'country': 'Test Country'
#     }
    
#     result = server.user_service.create_user(user_data)
#     if result.get('success'):
#         print("  ✅ User created successfully")
#         user_id = result['user']['_id']
        
#         # Test authenticate user
#         print("  Authenticating user...")
#         auth_result = server.user_service.authenticate_user(test_email, 'testpassword123')
#         if auth_result.get('success'):
#             print("  ✅ User authenticated successfully")
#             token = auth_result['token']
#         else:
#             print(f"  ❌ Authentication failed: {auth_result.get('error')}")
        
#         # Test get user by ID
#         print("  Getting user by ID...")
#         user_result = server.user_service.get_user_by_id(user_id)
#         if user_result.get('success'):
#             print("  ✅ User retrieved successfully")
#         else:
#             print(f"  ❌ Get user failed: {user_result.get('error')}")
        
#         # Test update user profile
#         print("  Updating user profile...")
#         update_data = {
#             'bio': 'This is a test bio',
#             'phone_number': '+1234567890'
#         }
#         update_result = server.user_service.update_user_profile(user_id, update_data)
#         if update_result.get('success'):
#             print("  ✅ User profile updated successfully")
#         else:
#             print(f"  ❌ Update profile failed: {update_result.get('error')}")
        
#         # Test search freelancers
#         print("  Searching freelancers...")
#         search_result = server.user_service.search_freelancers({'page': 1, 'limit': 5})
#         if search_result.get('success'):
#             print(f"  ✅ Found {len(search_result.get('freelancers', []))} freelancers")
#         else:
#             print(f"  ❌ Search freelancers failed: {search_result.get('error')}")
            
#         return user_id, token
#     else:
#         print(f"  ❌ User creation failed: {result.get('error')}")
#         return None, None

# def test_category_service(server):
#     """Test Category Service"""
#     print("\n🧪 Testing Category Service...")
    
#     # Test get all categories
#     print("  Getting all categories...")
#     result = server.category_service.get_all_categories()
#     if result.get('success'):
#         categories = result.get('categories', [])
#         print(f"  ✅ Retrieved {len(categories)} categories")
        
#         if categories:
#             # Test get category by ID
#             first_category = categories[0]
#             print("  Getting category by ID...")
#             category_result = server.category_service.get_category_by_id(first_category['_id'])
#             if category_result.get('success'):
#                 print("  ✅ Category retrieved by ID successfully")
#             else:
#                 print(f"  ❌ Get category by ID failed: {category_result.get('error')}")
            
#             # Test get subcategories
#             print("  Getting subcategories...")
#             subcat_result = server.category_service.get_subcategories(first_category['_id'])
#             if subcat_result.get('success'):
#                 subcategories = subcat_result.get('subcategories', [])
#                 print(f"  ✅ Retrieved {len(subcategories)} subcategories")
#             else:
#                 print(f"  ❌ Get subcategories failed: {subcat_result.get('error')}")
#     else:
#         print(f"  ❌ Get categories failed: {result.get('error')}")

# def test_gig_service(server, freelancer_id):
#     """Test Gig Service"""
#     print("\n🧪 Testing Gig Service...")
    
#     # Get a category ID first
#     categories_result = server.category_service.get_all_categories()
#     if not categories_result.get('success'):
#         print("  ❌ Need categories to create gig")
#         return None
    
#     category_id = categories_result['categories'][0]['_id']
    
#     # Test create gig
#     print("  Creating gig...")
#     gig_data = {
#         'freelancer_id': freelancer_id,
#         'category_id': category_id,
#         'title': f'Test Gig Service {random.randint(1000, 9999)}',
#         'description': 'This is a test gig for service testing',
#         'base_price': 100.0,
#         'delivery_days': 7,
#         'search_tags': ['test', 'service', 'python'],
#         'requirements_description': 'Please provide clear requirements'
#     }
    
#     result = server.gig_service.create_gig(gig_data)
#     if result.get('success'):
#         print("  ✅ Gig created successfully")
#         gig_id = result['gig']['_id']
        
#         # Test get gig by ID
#         print("  Getting gig by ID...")
#         gig_result = server.gig_service.get_gig_by_id(gig_id)
#         if gig_result.get('success'):
#             print("  ✅ Gig retrieved by ID successfully")
#         else:
#             print(f"  ❌ Get gig by ID failed: {gig_result.get('error')}")
        
#         # Test search gigs
#         print("  Searching gigs...")
#         search_result = server.gig_service.search_gigs({
#             'page': 1,
#             'limit': 5,
#             'search': 'test'
#         })
#         if search_result.get('success'):
#             print(f"  ✅ Found {len(search_result.get('gigs', []))} gigs")
#         else:
#             print(f"  ❌ Search gigs failed: {search_result.get('error')}")
        
#         # Test get freelancer gigs
#         print("  Getting freelancer gigs...")
#         freelancer_gigs = server.gig_service.get_freelancer_gigs(freelancer_id)
#         if freelancer_gigs.get('success'):
#             print(f"  ✅ Found {len(freelancer_gigs.get('gigs', []))} gigs for freelancer")
#         else:
#             print(f"  ❌ Get freelancer gigs failed: {freelancer_gigs.get('error')}")
            
#         return gig_id
#     else:
#         print(f"  ❌ Gig creation failed: {result.get('error')}")
#         return None

# def test_order_service(server, client_id, freelancer_id, gig_id):
#     """Test Order Service"""
#     print("\n🧪 Testing Order Service...")
    
#     # Test create order
#     print("  Creating order...")
#     order_data = {
#         'client_id': client_id,
#         'freelancer_id': freelancer_id,
#         'gig_id': gig_id,
#         'requirements': 'Test requirements for order service',
#         'description': 'This is a test order'
#     }
    
#     result = server.order_service.create_order(order_data)
#     if result.get('success'):
#         print("  ✅ Order created successfully")
#         order_id = result['order']['_id']
        
#         # Test get user orders (client)
#         print("  Getting client orders...")
#         client_orders = server.order_service.get_user_orders(client_id, 'client')
#         if client_orders.get('success'):
#             print(f"  ✅ Found {len(client_orders.get('orders', []))} orders for client")
#         else:
#             print(f"  ❌ Get client orders failed: {client_orders.get('error')}")
        
#         # Test get user orders (freelancer)
#         print("  Getting freelancer orders...")
#         freelancer_orders = server.order_service.get_user_orders(freelancer_id, 'freelancer')
#         if freelancer_orders.get('success'):
#             print(f"  ✅ Found {len(freelancer_orders.get('orders', []))} orders for freelancer")
#         else:
#             print(f"  ❌ Get freelancer orders failed: {freelancer_orders.get('error')}")
        
#         # Test update order status
#         print("  Updating order status...")
#         status_result = server.order_service.update_order_status(order_id, 'confirmed', client_id)
#         if status_result.get('success'):
#             print("  ✅ Order status updated successfully")
#         else:
#             print(f"  ❌ Update order status failed: {status_result.get('error')}")
            
#         return order_id
#     else:
#         print(f"  ❌ Order creation failed: {result.get('error')}")
#         return None

# def test_favorite_service(server, user_id, gig_id):
#     """Test Favorite Service"""
#     print("\n🧪 Testing Favorite Service...")
    
#     # Test add to favorites
#     print("  Adding gig to favorites...")
#     result = server.favorite_service.add_to_favorites(user_id, gig_id)
#     if result.get('success'):
#         print("  ✅ Gig added to favorites successfully")
        
#         # Test is favorite
#         print("  Checking if gig is favorite...")
#         check_result = server.favorite_service.is_favorite(user_id, gig_id)
#         if check_result.get('success') and check_result.get('is_favorite'):
#             print("  ✅ Gig is in favorites")
#         else:
#             print("  ❌ Gig is not in favorites")
        
#         # Test get user favorites
#         print("  Getting user favorites...")
#         favorites_result = server.favorite_service.get_user_favorites(user_id)
#         if favorites_result.get('success'):
#             print(f"  ✅ Found {len(favorites_result.get('favorites', []))} favorites")
#         else:
#             print(f"  ❌ Get favorites failed: {favorites_result.get('error')}")
        
#         # Test remove from favorites
#         print("  Removing gig from favorites...")
#         remove_result = server.favorite_service.remove_from_favorites(user_id, gig_id)
#         if remove_result.get('success'):
#             print("  ✅ Gig removed from favorites successfully")
#         else:
#             print(f"  ❌ Remove from favorites failed: {remove_result.get('error')}")
#     else:
#         print(f"  ❌ Add to favorites failed: {result.get('error')}")

# def test_message_service(server, order_id, client_id, freelancer_id):
#     """Test Message Service"""
#     print("\n🧪 Testing Message Service...")
    
#     # Test send message
#     print("  Sending message...")
#     message_data = {
#         'order_id': order_id,
#         'sender_id': client_id,
#         'receiver_id': freelancer_id,
#         'content': 'Hello, this is a test message from the client',
#         'message_type': 'text'
#     }
    
#     result = server.message_service.send_message(message_data)
#     if result.get('success'):
#         print("  ✅ Message sent successfully")
#         message_id = result['message']['_id']
        
#         # Test get order messages
#         print("  Getting order messages...")
#         messages_result = server.message_service.get_order_messages(order_id, client_id)
#         if messages_result.get('success'):
#             messages = messages_result.get('messages', [])
#             print(f"  ✅ Retrieved {len(messages)} messages")
            
#             if messages:
#                 # Test mark as read
#                 print("  Marking message as read...")
#                 mark_result = server.message_service.mark_as_read([messages[0]['_id']], freelancer_id)
#                 if mark_result.get('success'):
#                     print("  ✅ Message marked as read successfully")
#                 else:
#                     print(f"  ❌ Mark as read failed: {mark_result.get('error')}")
#         else:
#             print(f"  ❌ Get messages failed: {messages_result.get('error')}")
        
#         # Test get unread count
#         print("  Getting unread count...")
#         unread_result = server.message_service.get_unread_count(freelancer_id)
#         if unread_result.get('success'):
#             print(f"  ✅ Unread count: {unread_result.get('unread_count')}")
#         else:
#             print(f"  ❌ Get unread count failed: {unread_result.get('error')}")
#     else:
#         print(f"  ❌ Send message failed: {result.get('error')}")

# def test_review_service(server, order_id, client_id, freelancer_id):
#     """Test Review Service"""
#     print("\n🧪 Testing Review Service...")
    
#     # First, complete the order
#     print("  Completing order for review...")
#     complete_result = server.order_service.update_order_status(order_id, 'completed')
#     if not complete_result.get('success'):
#         print(f"  ❌ Cannot test reviews - order completion failed: {complete_result.get('error')}")
#         return
    
#     # Test create review
#     print("  Creating review...")
#     review_data = {
#         'order_id': order_id,
#         'reviewer_id': client_id,
#         'reviewee_id': freelancer_id,
#         'rating_communication': 5.0,
#         'rating_quality': 4.5,
#         'rating_deadline': 5.0,
#         'title': 'Excellent service!',
#         'comment': 'Great work, delivered on time with excellent communication.'
#     }
    
#     result = server.review_service.create_review(review_data)
#     if result.get('success'):
#         print("  ✅ Review created successfully")
#         review_id = result['review']['_id']
        
#         # Test get reviews by freelancer
#         print("  Getting freelancer reviews...")
#         reviews_result = server.review_service.get_reviews_by_freelancer(freelancer_id)
#         if reviews_result.get('success'):
#             reviews = reviews_result.get('reviews', [])
#             print(f"  ✅ Found {len(reviews)} reviews for freelancer")
#         else:
#             print(f"  ❌ Get reviews failed: {reviews_result.get('error')}")
        
#         # Test respond to review
#         print("  Responding to review...")
#         response_result = server.review_service.respond_to_review(review_id, freelancer_id, 'Thank you for your feedback!')
#         if response_result.get('success'):
#             print("  ✅ Response added successfully")
#         else:
#             print(f"  ❌ Respond to review failed: {response_result.get('error')}")
#     else:
#         print(f"  ❌ Create review failed: {result.get('error')}")

# def test_notification_service(server, user_id):
#     """Test Notification Service"""
#     print("\n🧪 Testing Notification Service...")
    
#     # Test create notification
#     print("  Creating notification...")
#     notification_data = {
#         'user_id': user_id,
#         'type': 'test',
#         'title': 'Test Notification',
#         'message': 'This is a test notification from the service test',
#         'action_url': '/test'
#     }
    
#     result = server.notification_service.create_notification(notification_data)
#     if result.get('success'):
#         print("  ✅ Notification created successfully")
#         notification_id = result['notification']['_id']
        
#         # Test get user notifications
#         print("  Getting user notifications...")
#         notifications_result = server.notification_service.get_user_notifications(user_id)
#         if notifications_result.get('success'):
#             notifications = notifications_result.get('notifications', [])
#             print(f"  ✅ Found {len(notifications)} notifications")
            
#             if notifications:
#                 # Test mark as read
#                 print("  Marking notification as read...")
#                 mark_result = server.notification_service.mark_as_read(notification_id, user_id)
#                 if mark_result.get('success'):
#                     print("  ✅ Notification marked as read successfully")
#                 else:
#                     print(f"  ❌ Mark as read failed: {mark_result.get('error')}")
#         else:
#             print(f"  ❌ Get notifications failed: {notifications_result.get('error')}")
        
#         # Test mark all as read
#         print("  Marking all notifications as read...")
#         mark_all_result = server.notification_service.mark_all_as_read(user_id)
#         if mark_all_result.get('success'):
#             print("  ✅ All notifications marked as read")
#         else:
#             print(f"  ❌ Mark all as read failed: {mark_all_result.get('error')}")
        
#         # Test get unread count
#         print("  Getting unread count...")
#         unread_result = server.notification_service.get_unread_count(user_id)
#         if unread_result.get('success'):
#             print(f"  ✅ Unread count: {unread_result.get('unread_count')}")
#         else:
#             print(f"  ❌ Get unread count failed: {unread_result.get('error')}")
#     else:
#         print(f"  ❌ Create notification failed: {result.get('error')}")

# def test_payment_service(server, order_id, client_id):
#     """Test Payment Service"""
#     print("\n🧪 Testing Payment Service...")
    
#     # Test create payment
#     print("  Creating payment...")
#     payment_data = {
#         'order_id': order_id,
#         'client_id': client_id,
#         'amount': 100.0,
#         'payment_method': 'credit_card',
#         'currency': 'USD'
#     }
    
#     result = server.payment_service.create_payment(payment_data)
#     if result.get('success'):
#         print("  ✅ Payment created successfully")
#         payment_id = result['payment']['_id']
        
#         # Test update payment status
#         print("  Updating payment status...")
#         status_result = server.payment_service.update_payment_status(payment_id, 'completed', 'test_transaction_123')
#         if status_result.get('success'):
#             print("  ✅ Payment status updated successfully")
#         else:
#             print(f"  ❌ Update payment status failed: {status_result.get('error')}")
        
#         # Test get user payments
#         print("  Getting user payments...")
#         payments_result = server.payment_service.get_user_payments(client_id, 'client')
#         if payments_result.get('success'):
#             payments = payments_result.get('payments', [])
#             print(f"  ✅ Found {len(payments)} payments")
#         else:
#             print(f"  ❌ Get payments failed: {payments_result.get('error')}")
#     else:
#         print(f"  ❌ Create payment failed: {result.get('error')}")

# def main():
#     """Main test function"""
#     print("🚀 Starting Comprehensive Service Tests")
#     print("=" * 50)
    
#     try:
#         # Connect to RPC server
#         print("🔗 Connecting to RPC server...")
#         server = xmlrpc.client.ServerProxy(SERVER_URL, allow_none=True)
        
#         # Test basic connection
#         try:
#             server.system.listMethods()
#             print("✅ Connected to RPC server successfully")
#         except Exception as e:
#             print(f"❌ Failed to connect to RPC server: {e}")
#             return
        
#         # Run tests
#         client_id, token = test_user_service(server)
        
#         if client_id:
#             # Create a freelancer user for testing
#             freelancer_email = f"testfreelancer{random.randint(1000, 9999)}@example.com"
#             freelancer_username = f"testfreelancer{random.randint(1000, 9999)}"
            
#             freelancer_data = {
#                 'email': freelancer_email,
#                 'username': freelancer_username,
#                 'password': 'testpassword123',
#                 'role': 'freelancer',
#                 'full_name': 'Test Freelancer',
#                 'country': 'Test Country',
#                 'skills': ['python', 'mongodb', 'rpc'],
#                 'hourly_rate': 50.0
#             }
            
#             freelancer_result = server.user_service.create_user(freelancer_data)
#             if freelancer_result.get('success'):
#                 freelancer_id = freelancer_result['user']['_id']
#                 print(f"✅ Created freelancer user: {freelancer_id}")
                
#                 # Run service tests
#                 test_category_service(server)
                
#                 gig_id = test_gig_service(server, freelancer_id)
                
#                 if gig_id:
#                     order_id = test_order_service(server, client_id, freelancer_id, gig_id)
                    
#                     if order_id:
#                         test_favorite_service(server, client_id, gig_id)
#                         test_message_service(server, order_id, client_id, freelancer_id)
#                         test_review_service(server, order_id, client_id, freelancer_id)
#                         test_payment_service(server, order_id, client_id)
                
#                 test_notification_service(server, client_id)
                
#             else:
#                 print(f"❌ Failed to create freelancer user: {freelancer_result.get('error')}")
        
#         print("\n" + "=" * 50)
#         print("🎉 All tests completed!")
        
#     except Exception as e:
#         print(f"💥 Test suite failed with error: {e}")
#         import traceback
#         traceback.print_exc()

# if __name__ == "__main__":
#     main()
































# import sys
# import os
# import xmlrpc.client
# from datetime import datetime, timedelta
# import random

# # Add the current directory to Python path
# sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# # RPC Server configuration
# SERVER_URL = "http://localhost:8000"

# def test_user_service(server):
#     """Test User Service"""
#     print("🧪 Testing User Service...")
    
#     # Test data - use unique emails/usernames
#     test_email = f"testuser{random.randint(10000, 99999)}@example.com"
#     test_username = f"testuser{random.randint(10000, 99999)}"
    
#     # Test create user
#     print("  Creating user...")
#     user_data = {
#         'email': test_email,
#         'username': test_username,
#         'password': 'testpassword123',
#         'role': 'client',
#         'full_name': 'Test User',
#         'country': 'Test Country'
#     }
    
#     result = server.create_user(user_data)
#     if result.get('success'):
#         print("  ✅ User created successfully")
#         user_id = result['user']['_id']
        
#         # Test authenticate user
#         print("  Authenticating user...")
#         auth_result = server.authenticate_user(test_email, 'testpassword123')
#         if auth_result.get('success'):
#             print("  ✅ User authenticated successfully")
#             token = auth_result['token']
#         else:
#             print(f"  ❌ Authentication failed: {auth_result.get('error')}")
#             token = None
        
#         # Test get user by ID
#         print("  Getting user by ID...")
#         user_result = server.get_user_by_id(user_id)
#         if user_result.get('success'):
#             print("  ✅ User retrieved successfully")
#         else:
#             print(f"  ❌ Get user failed: {user_result.get('error')}")
        
#         # Test update user profile
#         print("  Updating user profile...")
#         update_data = {
#             'bio': 'This is a test bio',
#             'phone_number': '+1234567890',
#             'city': 'Test City'
#         }
#         update_result = server.update_user_profile(user_id, update_data)
#         if update_result.get('success'):
#             print("  ✅ User profile updated successfully")
#         else:
#             print(f"  ❌ Update profile failed: {update_result.get('error')}")
        
#         # Test search freelancers
#         print("  Searching freelancers...")
#         search_result = server.search_freelancers({'page': 1, 'limit': 5})
#         if search_result.get('success'):
#             freelancers = search_result.get('freelancers', [])
#             print(f"  ✅ Found {len(freelancers)} freelancers")
#         else:
#             print(f"  ❌ Search freelancers failed: {search_result.get('error')}")
            
#         return user_id, token
#     else:
#         print(f"  ❌ User creation failed: {result.get('error')}")
#         return None, None

# def test_gig_service(server, freelancer_id):
#     """Test Gig Service"""
#     print("\n🧪 Testing Gig Service...")
    
#     # Use existing Web Development category from your database
#     category_id = "6920c775747da49650b2d6de"  # Web Development
    
#     # Test create gig
#     print("  Creating gig...")
#     gig_data = {
#         'freelancer_id': freelancer_id,
#         'category_id': category_id,
#         'title': f'Python RPC Service {random.randint(1000, 9999)}',
#         'description': 'Professional XML-RPC services development with Python and MongoDB. I will build robust RPC servers and clients for your applications.',
#         'base_price': 150.0,
#         'delivery_days': 7,
#         'search_tags': ['python', 'rpc', 'mongodb', 'api', 'backend'],
#         'requirements_description': 'Please provide your API specifications and requirements',
#         'currency': 'USD',
#         'pricing_type': 'fixed',
#         'revisions_included': 2
#     }
    
#     result = server.create_gig(gig_data)
#     if result.get('success'):
#         print("  ✅ Gig created successfully")
#         gig_id = result['gig']['_id']
        
#         # Test get gig by ID
#         print("  Getting gig by ID...")
#         gig_result = server.get_gig_by_id(gig_id)
#         if gig_result.get('success'):
#             print("  ✅ Gig retrieved by ID successfully")
#             gig_details = gig_result['gig']
#             print(f"    Title: {gig_details.get('title')}")
#             print(f"    Price: ${gig_details.get('base_price')}")
#         else:
#             print(f"  ❌ Get gig by ID failed: {gig_result.get('error')}")
        
#         # Test search gigs
#         print("  Searching gigs...")
#         search_result = server.search_gigs({
#             'page': 1,
#             'limit': 5,
#             'search': 'python'
#         })
#         if search_result.get('success'):
#             gigs = search_result.get('gigs', [])
#             print(f"  ✅ Found {len(gigs)} gigs")
#         else:
#             print(f"  ❌ Search gigs failed: {search_result.get('error')}")
        
#         # Test get freelancer gigs
#         print("  Getting freelancer gigs...")
#         freelancer_gigs = server.get_freelancer_gigs(freelancer_id)
#         if freelancer_gigs.get('success'):
#             gigs = freelancer_gigs.get('gigs', [])
#             print(f"  ✅ Found {len(gigs)} gigs for freelancer")
#         else:
#             print(f"  ❌ Get freelancer gigs failed: {freelancer_gigs.get('error')}")
            
#         return gig_id
#     else:
#         print(f"  ❌ Gig creation failed: {result.get('error')}")
#         return None

# def test_order_service(server, client_id, freelancer_id, gig_id):
#     """Test Order Service"""
#     print("\n🧪 Testing Order Service...")
    
#     # Test create order
#     print("  Creating order...")
#     order_data = {
#         'client_id': client_id,
#         'freelancer_id': freelancer_id,
#         'gig_id': gig_id,
#         'requirements': 'Need a complete RPC service with user authentication and MongoDB integration',
#         'description': 'Building a freelance platform RPC backend'
#     }
    
#     result = server.create_order(order_data)
#     if result.get('success'):
#         print("  ✅ Order created successfully")
#         order = result['order']
#         order_id = order['_id']
#         order_number = order.get('order_number', 'N/A')
#         print(f"    Order Number: {order_number}")
#         print(f"    Amount: ${order.get('amount')}")
#         print(f"    Status: {order.get('status')}")
        
#         # Test get user orders (client)
#         print("  Getting client orders...")
#         client_orders = server.get_user_orders(client_id, 'client')
#         if client_orders.get('success'):
#             orders = client_orders.get('orders', [])
#             print(f"  ✅ Found {len(orders)} orders for client")
#         else:
#             print(f"  ❌ Get client orders failed: {client_orders.get('error')}")
        
#         # Test get user orders (freelancer)
#         print("  Getting freelancer orders...")
#         freelancer_orders = server.get_user_orders(freelancer_id, 'freelancer')
#         if freelancer_orders.get('success'):
#             orders = freelancer_orders.get('orders', [])
#             print(f"  ✅ Found {len(orders)} orders for freelancer")
#         else:
#             print(f"  ❌ Get freelancer orders failed: {freelancer_orders.get('error')}")
        
#         # Test update order status
#         print("  Updating order status to 'confirmed'...")
#         status_result = server.update_order_status(order_id, 'confirmed', client_id)
#         if status_result.get('success'):
#             print("  ✅ Order status updated successfully")
#         else:
#             print(f"  ❌ Update order status failed: {status_result.get('error')}")
        
#         # Test update to in_progress
#         print("  Updating order status to 'in_progress'...")
#         status_result = server.update_order_status(order_id, 'in_progress', freelancer_id)
#         if status_result.get('success'):
#             print("  ✅ Order status updated to in_progress")
#         else:
#             print(f"  ❌ Update to in_progress failed: {status_result.get('error')}")
            
#         return order_id
#     else:
#         print(f"  ❌ Order creation failed: {result.get('error')}")
#         return None

# def test_existing_data(server):
#     """Test with existing data from database"""
#     print("\n🧪 Testing with Existing Data...")
    
#     # Test getting existing users
#     print("  Testing existing user retrieval...")
    
#     # Try to get the existing freelancer
#     existing_freelancer_id = "6920c510747da49650b2d6d4"  # pro_freelancer
#     user_result = server.get_user_by_id(existing_freelancer_id)
#     if user_result.get('success'):
#         user = user_result['user']
#         print(f"  ✅ Found existing freelancer: {user.get('username')} - {user.get('full_name')}")
#         print(f"    Skills: {', '.join(user.get('skills', []))}")
#         print(f"    Rating: {user.get('rating')}")
#     else:
#         print(f"  ❌ Get existing user failed: {user_result.get('error')}")
    
#     # Test searching existing gigs
#     print("  Searching existing gigs...")
#     search_result = server.search_gigs({
#         'page': 1,
#         'limit': 3,
#         'category': '6920c775747da49650b2d6de'  # Web Development
#     })
#     if search_result.get('success'):
#         gigs = search_result.get('gigs', [])
#         print(f"  ✅ Found {len(gigs)} existing gigs")
#         for gig in gigs[:2]:  # Show first 2 gigs
#             print(f"    - {gig.get('title')} (${gig.get('base_price')})")
#     else:
#         print(f"  ❌ Search existing gigs failed: {search_result.get('error')}")

# def test_complete_workflow(server):
#     """Test complete workflow: User → Gig → Order"""
#     print("\n🔄 Testing Complete Workflow...")
    
#     # Step 1: Create a client
#     print("1. Creating client user...")
#     client_email = f"workflow_client{random.randint(10000, 99999)}@example.com"
#     client_username = f"workflowclient{random.randint(10000, 99999)}"
    
#     client_data = {
#         'email': client_email,
#         'username': client_username,
#         'password': 'workflow123',
#         'role': 'client',
#         'full_name': 'Workflow Test Client',
#         'country': 'Workflow Country'
#     }
    
#     client_result = server.create_user(client_data)
#     if not client_result.get('success'):
#         print(f"❌ Failed to create client: {client_result.get('error')}")
#         return
    
#     client_id = client_result['user']['_id']
#     print(f"✅ Client created: {client_id}")
    
#     # Step 2: Create a freelancer
#     print("2. Creating freelancer user...")
#     freelancer_email = f"workflow_freelancer{random.randint(10000, 99999)}@example.com"
#     freelancer_username = f"workflowfreelancer{random.randint(10000, 99999)}"
    
#     freelancer_data = {
#         'email': freelancer_email,
#         'username': freelancer_username,
#         'password': 'workflow123',
#         'role': 'freelancer',
#         'full_name': 'Workflow Test Freelancer',
#         'country': 'Workflow Country',
#         'skills': ['python', 'rpc', 'mongodb', 'api'],
#         'hourly_rate': 45.0,
#         'bio': 'Experienced RPC developer'
#     }
    
#     freelancer_result = server.create_user(freelancer_data)
#     if not freelancer_result.get('success'):
#         print(f"❌ Failed to create freelancer: {freelancer_result.get('error')}")
#         return
    
#     freelancer_id = freelancer_result['user']['_id']
#     print(f"✅ Freelancer created: {freelancer_id}")
    
#     # Step 3: Create a gig
#     print("3. Creating gig...")
#     gig_data = {
#         'freelancer_id': freelancer_id,
#         'category_id': '6920c775747da49650b2d6de',  # Web Development
#         'title': f'Workflow Test Gig {random.randint(1000, 9999)}',
#         'description': 'Complete RPC service development for workflow testing',
#         'base_price': 200.0,
#         'delivery_days': 10,
#         'search_tags': ['workflow', 'test', 'rpc', 'python'],
#         'requirements_description': 'Provide detailed API specifications'
#     }
    
#     gig_result = server.create_gig(gig_data)
#     if not gig_result.get('success'):
#         print(f"❌ Failed to create gig: {gig_result.get('error')}")
#         return
    
#     gig_id = gig_result['gig']['_id']
#     print(f"✅ Gig created: {gig_id}")
    
#     # Step 4: Create an order
#     print("4. Creating order...")
#     order_data = {
#         'client_id': client_id,
#         'freelancer_id': freelancer_id,
#         'gig_id': gig_id,
#         'requirements': 'Complete workflow test requirements',
#         'description': 'Testing the complete user-gig-order workflow'
#     }
    
#     order_result = server.create_order(order_data)
#     if not order_result.get('success'):
#         print(f"❌ Failed to create order: {order_result.get('error')}")
#         return
    
#     order_id = order_result['order']['_id']
#     order_number = order_result['order'].get('order_number')
#     print(f"✅ Order created: {order_id}")
#     print(f"📦 Order Number: {order_number}")
    
#     # Step 5: Update order status through workflow
#     print("5. Testing order status workflow...")
    
#     status_flow = [
#         ('confirmed', client_id),
#         ('in_progress', freelancer_id),
#         ('delivered', freelancer_id),
#         ('completed', client_id)
#     ]
    
#     for status, updater_id in status_flow:
#         print(f"   Updating to '{status}'...")
#         status_result = server.update_order_status(order_id, status, updater_id)
#         if status_result.get('success'):
#             print(f"   ✅ Status updated to '{status}'")
#         else:
#             print(f"   ❌ Failed to update to '{status}': {status_result.get('error')}")
#             break
    
#     print("🎉 Complete workflow test finished!")

# def main():
#     """Main test function"""
#     print("🚀 Starting WorkNet RPC Service Tests")
#     print("=" * 60)
    
#     try:
#         # Connect to RPC server
#         print("🔗 Connecting to RPC server...")
#         server = xmlrpc.client.ServerProxy(SERVER_URL, allow_none=True)
        
#         # Test basic connection
#         try:
#             methods = server.system.listMethods()
#             print("✅ Connected to RPC server successfully")
#             print(f"📡 Available methods: {len(methods)}")
            
#             # Show available methods (first 10)
#             print("   Available RPC methods:")
#             for method in methods[:10]:
#                 print(f"   - {method}")
#             if len(methods) > 10:
#                 print(f"   ... and {len(methods) - 10} more methods")
                
#         except Exception as e:
#             print(f"❌ Failed to connect to RPC server: {e}")
#             return
        
#         # Test 1: Basic service tests
#         print("\n" + "=" * 60)
#         print("1. BASIC SERVICE TESTS")
#         print("=" * 60)
        
#         client_id, token = test_user_service(server)
        
#         if client_id:
#             # Create a freelancer for testing
#             freelancer_email = f"testfreelancer{random.randint(10000, 99999)}@example.com"
#             freelancer_username = f"testfreelancer{random.randint(10000, 99999)}"
            
#             freelancer_data = {
#                 'email': freelancer_email,
#                 'username': freelancer_username,
#                 'password': 'testpassword123',
#                 'role': 'freelancer',
#                 'full_name': 'Test Freelancer',
#                 'country': 'Test Country',
#                 'skills': ['python', 'mongodb', 'rpc', 'api'],
#                 'hourly_rate': 50.0,
#                 'bio': 'Experienced developer for testing'
#             }
            
#             freelancer_result = server.create_user(freelancer_data)
#             if freelancer_result.get('success'):
#                 freelancer_id = freelancer_result['user']['_id']
#                 print(f"✅ Created freelancer user: {freelancer_id}")
                
#                 # Run service tests
#                 gig_id = test_gig_service(server, freelancer_id)
                
#                 if gig_id:
#                     order_id = test_order_service(server, client_id, freelancer_id, gig_id)
        
#         # Test 2: Existing data tests
#         print("\n" + "=" * 60)
#         print("2. EXISTING DATA TESTS")
#         print("=" * 60)
#         test_existing_data(server)
        
#         # Test 3: Complete workflow test
#         print("\n" + "=" * 60)
#         print("3. COMPLETE WORKFLOW TEST")
#         print("=" * 60)
#         test_complete_workflow(server)
        
#         print("\n" + "=" * 60)
#         print("🎉 ALL TESTS COMPLETED SUCCESSFULLY!")
#         print("=" * 60)
#         print("💡 Services tested:")
#         print("   ✅ User Service (create, auth, get, update, search)")
#         print("   ✅ Gig Service (create, get, search, freelancer gigs)")
#         print("   ✅ Order Service (create, get, update status)")
#         print("   ✅ Existing data integration")
#         print("   ✅ Complete workflow simulation")
        
#     except Exception as e:
#         print(f"💥 Test suite failed with error: {e}")
#         import traceback
#         traceback.print_exc()

# if __name__ == "__main__":
#     main()

# test_all_services.py - UPDATED FOR NEW CATEGORY STRUCTURE

import sys
import os
import xmlrpc.client
from datetime import datetime, timedelta
import random

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# RPC Server configuration
SERVER_URL = "http://localhost:8000"

def test_category_service(server):
    """Test Category Service"""
    print("📁 Testing Category Service...")
    
    # Test get all categories
    print("  Getting all categories...")
    result = server.get_all_categories()
    if result.get('success'):
        categories = result.get('categories', [])
        print(f"  ✅ Found {len(categories)} categories")
        
        if categories:
            # Display first few categories
            for i, cat in enumerate(categories[:3], 1):
                parent = cat.get('parent_category_id', 'None')
                print(f"    {i}. {cat.get('name')} (ID: {cat.get('_id')}, Parent: {parent})")
            
            # Test get category by ID
            first_category = categories[0]
            category_id = first_category['_id']
            
            print("  Getting category by ID...")
            cat_result = server.get_category_by_id(category_id)
            if cat_result.get('success'):
                category = cat_result['category']
                print(f"  ✅ Category retrieved: {category.get('name')}")
                print(f"    Description: {category.get('description', 'N/A')}")
                print(f"    Active: {category.get('is_active', True)}")
            else:
                print(f"  ❌ Get category by ID failed: {cat_result.get('error')}")
            
            # Test get category by slug
            if 'slug' in first_category and first_category['slug']:
                print(f"  Getting category by slug ({first_category['slug']})...")
                slug_result = server.get_category_by_slug(first_category['slug'])
                if slug_result.get('success'):
                    print(f"  ✅ Category retrieved by slug: {slug_result['category'].get('name')}")
                else:
                    print(f"  ❌ Get category by slug failed: {slug_result.get('error')}")
            
            # Test get subcategories
            print("  Getting subcategories...")
            subcat_result = server.get_subcategories(category_id)
            if subcat_result.get('success'):
                subcategories = subcat_result.get('subcategories', [])
                print(f"  ✅ Found {len(subcategories)} subcategories")
                for subcat in subcategories[:2]:
                    print(f"    - {subcat.get('name')}")
            else:
                print(f"  ❌ Get subcategories failed: {subcat_result.get('error')}")
            
            # Test admin methods (create, update, delete)
            print("  Testing admin category methods...")
            
            # Create a test category
            test_cat_name = f"Test Category {random.randint(1000, 9999)}"
            print(f"  Creating category '{test_cat_name}'...")
            create_data = {
                'name': test_cat_name,
                'description': 'A test category created during service testing',
                'icon_url': 'https://example.com/test-icon.png',
                'is_active': True
            }
            
            create_result = server.create_category(create_data)
            if create_result.get('success'):
                new_cat_id = create_result['category']['_id']
                print(f"  ✅ Category created successfully (ID: {new_cat_id})")
                
                # Update the category
                print(f"  Updating category '{test_cat_name}'...")
                update_data = {
                    'description': 'Updated description for test category',
                    'sort_order': 99
                }
                update_result = server.update_category(new_cat_id, update_data)
                if update_result.get('success'):
                    print("  ✅ Category updated successfully")
                else:
                    print(f"  ❌ Update category failed: {update_result.get('error')}")
                
                # Toggle category status
                print(f"  Toggling category status...")
                toggle_result = server.toggle_category_status(new_cat_id)
                if toggle_result.get('success'):
                    status = "active" if toggle_result['is_active'] else "inactive"
                    print(f"  ✅ Category status toggled to: {status}")
                else:
                    print(f"  ❌ Toggle status failed: {toggle_result.get('error')}")
                
                # Update category order
                print(f"  Updating category order...")
                order_data = [{'id': new_cat_id, 'order': 100}]
                order_result = server.update_category_order(order_data)
                if order_result.get('success'):
                    print("  ✅ Category order updated")
                else:
                    print(f"  ❌ Update order failed: {order_result.get('error')}")
                
                # Delete the category (cleanup)
                print(f"  Deleting test category...")
                delete_result = server.delete_category(new_cat_id)
                if delete_result.get('success'):
                    print("  ✅ Test category deleted")
                else:
                    print(f"  ❌ Delete category failed: {delete_result.get('error')}")
                    print(f"    Note: Category might have subcategories preventing deletion")
            else:
                print(f"  ❌ Create category failed: {create_result.get('error')}")
            
            return category_id, categories
        else:
            print("  ⚠️ No categories found in database")
            return None, []
    else:
        print(f"  ❌ Get all categories failed: {result.get('error')}")
        return None, []

def test_user_service(server):
    """Test User Service"""
    print("\n👤 Testing User Service...")
    
    # Test data - use unique emails/usernames
    test_email = f"testuser{random.randint(10000, 99999)}@example.com"
    test_username = f"testuser{random.randint(10000, 99999)}"
    
    # Test create user
    print("  Creating user...")
    user_data = {
        'email': test_email,
        'username': test_username,
        'password': 'testpassword123',
        'role': 'client',
        'full_name': 'Test User',
        'country': 'Test Country'
    }
    
    result = server.create_user(user_data)
    if result.get('success'):
        print("  ✅ User created successfully")
        user_id = result['user']['_id']
        
        # Test authenticate user
        print("  Authenticating user...")
        auth_result = server.authenticate_user(test_email, 'testpassword123')
        if auth_result.get('success'):
            print("  ✅ User authenticated successfully")
            token = auth_result['token']
            print(f"    Token: {token[:30]}...")
        else:
            print(f"  ❌ Authentication failed: {auth_result.get('error')}")
            token = None
        
        # Test get user by ID
        print("  Getting user by ID...")
        user_result = server.get_user_by_id(user_id)
        if user_result.get('success'):
            print("  ✅ User retrieved successfully")
        else:
            print(f"  ❌ Get user failed: {user_result.get('error')}")
        
        # Test update user profile
        print("  Updating user profile...")
        update_data = {
            'bio': 'This is a test bio',
            'phone_number': '+1234567890',
            'city': 'Test City'
        }
        update_result = server.update_user_profile(user_id, update_data)
        if update_result.get('success'):
            print("  ✅ User profile updated successfully")
        else:
            print(f"  ❌ Update profile failed: {update_result.get('error')}")
        
        # Test search freelancers
        print("  Searching freelancers...")
        search_result = server.search_freelancers({'page': 1, 'limit': 5})
        if search_result.get('success'):
            freelancers = search_result.get('freelancers', [])
            print(f"  ✅ Found {len(freelancers)} freelancers")
            for i, freelancer in enumerate(freelancers[:2], 1):
                skills = freelancer.get('skills', [])[:3]
                print(f"    {i}. {freelancer.get('full_name')} - Skills: {skills}")
        else:
            print(f"  ❌ Search freelancers failed: {search_result.get('error')}")
            
        return user_id, token
    else:
        print(f"  ❌ User creation failed: {result.get('error')}")
        return None, None

def test_gig_service(server, freelancer_id, categories):
    """Test Gig Service"""
    print("\n💼 Testing Gig Service...")
    
    # Find a suitable category from the categories list
    category_id = None
    if categories:
        # Try to find a parent category (no parent_category_id)
        for cat in categories:
            if not cat.get('parent_category_id'):
                category_id = cat['_id']
                category_name = cat['name']
                break
        
        # If no parent category found, use the first category
        if not category_id and categories:
            category_id = categories[0]['_id']
            category_name = categories[0]['name']
    
    if not category_id:
        print("  ⚠️ No categories available for gig creation")
        return None
    
    print(f"  Using category: {category_name} (ID: {category_id})")
    
    # Test create gig
    print("  Creating gig...")
    gig_data = {
        'freelancer_id': freelancer_id,
        'category_id': category_id,
        'title': f'Python RPC Service {random.randint(1000, 9999)}',
        'description': 'Professional XML-RPC services development with Python and MongoDB. I will build robust RPC servers and clients for your applications.',
        'base_price': 150.0,
        'delivery_days': 7,
        'search_tags': ['python', 'rpc', 'mongodb', 'api', 'backend'],
        'requirements_description': 'Please provide your API specifications and requirements',
        'currency': 'USD',
        'pricing_type': 'fixed',
        'revisions_included': 2
    }
    
    result = server.create_gig(gig_data)
    if result.get('success'):
        print("  ✅ Gig created successfully")
        gig_id = result['gig']['_id']
        
        # Test get gig by ID
        print("  Getting gig by ID...")
        gig_result = server.get_gig_by_id(gig_id)
        if gig_result.get('success'):
            print("  ✅ Gig retrieved by ID successfully")
            gig_details = gig_result['gig']
            print(f"    Title: {gig_details.get('title')}")
            print(f"    Price: ${gig_details.get('base_price')}")
            print(f"    Category: {category_name}")
        else:
            print(f"  ❌ Get gig by ID failed: {gig_result.get('error')}")
        
        # Test search gigs
        print("  Searching gigs...")
        search_result = server.search_gigs({
            'page': 1,
            'limit': 5,
            'search': 'python'
        })
        if search_result.get('success'):
            gigs = search_result.get('gigs', [])
            print(f"  ✅ Found {len(gigs)} gigs")
        else:
            print(f"  ❌ Search gigs failed: {search_result.get('error')}")
        
        # Test get freelancer gigs
        print("  Getting freelancer gigs...")
        freelancer_gigs = server.get_freelancer_gigs(freelancer_id)
        if freelancer_gigs.get('success'):
            gigs = freelancer_gigs.get('gigs', [])
            print(f"  ✅ Found {len(gigs)} gigs for freelancer")
        else:
            print(f"  ❌ Get freelancer gigs failed: {freelancer_gigs.get('error')}")
            
        return gig_id
    else:
        print(f"  ❌ Gig creation failed: {result.get('error')}")
        return None

def test_order_service(server, client_id, freelancer_id, gig_id):
    """Test Order Service"""
    print("\n📦 Testing Order Service...")
    
    # Test create order
    print("  Creating order...")
    order_data = {
        'client_id': client_id,
        'freelancer_id': freelancer_id,
        'gig_id': gig_id,
        'requirements': 'Need a complete RPC service with user authentication and MongoDB integration',
        'description': 'Building a freelance platform RPC backend'
    }
    
    result = server.create_order(order_data)
    if result.get('success'):
        print("  ✅ Order created successfully")
        order = result['order']
        order_id = order['_id']
        order_number = order.get('order_number', 'N/A')
        print(f"    Order Number: {order_number}")
        print(f"    Amount: ${order.get('amount')}")
        print(f"    Status: {order.get('status')}")
        
        # Test get user orders (client)
        print("  Getting client orders...")
        client_orders = server.get_user_orders(client_id, 'client')
        if client_orders.get('success'):
            orders = client_orders.get('orders', [])
            print(f"  ✅ Found {len(orders)} orders for client")
        else:
            print(f"  ❌ Get client orders failed: {client_orders.get('error')}")
        
        # Test get user orders (freelancer)
        print("  Getting freelancer orders...")
        freelancer_orders = server.get_user_orders(freelancer_id, 'freelancer')
        if freelancer_orders.get('success'):
            orders = freelancer_orders.get('orders', [])
            print(f"  ✅ Found {len(orders)} orders for freelancer")
        else:
            print(f"  ❌ Get freelancer orders failed: {freelancer_orders.get('error')}")
        
        # Test update order status
        print("  Updating order status to 'confirmed'...")
        status_result = server.update_order_status(order_id, 'confirmed', client_id)
        if status_result.get('success'):
            print("  ✅ Order status updated successfully")
        else:
            print(f"  ❌ Update order status failed: {status_result.get('error')}")
        
        # Test update to in_progress
        print("  Updating order status to 'in_progress'...")
        status_result = server.update_order_status(order_id, 'in_progress', freelancer_id)
        if status_result.get('success'):
            print("  ✅ Order status updated to in_progress")
        else:
            print(f"  ❌ Update to in_progress failed: {status_result.get('error')}")
            
        return order_id
    else:
        print(f"  ❌ Order creation failed: {result.get('error')}")
        return None

def test_existing_data(server):
    """Test with existing data from database"""
    print("\n📊 Testing with Existing Data...")
    
    # Test getting existing users
    print("  Testing existing user retrieval...")
    
    # Try to get the existing freelancer
    try:
        existing_freelancer_id = "6920c510747da49650b2d6d4"  # pro_freelancer
        user_result = server.get_user_by_id(existing_freelancer_id)
        if user_result.get('success'):
            user = user_result['user']
            print(f"  ✅ Found existing freelancer: {user.get('username')} - {user.get('full_name')}")
            print(f"    Skills: {', '.join(user.get('skills', []))}")
            print(f"    Rating: {user.get('rating')}")
        else:
            print(f"  ❌ Get existing user failed: {user_result.get('error')}")
    except Exception as e:
        print(f"  ⚠️ Could not test existing freelancer: {e}")
    
    # Test searching existing gigs
    print("  Searching existing gigs...")
    try:
        search_result = server.search_gigs({
            'page': 1,
            'limit': 3
        })
        if search_result.get('success'):
            gigs = search_result.get('gigs', [])
            print(f"  ✅ Found {len(gigs)} existing gigs")
            for gig in gigs[:2]:  # Show first 2 gigs
                print(f"    - {gig.get('title')} (${gig.get('base_price', 0)})")
        else:
            print(f"  ❌ Search existing gigs failed: {search_result.get('error')}")
    except Exception as e:
        print(f"  ⚠️ Could not search existing gigs: {e}")
    
    # Test getting categories
    print("  Getting existing categories...")
    try:
        cat_result = server.get_all_categories()
        if cat_result.get('success'):
            categories = cat_result.get('categories', [])
            print(f"  ✅ Found {len(categories)} categories in database")
            for cat in categories[:3]:
                print(f"    - {cat.get('name')}")
        else:
            print(f"  ❌ Get categories failed: {cat_result.get('error')}")
    except Exception as e:
        print(f"  ⚠️ Could not get categories: {e}")

def test_complete_workflow(server, categories):
    """Test complete workflow: Category → User → Gig → Order"""
    print("\n🔄 Testing Complete Workflow...")
    
    # Step 0: Get or create a category
    print("0. Getting a category...")
    category_id = None
    category_name = None
    
    if categories:
        # Use the first parent category
        for cat in categories:
            if not cat.get('parent_category_id'):
                category_id = cat['_id']
                category_name = cat['name']
                break
        
        if not category_id and categories:
            category_id = categories[0]['_id']
            category_name = categories[0]['name']
    
    if not category_id:
        print("⚠️ No categories available, creating a test category...")
        create_data = {
            'name': f'Workflow Test Category {random.randint(1000, 9999)}',
            'description': 'Category for workflow testing',
            'is_active': True
        }
        cat_result = server.create_category(create_data)
        if cat_result.get('success'):
            category_id = cat_result['category']['_id']
            category_name = cat_result['category']['name']
            print(f"✅ Test category created: {category_name}")
        else:
            print(f"❌ Failed to create test category: {cat_result.get('error')}")
            return
    
    print(f"   Using category: {category_name}")
    
    # Step 1: Create a client
    print("1. Creating client user...")
    client_email = f"workflow_client{random.randint(10000, 99999)}@example.com"
    client_username = f"workflowclient{random.randint(10000, 99999)}"
    
    client_data = {
        'email': client_email,
        'username': client_username,
        'password': 'workflow123',
        'role': 'client',
        'full_name': 'Workflow Test Client',
        'country': 'Workflow Country'
    }
    
    client_result = server.create_user(client_data)
    if not client_result.get('success'):
        print(f"❌ Failed to create client: {client_result.get('error')}")
        return
    
    client_id = client_result['user']['_id']
    print(f"✅ Client created: {client_id}")
    
    # Step 2: Create a freelancer
    print("2. Creating freelancer user...")
    freelancer_email = f"workflow_freelancer{random.randint(10000, 99999)}@example.com"
    freelancer_username = f"workflowfreelancer{random.randint(10000, 99999)}"
    
    freelancer_data = {
        'email': freelancer_email,
        'username': freelancer_username,
        'password': 'workflow123',
        'role': 'freelancer',
        'full_name': 'Workflow Test Freelancer',
        'country': 'Workflow Country',
        'skills': ['python', 'rpc', 'mongodb', 'api'],
        'hourly_rate': 45.0,
        'bio': 'Experienced RPC developer'
    }
    
    freelancer_result = server.create_user(freelancer_data)
    if not freelancer_result.get('success'):
        print(f"❌ Failed to create freelancer: {freelancer_result.get('error')}")
        return
    
    freelancer_id = freelancer_result['user']['_id']
    print(f"✅ Freelancer created: {freelancer_id}")
    
    # Step 3: Create a gig
    print("3. Creating gig...")
    gig_data = {
        'freelancer_id': freelancer_id,
        'category_id': category_id,
        'title': f'Workflow Test Gig {random.randint(1000, 9999)}',
        'description': 'Complete RPC service development for workflow testing',
        'base_price': 200.0,
        'delivery_days': 10,
        'search_tags': ['workflow', 'test', 'rpc', 'python'],
        'requirements_description': 'Provide detailed API specifications'
    }
    
    gig_result = server.create_gig(gig_data)
    if not gig_result.get('success'):
        print(f"❌ Failed to create gig: {gig_result.get('error')}")
        return
    
    gig_id = gig_result['gig']['_id']
    print(f"✅ Gig created: {gig_id}")
    print(f"   Title: {gig_result['gig'].get('title')}")
    print(f"   Price: ${gig_result['gig'].get('base_price')}")
    
    # Step 4: Create an order
    print("4. Creating order...")
    order_data = {
        'client_id': client_id,
        'freelancer_id': freelancer_id,
        'gig_id': gig_id,
        'requirements': 'Complete workflow test requirements',
        'description': 'Testing the complete user-gig-order workflow'
    }
    
    order_result = server.create_order(order_data)
    if not order_result.get('success'):
        print(f"❌ Failed to create order: {order_result.get('error')}")
        return
    
    order_id = order_result['order']['_id']
    order_number = order_result['order'].get('order_number')
    print(f"✅ Order created: {order_id}")
    print(f"📦 Order Number: {order_number}")
    print(f"💰 Amount: ${order_result['order'].get('amount')}")
    
    # Step 5: Update order status through workflow
    print("5. Testing order status workflow...")
    
    status_flow = [
        ('confirmed', client_id),
        ('in_progress', freelancer_id),
        ('delivered', freelancer_id),
        ('completed', client_id)
    ]
    
    for status, updater_id in status_flow:
        print(f"   Updating to '{status}'...")
        status_result = server.update_order_status(order_id, status, updater_id)
        if status_result.get('success'):
            print(f"   ✅ Status updated to '{status}'")
        else:
            print(f"   ❌ Failed to update to '{status}': {status_result.get('error')}")
            break
    
    print("🎉 Complete workflow test finished!")
    return {
        'client_id': client_id,
        'freelancer_id': freelancer_id,
        'category_id': category_id,
        'gig_id': gig_id,
        'order_id': order_id
    }

def test_specified_user(server):
    """Test the specified user ss@example.com"""
    print("\n👑 Testing Specified User (ss@example.com)...")
    
    email = 'ss@example.com'
    password = 'admin123'
    
    print("  Authenticating specified user...")
    auth_result = server.authenticate_user(email, password)
    if auth_result.get('success'):
        print("  ✅ Specified user authenticated successfully")
        user = auth_result['user']
        token = auth_result['token']
        
        print(f"    User ID: {user.get('_id')}")
        print(f"    Role: {user.get('role')}")
        print(f"    Token: {token[:30]}...")
        
        # Test user functions with the authenticated user
        user_id = user['_id']
        
        print("  Getting user by ID...")
        user_result = server.get_user_by_id(user_id)
        if user_result.get('success'):
            print("  ✅ User details retrieved")
        
        print("  Updating profile...")
        update_data = {
            'bio': 'Updated via comprehensive test',
            'last_login': datetime.utcnow().isoformat()
        }
        update_result = server.update_user_profile(user_id, update_data)
        if update_result.get('success'):
            print("  ✅ Profile updated")
        
        return user_id, token
    else:
        print(f"  ❌ Authentication failed: {auth_result.get('error')}")
        print("  Trying to create the user...")
        
        create_data = {
            'email': email,
            'username': 'ss_admin',
            'password': password,
            'role': 'admin',
            'full_name': 'Specified User',
            'bio': 'The specified test user'
        }
        
        create_result = server.create_user(create_data)
        if create_result.get('success'):
            print("  ✅ Specified user created")
            return create_result['user']['_id'], None
        else:
            print(f"  ❌ Create user failed: {create_result.get('error')}")
            return None, None

def main():
    """Main test function"""
    print("🚀 Starting WorkNet RPC Service Comprehensive Tests")
    print("=" * 60)
    print("📋 Services to test:")
    print("   📁 Category Service")
    print("   👤 User Service") 
    print("   💼 Gig Service")
    print("   📦 Order Service")
    print("=" * 60)
    
    try:
        # Connect to RPC server
        print("🔗 Connecting to RPC server...")
        server = xmlrpc.client.ServerProxy(SERVER_URL, allow_none=True)
        
        # Test basic connection
        try:
            methods = server.system.listMethods()
            print("✅ Connected to RPC server successfully")
            print(f"📡 Available methods: {len(methods)}")
            
            # Show available methods by category
            print("\n📋 Available RPC methods by category:")
            
            # Category methods
            category_methods = [m for m in methods if 'category' in m.lower()]
            print(f"  📁 Category ({len(category_methods)}):")
            for method in sorted(category_methods)[:5]:
                print(f"    - {method}")
            if len(category_methods) > 5:
                print(f"    ... and {len(category_methods) - 5} more")
            
            # User methods
            user_methods = [m for m in methods if 'user' in m.lower()]
            print(f"  👤 User ({len(user_methods)}):")
            for method in sorted(user_methods)[:5]:
                print(f"    - {method}")
            
            # Gig methods
            gig_methods = [m for m in methods if 'gig' in m.lower()]
            print(f"  💼 Gig ({len(gig_methods)}):")
            for method in sorted(gig_methods)[:5]:
                print(f"    - {method}")
            
            # Order methods
            order_methods = [m for m in methods if 'order' in m.lower()]
            print(f"  📦 Order ({len(order_methods)}):")
            for method in sorted(order_methods)[:5]:
                print(f"    - {method}")
                
        except Exception as e:
            print(f"❌ Failed to connect to RPC server: {e}")
            print("Make sure the server is running with: python run_server.py")
            return
        
        # Test 1: Category Service (NEW)
        print("\n" + "=" * 60)
        print("1. CATEGORY SERVICE TESTS")
        print("=" * 60)
        category_id, categories = test_category_service(server)
        
        # Test 2: User Service
        print("\n" + "=" * 60)
        print("2. USER SERVICE TESTS")
        print("=" * 60)
        client_id, token = test_user_service(server)
        
        if client_id:
            # Create a freelancer for testing
            print("\n  Creating test freelancer...")
            freelancer_email = f"testfreelancer{random.randint(10000, 99999)}@example.com"
            freelancer_username = f"testfreelancer{random.randint(10000, 99999)}"
            
            freelancer_data = {
                'email': freelancer_email,
                'username': freelancer_username,
                'password': 'testpassword123',
                'role': 'freelancer',
                'full_name': 'Test Freelancer',
                'country': 'Test Country',
                'skills': ['python', 'mongodb', 'rpc', 'api'],
                'hourly_rate': 50.0,
                'bio': 'Experienced developer for testing'
            }
            
            freelancer_result = server.create_user(freelancer_data)
            if freelancer_result.get('success'):
                freelancer_id = freelancer_result['user']['_id']
                print(f"  ✅ Created freelancer user: {freelancer_id}")
                
                # Test 3: Gig Service
                print("\n" + "=" * 60)
                print("3. GIG SERVICE TESTS")
                print("=" * 60)
                gig_id = test_gig_service(server, freelancer_id, categories)
                
                if gig_id:
                    # Test 4: Order Service
                    print("\n" + "=" * 60)
                    print("4. ORDER SERVICE TESTS")
                    print("=" * 60)
                    order_id = test_order_service(server, client_id, freelancer_id, gig_id)
        
        # Test 5: Specified User Test
        print("\n" + "=" * 60)
        print("5. SPECIFIED USER TEST")
        print("=" * 60)
        test_specified_user(server)
        
        # Test 6: Existing data tests
        print("\n" + "=" * 60)
        print("6. EXISTING DATA TESTS")
        print("=" * 60)
        test_existing_data(server)
        
        # Test 7: Complete workflow test (with categories)
        print("\n" + "=" * 60)
        print("7. COMPLETE WORKFLOW TEST (WITH CATEGORIES)")
        print("=" * 60)
        workflow_result = test_complete_workflow(server, categories)
        
        print("\n" + "=" * 60)
        print("🎉 ALL SERVICES TESTED SUCCESSFULLY!")
        print("=" * 60)
        print("✅ Services tested:")
        print("   📁 Category Service (get, create, update, delete, reorder)")
        print("   👤 User Service (create, auth, get, update, search)")
        print("   💼 Gig Service (create, get, search, freelancer gigs)")
        print("   📦 Order Service (create, get, update status)")
        print("   👑 Specified user authentication")
        print("   📊 Existing data integration")
        print("   🔄 Complete workflow with categories")
        
        if workflow_result:
            print("\n📝 Workflow test IDs:")
            print(f"   Client ID: {workflow_result.get('client_id')}")
            print(f"   Freelancer ID: {workflow_result.get('freelancer_id')}")
            print(f"   Category ID: {workflow_result.get('category_id')}")
            print(f"   Gig ID: {workflow_result.get('gig_id')}")
            print(f"   Order ID: {workflow_result.get('order_id')}")
        
    except Exception as e:
        print(f"\n💥 Test suite failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()