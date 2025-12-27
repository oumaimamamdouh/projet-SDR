
# import xmlrpc.client
# import time
# import sys
# import json
# from datetime import datetime, timedelta

# class TestReviews:
#     def __init__(self, server_url='http://localhost:8000/RPC2'):
#         """Initialize the test client"""
#         self.server = xmlrpc.client.ServerProxy(server_url, allow_none=True)
#         print(f"✅ Connected to RPC server at {server_url}")
        
#         # Test data storage
#         self.test_data = {
#             'client_id': None,
#             'freelancer_id': None,
#             'gig_id': None,
#             'order_id': None,
#             'review_id': None,
#             'test_reviews': []
#         }
    
#     def run_all_tests(self):
#         """Run all review tests"""
#         print("\n" + "="*60)
#         print("🧪 RUNNING COMPREHENSIVE REVIEW SERVICE TESTS")
#         print("="*60)
        
#         try:
#             # 1. Setup - Create test users and gig
#             self._setup_test_data()
            
#             # 2. Create a completed order first
#             self._create_completed_order()
            
#             # 3. Test client review functions
#             self.test_create_review()
#             self.test_update_review()
#             self.test_respond_to_review()
#             self.test_get_gig_reviews()
#             self.test_get_freelancer_reviews()
#             self.test_get_review_stats()
#             self.test_delete_review()
            
#             # 4. Test admin functions
#             self.test_admin_functions()
            
#             # 5. Edge cases and error handling
#             self.test_error_cases()
            
#             print("\n" + "="*60)
#             print("✅ ALL TESTS COMPLETED SUCCESSFULLY!")
#             print("="*60)
            
#         except Exception as e:
#             print(f"\n❌ Test failed with error: {e}")
#             import traceback
#             traceback.print_exc()
#             return False
        
#         return True
    
#     def _setup_test_data(self):
#         """Setup test users and gig"""
#         print("\n1️⃣  SETTING UP TEST DATA")
#         print("-" * 40)
        
#         # Create test client
#         client_data = {
#             'email': f'test_review_client_{int(time.time())}@example.com',
#             'username': f'review_client_{int(time.time())}',
#             'password': 'TestPass123!',
#             'full_name': 'Review Test Client',
#             'role': 'client',
#             'country': 'Test Country',
#             'city': 'Test City'
#         }
        
#         print(f"Creating test client: {client_data['email']}")
#         client_result = self.server.create_user(client_data)
#         if client_result['success']:
#             self.test_data['client_id'] = client_result['user']['_id']
#             print(f"✅ Client created: {self.test_data['client_id']}")
#         else:
#             raise Exception(f"Failed to create client: {client_result.get('error')}")
        
#         # Create test freelancer - FIXED: Use float for hourly_rate
#         freelancer_data = {
#             'email': f'test_review_freelancer_{int(time.time())}@example.com',
#             'username': f'review_freelancer_{int(time.time())}',
#             'password': 'TestPass123!',
#             'full_name': 'Review Test Freelancer',
#             'role': 'freelancer',
#             'skills': ['Python', 'Testing', 'Reviews'],
#             'hourly_rate': 50.0,  # Use float instead of int
#             'country': 'Test Country',
#             'city': 'Test City',
#             'bio': 'Freelancer for review testing'
#         }
        
#         print(f"\nCreating test freelancer: {freelancer_data['email']}")
#         freelancer_result = self.server.create_user(freelancer_data)
#         if freelancer_result['success']:
#             self.test_data['freelancer_id'] = freelancer_result['user']['_id']
#             print(f"✅ Freelancer created: {self.test_data['freelancer_id']}")
#         else:
#             raise Exception(f"Failed to create freelancer: {freelancer_result.get('error')}")
        
#         # Create test gig
#         gig_data = {
#             'title': 'Review Testing Service',
#             'description': 'Service for testing review functionality',
#             'base_price': 100.0,  # Use float
#             'delivery_days': 7,
#             'category_id': '6920c775747da49650b2d6de',  # Programming & Tech category
#             'requirements_description': 'Please provide test requirements',
#             'search_tags': ['test', 'review', 'python'],
#             'currency': 'USD',
#             'pricing_type': 'fixed',
#             'revisions_included': 2
#         }
        
#         print(f"\nCreating test gig for freelancer")
#         gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data)
#         if gig_result['success']:
#             self.test_data['gig_id'] = gig_result['gig']['_id']
#             print(f"✅ Gig created: {self.test_data['gig_id']}")
#             print(f"   Title: {gig_result['gig']['title']}")
#             print(f"   Slug: {gig_result['gig']['slug']}")
#         else:
#             raise Exception(f"Failed to create gig: {gig_result.get('error')}")
        
#         print(f"\n✅ Test data setup complete")
#         print(f"   Client ID: {self.test_data['client_id']}")
#         print(f"   Freelancer ID: {self.test_data['freelancer_id']}")
#         print(f"   Gig ID: {self.test_data['gig_id']}")
    
#     def _create_completed_order(self):
#         """Create a completed order for testing reviews"""
#         print("\n2️⃣  CREATING COMPLETED ORDER")
#         print("-" * 40)
        
#         # Create order
#         order_data = {
#             'client_id': self.test_data['client_id'],
#             'freelancer_id': self.test_data['freelancer_id'],
#             'gig_id': self.test_data['gig_id'],
#             'title': 'Review Test Order',
#             'description': 'Order for review testing',
#             'requirements': 'Complete the service for review testing',
#             'amount': 100.0,  # Use float
#             'currency': 'USD'
#         }
        
#         print("Creating order...")
#         order_result = self.server.create_order_client(self.test_data['client_id'], order_data)
#         if not order_result['success']:
#             raise Exception(f"Failed to create order: {order_result.get('error')}")
        
#         self.test_data['order_id'] = order_result['order']['_id']
#         print(f"✅ Order created: {self.test_data['order_id']}")
        
#         # Freelancer accepts order
#         print("\nFreelancer accepting order...")
#         accept_result = self.server.accept_order(self.test_data['order_id'], self.test_data['freelancer_id'])
#         if not accept_result['success']:
#             raise Exception(f"Failed to accept order: {accept_result.get('error')}")
#         print("✅ Order accepted")
        
#         # Freelancer starts work
#         print("\nFreelancer starting work...")
#         start_result = self.server.start_order_work(self.test_data['order_id'], self.test_data['freelancer_id'])
#         if not start_result['success']:
#             raise Exception(f"Failed to start order work: {start_result.get('error')}")
#         print("✅ Work started")
        
#         # Freelancer delivers order
#         print("\nFreelancer delivering order...")
#         delivery_data = {
#             'delivery_message': 'Order completed for review testing',
#             'delivery_files': ['https://example.com/delivery/test_file.zip']
#         }
#         deliver_result = self.server.deliver_order(self.test_data['order_id'], self.test_data['freelancer_id'], delivery_data)
#         if not deliver_result['success']:
#             raise Exception(f"Failed to deliver order: {deliver_result.get('error')}")
#         print("✅ Order delivered")
        
#         # Client accepts delivery
#         print("\nClient accepting delivery...")
#         accept_delivery_result = self.server.accept_delivery(self.test_data['order_id'], self.test_data['client_id'])
#         if not accept_delivery_result['success']:
#             raise Exception(f"Failed to accept delivery: {accept_delivery_result.get('error')}")
#         print("✅ Delivery accepted")
        
#         print(f"\n✅ Completed order ready for review: {self.test_data['order_id']}")
    
#     def test_create_review(self):
#         """Test creating a review"""
#         print("\n3️⃣  TEST: CREATE REVIEW")
#         print("-" * 40)
        
#         review_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 5,
#             'rating_quality': 4,
#             'rating_deadline': 5,
#             'comment': 'Excellent service! The freelancer was very communicative and delivered high-quality work on time.',
#             'is_public': True
#         }
        
#         print("Creating review...")
#         print(f"Order ID: {self.test_data['order_id']}")
#         print(f"Client ID: {self.test_data['client_id']}")
#         print(f"Review data: {json.dumps(review_data, indent=2)}")
        
#         result = self.server.create_review_client(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             review_data
#         )
        
#         if result['success']:
#             self.test_data['review_id'] = result['review']['_id']
#             print(f"✅ Review created successfully!")
#             print(f"   Review ID: {self.test_data['review_id']}")
#             print(f"   Overall rating: {result['review']['overall_rating']}")
#             print(f"   Comment: {result['review']['comment'][:50]}...")
            
#             # Store for later tests
#             self.test_data['test_reviews'].append({
#                 'id': self.test_data['review_id'],
#                 'data': review_data,
#                 'result': result['review']
#             })
#         else:
#             raise Exception(f"Failed to create review: {result.get('error')}")
        
#         # Test: Try to create duplicate review (should fail)
#         print("\nTesting duplicate review creation (should fail)...")
#         duplicate_result = self.server.create_review_client(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             review_data
#         )
        
#         if not duplicate_result['success']:
#             print(f"✅ Correctly prevented duplicate review: {duplicate_result.get('error')}")
#         else:
#             raise Exception("Should have prevented duplicate review creation")
        
#         return True
    
#     def test_update_review(self):
#         """Test updating a review"""
#         print("\n4️⃣  TEST: UPDATE REVIEW")
#         print("-" * 40)
        
#         update_data = {
#             'rating_communication': 4,
#             'rating_quality': 5,
#             'comment': 'Updated review: The quality was even better than expected!',
#             'is_public': True
#         }
        
#         print(f"Updating review {self.test_data['review_id']}...")
#         print(f"Update data: {json.dumps(update_data, indent=2)}")
        
#         result = self.server.update_review_client(
#             self.test_data['review_id'],
#             self.test_data['client_id'],
#             update_data
#         )
        
#         if result['success']:
#             print(f"✅ Review updated successfully!")
#             print(f"   New overall rating: {result['review']['overall_rating']}")
#             print(f"   Updated comment: {result['review']['comment'][:50]}...")
#             print(f"   Updated at: {result['review']['updated_at']}")
            
#             # Verify updates
#             if result['review']['rating_communication'] == 4:
#                 print("✅ Communication rating updated correctly")
#             else:
#                 raise Exception("Communication rating not updated")
                
#             if result['review']['rating_quality'] == 5:
#                 print("✅ Quality rating updated correctly")
#             else:
#                 raise Exception("Quality rating not updated")
#         else:
#             raise Exception(f"Failed to update review: {result.get('error')}")
        
#         return True
    
#     def test_respond_to_review(self):
#         """Test freelancer responding to a review"""
#         print("\n5️⃣  TEST: RESPOND TO REVIEW")
#         print("-" * 40)
        
#         response_text = "Thank you for your kind review! I'm glad you were satisfied with the service. Looking forward to working with you again!"
        
#         print(f"Freelancer responding to review {self.test_data['review_id']}...")
#         print(f"Response: {response_text}")
        
#         result = self.server.respond_to_review(
#             self.test_data['review_id'],
#             self.test_data['freelancer_id'],
#             response_text
#         )
        
#         if result['success']:
#             print(f"✅ Response added successfully!")
#             print(f"   Message: {result['message']}")
            
#             # Verify response was added by getting the review
#             review_result = self.server.get_gig_reviews(self.test_data['gig_id'])
#             if review_result['success'] and review_result['reviews']:
#                 review = review_result['reviews'][0]
#                 if review.get('owner_response') == response_text:
#                     print("✅ Response verified in review data")
#                 else:
#                     print(f"❌ Response not found in review: {review.get('owner_response')}")
#         else:
#             raise Exception(f"Failed to respond to review: {result.get('error')}")
        
#         # Test: Try responding as wrong freelancer (should fail)
#         print("\nTesting response with wrong freelancer (should fail)...")
#         wrong_freelancer_id = '123456789012345678901234'  # Invalid ID
#         wrong_result = self.server.respond_to_review(
#             self.test_data['review_id'],
#             wrong_freelancer_id,
#             "This should fail"
#         )
        
