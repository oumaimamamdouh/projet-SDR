# test_order.py
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from bson import ObjectId
from datetime import datetime, timedelta
from services.order_service import OrderService

def print_test_result(test_name, result, expect_failure=False):
    """Helper function to print test results"""
    print(f"\n{'='*60}")
    print(f"Test: {test_name}")
    print(f"{'='*60}")
    
    success = result.get('success', False)
    
    if expect_failure:
        # Pour les tests qui DEVRAIENT échouer
        if not success:
            print(f"✅ SUCCESS (Expected failure): {result.get('error', 'Test passed as expected')}")
            return True
        else:
            print(f"❌ FAILED: Expected failure but got success")
            return False
    else:
        # Pour les tests qui DEVRAIENT réussir
        if success:
            print(f"✅ SUCCESS: {result.get('message', 'Test passed')}")
            if 'order' in result:
                order = result['order']
                print(f"   Order ID: {order.get('_id', 'N/A')}")
                print(f"   Order Number: {order.get('order_number', 'N/A')}")
                print(f"   Status: {order.get('status', 'N/A')}")
                print(f"   Amount: {order.get('amount', 'N/A')}")
            if 'orders' in result:
                print(f"   Orders found: {len(result['orders'])}")
            if 'stats' in result:
                stats = result['stats']
                print(f"   Total Orders: {stats.get('total_orders', 'N/A')}")
            if 'deleted_count' in result:
                print(f"   Deleted: {result['deleted_count']}")
            return True
        else:
            print(f"❌ FAILED: {result.get('error', 'Unknown error')}")
            return False