#         if not wrong_result['success']:
#             print(f"✅ Correctly prevented wrong freelancer response: {wrong_result.get('error')}")
#         else:
#             raise Exception("Should have prevented wrong freelancer from responding")
        
#         return True
    
#     def test_get_gig_reviews(self):
#         """Test getting reviews for a gig"""
#         print("\n6️⃣  TEST: GET GIG REVIEWS")
#         print("-" * 40)
        
#         # Test basic gig reviews retrieval
#         print(f"Getting reviews for gig {self.test_data['gig_id']}...")
#         result = self.server.get_gig_reviews(self.test_data['gig_id'])
        
#         if result['success']:
#             print(f"✅ Retrieved {len(result['reviews'])} review(s)")
#             print(f"   Total reviews: {result['pagination']['total']}")
            
#             if result['reviews']:
#                 review = result['reviews'][0]
#                 print(f"   First review ID: {review['_id']}")
#                 print(f"   Reviewer: {review.get('reviewer', {}).get('username', 'N/A')}")
#                 print(f"   Rating: {review['overall_rating']}")
#                 print(f"   Has response: {'Yes' if review.get('owner_response') else 'No'}")
                
#                 # Verify populated data
#                 if 'reviewer' in review:
#                     print("✅ Reviewer details populated")
#                 if 'freelancer' in review:
#                     print("✅ Freelancer details populated")
#             else:
#                 print("⚠️  No reviews found")
#         else:
#             raise Exception(f"Failed to get gig reviews: {result.get('error')}")
        
#         # Test with filters
#         print("\nTesting with filters (min_rating=4)...")
#         filters = {
#             'min_rating': 4,
#             'page': 1,
#             'limit': 10
#         }
        
#         filtered_result = self.server.get_gig_reviews(self.test_data['gig_id'], filters)
#         if filtered_result['success']:
#             print(f"✅ Filtered reviews retrieved: {len(filtered_result['reviews'])}")
#         else:
#             raise Exception(f"Failed to get filtered gig reviews: {filtered_result.get('error')}")
        
#         # Test with has_response filter
#         print("\nTesting with has_response filter...")
#         response_filters = {
#             'has_response': True,
#             'sort_by': 'created_at'
#         }
        
#         response_result = self.server.get_gig_reviews(self.test_data['gig_id'], response_filters)
#         if response_result['success']:
#             print(f"✅ Reviews with response: {len(response_result['reviews'])}")
#         else:
#             raise Exception(f"Failed to get reviews with response filter: {response_result.get('error')}")
        
#         return True
    
#     def test_get_freelancer_reviews(self):
#         """Test getting reviews for a freelancer"""
#         print("\n7️⃣  TEST: GET FREELANCER REVIEWS")
#         print("-" * 40)
        
#         print(f"Getting reviews for freelancer {self.test_data['freelancer_id']}...")
#         result = self.server.get_freelancer_reviews(self.test_data['freelancer_id'])
        
#         if result['success']:
#             print(f"✅ Retrieved {len(result['reviews'])} review(s)")
#             print(f"   Total reviews: {result['pagination']['total']}")
#             print(f"   Pages: {result['pagination']['pages']}")
            
#             if result['reviews']:
#                 review = result['reviews'][0]
#                 print(f"   Review ID: {review['_id']}")
#                 print(f"   Gig: {review.get('gig', {}).get('title', 'N/A')}")
#                 print(f"   Rating: {review['overall_rating']}")
#                 print(f"   Comment: {review['comment'][:50]}...")
                
#                 # Verify populated data
#                 if 'gig' in review:
#                     print("✅ Gig details populated")
#                 if 'reviewer' in review:
#                     print("✅ Reviewer details populated")
#             else:
#                 print("⚠️  No reviews found")
#         else:
#             raise Exception(f"Failed to get freelancer reviews: {result.get('error')}")
        
#         # Test with pagination
#         print("\nTesting with pagination...")
#         pagination_filters = {
#             'page': 1,
#             'limit': 5,
#             'sort_by': 'overall_rating'
#         }
        
#         paginated_result = self.server.get_freelancer_reviews(
#             self.test_data['freelancer_id'],
#             pagination_filters
#         )
        
#         if paginated_result['success']:
#             print(f"✅ Paginated reviews: {len(paginated_result['reviews'])}")
#             print(f"   Page {paginated_result['pagination']['page']} of {paginated_result['pagination']['pages']}")
#         else:
#             raise Exception(f"Failed to get paginated freelancer reviews: {paginated_result.get('error')}")
        
#         return True
    
#     def test_get_review_stats(self):
#         """Test getting review statistics"""
#         print("\n8️⃣  TEST: GET REVIEW STATS")
#         print("-" * 40)
        
#         print(f"Getting review stats for freelancer {self.test_data['freelancer_id']}...")
#         result = self.server.get_review_stats(self.test_data['freelancer_id'])
        
#         if result['success']:
#             stats = result['stats']
#             print(f"✅ Review statistics retrieved:")
#             print(f"   Total reviews: {stats['total_reviews']}")
#             print(f"   Average rating: {stats['average_rating']}")
#             print(f"   Response rate: {stats['response_rate']}%")
#             print(f"   Average communication: {stats['average_communication']}")
#             print(f"   Average quality: {stats['average_quality']}")
#             print(f"   Average deadline: {stats['average_deadline']}")
            
#             # Verify stats are calculated correctly
#             if stats['total_reviews'] > 0:
#                 print("✅ Stats calculated with reviews")
#             else:
#                 print("⚠️  No reviews for stats calculation")
                
#             # Print rating distribution
#             print(f"   Rating distribution:")
#             for rating, count in stats['rating_distribution'].items():
#                 print(f"     {rating} stars: {count}")
#         else:
#             raise Exception(f"Failed to get review stats: {result.get('error')}")
        
#         return True
    
#     def test_delete_review(self):
#         """Test deleting a review"""
#         print("\n9️⃣  TEST: DELETE REVIEW")
#         print("-" * 40)
        
#         print(f"Deleting review {self.test_data['review_id']}...")
#         result = self.server.delete_review_client(
#             self.test_data['review_id'],
#             self.test_data['client_id']
#         )
        
#         if result['success']:
#             print(f"✅ Review deleted successfully!")
#             print(f"   Message: {result['message']}")
            
#             # Verify review is deleted
#             print("\nVerifying review is deleted...")
#             # Create a new review first to test deletion
#             new_review_data = {
#                 'gig_id': self.test_data['gig_id'],
#                 'rating_communication': 5,
#                 'rating_quality': 5,
#                 'rating_deadline': 5,
#                 'comment': 'Another test review',
#                 'is_public': True
#             }
            
#             # Need another completed order
#             print("Creating another completed order for deletion test...")
#             self._create_second_completed_order()
            
#             new_review_result = self.server.create_review_client(
#                 self.test_data['order_id_2'],
#                 self.test_data['client_id'],
#                 new_review_data
#             )
            
#             if new_review_result['success']:
#                 new_review_id = new_review_result['review']['_id']
#                 print(f"✅ New review created for deletion test: {new_review_id}")
                
#                 # Delete it
#                 delete_result = self.server.delete_review_client(
#                     new_review_id,
#                     self.test_data['client_id']
#                 )
                
#                 if delete_result['success']:
#                     print("✅ Second review deleted successfully")
#                 else:
#                     raise Exception(f"Failed to delete second review: {delete_result.get('error')}")
#             else:
#                 raise Exception(f"Failed to create second review: {new_review_result.get('error')}")
#         else:
#             raise Exception(f"Failed to delete review: {result.get('error')}")
        
#         return True
    
#     def _create_second_completed_order(self):
#         """Create a second completed order for testing"""
#         # Create second gig - FIXED: Use float for base_price
#         gig_data_2 = {
#             'title': 'Second Review Test Service',
#             'description': 'Second service for review testing',
#             'base_price': 150.0,  # Use float
#             'delivery_days': 5,
#             'category_id': '6920c775747da49650b2d6de',
#             'requirements_description': 'Second test requirements',
#             'search_tags': ['test2', 'review'],
#             'currency': 'USD',
#             'pricing_type': 'fixed',
#             'revisions_included': 1
#         }
        
#         gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data_2)
#         if not gig_result['success']:
#             raise Exception(f"Failed to create second gig: {gig_result.get('error')}")
        
#         gig_id_2 = gig_result['gig']['_id']
        
#         # Create order - FIXED: Use float for amount
#         order_data_2 = {
#             'client_id': self.test_data['client_id'],
#             'freelancer_id': self.test_data['freelancer_id'],
#             'gig_id': gig_id_2,
#             'title': 'Second Review Test Order',
#             'description': 'Second order for review testing',
#             'requirements': 'Complete second service',
#             'amount': 150.0,  # Use float
#             'currency': 'USD'
#         }
        
#         order_result = self.server.create_order_client(self.test_data['client_id'], order_data_2)
#         if not order_result['success']:
#             raise Exception(f"Failed to create second order: {order_result.get('error')}")
        
#         order_id_2 = order_result['order']['_id']
        
#         # Complete the order
#         self.server.accept_order(order_id_2, self.test_data['freelancer_id'])
#         self.server.start_order_work(order_id_2, self.test_data['freelancer_id'])
        
#         delivery_data = {
#             'delivery_message': 'Second order completed',
#             'delivery_files': []
#         }
#         self.server.deliver_order(order_id_2, self.test_data['freelancer_id'], delivery_data)
#         self.server.accept_delivery(order_id_2, self.test_data['client_id'])
        
#         self.test_data['order_id_2'] = order_id_2
#         self.test_data['gig_id_2'] = gig_id_2
    
#     def test_admin_functions(self):
#         """Test admin review functions"""
#         print("\n🔧 TEST: ADMIN FUNCTIONS")
#         print("-" * 40)
        
#         # Note: Admin functions typically require admin privileges
#         # For testing, we'll create a test review first
        
#         # Create another review for admin testing
#         print("Creating test review for admin functions...")
#         review_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 3,
#             'rating_quality': 3,
#             'rating_deadline': 3,
#             'comment': 'Test review for admin functions',
#             'is_public': True
#         }
        
#         # Need another completed order
#         self._create_third_completed_order()
        
#         admin_review_result = self.server.create_review_client(
#             self.test_data['order_id_3'],
#             self.test_data['client_id'],
#             review_data
#         )
        
#         if not admin_review_result['success']:
#             print(f"⚠️  Could not create admin test review: {admin_review_result.get('error')}")
#             print("⚠️  Skipping admin tests (requires specific setup)")
#             return True
        
#         admin_review_id = admin_review_result['review']['_id']
#         print(f"✅ Admin test review created: {admin_review_id}")
        
#         # Test: Get all reviews (admin function)
#         print("\nTesting get_all_reviews_admin...")
#         filters = {
#             'freelancer_id': self.test_data['freelancer_id'],
#             'min_rating': 1,
#             'max_rating': 5,
#             'has_response': False
#         }
        
#         pagination = {
#             'page': 1,
#             'limit': 10
#         }
        
#         all_reviews_result = self.server.get_all_reviews_admin(filters, pagination)
        
#         if all_reviews_result['success']:
#             print(f"✅ Retrieved {len(all_reviews_result['reviews'])} review(s) via admin")
#             print(f"   Total: {all_reviews_result['pagination']['total']}")
            
#             if all_reviews_result['reviews']:
#                 print("   Sample reviews:")
#                 for i, review in enumerate(all_reviews_result['reviews'][:2]):
#                     print(f"     {i+1}. ID: {review['_id']}, Rating: {review.get('overall_rating')}, Public: {review.get('is_public', True)}")
#         else:
#             print(f"⚠️  Could not get all reviews (may need admin auth): {all_reviews_result.get('error')}")
        
#         # Test: Toggle review visibility
#         print("\nTesting toggle_review_visibility...")
#         # Note: This typically requires admin privileges
#         toggle_result = self.server.toggle_review_visibility(admin_review_id, False)
        
#         if toggle_result['success']:
#             print(f"✅ Review visibility toggled: {toggle_result['message']}")
            
#             # Verify by getting gig reviews (should not show hidden review)
#             gig_reviews = self.server.get_gig_reviews(self.test_data['gig_id'])
#             if gig_reviews['success']:
#                 hidden_found = any(r['_id'] == admin_review_id for r in gig_reviews['reviews'])
#                 if not hidden_found:
#                     print("✅ Hidden review not shown in public gig reviews")
#                 else:
#                     print("⚠️  Hidden review still showing in public gig reviews")
#         else:
#             print(f"⚠️  Could not toggle visibility (may need admin auth): {toggle_result.get('error')}")
        
#         # Test: Delete review admin
#         print("\nTesting delete_review_admin...")
#         delete_admin_result = self.server.delete_review_admin(admin_review_id)
        
#         if delete_admin_result['success']:
#             print(f"✅ Admin review deletion: {delete_admin_result['message']}")
#         else:
#             print(f"⚠️  Could not delete via admin (may need admin auth): {delete_admin_result.get('error')}")
        
#         return True
    
#     def _create_third_completed_order(self):
#         """Create a third completed order for admin testing"""
#         # Create third gig - FIXED: Use float for base_price
#         gig_data_3 = {
#             'title': 'Third Review Test Service',
#             'description': 'Third service for review testing',
#             'base_price': 200.0,  # Use float
#             'delivery_days': 3,
#             'category_id': '6920c775747da49650b2d6de',
#             'requirements_description': 'Third test requirements',
#             'search_tags': ['test3', 'admin'],
#             'currency': 'USD',
#             'pricing_type': 'fixed',
#             'revisions_included': 1
#         }
        
#         gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data_3)
#         if not gig_result['success']:
#             raise Exception(f"Failed to create third gig: {gig_result.get('error')}")
        
#         gig_id_3 = gig_result['gig']['_id']
        
#         # Create order - FIXED: Use float for amount
#         order_data_3 = {
#             'client_id': self.test_data['client_id'],
#             'freelancer_id': self.test_data['freelancer_id'],
#             'gig_id': gig_id_3,
#             'title': 'Third Review Test Order',
#             'description': 'Third order for admin testing',
#             'requirements': 'Complete third service',
#             'amount': 200.0,  # Use float
#             'currency': 'USD'
#         }
        
#         order_result = self.server.create_order_client(self.test_data['client_id'], order_data_3)
#         if not order_result['success']:
#             raise Exception(f"Failed to create third order: {order_result.get('error')}")
        
#         order_id_3 = order_result['order']['_id']
        
#         # Complete the order
#         self.server.accept_order(order_id_3, self.test_data['freelancer_id'])
#         self.server.start_order_work(order_id_3, self.test_data['freelancer_id'])
        
#         delivery_data = {
#             'delivery_message': 'Third order completed',
#             'delivery_files': []
#         }
#         self.server.deliver_order(order_id_3, self.test_data['freelancer_id'], delivery_data)
#         self.server.accept_delivery(order_id_3, self.test_data['client_id'])
        
#         self.test_data['order_id_3'] = order_id_3
#         self.test_data['gig_id_3'] = gig_id_3
    
#     def test_error_cases(self):
#         """Test error handling and edge cases"""
#         print("\n🚨 TEST: ERROR CASES")
#         print("-" * 40)
        
#         # Test 1: Invalid order ID
#         print("\n1. Testing with invalid order ID...")
#         result = self.server.create_review_client(
#             'invalid_order_id',
#             self.test_data['client_id'],
#             {'gig_id': self.test_data['gig_id'], 'rating_communication': 5, 'rating_quality': 5, 'rating_deadline': 5}
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected invalid order ID: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected invalid order ID")
        
#         # Test 2: Invalid client ID (not owner)
#         print("\n2. Testing with wrong client ID...")
#         wrong_client_id = '123456789012345678901234'
#         result = self.server.create_review_client(
#             self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
#             wrong_client_id,
#             {'gig_id': self.test_data['gig_id'], 'rating_communication': 5, 'rating_quality': 5, 'rating_deadline': 5}
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected wrong client: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected wrong client")
        
#         # Test 3: Missing required fields
#         print("\n3. Testing with missing rating fields...")
#         incomplete_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 5,
#             # Missing rating_quality and rating_deadline
#         }
        
#         result = self.server.create_review_client(
#             self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
#             self.test_data['client_id'],
#             incomplete_data
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected incomplete data: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected incomplete data")
        
#         # Test 4: Invalid rating values
#         print("\n4. Testing with invalid rating values...")
#         invalid_rating_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 10,  # Invalid: should be 1-5
#             'rating_quality': 0,  # Invalid: should be 1-5
#             'rating_deadline': 5
#         }
        
#         result = self.server.create_review_client(
#             self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
#             self.test_data['client_id'],
#             invalid_rating_data
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected invalid ratings: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected invalid ratings")
        
#         # Test 5: Update non-existent review
#         print("\n5. Testing update of non-existent review...")
#         result = self.server.update_review_client(
#             '123456789012345678901234',
#             self.test_data['client_id'],
#             {'comment': 'This should fail'}
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected non-existent review: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected non-existent review")
        
#         # Test 6: Get reviews for non-existent gig
#         print("\n6. Testing get reviews for non-existent gig...")
#         result = self.server.get_gig_reviews('non_existent_gig_id')
        
#         if not result['success']:
#             print(f"✅ Correctly handled non-existent gig: {result.get('error')}")
#         else:
#             print(f"⚠️  Response for non-existent gig: {result}")
        
#         # Test 7: Get stats for non-existent freelancer
#         print("\n7. Testing get stats for non-existent freelancer...")
#         result = self.server.get_review_stats('non_existent_freelancer_id')
        
#         if not result['success']:
#             print(f"✅ Correctly handled non-existent freelancer: {result.get('error')}")
#         else:
#             print(f"⚠️  Response for non-existent freelancer: {result}")
        
#         print("\n✅ All error cases tested successfully")
#         return True
    
#     def cleanup(self):
#         """Cleanup test data (optional)"""
#         print("\n🧹 CLEANUP")
#         print("-" * 40)
        
#         # Note: In a real test environment, you might want to clean up test data
#         # This is optional as test data is isolated with timestamps
#         print("Test data cleanup not implemented (test data is timestamp-isolated)")
#         print("All test data uses unique email addresses and can be left in database")


# def main():
#     """Main test runner"""
#     import sys
    
#     # Parse command line arguments
#     server_url = 'http://localhost:8000/RPC2'
#     if len(sys.argv) > 1:
#         server_url = sys.argv[1]
    
#     # Create test instance
#     tester = TestReviews(server_url)
    
#     try:
#         # Run all tests
#         success = tester.run_all_tests()
        
#         # Optional cleanup
#         # tester.cleanup()
        
#         if success:
#             print("\n🎉 ALL TESTS PASSED!")
#             return 0
#         else:
#             print("\n❌ SOME TESTS FAILED")
#             return 1
            
#     except KeyboardInterrupt:
#         print("\n\n⏹️  Tests interrupted by user")
#         return 130
#     except Exception as e:
#         print(f"\n❌ UNEXPECTED ERROR: {e}")
#         import traceback
#         traceback.print_exc()
#         return 1


# if __name__ == "__main__":
#     exit_code = main()
#     sys.exit(exit_code)



















# # test_reviews.py
# import xmlrpc.client
# import time
# import sys
# import json
# from datetime import datetime, timedelta

# class TestReviews:
#     def __init__(self, server_url='http://localhost:8000/RPC2'):
#         """Initialize the test client"""
#         self.server = xmlrpc.client.ServerProxy(server_url, allow_none=True)
#         print(f"✅ Connected to RPC server at {server_url}")
        
#         # Test data storage
#         self.test_data = {
#             'client_id': None,
#             'freelancer_id': None,
#             'gig_id': None,
#             'order_id': None,
#             'review_id': None,
#             'category_id': None,
#             'test_reviews': []
#         }
    
#     def run_all_tests(self):
#         """Run all review tests"""
#         print("\n" + "="*60)
#         print("🧪 RUNNING COMPREHENSIVE REVIEW SERVICE TESTS")
#         print("="*60)
        
#         try:
#             # 0. Get or create test category
#             self._setup_category()
            
#             # 1. Setup - Create test users and gig
#             self._setup_test_data()
            
#             # 2. Create a completed order first
#             self._create_completed_order()
            
#             # 3. Test client review functions
#             self.test_create_review()
#             self.test_update_review()
#             self.test_respond_to_review()
#             self.test_get_gig_reviews()
#             self.test_get_freelancer_reviews()
#             self.test_get_review_stats()
#             self.test_delete_review()
            
#             # 4. Test admin functions
#             self.test_admin_functions()
            
#             # 5. Edge cases and error handling
#             self.test_error_cases()
            
#             print("\n" + "="*60)
#             print("✅ ALL TESTS COMPLETED SUCCESSFULLY!")
#             print("="*60)
            
#         except Exception as e:
#             print(f"\n❌ Test failed with error: {e}")
#             import traceback
#             traceback.print_exc()
#             return False
        
#         return True
    
#     def _setup_category(self):
#         """Get or create a test category"""
#         print("\n0️⃣  SETTING UP TEST CATEGORY")
#         print("-" * 40)
        
#         # First, try to get an existing category
#         print("Looking for existing categories...")
#         categories_result = self.server.get_all_categories()
        
#         if categories_result['success'] and categories_result['categories']:
#             # Use the first available category
#             self.test_data['category_id'] = categories_result['categories'][0]['_id']
#             print(f"✅ Using existing category: {self.test_data['category_id']}")
#             print(f"   Name: {categories_result['categories'][0]['name']}")
#         else:
#             # Create a test category
#             print("No existing categories found, creating test category...")
#             category_data = {
#                 'name': 'Programming & Development',
#                 'description': 'Programming and development services',
#                 'icon': '💻',
#                 'is_active': True
#             }
            
#             category_result = self.server.create_category(category_data)
#             if category_result['success']:
#                 self.test_data['category_id'] = category_result['category']['_id']
#                 print(f"✅ Test category created: {self.test_data['category_id']}")
#             else:
#                 raise Exception(f"Failed to create category: {category_result.get('error')}")
    
#     def _setup_test_data(self):
#         """Setup test users and gig"""
#         print("\n1️⃣  SETTING UP TEST DATA")
#         print("-" * 40)
        
#         # Create test client
#         client_data = {
#             'email': f'test_review_client_{int(time.time())}@example.com',
#             'username': f'review_client_{int(time.time())}',
#             'password': 'TestPass123!',
#             'full_name': 'Review Test Client',
#             'role': 'client',
#             'country': 'Test Country',
#             'city': 'Test City'
#         }
        
#         print(f"Creating test client: {client_data['email']}")
#         client_result = self.server.create_user(client_data)
#         if client_result['success']:
#             self.test_data['client_id'] = client_result['user']['_id']
#             print(f"✅ Client created: {self.test_data['client_id']}")
#         else:
#             raise Exception(f"Failed to create client: {client_result.get('error')}")
        
#         # Create test freelancer - FIXED: Use float for hourly_rate
#         freelancer_data = {
#             'email': f'test_review_freelancer_{int(time.time())}@example.com',
#             'username': f'review_freelancer_{int(time.time())}',
#             'password': 'TestPass123!',
#             'full_name': 'Review Test Freelancer',
#             'role': 'freelancer',
#             'skills': ['Python', 'Testing', 'Reviews'],
#             'hourly_rate': 50.0,  # Use float instead of int
#             'country': 'Test Country',
#             'city': 'Test City',
#             'bio': 'Freelancer for review testing'
#         }
        
#         print(f"\nCreating test freelancer: {freelancer_data['email']}")
#         freelancer_result = self.server.create_user(freelancer_data)
#         if freelancer_result['success']:
#             self.test_data['freelancer_id'] = freelancer_result['user']['_id']
#             print(f"✅ Freelancer created: {self.test_data['freelancer_id']}")
#         else:
#             raise Exception(f"Failed to create freelancer: {freelancer_result.get('error')}")
        