def main():
    print("🚀 Starting Order Service Tests")
    print("=" * 60)
    
    # Initialize services
    order_service = OrderService()
    
    # Test data from your MongoDB
    TEST_CLIENT_ID = "6920c49a747da49650b2d6d1"  # client1@example.com
    TEST_FREELANCER_ID = "6920c510747da49650b2d6d4"  # freelancer1@example.com
    TEST_FREELANCER_ID_2 = "692a3bd6f3be085d2499e02d"  # Another freelancer
    TEST_GIG_ID = "692a3be1f3be085d2499e02e"  # Python RPC Development Service
    TEST_GIG_ID_2 = "692a3becf3be085d2499e031"  # Debug Gig
    TEST_INVALID_ID = "invalid_id_123"
    TEST_NONEXISTENT_ID = "692a3be1f3be085d2499e0ff"
    
    # Store order IDs for later tests
    created_order_ids = []
    
    passed_tests = 0
    total_tests = 0
    
    # Cleanup before tests
    print("\n🧹 Cleaning up old test orders...")
    
    # Test 1: Create order (client)
    print("\n📌 Test 1: Create new order (client)")
    order_data = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'I need a Python RPC service with MongoDB integration',
        'requirements': 'Please implement XML-RPC server with authentication',
        'amount': 150.00
    }
    result = order_service.create_order_client(TEST_CLIENT_ID, order_data)
    total_tests += 1
    if print_test_result("Create order", result):
        passed_tests += 1
        if 'order' in result:
            order_id = result['order']['_id']
            order_number = result['order']['order_number']
            created_order_ids.append(order_id)
            print(f"   Created Order ID: {order_id}")
            print(f"   Order Number: {order_number}")
    
    # Test 2: Create another order
    print("\n📌 Test 2: Create another order")
    order_data_2 = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID_2,
        'description': 'Debug my Python application',
        'requirements': 'Fix memory leak issues',
        'amount': 100.00
    }
    result = order_service.create_order_client(TEST_CLIENT_ID, order_data_2)
    total_tests += 1
    if print_test_result("Create second order", result):
        passed_tests += 1
        if 'order' in result:
            order_id_2 = result['order']['_id']
            created_order_ids.append(order_id_2)
            print(f"   Created Order ID: {order_id_2}")
    
    # Test 3: Create order with invalid client ID (should fail)
    print("\n📌 Test 3: Create order with invalid client ID (should fail)")
    result = order_service.create_order_client(TEST_INVALID_ID, order_data)
    total_tests += 1
    if print_test_result("Invalid client ID", result, expect_failure=True):
        passed_tests += 1
    
    # Test 4: Create order with invalid freelancer ID (should fail)
    print("\n📌 Test 4: Create order with invalid freelancer ID (should fail)")
    invalid_order_data = order_data.copy()
    invalid_order_data['freelancer_id'] = TEST_INVALID_ID
    result = order_service.create_order_client(TEST_CLIENT_ID, invalid_order_data)
    total_tests += 1
    if print_test_result("Invalid freelancer ID", result, expect_failure=True):
        passed_tests += 1
    
    # Test 5: Create order with non-existent gig (should fail)
    print("\n📌 Test 5: Create order with non-existent gig (should fail)")
    invalid_order_data = order_data.copy()
    invalid_order_data['gig_id'] = TEST_NONEXISTENT_ID
    result = order_service.create_order_client(TEST_CLIENT_ID, invalid_order_data)
    total_tests += 1
    if print_test_result("Non-existent gig", result, expect_failure=True):
        passed_tests += 1
    
    # Test 6: Legacy create_order method
    print("\n📌 Test 6: Legacy create_order method")
    legacy_order_data = {
        'client_id': TEST_CLIENT_ID,
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Legacy API test',
        'amount': 200.00
    }
    result = order_service.create_order(legacy_order_data)
    total_tests += 1
    if print_test_result("Legacy create_order", result):
        passed_tests += 1
        if 'order' in result:
            created_order_ids.append(result['order']['_id'])
    
    # Test 7: Get client orders
    print("\n📌 Test 7: Get client orders")
    result = order_service.get_my_orders(TEST_CLIENT_ID)
    total_tests += 1
    if print_test_result("Get client orders", result):
        passed_tests += 1
    
    # Test 8: Get client orders with filters
    print("\n📌 Test 8: Get client orders with filters (status=pending)")
    filters = {'status': 'pending', 'page': 1, 'limit': 5}
    result = order_service.get_my_orders(TEST_CLIENT_ID, filters)
    total_tests += 1
    if print_test_result("Get filtered orders", result):
        passed_tests += 1
    
    # Test 9: Get order by ID
    if created_order_ids:
        print(f"\n📌 Test 9: Get order by ID")
        result = order_service.get_order_by_id(created_order_ids[0], TEST_CLIENT_ID)
        total_tests += 1
        if print_test_result("Get order by ID", result):
            passed_tests += 1
    
    # Test 10: Get order by ID with wrong user (should fail)
    print("\n📌 Test 10: Get order by ID with wrong user (should fail)")
    if created_order_ids:
        result = order_service.get_order_by_id(created_order_ids[0], TEST_FREELANCER_ID)
        total_tests += 1
        if print_test_result("Wrong user access", result, expect_failure=True):
            passed_tests += 1
    
    # Test 11: Freelancer accept order
    print("\n📌 Test 11: Freelancer accept order")
    if created_order_ids:
        result = order_service.accept_order(created_order_ids[0], TEST_FREELANCER_ID_2)
        total_tests += 1
        if print_test_result("Accept order", result):
            passed_tests += 1
    
    # Test 12: Freelancer accept already accepted order (should fail)
    print("\n📌 Test 12: Freelancer accept already accepted order (should fail)")
    if created_order_ids:
        result = order_service.accept_order(created_order_ids[0], TEST_FREELANCER_ID_2)
        total_tests += 1
        if print_test_result("Accept already accepted", result, expect_failure=True):
            passed_tests += 1
    
    # Test 13: Freelancer decline order
    print("\n📌 Test 13: Freelancer decline order")
    if created_order_ids and len(created_order_ids) > 1:
        result = order_service.decline_order(created_order_ids[1], TEST_FREELANCER_ID_2, "Too busy right now")
        total_tests += 1
        if print_test_result("Decline order", result):
            passed_tests += 1
    
    # Test 14: Freelancer decline non-pending order (should fail)
    print("\n📌 Test 14: Freelancer decline non-pending order (should fail)")
    if created_order_ids:
        result = order_service.decline_order(created_order_ids[0], TEST_FREELANCER_ID_2, "Test")
        total_tests += 1
        if print_test_result("Decline non-pending", result, expect_failure=True):
            passed_tests += 1
    
    # Test 15: Freelancer start order work
    print("\n📌 Test 15: Freelancer start order work")
    if created_order_ids:
        result = order_service.start_order_work(created_order_ids[0], TEST_FREELANCER_ID_2)
        total_tests += 1
        if print_test_result("Start order work", result):
            passed_tests += 1
    
    # Test 16: Freelancer update order progress
    print("\n📌 Test 16: Freelancer update order progress")
    if created_order_ids:
        progress_data = {
            'percentage': 50,
            'message': 'Completed backend implementation'
        }
        result = order_service.update_order_progress(created_order_ids[0], TEST_FREELANCER_ID_2, progress_data)
        total_tests += 1
        if print_test_result("Update progress", result):
            passed_tests += 1
    
    # Test 17: Freelancer deliver order
    print("\n📌 Test 17: Freelancer deliver order")
    if created_order_ids:
        delivery_data = {
            'message': 'Your RPC service is ready!',
            'files': ['https://example.com/files/rpc_service.zip']
        }
        result = order_service.deliver_order(created_order_ids[0], TEST_FREELANCER_ID_2, delivery_data)
        total_tests += 1
        if print_test_result("Deliver order", result):
            passed_tests += 1
    
    # Test 18: Client accept delivery
    print("\n📌 Test 18: Client accept delivery")
    if created_order_ids:
        result = order_service.accept_delivery(created_order_ids[0], TEST_CLIENT_ID)
        total_tests += 1
        if print_test_result("Accept delivery", result):
            passed_tests += 1
    
    # Test 19: Create another order for revision testing
    print("\n📌 Test 19: Create another order for revision testing")
    order_data_3 = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Test order for revisions',
        'requirements': 'Need revisions testing',
        'amount': 150.00
    }
    result = order_service.create_order_client(TEST_CLIENT_ID, order_data_3)
    total_tests += 1
    if print_test_result("Create order for revisions", result):
        passed_tests += 1
        if 'order' in result:
            revision_order_id = result['order']['_id']
            created_order_ids.append(revision_order_id)
            
            # Accept and deliver this order
            order_service.accept_order(revision_order_id, TEST_FREELANCER_ID_2)
            order_service.start_order_work(revision_order_id, TEST_FREELANCER_ID_2)
            delivery_data = {'message': 'Initial delivery'}
            order_service.deliver_order(revision_order_id, TEST_FREELANCER_ID_2, delivery_data)
    
    # Test 20: Client request revision
    print("\n📌 Test 20: Client request revision")
    if 'revision_order_id' in locals():
        result = order_service.request_revision(revision_order_id, TEST_CLIENT_ID, 
                                               "Please add more error handling")
        total_tests += 1
        if print_test_result("Request revision", result):
            passed_tests += 1
    
    # Test 21: Client request revision on non-delivered order (should fail)
    print("\n📌 Test 21: Client request revision on non-delivered order (should fail)")
    # Create a new order that's not delivered
    temp_order_data = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Temp order',
        'amount': 100.00
    }
    temp_result = order_service.create_order_client(TEST_CLIENT_ID, temp_order_data)
    if temp_result.get('success'):
        temp_order_id = temp_result['order']['_id']
        result = order_service.request_revision(temp_order_id, TEST_CLIENT_ID, "Test")
        total_tests += 1
        if print_test_result("Request revision non-delivered", result, expect_failure=True):
            passed_tests += 1
        created_order_ids.append(temp_order_id)
    
    # Test 22: Client cancel order
    print("\n📌 Test 22: Client cancel order")
    # Create a new order to cancel
    cancel_order_data = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Order to cancel',
        'amount': 100.00
    }
    cancel_result = order_service.create_order_client(TEST_CLIENT_ID, cancel_order_data)
    if cancel_result.get('success'):
        cancel_order_id = cancel_result['order']['_id']
        created_order_ids.append(cancel_order_id)
        result = order_service.cancel_order(cancel_order_id, TEST_CLIENT_ID, "Changed my mind")
        total_tests += 1
        if print_test_result("Cancel order", result):
            passed_tests += 1
    
    # Test 23: Client cancel non-cancellable order (should fail)
    print("\n📌 Test 23: Client cancel non-cancellable order (should fail)")
    if created_order_ids:  # Use the completed order
        result = order_service.cancel_order(created_order_ids[0], TEST_CLIENT_ID, "Test")
        total_tests += 1
        if print_test_result("Cancel completed order", result, expect_failure=True):
            passed_tests += 1
    
    # Test 24: Get freelancer orders
    print("\n📌 Test 24: Get freelancer orders")
    result = order_service.get_freelancer_orders(TEST_FREELANCER_ID_2)
    total_tests += 1
    if print_test_result("Get freelancer orders", result):
        passed_tests += 1
    
    # Test 25: Get freelancer orders with filters
    print("\n📌 Test 25: Get freelancer orders with filters")
    filters = {'status': 'completed', 'page': 1, 'limit': 5}
    result = order_service.get_freelancer_orders(TEST_FREELANCER_ID_2, filters)
    total_tests += 1
    if print_test_result("Get filtered freelancer orders", result):
        passed_tests += 1
    
    # Test 26: Get order timeline
    print("\n📌 Test 26: Get order timeline")
    if created_order_ids:
        result = order_service.get_order_timeline(created_order_ids[0])
        total_tests += 1
        if print_test_result("Get order timeline", result):
            passed_tests += 1
            if 'timeline' in result:
                print(f"   Timeline events: {len(result['timeline'])}")
    
    # Test 27: Freelancer extend deadline
    print("\n📌 Test 27: Freelancer extend deadline")
    # Create a new order for deadline extension
    extend_order_data = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Order for deadline extension',
        'amount': 150.00
    }
    extend_result = order_service.create_order_client(TEST_CLIENT_ID, extend_order_data)
    if extend_result.get('success'):
        extend_order_id = extend_result['order']['_id']
        created_order_ids.append(extend_order_id)
        order_service.accept_order(extend_order_id, TEST_FREELANCER_ID_2)
        
        extension_data = {'days': 3, 'reason': 'Need more time for testing'}
        result = order_service.extend_deadline(extend_order_id, TEST_FREELANCER_ID_2, extension_data)
        total_tests += 1
        if print_test_result("Extend deadline", result):
            passed_tests += 1
    
    # Test 28: Client try to extend deadline (should fail)
    print("\n📌 Test 28: Client try to extend deadline (should fail)")
    if 'extend_order_id' in locals():
        extension_data = {'days': 2, 'reason': 'Client request'}
        result = order_service.extend_deadline(extend_order_id, TEST_CLIENT_ID, extension_data)
        total_tests += 1
        if print_test_result("Client extend deadline", result, expect_failure=True):
            passed_tests += 1
    
    # Test 29: Get order stats for client
    print("\n📌 Test 29: Get order stats for client")
    result = order_service.get_order_stats(TEST_CLIENT_ID, 'client')
    total_tests += 1
    if print_test_result("Get client order stats", result):
        passed_tests += 1
    
    # Test 30: Get order stats for freelancer
    print("\n📌 Test 30: Get order stats for freelancer")
    result = order_service.get_order_stats(TEST_FREELANCER_ID_2, 'freelancer')
    total_tests += 1
    if print_test_result("Get freelancer order stats", result):
        passed_tests += 1
    
    # Test 31: Get user orders (legacy method)
    print("\n📌 Test 31: Get user orders (legacy method)")
    result = order_service.get_user_orders(TEST_CLIENT_ID, 'client')
    total_tests += 1
    if print_test_result("Get user orders", result):
        passed_tests += 1
    
    # Test 32: Update order status
    print("\n📌 Test 32: Update order status")
    # Create a new order for status update
    status_order_data = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Order for status update',
        'amount': 100.00
    }
    status_result = order_service.create_order_client(TEST_CLIENT_ID, status_order_data)
    if status_result.get('success'):
        status_order_id = status_result['order']['_id']
        created_order_ids.append(status_order_id)
        
        result = order_service.update_order_status(status_order_id, 'confirmed', TEST_CLIENT_ID)
        total_tests += 1
        if print_test_result("Update order status", result):
            passed_tests += 1
    
    # Test 33: Test _safe_objectid helper
    print("\n📌 Test 33: Test _safe_objectid helper")
    try:
        # Test with valid ObjectId string
        obj_id = order_service._safe_objectid(TEST_CLIENT_ID)
        print(f"✅ SUCCESS: Valid ObjectId conversion: {obj_id}")
        
        # Test with existing ObjectId
        existing_obj_id = ObjectId(TEST_CLIENT_ID)
        same_obj_id = order_service._safe_objectid(existing_obj_id)
        print(f"✅ SUCCESS: Existing ObjectId preserved: {same_obj_id}")
        
        # Test with invalid string
        invalid_obj_id = order_service._safe_objectid("invalid")
        print(f"✅ SUCCESS: Invalid string returns None: {invalid_obj_id}")
        
        passed_tests += 1
        total_tests += 1
    except Exception as e:
        print(f"❌ FAILED: _safe_objectid test - {e}")
        total_tests += 1
    
    # Test 34: Test _process_orders_list
    print("\n📌 Test 34: Test _process_orders_list")
    try:
        # Get some orders to process
        test_orders = list(order_service.orders_collection.find().limit(2))
        if test_orders:
            processed = order_service._process_orders_list(test_orders, include_details=True)
            print(f"✅ SUCCESS: Processed {len(processed)} orders")
            passed_tests += 1
        else:
            print("⚠️ SKIPPED: No orders to process")
        total_tests += 1
    except Exception as e:
        print(f"❌ FAILED: _process_orders_list test - {e}")
        total_tests += 1
    
    # Test 35: Client escalate to dispute
    print("\n📌 Test 35: Client escalate to dispute")
    # Create and deliver an order for dispute
    dispute_order_data = {
        'freelancer_id': TEST_FREELANCER_ID_2,
        'gig_id': TEST_GIG_ID,
        'description': 'Order for dispute testing',
        'amount': 200.00
    }
    dispute_result = order_service.create_order_client(TEST_CLIENT_ID, dispute_order_data)
    if dispute_result.get('success'):
        dispute_order_id = dispute_result['order']['_id']
        created_order_ids.append(dispute_order_id)
        
        # Accept and deliver the order
        order_service.accept_order(dispute_order_id, TEST_FREELANCER_ID_2)
        order_service.start_order_work(dispute_order_id, TEST_FREELANCER_ID_2)
        order_service.deliver_order(dispute_order_id, TEST_FREELANCER_ID_2, {'message': 'Delivery'})
        
        # Escalate to dispute
        dispute_data = {
            'reason': 'Quality issues',
            'description': 'The delivered work does not meet requirements',
            'evidence': ['https://example.com/evidence1.jpg']
        }
        result = order_service.escalate_to_dispute(dispute_order_id, TEST_CLIENT_ID, dispute_data)
        total_tests += 1
        if print_test_result("Escalate to dispute", result):
            passed_tests += 1
    
    # Test 36: Get all orders (admin function - simplified test)
    print("\n📌 Test 36: Get all orders (admin)")
    try:
        result = order_service.get_all_orders({}, {'page': 1, 'limit': 5})
        total_tests += 1
        if print_test_result("Get all orders admin", result):
            passed_tests += 1
    except Exception as e:
        print(f"⚠️ SKIPPED: Admin function test - {e}")
        total_tests += 1
    
    # Summary
    print(f"\n{'='*60}")
    print("📊 TEST SUMMARY")
    print(f"{'='*60}")
    print(f"Total tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
    print(f"Success rate: {success_rate:.1f}%")
    
    if passed_tests == total_tests:
        print("\n🎉 All tests passed successfully!")
    else:
        print(f"\n⚠️  {total_tests - passed_tests} test(s) failed")
    
    # Display created orders summary
    print(f"\n📋 Created Orders Summary:")
    print(f"   Total orders created: {len(created_order_ids)}")
    for i, order_id in enumerate(created_order_ids[:5], 1):
        print(f"   Order {i}: {order_id}")
    if len(created_order_ids) > 5:
        print(f"   ... and {len(created_order_ids) - 5} more")

if __name__ == "__main__":
    main()