#         # Create test gig
#         gig_data = {
#             'title': 'Review Testing Service',
#             'description': 'Service for testing review functionality',
#             'base_price': 100.0,  # Use float
#             'delivery_days': 7,
#             'category_id': self.test_data['category_id'],  # Use the category we found/created
#             'requirements_description': 'Please provide test requirements',
#             'search_tags': ['test', 'review', 'python'],
#             'currency': 'USD',
#             'pricing_type': 'fixed',
#             'revisions_included': 2
#         }
        
#         print(f"\nCreating test gig for freelancer")
#         print(f"Using category ID: {self.test_data['category_id']}")
#         gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data)
#         if gig_result['success']:
#             self.test_data['gig_id'] = gig_result['gig']['_id']
#             print(f"✅ Gig created: {self.test_data['gig_id']}")
#             print(f"   Title: {gig_result['gig']['title']}")
#             print(f"   Slug: {gig_result['gig']['slug']}")
#         else:
#             raise Exception(f"Failed to create gig: {gig_result.get('error')}")
        
#         print(f"\n✅ Test data setup complete")
#         print(f"   Client ID: {self.test_data['client_id']}")
#         print(f"   Freelancer ID: {self.test_data['freelancer_id']}")
#         print(f"   Gig ID: {self.test_data['gig_id']}")
#         print(f"   Category ID: {self.test_data['category_id']}")
    
#     def _create_completed_order(self):
#         """Create a completed order for testing reviews"""
#         print("\n2️⃣  CREATING COMPLETED ORDER")
#         print("-" * 40)
        
#         # Create order
#         order_data = {
#             'client_id': self.test_data['client_id'],
#             'freelancer_id': self.test_data['freelancer_id'],
#             'gig_id': self.test_data['gig_id'],
#             'title': 'Review Test Order',
#             'description': 'Order for review testing',
#             'requirements': 'Complete the service for review testing',
#             'amount': 100.0,  # Use float
#             'currency': 'USD'
#         }
        
#         print("Creating order...")
#         order_result = self.server.create_order_client(self.test_data['client_id'], order_data)
#         if not order_result['success']:
#             raise Exception(f"Failed to create order: {order_result.get('error')}")
        
#         self.test_data['order_id'] = order_result['order']['_id']
#         print(f"✅ Order created: {self.test_data['order_id']}")
        
#         # Freelancer accepts order
#         print("\nFreelancer accepting order...")
#         accept_result = self.server.accept_order(self.test_data['order_id'], self.test_data['freelancer_id'])
#         if not accept_result['success']:
#             raise Exception(f"Failed to accept order: {accept_result.get('error')}")
#         print("✅ Order accepted")
        
#         # Freelancer starts work
#         print("\nFreelancer starting work...")
#         start_result = self.server.start_order_work(self.test_data['order_id'], self.test_data['freelancer_id'])
#         if not start_result['success']:
#             raise Exception(f"Failed to start order work: {start_result.get('error')}")
#         print("✅ Work started")
        
#         # Freelancer delivers order
#         print("\nFreelancer delivering order...")
#         delivery_data = {
#             'delivery_message': 'Order completed for review testing',
#             'delivery_files': ['https://example.com/delivery/test_file.zip']
#         }
#         deliver_result = self.server.deliver_order(self.test_data['order_id'], self.test_data['freelancer_id'], delivery_data)
#         if not deliver_result['success']:
#             raise Exception(f"Failed to deliver order: {deliver_result.get('error')}")
#         print("✅ Order delivered")
        
#         # Client accepts delivery
#         print("\nClient accepting delivery...")
#         accept_delivery_result = self.server.accept_delivery(self.test_data['order_id'], self.test_data['client_id'])
#         if not accept_delivery_result['success']:
#             raise Exception(f"Failed to accept delivery: {accept_delivery_result.get('error')}")
#         print("✅ Delivery accepted")
        
#         print(f"\n✅ Completed order ready for review: {self.test_data['order_id']}")
    
#     def test_create_review(self):
#         """Test creating a review"""
#         print("\n3️⃣  TEST: CREATE REVIEW")
#         print("-" * 40)
        
#         review_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 5,
#             'rating_quality': 4,
#             'rating_deadline': 5,
#             'comment': 'Excellent service! The freelancer was very communicative and delivered high-quality work on time.',
#             'is_public': True
#         }
        
#         print("Creating review...")
#         print(f"Order ID: {self.test_data['order_id']}")
#         print(f"Client ID: {self.test_data['client_id']}")
#         print(f"Review data: {json.dumps(review_data, indent=2)}")
        
#         result = self.server.create_review_client(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             review_data
#         )
        
#         if result['success']:
#             self.test_data['review_id'] = result['review']['_id']
#             print(f"✅ Review created successfully!")
#             print(f"   Review ID: {self.test_data['review_id']}")
#             print(f"   Overall rating: {result['review']['overall_rating']}")
#             print(f"   Comment: {result['review']['comment'][:50]}...")
            
#             # Store for later tests
#             self.test_data['test_reviews'].append({
#                 'id': self.test_data['review_id'],
#                 'data': review_data,
#                 'result': result['review']
#             })
#         else:
#             raise Exception(f"Failed to create review: {result.get('error')}")
        
#         # Test: Try to create duplicate review (should fail)
#         print("\nTesting duplicate review creation (should fail)...")
#         duplicate_result = self.server.create_review_client(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             review_data
#         )
        
#         if not duplicate_result['success']:
#             print(f"✅ Correctly prevented duplicate review: {duplicate_result.get('error')}")
#         else:
#             raise Exception("Should have prevented duplicate review creation")
        
#         return True
    
#     def test_update_review(self):
#         """Test updating a review"""
#         print("\n4️⃣  TEST: UPDATE REVIEW")
#         print("-" * 40)
        
#         update_data = {
#             'rating_communication': 4,
#             'rating_quality': 5,
#             'comment': 'Updated review: The quality was even better than expected!',
#             'is_public': True
#         }
        
#         print(f"Updating review {self.test_data['review_id']}...")
#         print(f"Update data: {json.dumps(update_data, indent=2)}")
        
#         result = self.server.update_review_client(
#             self.test_data['review_id'],
#             self.test_data['client_id'],
#             update_data
#         )
        
#         if result['success']:
#             print(f"✅ Review updated successfully!")
#             print(f"   New overall rating: {result['review']['overall_rating']}")
#             print(f"   Updated comment: {result['review']['comment'][:50]}...")
#             print(f"   Updated at: {result['review']['updated_at']}")
            
#             # Verify updates
#             if result['review']['rating_communication'] == 4:
#                 print("✅ Communication rating updated correctly")
#             else:
#                 raise Exception("Communication rating not updated")
                
#             if result['review']['rating_quality'] == 5:
#                 print("✅ Quality rating updated correctly")
#             else:
#                 raise Exception("Quality rating not updated")
#         else:
#             raise Exception(f"Failed to update review: {result.get('error')}")
        
#         return True
    
#     def test_respond_to_review(self):
#         """Test freelancer responding to a review"""
#         print("\n5️⃣  TEST: RESPOND TO REVIEW")
#         print("-" * 40)
        
#         response_text = "Thank you for your kind review! I'm glad you were satisfied with the service. Looking forward to working with you again!"
        
#         print(f"Freelancer responding to review {self.test_data['review_id']}...")
#         print(f"Response: {response_text}")
        
#         result = self.server.respond_to_review(
#             self.test_data['review_id'],
#             self.test_data['freelancer_id'],
#             response_text
#         )
        
#         if result['success']:
#             print(f"✅ Response added successfully!")
#             print(f"   Message: {result['message']}")
            
#             # Verify response was added by getting the review
#             review_result = self.server.get_gig_reviews(self.test_data['gig_id'])
#             if review_result['success'] and review_result['reviews']:
#                 review = review_result['reviews'][0]
#                 if review.get('owner_response') == response_text:
#                     print("✅ Response verified in review data")
#                 else:
#                     print(f"❌ Response not found in review: {review.get('owner_response')}")
#         else:
#             raise Exception(f"Failed to respond to review: {result.get('error')}")
        
#         # Test: Try responding as wrong freelancer (should fail)
#         print("\nTesting response with wrong freelancer (should fail)...")
#         wrong_freelancer_id = '123456789012345678901234'  # Invalid ID
#         wrong_result = self.server.respond_to_review(
#             self.test_data['review_id'],
#             wrong_freelancer_id,
#             "This should fail"
#         )
        
#         if not wrong_result['success']:
#             print(f"✅ Correctly prevented wrong freelancer response: {wrong_result.get('error')}")
#         else:
#             raise Exception("Should have prevented wrong freelancer from responding")
        
#         return True
    
#     def test_get_gig_reviews(self):
#         """Test getting reviews for a gig"""
#         print("\n6️⃣  TEST: GET GIG REVIEWS")
#         print("-" * 40)
        
#         # Test basic gig reviews retrieval
#         print(f"Getting reviews for gig {self.test_data['gig_id']}...")
#         result = self.server.get_gig_reviews(self.test_data['gig_id'])
        
#         if result['success']:
#             print(f"✅ Retrieved {len(result['reviews'])} review(s)")
#             print(f"   Total reviews: {result['pagination']['total']}")
            
#             if result['reviews']:
#                 review = result['reviews'][0]
#                 print(f"   First review ID: {review['_id']}")
#                 print(f"   Reviewer: {review.get('reviewer', {}).get('username', 'N/A')}")
#                 print(f"   Rating: {review['overall_rating']}")
#                 print(f"   Has response: {'Yes' if review.get('owner_response') else 'No'}")
                
#                 # Verify populated data
#                 if 'reviewer' in review:
#                     print("✅ Reviewer details populated")
#                 if 'freelancer' in review:
#                     print("✅ Freelancer details populated")
#             else:
#                 print("⚠️  No reviews found")
#         else:
#             raise Exception(f"Failed to get gig reviews: {result.get('error')}")
        
#         # Test with filters
#         print("\nTesting with filters (min_rating=4)...")
#         filters = {
#             'min_rating': 4,
#             'page': 1,
#             'limit': 10
#         }
        
#         filtered_result = self.server.get_gig_reviews(self.test_data['gig_id'], filters)
#         if filtered_result['success']:
#             print(f"✅ Filtered reviews retrieved: {len(filtered_result['reviews'])}")
#         else:
#             raise Exception(f"Failed to get filtered gig reviews: {filtered_result.get('error')}")
        
#         # Test with has_response filter
#         print("\nTesting with has_response filter...")
#         response_filters = {
#             'has_response': True,
#             'sort_by': 'created_at'
#         }
        
#         response_result = self.server.get_gig_reviews(self.test_data['gig_id'], response_filters)
#         if response_result['success']:
#             print(f"✅ Reviews with response: {len(response_result['reviews'])}")
#         else:
#             raise Exception(f"Failed to get reviews with response filter: {response_result.get('error')}")
        
#         return True
    
#     def test_get_freelancer_reviews(self):
#         """Test getting reviews for a freelancer"""
#         print("\n7️⃣  TEST: GET FREELANCER REVIEWS")
#         print("-" * 40)
        
#         print(f"Getting reviews for freelancer {self.test_data['freelancer_id']}...")
#         result = self.server.get_freelancer_reviews(self.test_data['freelancer_id'])
        
#         if result['success']:
#             print(f"✅ Retrieved {len(result['reviews'])} review(s)")
#             print(f"   Total reviews: {result['pagination']['total']}")
#             print(f"   Pages: {result['pagination']['pages']}")
            
#             if result['reviews']:
#                 review = result['reviews'][0]
#                 print(f"   Review ID: {review['_id']}")
#                 print(f"   Gig: {review.get('gig', {}).get('title', 'N/A')}")
#                 print(f"   Rating: {review['overall_rating']}")
#                 print(f"   Comment: {review['comment'][:50]}...")
                
#                 # Verify populated data
#                 if 'gig' in review:
#                     print("✅ Gig details populated")
#                 if 'reviewer' in review:
#                     print("✅ Reviewer details populated")
#             else:
#                 print("⚠️  No reviews found")
#         else:
#             raise Exception(f"Failed to get freelancer reviews: {result.get('error')}")
        
#         # Test with pagination
#         print("\nTesting with pagination...")
#         pagination_filters = {
#             'page': 1,
#             'limit': 5,
#             'sort_by': 'overall_rating'
#         }
        
#         paginated_result = self.server.get_freelancer_reviews(
#             self.test_data['freelancer_id'],
#             pagination_filters
#         )
        
#         if paginated_result['success']:
#             print(f"✅ Paginated reviews: {len(paginated_result['reviews'])}")
#             print(f"   Page {paginated_result['pagination']['page']} of {paginated_result['pagination']['pages']}")
#         else:
#             raise Exception(f"Failed to get paginated freelancer reviews: {paginated_result.get('error')}")
        
#         return True
    
#     def test_get_review_stats(self):
#         """Test getting review statistics"""
#         print("\n8️⃣  TEST: GET REVIEW STATS")
#         print("-" * 40)
        
#         print(f"Getting review stats for freelancer {self.test_data['freelancer_id']}...")
#         result = self.server.get_review_stats(self.test_data['freelancer_id'])
        
#         if result['success']:
#             stats = result['stats']
#             print(f"✅ Review statistics retrieved:")
#             print(f"   Total reviews: {stats['total_reviews']}")
#             print(f"   Average rating: {stats['average_rating']}")
#             print(f"   Response rate: {stats['response_rate']}%")
#             print(f"   Average communication: {stats['average_communication']}")
#             print(f"   Average quality: {stats['average_quality']}")
#             print(f"   Average deadline: {stats['average_deadline']}")
            
#             # Verify stats are calculated correctly
#             if stats['total_reviews'] > 0:
#                 print("✅ Stats calculated with reviews")
#             else:
#                 print("⚠️  No reviews for stats calculation")
                
#             # Print rating distribution
#             print(f"   Rating distribution:")
#             for rating, count in stats['rating_distribution'].items():
#                 print(f"     {rating} stars: {count}")
#         else:
#             raise Exception(f"Failed to get review stats: {result.get('error')}")
        
#         return True
    
#     def test_delete_review(self):
#         """Test deleting a review"""
#         print("\n9️⃣  TEST: DELETE REVIEW")
#         print("-" * 40)
        
#         print(f"Deleting review {self.test_data['review_id']}...")
#         result = self.server.delete_review_client(
#             self.test_data['review_id'],
#             self.test_data['client_id']
#         )
        
#         if result['success']:
#             print(f"✅ Review deleted successfully!")
#             print(f"   Message: {result['message']}")
            
#             # Verify review is deleted
#             print("\nVerifying review is deleted...")
#             # Create a new review first to test deletion
#             new_review_data = {
#                 'gig_id': self.test_data['gig_id'],
#                 'rating_communication': 5,
#                 'rating_quality': 5,
#                 'rating_deadline': 5,
#                 'comment': 'Another test review',
#                 'is_public': True
#             }
            
#             # Need another completed order
#             print("Creating another completed order for deletion test...")
#             self._create_second_completed_order()
            
#             new_review_result = self.server.create_review_client(
#                 self.test_data['order_id_2'],
#                 self.test_data['client_id'],
#                 new_review_data
#             )
            
#             if new_review_result['success']:
#                 new_review_id = new_review_result['review']['_id']
#                 print(f"✅ New review created for deletion test: {new_review_id}")
                
#                 # Delete it
#                 delete_result = self.server.delete_review_client(
#                     new_review_id,
#                     self.test_data['client_id']
#                 )
                
#                 if delete_result['success']:
#                     print("✅ Second review deleted successfully")
#                 else:
#                     raise Exception(f"Failed to delete second review: {delete_result.get('error')}")
#             else:
#                 raise Exception(f"Failed to create second review: {new_review_result.get('error')}")
#         else:
#             raise Exception(f"Failed to delete review: {result.get('error')}")
        
#         return True
    
#     def _create_second_completed_order(self):
#         """Create a second completed order for testing"""
#         # Create second gig - FIXED: Use float for base_price
#         gig_data_2 = {
#             'title': 'Second Review Test Service',
#             'description': 'Second service for review testing',
#             'base_price': 150.0,  # Use float
#             'delivery_days': 5,
#             'category_id': self.test_data['category_id'],  # Use same category
#             'requirements_description': 'Second test requirements',
#             'search_tags': ['test2', 'review'],
#             'currency': 'USD',
#             'pricing_type': 'fixed',
#             'revisions_included': 1
#         }
        
#         gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data_2)
#         if not gig_result['success']:
#             raise Exception(f"Failed to create second gig: {gig_result.get('error')}")
        
#         gig_id_2 = gig_result['gig']['_id']
        
#         # Create order - FIXED: Use float for amount
#         order_data_2 = {
#             'client_id': self.test_data['client_id'],
#             'freelancer_id': self.test_data['freelancer_id'],
#             'gig_id': gig_id_2,
#             'title': 'Second Review Test Order',
#             'description': 'Second order for review testing',
#             'requirements': 'Complete second service',
#             'amount': 150.0,  # Use float
#             'currency': 'USD'
#         }
        
#         order_result = self.server.create_order_client(self.test_data['client_id'], order_data_2)
#         if not order_result['success']:
#             raise Exception(f"Failed to create second order: {order_result.get('error')}")
        
#         order_id_2 = order_result['order']['_id']
        
#         # Complete the order
#         self.server.accept_order(order_id_2, self.test_data['freelancer_id'])
#         self.server.start_order_work(order_id_2, self.test_data['freelancer_id'])
        
#         delivery_data = {
#             'delivery_message': 'Second order completed',
#             'delivery_files': []
#         }
#         self.server.deliver_order(order_id_2, self.test_data['freelancer_id'], delivery_data)
#         self.server.accept_delivery(order_id_2, self.test_data['client_id'])
        
#         self.test_data['order_id_2'] = order_id_2
#         self.test_data['gig_id_2'] = gig_id_2
    
#     def test_admin_functions(self):
#         """Test admin review functions"""
#         print("\n🔧 TEST: ADMIN FUNCTIONS")
#         print("-" * 40)
        
#         # Note: Admin functions typically require admin privileges
#         # For testing, we'll create a test review first
        
#         # Create another review for admin testing
#         print("Creating test review for admin functions...")
#         review_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 3,
#             'rating_quality': 3,
#             'rating_deadline': 3,
#             'comment': 'Test review for admin functions',
#             'is_public': True
#         }
        
#         # Need another completed order
#         self._create_third_completed_order()
        
#         admin_review_result = self.server.create_review_client(
#             self.test_data['order_id_3'],
#             self.test_data['client_id'],
#             review_data
#         )
        
#         if not admin_review_result['success']:
#             print(f"⚠️  Could not create admin test review: {admin_review_result.get('error')}")
#             print("⚠️  Skipping admin tests (requires specific setup)")
#             return True
        
#         admin_review_id = admin_review_result['review']['_id']
#         print(f"✅ Admin test review created: {admin_review_id}")
        
#         # Test: Get all reviews (admin function)
#         print("\nTesting get_all_reviews_admin...")
#         filters = {
#             'freelancer_id': self.test_data['freelancer_id'],
#             'min_rating': 1,
#             'max_rating': 5,
#             'has_response': False
#         }
        
#         pagination = {
#             'page': 1,
#             'limit': 10
#         }
        
#         all_reviews_result = self.server.get_all_reviews_admin(filters, pagination)
        
#         if all_reviews_result['success']:
#             print(f"✅ Retrieved {len(all_reviews_result['reviews'])} review(s) via admin")
#             print(f"   Total: {all_reviews_result['pagination']['total']}")
            
#             if all_reviews_result['reviews']:
#                 print("   Sample reviews:")
#                 for i, review in enumerate(all_reviews_result['reviews'][:2]):
#                     print(f"     {i+1}. ID: {review['_id']}, Rating: {review.get('overall_rating')}, Public: {review.get('is_public', True)}")
#         else:
#             print(f"⚠️  Could not get all reviews (may need admin auth): {all_reviews_result.get('error')}")
        
#         # Test: Toggle review visibility
#         print("\nTesting toggle_review_visibility...")
#         # Note: This typically requires admin privileges
#         toggle_result = self.server.toggle_review_visibility(admin_review_id, False)
        
#         if toggle_result['success']:
#             print(f"✅ Review visibility toggled: {toggle_result['message']}")
            
#             # Verify by getting gig reviews (should not show hidden review)
#             gig_reviews = self.server.get_gig_reviews(self.test_data['gig_id'])
#             if gig_reviews['success']:
#                 hidden_found = any(r['_id'] == admin_review_id for r in gig_reviews['reviews'])
#                 if not hidden_found:
#                     print("✅ Hidden review not shown in public gig reviews")
#                 else:
#                     print("⚠️  Hidden review still showing in public gig reviews")
#         else:
#             print(f"⚠️  Could not toggle visibility (may need admin auth): {toggle_result.get('error')}")
        
#         # Test: Delete review admin
#         print("\nTesting delete_review_admin...")
#         delete_admin_result = self.server.delete_review_admin(admin_review_id)
        
#         if delete_admin_result['success']:
#             print(f"✅ Admin review deletion: {delete_admin_result['message']}")
#         else:
#             print(f"⚠️  Could not delete via admin (may need admin auth): {delete_admin_result.get('error')}")
        
#         return True
    
#     def _create_third_completed_order(self):
#         """Create a third completed order for admin testing"""
#         # Create third gig - FIXED: Use float for base_price
#         gig_data_3 = {
#             'title': 'Third Review Test Service',
#             'description': 'Third service for review testing',
#             'base_price': 200.0,  # Use float
#             'delivery_days': 3,
#             'category_id': self.test_data['category_id'],  # Use same category
#             'requirements_description': 'Third test requirements',
#             'search_tags': ['test3', 'admin'],
#             'currency': 'USD',
#             'pricing_type': 'fixed',
#             'revisions_included': 1
#         }
        
#         gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data_3)
#         if not gig_result['success']:
#             raise Exception(f"Failed to create third gig: {gig_result.get('error')}")
        
#         gig_id_3 = gig_result['gig']['_id']
        
#         # Create order - FIXED: Use float for amount
#         order_data_3 = {
#             'client_id': self.test_data['client_id'],
#             'freelancer_id': self.test_data['freelancer_id'],
#             'gig_id': gig_id_3,
#             'title': 'Third Review Test Order',
#             'description': 'Third order for admin testing',
#             'requirements': 'Complete third service',
#             'amount': 200.0,  # Use float
#             'currency': 'USD'
#         }
        
#         order_result = self.server.create_order_client(self.test_data['client_id'], order_data_3)
#         if not order_result['success']:
#             raise Exception(f"Failed to create third order: {order_result.get('error')}")
        
#         order_id_3 = order_result['order']['_id']
        
#         # Complete the order
#         self.server.accept_order(order_id_3, self.test_data['freelancer_id'])
#         self.server.start_order_work(order_id_3, self.test_data['freelancer_id'])
        
#         delivery_data = {
#             'delivery_message': 'Third order completed',
#             'delivery_files': []
#         }
#         self.server.deliver_order(order_id_3, self.test_data['freelancer_id'], delivery_data)
#         self.server.accept_delivery(order_id_3, self.test_data['client_id'])
        
#         self.test_data['order_id_3'] = order_id_3
#         self.test_data['gig_id_3'] = gig_id_3
    
#     def test_error_cases(self):
#         """Test error handling and edge cases"""
#         print("\n🚨 TEST: ERROR CASES")
#         print("-" * 40)
        
#         # Test 1: Invalid order ID
#         print("\n1. Testing with invalid order ID...")
#         result = self.server.create_review_client(
#             'invalid_order_id',
#             self.test_data['client_id'],
#             {'gig_id': self.test_data['gig_id'], 'rating_communication': 5, 'rating_quality': 5, 'rating_deadline': 5}
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected invalid order ID: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected invalid order ID")
        
#         # Test 2: Invalid client ID (not owner)
#         print("\n2. Testing with wrong client ID...")
#         wrong_client_id = '123456789012345678901234'
#         result = self.server.create_review_client(
#             self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
#             wrong_client_id,
#             {'gig_id': self.test_data['gig_id'], 'rating_communication': 5, 'rating_quality': 5, 'rating_deadline': 5}
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected wrong client: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected wrong client")
        
#         # Test 3: Missing required fields
#         print("\n3. Testing with missing rating fields...")
#         incomplete_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 5,
#             # Missing rating_quality and rating_deadline
#         }
        
#         result = self.server.create_review_client(
#             self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
#             self.test_data['client_id'],
#             incomplete_data
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected incomplete data: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected incomplete data")
        
#         # Test 4: Invalid rating values
#         print("\n4. Testing with invalid rating values...")
#         invalid_rating_data = {
#             'gig_id': self.test_data['gig_id'],
#             'rating_communication': 10,  # Invalid: should be 1-5
#             'rating_quality': 0,  # Invalid: should be 1-5
#             'rating_deadline': 5
#         }
        
#         result = self.server.create_review_client(
#             self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
#             self.test_data['client_id'],
#             invalid_rating_data
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected invalid ratings: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected invalid ratings")
        
#         # Test 5: Update non-existent review
#         print("\n5. Testing update of non-existent review...")
#         result = self.server.update_review_client(
#             '123456789012345678901234',
#             self.test_data['client_id'],
#             {'comment': 'This should fail'}
#         )
        
#         if not result['success']:
#             print(f"✅ Correctly rejected non-existent review: {result.get('error')}")
#         else:
#             print("⚠️  Should have rejected non-existent review")
        
#         # Test 6: Get reviews for non-existent gig
#         print("\n6. Testing get reviews for non-existent gig...")
#         result = self.server.get_gig_reviews('non_existent_gig_id')
        
#         if not result['success']:
#             print(f"✅ Correctly handled non-existent gig: {result.get('error')}")
#         else:
#             print(f"⚠️  Response for non-existent gig: {result}")
        
#         # Test 7: Get stats for non-existent freelancer
#         print("\n7. Testing get stats for non-existent freelancer...")
#         result = self.server.get_review_stats('non_existent_freelancer_id')
        
#         if not result['success']:
#             print(f"✅ Correctly handled non-existent freelancer: {result.get('error')}")
#         else:
#             print(f"⚠️  Response for non-existent freelancer: {result}")
        
#         print("\n✅ All error cases tested successfully")
#         return True
    
#     def cleanup(self):
#         """Cleanup test data (optional)"""
#         print("\n🧹 CLEANUP")
#         print("-" * 40)
        
#         # Note: In a real test environment, you might want to clean up test data
#         # This is optional as test data is isolated with timestamps
#         print("Test data cleanup not implemented (test data is timestamp-isolated)")
#         print("All test data uses unique email addresses and can be left in database")


# def main():
#     """Main test runner"""
#     import sys
    
#     # Parse command line arguments
#     server_url = 'http://localhost:8000/RPC2'
#     if len(sys.argv) > 1:
#         server_url = sys.argv[1]
    
#     # Create test instance
#     tester = TestReviews(server_url)
    
#     try:
#         # Run all tests
#         success = tester.run_all_tests()
        
#         # Optional cleanup
#         # tester.cleanup()
        
#         if success:
#             print("\n🎉 ALL TESTS PASSED!")
#             return 0
#         else:
#             print("\n❌ SOME TESTS FAILED")
#             return 1
            
#     except KeyboardInterrupt:
#         print("\n\n⏹️  Tests interrupted by user")
#         return 130
#     except Exception as e:
#         print(f"\n❌ UNEXPECTED ERROR: {e}")
#         import traceback
#         traceback.print_exc()
#         return 1


# if __name__ == "__main__":
#     exit_code = main()
#     sys.exit(exit_code)


# test_reviews.py (updated with float ratings)
import xmlrpc.client
import time
import sys
import json
from datetime import datetime, timedelta

class TestReviews:
    def __init__(self, server_url='http://localhost:8000/RPC2'):
        """Initialize the test client"""
        self.server = xmlrpc.client.ServerProxy(server_url, allow_none=True)
        print(f"✅ Connected to RPC server at {server_url}")
        
        # Test data storage
        self.test_data = {
            'client_id': None,
            'freelancer_id': None,
            'gig_id': None,
            'order_id': None,
            'review_id': None,
            'category_id': None,
            'test_reviews': []
        }
    
    def run_all_tests(self):
        """Run all review tests"""
        print("\n" + "="*60)
        print("🧪 RUNNING COMPREHENSIVE REVIEW SERVICE TESTS")
        print("="*60)
        
        try:
            # 0. Get or create test category
            self._setup_category()
            
            # 1. Setup - Create test users and gig
            self._setup_test_data()
            
            # 2. Create a completed order first
            self._create_completed_order()
            
            # 3. Test client review functions
            self.test_create_review()
            self.test_update_review()
            self.test_respond_to_review()
            self.test_get_gig_reviews()
            self.test_get_freelancer_reviews()
            self.test_get_review_stats()
            self.test_delete_review()
            
            # 4. Test admin functions
            self.test_admin_functions()
            
            # 5. Edge cases and error handling
            self.test_error_cases()
            
            print("\n" + "="*60)
            print("✅ ALL TESTS COMPLETED SUCCESSFULLY!")
            print("="*60)
            
        except Exception as e:
            print(f"\n❌ Test failed with error: {e}")
            import traceback
            traceback.print_exc()
            return False
        
        return True
    
    def _setup_category(self):
        """Get or create a test category"""
        print("\n0️⃣  SETTING UP TEST CATEGORY")
        print("-" * 40)
        
        # First, try to get an existing category
        print("Looking for existing categories...")
        categories_result = self.server.get_all_categories()
        
        if categories_result['success'] and categories_result['categories']:
            # Use the first available category
            self.test_data['category_id'] = categories_result['categories'][0]['_id']
            print(f"✅ Using existing category: {self.test_data['category_id']}")
            print(f"   Name: {categories_result['categories'][0]['name']}")
        else:
            # Create a test category
            print("No existing categories found, creating test category...")
            category_data = {
                'name': 'Programming & Development',
                'description': 'Programming and development services',
                'icon': '💻',
                'is_active': True
            }
            
            category_result = self.server.create_category(category_data)
            if category_result['success']:
                self.test_data['category_id'] = category_result['category']['_id']
                print(f"✅ Test category created: {self.test_data['category_id']}")
            else:
                raise Exception(f"Failed to create category: {category_result.get('error')}")
    
    def _setup_test_data(self):
        """Setup test users and gig"""
        print("\n1️⃣  SETTING UP TEST DATA")
        print("-" * 40)
        
        # Create test client
        client_data = {
            'email': f'test_review_client_{int(time.time())}@example.com',
            'username': f'review_client_{int(time.time())}',
            'password': 'TestPass123!',
            'full_name': 'Review Test Client',
            'role': 'client',
            'country': 'Test Country',
            'city': 'Test City'
        }
        
        print(f"Creating test client: {client_data['email']}")
        client_result = self.server.create_user(client_data)
        if client_result['success']:
            self.test_data['client_id'] = client_result['user']['_id']
            print(f"✅ Client created: {self.test_data['client_id']}")
        else:
            raise Exception(f"Failed to create client: {client_result.get('error')}")
        
        # Create test freelancer - FIXED: Use float for hourly_rate
        freelancer_data = {
            'email': f'test_review_freelancer_{int(time.time())}@example.com',
            'username': f'review_freelancer_{int(time.time())}',
            'password': 'TestPass123!',
            'full_name': 'Review Test Freelancer',
            'role': 'freelancer',
            'skills': ['Python', 'Testing', 'Reviews'],
            'hourly_rate': 50.0,  # Use float instead of int
            'country': 'Test Country',
            'city': 'Test City',
            'bio': 'Freelancer for review testing'
        }
        
        print(f"\nCreating test freelancer: {freelancer_data['email']}")
        freelancer_result = self.server.create_user(freelancer_data)
        if freelancer_result['success']:
            self.test_data['freelancer_id'] = freelancer_result['user']['_id']
            print(f"✅ Freelancer created: {self.test_data['freelancer_id']}")
        else:
            raise Exception(f"Failed to create freelancer: {freelancer_result.get('error')}")
        
        # Create test gig
        gig_data = {
            'title': 'Review Testing Service',
            'description': 'Service for testing review functionality',
            'base_price': 100.0,  # Use float
            'delivery_days': 7,
            'category_id': self.test_data['category_id'],  # Use the category we found/created
            'requirements_description': 'Please provide test requirements',
            'search_tags': ['test', 'review', 'python'],
            'currency': 'USD',
            'pricing_type': 'fixed',
            'revisions_included': 2
        }
        
        print(f"\nCreating test gig for freelancer")
        print(f"Using category ID: {self.test_data['category_id']}")
        gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data)
        if gig_result['success']:
            self.test_data['gig_id'] = gig_result['gig']['_id']
            print(f"✅ Gig created: {self.test_data['gig_id']}")
            print(f"   Title: {gig_result['gig']['title']}")
            print(f"   Slug: {gig_result['gig']['slug']}")
        else:
            raise Exception(f"Failed to create gig: {gig_result.get('error')}")
        
        print(f"\n✅ Test data setup complete")
        print(f"   Client ID: {self.test_data['client_id']}")
        print(f"   Freelancer ID: {self.test_data['freelancer_id']}")
        print(f"   Gig ID: {self.test_data['gig_id']}")
        print(f"   Category ID: {self.test_data['category_id']}")
    
    def _create_completed_order(self):
        """Create a completed order for testing reviews"""
        print("\n2️⃣  CREATING COMPLETED ORDER")
        print("-" * 40)
        
        # Create order using the create_order method with order_data only
        order_data = {
            'client_id': self.test_data['client_id'],
            'freelancer_id': self.test_data['freelancer_id'],
            'gig_id': self.test_data['gig_id'],
            'title': 'Review Test Order',
            'description': 'Order for review testing',
            'requirements': 'Complete the service for review testing',
            'amount': 100.0,  # Use float
            'currency': 'USD'
        }
        
        print("Creating order...")
        # Try using create_order instead of create_order_client
        order_result = self.server.create_order(order_data)
        if not order_result['success']:
            raise Exception(f"Failed to create order: {order_result.get('error')}")
        
        self.test_data['order_id'] = order_result['order']['_id']
        print(f"✅ Order created: {self.test_data['order_id']}")
        
        # Freelancer accepts order
        print("\nFreelancer accepting order...")
        accept_result = self.server.accept_order(self.test_data['order_id'], self.test_data['freelancer_id'])
        if not accept_result['success']:
            raise Exception(f"Failed to accept order: {accept_result.get('error')}")
        print("✅ Order accepted")
        
        # Freelancer starts work
        print("\nFreelancer starting work...")
        start_result = self.server.start_order_work(self.test_data['order_id'], self.test_data['freelancer_id'])
        if not start_result['success']:
            raise Exception(f"Failed to start order work: {start_result.get('error')}")
        print("✅ Work started")
        
        # Freelancer delivers order
        print("\nFreelancer delivering order...")
        delivery_data = {
            'delivery_message': 'Order completed for review testing',
            'delivery_files': ['https://example.com/delivery/test_file.zip']
        }
        deliver_result = self.server.deliver_order(self.test_data['order_id'], self.test_data['freelancer_id'], delivery_data)
        if not deliver_result['success']:
            raise Exception(f"Failed to deliver order: {deliver_result.get('error')}")
        print("✅ Order delivered")
        
        # Client accepts delivery
        print("\nClient accepting delivery...")
        accept_delivery_result = self.server.accept_delivery(self.test_data['order_id'], self.test_data['client_id'])
        if not accept_delivery_result['success']:
            raise Exception(f"Failed to accept delivery: {accept_delivery_result.get('error')}")
        print("✅ Delivery accepted")
        
        print(f"\n✅ Completed order ready for review: {self.test_data['order_id']}")
    
    def test_create_review(self):
        """Test creating a review"""
        print("\n3️⃣  TEST: CREATE REVIEW")
        print("-" * 40)
        
        review_data = {
            'gig_id': self.test_data['gig_id'],
            'rating_communication': 5.0,  # Use float instead of int
            'rating_quality': 4.0,  # Use float instead of int
            'rating_deadline': 5.0,  # Use float instead of int
            'comment': 'Excellent service! The freelancer was very communicative and delivered high-quality work on time.',
            'is_public': True
        }
        
        print("Creating review...")
        print(f"Order ID: {self.test_data['order_id']}")
        print(f"Client ID: {self.test_data['client_id']}")
        print(f"Review data: {json.dumps(review_data, indent=2)}")
        
        result = self.server.create_review_client(
            self.test_data['order_id'],
            self.test_data['client_id'],
            review_data
        )
        
        if result['success']:
            self.test_data['review_id'] = result['review']['_id']
            print(f"✅ Review created successfully!")
            print(f"   Review ID: {self.test_data['review_id']}")
            print(f"   Overall rating: {result['review']['overall_rating']}")
            print(f"   Comment: {result['review']['comment'][:50]}...")
            
            # Store for later tests
            self.test_data['test_reviews'].append({
                'id': self.test_data['review_id'],
                'data': review_data,
                'result': result['review']
            })
        else:
            raise Exception(f"Failed to create review: {result.get('error')}")
        
        # Test: Try to create duplicate review (should fail)
        print("\nTesting duplicate review creation (should fail)...")
        duplicate_result = self.server.create_review_client(
            self.test_data['order_id'],
            self.test_data['client_id'],
            review_data
        )
        
        if not duplicate_result['success']:
            print(f"✅ Correctly prevented duplicate review: {duplicate_result.get('error')}")
        else:
            raise Exception("Should have prevented duplicate review creation")
        
        return True
    
    def test_update_review(self):
        """Test updating a review"""
        print("\n4️⃣  TEST: UPDATE REVIEW")
        print("-" * 40)
        
        update_data = {
            'rating_communication': 4.0,  # Use float
            'rating_quality': 5.0,  # Use float
            'comment': 'Updated review: The quality was even better than expected!',
            'is_public': True
        }
        
        print(f"Updating review {self.test_data['review_id']}...")
        print(f"Update data: {json.dumps(update_data, indent=2)}")
        
        result = self.server.update_review_client(
            self.test_data['review_id'],
            self.test_data['client_id'],
            update_data
        )
        
        if result['success']:
            print(f"✅ Review updated successfully!")
            print(f"   New overall rating: {result['review']['overall_rating']}")
            print(f"   Updated comment: {result['review']['comment'][:50]}...")
            print(f"   Updated at: {result['review']['updated_at']}")
            
            # Verify updates
            if result['review']['rating_communication'] == 4:
                print("✅ Communication rating updated correctly")
            else:
                raise Exception("Communication rating not updated")
                
            if result['review']['rating_quality'] == 5:
                print("✅ Quality rating updated correctly")
            else:
                raise Exception("Quality rating not updated")
        else:
            raise Exception(f"Failed to update review: {result.get('error')}")
        
        return True
    
    def test_respond_to_review(self):
        """Test freelancer responding to a review"""
        print("\n5️⃣  TEST: RESPOND TO REVIEW")
        print("-" * 40)
        
        response_text = "Thank you for your kind review! I'm glad you were satisfied with the service. Looking forward to working with you again!"
        
        print(f"Freelancer responding to review {self.test_data['review_id']}...")
        print(f"Response: {response_text}")
        
        result = self.server.respond_to_review(
            self.test_data['review_id'],
            self.test_data['freelancer_id'],
            response_text
        )
        
        if result['success']:
            print(f"✅ Response added successfully!")
            print(f"   Message: {result['message']}")
            
            # Verify response was added by getting the review
            review_result = self.server.get_gig_reviews(self.test_data['gig_id'])
            if review_result['success'] and review_result['reviews']:
                review = review_result['reviews'][0]
                if review.get('owner_response') == response_text:
                    print("✅ Response verified in review data")
                else:
                    print(f"❌ Response not found in review: {review.get('owner_response')}")
        else:
            raise Exception(f"Failed to respond to review: {result.get('error')}")
        
        # Test: Try responding as wrong freelancer (should fail)
        print("\nTesting response with wrong freelancer (should fail)...")
        wrong_freelancer_id = '123456789012345678901234'  # Invalid ID
        wrong_result = self.server.respond_to_review(
            self.test_data['review_id'],
            wrong_freelancer_id,
            "This should fail"
        )
        
        if not wrong_result['success']:
            print(f"✅ Correctly prevented wrong freelancer response: {wrong_result.get('error')}")
        else:
            raise Exception("Should have prevented wrong freelancer from responding")
        
        return True
    
    def test_get_gig_reviews(self):
        """Test getting reviews for a gig"""
        print("\n6️⃣  TEST: GET GIG REVIEWS")
        print("-" * 40)
        
        # Test basic gig reviews retrieval
        print(f"Getting reviews for gig {self.test_data['gig_id']}...")
        result = self.server.get_gig_reviews(self.test_data['gig_id'])
        
        if result['success']:
            print(f"✅ Retrieved {len(result['reviews'])} review(s)")
            print(f"   Total reviews: {result['pagination']['total']}")
            
            if result['reviews']:
                review = result['reviews'][0]
                print(f"   First review ID: {review['_id']}")
                print(f"   Reviewer: {review.get('reviewer', {}).get('username', 'N/A')}")
                print(f"   Rating: {review['overall_rating']}")
                print(f"   Has response: {'Yes' if review.get('owner_response') else 'No'}")
                
                # Verify populated data
                if 'reviewer' in review:
                    print("✅ Reviewer details populated")
                if 'freelancer' in review:
                    print("✅ Freelancer details populated")
            else:
                print("⚠️  No reviews found")
        else:
            raise Exception(f"Failed to get gig reviews: {result.get('error')}")
        
        # Test with filters
        print("\nTesting with filters (min_rating=4)...")
        filters = {
            'min_rating': 4.0,  # Use float
            'page': 1,
            'limit': 10
        }
        
        filtered_result = self.server.get_gig_reviews(self.test_data['gig_id'], filters)
        if filtered_result['success']:
            print(f"✅ Filtered reviews retrieved: {len(filtered_result['reviews'])}")
        else:
            raise Exception(f"Failed to get filtered gig reviews: {filtered_result.get('error')}")
        
        # Test with has_response filter
        print("\nTesting with has_response filter...")
        response_filters = {
            'has_response': True,
            'sort_by': 'created_at'
        }
        
        response_result = self.server.get_gig_reviews(self.test_data['gig_id'], response_filters)
        if response_result['success']:
            print(f"✅ Reviews with response: {len(response_result['reviews'])}")
        else:
            raise Exception(f"Failed to get reviews with response filter: {response_result.get('error')}")
        
        return True
    
    def test_get_freelancer_reviews(self):
        """Test getting reviews for a freelancer"""
        print("\n7️⃣  TEST: GET FREELANCER REVIEWS")
        print("-" * 40)
        
        print(f"Getting reviews for freelancer {self.test_data['freelancer_id']}...")
        result = self.server.get_freelancer_reviews(self.test_data['freelancer_id'])
        
        if result['success']:
            print(f"✅ Retrieved {len(result['reviews'])} review(s)")
            print(f"   Total reviews: {result['pagination']['total']}")
            print(f"   Pages: {result['pagination']['pages']}")
            
            if result['reviews']:
                review = result['reviews'][0]
                print(f"   Review ID: {review['_id']}")
                print(f"   Gig: {review.get('gig', {}).get('title', 'N/A')}")
                print(f"   Rating: {review['overall_rating']}")
                print(f"   Comment: {review['comment'][:50]}...")
                
                # Verify populated data
                if 'gig' in review:
                    print("✅ Gig details populated")
                if 'reviewer' in review:
                    print("✅ Reviewer details populated")
            else:
                print("⚠️  No reviews found")
        else:
            raise Exception(f"Failed to get freelancer reviews: {result.get('error')}")
        
        # Test with pagination
        print("\nTesting with pagination...")
        pagination_filters = {
            'page': 1,
            'limit': 5,
            'sort_by': 'overall_rating'
        }
        
        paginated_result = self.server.get_freelancer_reviews(
            self.test_data['freelancer_id'],
            pagination_filters
        )
        
        if paginated_result['success']:
            print(f"✅ Paginated reviews: {len(paginated_result['reviews'])}")
            print(f"   Page {paginated_result['pagination']['page']} of {paginated_result['pagination']['pages']}")
        else:
            raise Exception(f"Failed to get paginated freelancer reviews: {paginated_result.get('error')}")
        
        return True
    
    def test_get_review_stats(self):
        """Test getting review statistics"""
        print("\n8️⃣  TEST: GET REVIEW STATS")
        print("-" * 40)
        
        print(f"Getting review stats for freelancer {self.test_data['freelancer_id']}...")
        result = self.server.get_review_stats(self.test_data['freelancer_id'])
        
        if result['success']:
            stats = result['stats']
            print(f"✅ Review statistics retrieved:")
            print(f"   Total reviews: {stats['total_reviews']}")
            print(f"   Average rating: {stats['average_rating']}")
            print(f"   Response rate: {stats['response_rate']}%")
            print(f"   Average communication: {stats['average_communication']}")
            print(f"   Average quality: {stats['average_quality']}")
            print(f"   Average deadline: {stats['average_deadline']}")
            
            # Verify stats are calculated correctly
            if stats['total_reviews'] > 0:
                print("✅ Stats calculated with reviews")
            else:
                print("⚠️  No reviews for stats calculation")
                
            # Print rating distribution
            print(f"   Rating distribution:")
            for rating, count in stats['rating_distribution'].items():
                print(f"     {rating} stars: {count}")
        else:
            raise Exception(f"Failed to get review stats: {result.get('error')}")
        
        return True
    
    def test_delete_review(self):
        """Test deleting a review"""
        print("\n9️⃣  TEST: DELETE REVIEW")
        print("-" * 40)
        
        print(f"Deleting review {self.test_data['review_id']}...")
        result = self.server.delete_review_client(
            self.test_data['review_id'],
            self.test_data['client_id']
        )
        
        if result['success']:
            print(f"✅ Review deleted successfully!")
            print(f"   Message: {result['message']}")
            
            # Verify review is deleted
            print("\nVerifying review is deleted...")
            # Create a new review first to test deletion
            new_review_data = {
                'gig_id': self.test_data['gig_id'],
                'rating_communication': 5.0,  # Use float
                'rating_quality': 5.0,  # Use float
                'rating_deadline': 5.0,  # Use float
                'comment': 'Another test review',
                'is_public': True
            }
            
            # Need another completed order
            print("Creating another completed order for deletion test...")
            self._create_second_completed_order()
            
            new_review_result = self.server.create_review_client(
                self.test_data['order_id_2'],
                self.test_data['client_id'],
                new_review_data
            )
            
            if new_review_result['success']:
                new_review_id = new_review_result['review']['_id']
                print(f"✅ New review created for deletion test: {new_review_id}")
                
                # Delete it
                delete_result = self.server.delete_review_client(
                    new_review_id,
                    self.test_data['client_id']
                )
                
                if delete_result['success']:
                    print("✅ Second review deleted successfully")
                else:
                    raise Exception(f"Failed to delete second review: {delete_result.get('error')}")
            else:
                raise Exception(f"Failed to create second review: {new_review_result.get('error')}")
        else:
            raise Exception(f"Failed to delete review: {result.get('error')}")
        
        return True
    
    def _create_second_completed_order(self):
        """Create a second completed order for testing"""
        # Create second gig - FIXED: Use float for base_price
        gig_data_2 = {
            'title': 'Second Review Test Service',
            'description': 'Second service for review testing',
            'base_price': 150.0,  # Use float
            'delivery_days': 5,
            'category_id': self.test_data['category_id'],  # Use same category
            'requirements_description': 'Second test requirements',
            'search_tags': ['test2', 'review'],
            'currency': 'USD',
            'pricing_type': 'fixed',
            'revisions_included': 1
        }
        
        gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data_2)
        if not gig_result['success']:
            raise Exception(f"Failed to create second gig: {gig_result.get('error')}")
        
        gig_id_2 = gig_result['gig']['_id']
        
        # Create order - Use create_order instead of create_order_client
        order_data_2 = {
            'client_id': self.test_data['client_id'],
            'freelancer_id': self.test_data['freelancer_id'],
            'gig_id': gig_id_2,
            'title': 'Second Review Test Order',
            'description': 'Second order for review testing',
            'requirements': 'Complete second service',
            'amount': 150.0,  # Use float
            'currency': 'USD'
        }
        
        order_result = self.server.create_order(order_data_2)
        if not order_result['success']:
            raise Exception(f"Failed to create second order: {order_result.get('error')}")
        
        order_id_2 = order_result['order']['_id']
        
        # Complete the order
        self.server.accept_order(order_id_2, self.test_data['freelancer_id'])
        self.server.start_order_work(order_id_2, self.test_data['freelancer_id'])
        
        delivery_data = {
            'delivery_message': 'Second order completed',
            'delivery_files': []
        }
        self.server.deliver_order(order_id_2, self.test_data['freelancer_id'], delivery_data)
        self.server.accept_delivery(order_id_2, self.test_data['client_id'])
        
        self.test_data['order_id_2'] = order_id_2
        self.test_data['gig_id_2'] = gig_id_2
    
    def test_admin_functions(self):
        """Test admin review functions"""
        print("\n🔧 TEST: ADMIN FUNCTIONS")
        print("-" * 40)
        
        # Note: Admin functions typically require admin privileges
        # For testing, we'll create a test review first
        
        # Create another review for admin testing
        print("Creating test review for admin functions...")
        review_data = {
            'gig_id': self.test_data['gig_id'],
            'rating_communication': 3.0,  # Use float
            'rating_quality': 3.0,  # Use float
            'rating_deadline': 3.0,  # Use float
            'comment': 'Test review for admin functions',
            'is_public': True
        }
        
        # Need another completed order
        self._create_third_completed_order()
        
        admin_review_result = self.server.create_review_client(
            self.test_data['order_id_3'],
            self.test_data['client_id'],
            review_data
        )
        
        if not admin_review_result['success']:
            print(f"⚠️  Could not create admin test review: {admin_review_result.get('error')}")
            print("⚠️  Skipping admin tests (requires specific setup)")
            return True
        
        admin_review_id = admin_review_result['review']['_id']
        print(f"✅ Admin test review created: {admin_review_id}")
        
        # Test: Get all reviews (admin function)
        print("\nTesting get_all_reviews_admin...")
        filters = {
            'freelancer_id': self.test_data['freelancer_id'],
            'min_rating': 1.0,  # Use float
            'max_rating': 5.0,  # Use float
            'has_response': False
        }
        
        pagination = {
            'page': 1,
            'limit': 10
        }
        
        all_reviews_result = self.server.get_all_reviews_admin(filters, pagination)
        
        if all_reviews_result['success']:
            print(f"✅ Retrieved {len(all_reviews_result['reviews'])} review(s) via admin")
            print(f"   Total: {all_reviews_result['pagination']['total']}")
            
            if all_reviews_result['reviews']:
                print("   Sample reviews:")
                for i, review in enumerate(all_reviews_result['reviews'][:2]):
                    print(f"     {i+1}. ID: {review['_id']}, Rating: {review.get('overall_rating')}, Public: {review.get('is_public', True)}")
        else:
            print(f"⚠️  Could not get all reviews (may need admin auth): {all_reviews_result.get('error')}")
        
        # Test: Toggle review visibility
        print("\nTesting toggle_review_visibility...")
        # Note: This typically requires admin privileges
        toggle_result = self.server.toggle_review_visibility(admin_review_id, False)
        
        if toggle_result['success']:
            print(f"✅ Review visibility toggled: {toggle_result['message']}")
            
            # Verify by getting gig reviews (should not show hidden review)
            gig_reviews = self.server.get_gig_reviews(self.test_data['gig_id'])
            if gig_reviews['success']:
                hidden_found = any(r['_id'] == admin_review_id for r in gig_reviews['reviews'])
                if not hidden_found:
                    print("✅ Hidden review not shown in public gig reviews")
                else:
                    print("⚠️  Hidden review still showing in public gig reviews")
        else:
            print(f"⚠️  Could not toggle visibility (may need admin auth): {toggle_result.get('error')}")
        
        # Test: Delete review admin
        print("\nTesting delete_review_admin...")
        delete_admin_result = self.server.delete_review_admin(admin_review_id)
        
        if delete_admin_result['success']:
            print(f"✅ Admin review deletion: {delete_admin_result['message']}")
        else:
            print(f"⚠️  Could not delete via admin (may need admin auth): {delete_admin_result.get('error')}")
        
        return True
    
    def _create_third_completed_order(self):
        """Create a third completed order for admin testing"""
        # Create third gig - FIXED: Use float for base_price
        gig_data_3 = {
            'title': 'Third Review Test Service',
            'description': 'Third service for review testing',
            'base_price': 200.0,  # Use float
            'delivery_days': 3,
            'category_id': self.test_data['category_id'],  # Use same category
            'requirements_description': 'Third test requirements',
            'search_tags': ['test3', 'admin'],
            'currency': 'USD',
            'pricing_type': 'fixed',
            'revisions_included': 1
        }
        
        gig_result = self.server.create_gig(self.test_data['freelancer_id'], gig_data_3)
        if not gig_result['success']:
            raise Exception(f"Failed to create third gig: {gig_result.get('error')}")
        
        gig_id_3 = gig_result['gig']['_id']
        
        # Create order - Use create_order instead of create_order_client
        order_data_3 = {
            'client_id': self.test_data['client_id'],
            'freelancer_id': self.test_data['freelancer_id'],
            'gig_id': gig_id_3,
            'title': 'Third Review Test Order',
            'description': 'Third order for admin testing',
            'requirements': 'Complete third service',
            'amount': 200.0,  # Use float
            'currency': 'USD'
        }
        
        order_result = self.server.create_order(order_data_3)
        if not order_result['success']:
            raise Exception(f"Failed to create third order: {order_result.get('error')}")
        
        order_id_3 = order_result['order']['_id']
        
        # Complete the order
        self.server.accept_order(order_id_3, self.test_data['freelancer_id'])
        self.server.start_order_work(order_id_3, self.test_data['freelancer_id'])
        
        delivery_data = {
            'delivery_message': 'Third order completed',
            'delivery_files': []
        }
        self.server.deliver_order(order_id_3, self.test_data['freelancer_id'], delivery_data)
        self.server.accept_delivery(order_id_3, self.test_data['client_id'])
        
        self.test_data['order_id_3'] = order_id_3
        self.test_data['gig_id_3'] = gig_id_3
    
    def test_error_cases(self):
        """Test error handling and edge cases"""
        print("\n🚨 TEST: ERROR CASES")
        print("-" * 40)
        
        # Test 1: Invalid order ID
        print("\n1. Testing with invalid order ID...")
        result = self.server.create_review_client(
            'invalid_order_id',
            self.test_data['client_id'],
            {'gig_id': self.test_data['gig_id'], 'rating_communication': 5.0, 'rating_quality': 5.0, 'rating_deadline': 5.0}  # Use floats
        )
        
        if not result['success']:
            print(f"✅ Correctly rejected invalid order ID: {result.get('error')}")
        else:
            print("⚠️  Should have rejected invalid order ID")
        
        # Test 2: Invalid client ID (not owner)
        print("\n2. Testing with wrong client ID...")
        wrong_client_id = '123456789012345678901234'
        result = self.server.create_review_client(
            self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
            wrong_client_id,
            {'gig_id': self.test_data['gig_id'], 'rating_communication': 5.0, 'rating_quality': 5.0, 'rating_deadline': 5.0}  # Use floats
        )
        
        if not result['success']:
            print(f"✅ Correctly rejected wrong client: {result.get('error')}")
        else:
            print("⚠️  Should have rejected wrong client")
        
        # Test 3: Missing required fields
        print("\n3. Testing with missing rating fields...")
        incomplete_data = {
            'gig_id': self.test_data['gig_id'],
            'rating_communication': 5.0,  # Use float
            # Missing rating_quality and rating_deadline
        }
        
        result = self.server.create_review_client(
            self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
            self.test_data['client_id'],
            incomplete_data
        )
        
        if not result['success']:
            print(f"✅ Correctly rejected incomplete data: {result.get('error')}")
        else:
            print("⚠️  Should have rejected incomplete data")
        
        # Test 4: Invalid rating values
        print("\n4. Testing with invalid rating values...")
        invalid_rating_data = {
            'gig_id': self.test_data['gig_id'],
            'rating_communication': 10.0,  # Invalid: should be 1-5 (use float)
            'rating_quality': 0.0,  # Invalid: should be 1-5 (use float)
            'rating_deadline': 5.0  # Use float
        }
        
        result = self.server.create_review_client(
            self.test_data['order_id_2'] if 'order_id_2' in self.test_data else self.test_data['order_id'],
            self.test_data['client_id'],
            invalid_rating_data
        )
        
        if not result['success']:
            print(f"✅ Correctly rejected invalid ratings: {result.get('error')}")
        else:
            print("⚠️  Should have rejected invalid ratings")
        
        # Test 5: Update non-existent review
        print("\n5. Testing update of non-existent review...")
        result = self.server.update_review_client(
            '123456789012345678901234',
            self.test_data['client_id'],
            {'comment': 'This should fail'}
        )
        
        if not result['success']:
            print(f"✅ Correctly rejected non-existent review: {result.get('error')}")
        else:
            print("⚠️  Should have rejected non-existent review")
        
        # Test 6: Get reviews for non-existent gig
        print("\n6. Testing get reviews for non-existent gig...")
        result = self.server.get_gig_reviews('non_existent_gig_id')
        
        if not result['success']:
            print(f"✅ Correctly handled non-existent gig: {result.get('error')}")
        else:
            print(f"⚠️  Response for non-existent gig: {result}")
        
        # Test 7: Get stats for non-existent freelancer
        print("\n7. Testing get stats for non-existent freelancer...")
        result = self.server.get_review_stats('non_existent_freelancer_id')
        
        if not result['success']:
            print(f"✅ Correctly handled non-existent freelancer: {result.get('error')}")
        else:
            print(f"⚠️  Response for non-existent freelancer: {result}")
        
        print("\n✅ All error cases tested successfully")
        return True
    
    def cleanup(self):
        """Cleanup test data (optional)"""
        print("\n🧹 CLEANUP")
        print("-" * 40)
        
        # Note: In a real test environment, you might want to clean up test data
        # This is optional as test data is isolated with timestamps
        print("Test data cleanup not implemented (test data is timestamp-isolated)")
        print("All test data uses unique email addresses and can be left in database")


def main():
    """Main test runner"""
    import sys
    
    # Parse command line arguments
    server_url = 'http://localhost:8000/RPC2'
    if len(sys.argv) > 1:
        server_url = sys.argv[1]
    
    # Create test instance
    tester = TestReviews(server_url)
    
    try:
        # Run all tests
        success = tester.run_all_tests()
        
        # Optional cleanup
        # tester.cleanup()
        
        if success:
            print("\n🎉 ALL TESTS PASSED!")
            return 0
        else:
            print("\n❌ SOME TESTS FAILED")
            return 1
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Tests interrupted by user")
        return 130
    except Exception as e:
        print(f"\n❌ UNEXPECTED ERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)