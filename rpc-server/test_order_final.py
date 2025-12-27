# test_order_final.py

import xmlrpc.client
import time

class OrderServiceTest:
    def __init__(self, server_url="http://localhost:8000"):
        self.server = xmlrpc.client.ServerProxy(server_url)
        self.test_results = []
        
        # Use known working data from your database
        self.test_client_id = "6920c49a747da49650b2d6d1"  # client1@example.com
        self.test_freelancer_id = "6920c510747da49650b2d6d4"  # freelancer1@example.com
        self.test_gig_id = "692a3be1f3be085d2499e02e"  # Python RPC Development Service
    
    def log_test(self, test_name, success, result=None, error=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        
        if result:
            print(f"   Result: {result}")
        if error:
            print(f"   Error: {error}")
        
        self.test_results.append({
            'test_name': test_name,
            'success': success,
            'result': result,
            'error': error
        })
    
    def test_create_order(self):
        """Test creating a new order"""
        print("\n=== Testing Order Creation ===")
        
        try:
            # Create order data using the gig's freelancer
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': '692a3bd6f3be085d2499e02d',  # Freelancer from gig 692a3be1
                'gig_id': self.test_gig_id,
                'title': 'Test Order Creation',
                'description': 'Testing order creation functionality',
                'requirements': 'Test requirements',
                'amount': 150.0,
                'currency': 'USD'
            }
            
            # Call create_order method
            result = self.server.create_order(order_data)
            
            if result.get('success'):
                self.order_id = result['order']['_id']
                self.order_number = result['order']['order_number']
                self.log_test("Create Order", True, 
                            f"Order created: {self.order_number} (ID: {self.order_id})")
                return True
            else:
                self.log_test("Create Order", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Create Order", False, error=str(e))
            return False
    
    def test_get_user_orders(self):
        """Test getting user orders"""
        print("\n=== Testing Get User Orders ===")
        
        try:
            # Get client orders
            result = self.server.get_user_orders(self.test_client_id, 'client', {'limit': 5})
            
            if result.get('success'):
                orders_count = len(result.get('orders', []))
                self.log_test("Get Client Orders", True, f"Found {orders_count} orders")
                
                if orders_count > 0:
                    # Save first order for other tests
                    self.existing_order_id = result['orders'][0]['_id']
                    print(f"   Using existing order: {result['orders'][0]['order_number']}")
                
                return True
            else:
                self.log_test("Get Client Orders", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Client Orders", False, error=str(e))
            return False
    
    def test_get_order_by_id(self):
        """Test getting order by ID - FIXED VERSION"""
        print("\n=== Testing Get Order By ID ===")
        
        # Try to use an existing order first
        if hasattr(self, 'existing_order_id'):
            order_id_to_use = self.existing_order_id
        elif hasattr(self, 'order_id'):
            order_id_to_use = self.order_id
        else:
            self.log_test("Get Order By ID", False, error="No order ID available")
            return False
        
        try:
            # Get order by ID
            result = self.server.get_order_by_id(order_id_to_use, self.test_client_id)
            
            if result.get('success'):
                order = result['order']
                self.log_test("Get Order By ID", True, 
                            f"Order: {order.get('order_number', 'N/A')} - Status: {order.get('status', 'N/A')}")
                
                # Print some details
                print(f"   Title: {order.get('title')}")
                print(f"   Amount: ${order.get('amount')}")
                print(f"   Status: {order.get('status')}")
                
                return True
            else:
                self.log_test("Get Order By ID", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Order By ID", False, error=str(e))
            return False
    
    def test_freelancer_orders(self):
        """Test getting freelancer's orders"""
        print("\n=== Testing Freelancer Orders ===")
        
        # First create an order for the test freelancer
        try:
            # Create order for the main freelancer (not the gig owner)
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Test Freelancer Order',
                'description': 'Testing freelancer order functionality',
                'requirements': 'Test requirements for freelancer',
                'amount': 200.0,
                'currency': 'USD'
            }
            
            create_result = self.server.create_order(order_data)
            
            if not create_result.get('success'):
                self.log_test("Create Order for Freelancer", False, error=create_result.get('error'))
                return False
            
            self.freelancer_order_id = create_result['order']['_id']
            print(f"   Created order for freelancer: {create_result['order']['order_number']}")
            
            # Now get freelancer's orders
            result = self.server.get_freelancer_orders(self.test_freelancer_id, {'limit': 5})
            
            if result.get('success'):
                orders_count = len(result.get('orders', []))
                self.log_test("Get Freelancer Orders", True, f"Found {orders_count} orders")
                return True
            else:
                self.log_test("Get Freelancer Orders", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Freelancer Orders Test", False, error=str(e))
            return False
    
    def test_order_status_updates(self):
        """Test basic order status update - FIXED VERSION"""
        print("\n=== Testing Order Status Update ===")
        
        # Use an order created for the freelancer
        if not hasattr(self, 'freelancer_order_id'):
            # Create one if not exists
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Status Test Order',
                'description': 'Testing order status updates',
                'requirements': 'Test',
                'amount': 150.0,
                'currency': 'USD'
            }
            
            create_result = self.server.create_order(order_data)
            if not create_result.get('success'):
                self.log_test("Create Order for Status Test", False, error=create_result.get('error'))
                return False
            
            self.freelancer_order_id = create_result['order']['_id']
        
        try:
            # Test updating order status (simplified version)
            result = self.server.update_order_status(self.freelancer_order_id, 'confirmed', self.test_freelancer_id)
            
            if result.get('success'):
                self.log_test("Update Order Status", True, "Status updated to 'confirmed'")
                
                # Wait a moment and verify the update
                time.sleep(0.5)
                verify_result = self.server.get_order_by_id(self.freelancer_order_id, self.test_freelancer_id)
                if verify_result.get('success'):
                    current_status = verify_result['order']['status']
                    if current_status == 'confirmed':
                        self.log_test("Verify Status Update", True, "Status verified as 'confirmed'")
                    else:
                        self.log_test("Verify Status Update", False, 
                                    f"Expected 'confirmed', got '{current_status}'")
                else:
                    self.log_test("Verify Status Update", False, "Could not verify order")
                
                return True
            else:
                self.log_test("Update Order Status", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Order Status Update", False, error=str(e))
            return False
    
    def test_order_cancellation(self):
        """Test order cancellation"""
        print("\n=== Testing Order Cancellation ===")
        
        # Create a new order to cancel
        try:
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Order to Cancel',
                'description': 'This order will be cancelled',
                'requirements': 'Cancel test',
                'amount': 100.0,
                'currency': 'USD'
            }
            
            create_result = self.server.create_order(order_data)
            
            if not create_result.get('success'):
                self.log_test("Create Order for Cancellation", False, error=create_result.get('error'))
                return False
            
            cancel_order_id = create_result['order']['_id']
            print(f"   Created order to cancel: {create_result['order']['order_number']}")
            
            # Try to cancel using update_order_status
            result = self.server.update_order_status(cancel_order_id, 'cancelled', self.test_client_id)
            
            if result.get('success'):
                self.log_test("Cancel Order", True, "Order cancelled successfully")
                return True
            else:
                self.log_test("Cancel Order", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Order Cancellation", False, error=str(e))
            return False
    
    def test_get_all_orders_admin(self):
        """Test admin function to get all orders"""
        print("\n=== Testing Get All Orders (Admin) ===")
        
        try:
            result = self.server.get_all_orders_admin({'limit': 5})
            
            if result.get('success'):
                orders_count = len(result.get('orders', []))
                total_orders = result.get('pagination', {}).get('total', 0)
                self.log_test("Get All Orders Admin", True, 
                            f"Retrieved {orders_count} orders (Total in DB: {total_orders})")
                return True
            else:
                self.log_test("Get All Orders Admin", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get All Orders Admin", False, error=str(e))
            return False
    
    def test_order_timeline(self):
        """Test getting order timeline"""
        print("\n=== Testing Order Timeline ===")
        
        if not hasattr(self, 'order_id'):
            self.log_test("Order Timeline", False, error="No order ID available")
            return False
        
        try:
            result = self.server.get_order_timeline(self.order_id)
            
            if result.get('success'):
                timeline = result.get('timeline', [])
                self.log_test("Get Order Timeline", True, f"Found {len(timeline)} timeline events")
                
                for i, event in enumerate(timeline[:3]):  # Show first 3 events
                    print(f"   Event {i+1}: {event['title']}")
                if len(timeline) > 3:
                    print(f"   ... and {len(timeline) - 3} more events")
                
                return True
            else:
                self.log_test("Get Order Timeline", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Order Timeline", False, error=str(e))
            return False
    
    def run_all_tests(self):
        """Run all order service tests"""
        print("=" * 60)
        print("ORDER SERVICE TEST SUITE - FINAL VERSION")
        print("=" * 60)
        
        try:
            # Test basic order operations
            self.test_create_order()
            self.test_get_user_orders()
            self.test_get_order_by_id()
            
            # Test freelancer operations
            self.test_freelancer_orders()
            
            # Test order workflow
            self.test_order_status_updates()
            self.test_order_timeline()
            
            # Test other operations
            self.test_order_cancellation()
            self.test_get_all_orders_admin()
            
        except Exception as e:
            print(f"\n⚠️  Exception during testing: {e}")
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for r in self.test_results if r['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        
        if failed_tests > 0:
            print("\nFailed Tests:")
            for test in self.test_results:
                if not test['success']:
                    print(f"  - {test['test_name']}: {test.get('error', 'Unknown error')}")
        
        print("=" * 60)
        
        return failed_tests == 0

if __name__ == "__main__":
    # Wait a moment for server to be ready
    print("Starting tests in 2 seconds...")
    time.sleep(2)
    
    # Create test instance
    tester = OrderServiceTest()
    
    # Run all tests
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        exit(0)
    else:
        print("\n⚠️  Some tests failed!")
        exit(1)# test_order_final.py

import xmlrpc.client
import time

class OrderServiceTest:
    def __init__(self, server_url="http://localhost:8000"):
        self.server = xmlrpc.client.ServerProxy(server_url)
        self.test_results = []
        
        # Use known working data from your database
        self.test_client_id = "6920c49a747da49650b2d6d1"  # client1@example.com
        self.test_freelancer_id = "6920c510747da49650b2d6d4"  # freelancer1@example.com
        self.test_gig_id = "692a3be1f3be085d2499e02e"  # Python RPC Development Service
    
    def log_test(self, test_name, success, result=None, error=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        
        if result:
            print(f"   Result: {result}")
        if error:
            print(f"   Error: {error}")
        
        self.test_results.append({
            'test_name': test_name,
            'success': success,
            'result': result,
            'error': error
        })
    
    def test_create_order(self):
        """Test creating a new order"""
        print("\n=== Testing Order Creation ===")
        
        try:
            # Create order data using the gig's freelancer
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': '692a3bd6f3be085d2499e02d',  # Freelancer from gig 692a3be1
                'gig_id': self.test_gig_id,
                'title': 'Test Order Creation',
                'description': 'Testing order creation functionality',
                'requirements': 'Test requirements',
                'amount': 150.0,
                'currency': 'USD'
            }
            
            # Call create_order method
            result = self.server.create_order(order_data)
            
            if result.get('success'):
                self.order_id = result['order']['_id']
                self.order_number = result['order']['order_number']
                self.log_test("Create Order", True, 
                            f"Order created: {self.order_number} (ID: {self.order_id})")
                return True
            else:
                self.log_test("Create Order", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Create Order", False, error=str(e))
            return False
    
    def test_get_user_orders(self):
        """Test getting user orders"""
        print("\n=== Testing Get User Orders ===")
        
        try:
            # Get client orders
            result = self.server.get_user_orders(self.test_client_id, 'client', {'limit': 5})
            
            if result.get('success'):
                orders_count = len(result.get('orders', []))
                self.log_test("Get Client Orders", True, f"Found {orders_count} orders")
                
                if orders_count > 0:
                    # Save first order for other tests
                    self.existing_order_id = result['orders'][0]['_id']
                    print(f"   Using existing order: {result['orders'][0]['order_number']}")
                
                return True
            else:
                self.log_test("Get Client Orders", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Client Orders", False, error=str(e))
            return False
    
    def test_get_order_by_id(self):
        """Test getting order by ID - FIXED VERSION"""
        print("\n=== Testing Get Order By ID ===")
        
        # Try to use an existing order first
        if hasattr(self, 'existing_order_id'):
            order_id_to_use = self.existing_order_id
        elif hasattr(self, 'order_id'):
            order_id_to_use = self.order_id
        else:
            self.log_test("Get Order By ID", False, error="No order ID available")
            return False
        
        try:
            # Get order by ID
            result = self.server.get_order_by_id(order_id_to_use, self.test_client_id)
            
            if result.get('success'):
                order = result['order']
                self.log_test("Get Order By ID", True, 
                            f"Order: {order.get('order_number', 'N/A')} - Status: {order.get('status', 'N/A')}")
                
                # Print some details
                print(f"   Title: {order.get('title')}")
                print(f"   Amount: ${order.get('amount')}")
                print(f"   Status: {order.get('status')}")
                
                return True
            else:
                self.log_test("Get Order By ID", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Order By ID", False, error=str(e))
            return False
    
    def test_freelancer_orders(self):
        """Test getting freelancer's orders"""
        print("\n=== Testing Freelancer Orders ===")
        
        # First create an order for the test freelancer
        try:
            # Create order for the main freelancer (not the gig owner)
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Test Freelancer Order',
                'description': 'Testing freelancer order functionality',
                'requirements': 'Test requirements for freelancer',
                'amount': 200.0,
                'currency': 'USD'
            }
            
            create_result = self.server.create_order(order_data)
            
            if not create_result.get('success'):
                self.log_test("Create Order for Freelancer", False, error=create_result.get('error'))
                return False
            
            self.freelancer_order_id = create_result['order']['_id']
            print(f"   Created order for freelancer: {create_result['order']['order_number']}")
            
            # Now get freelancer's orders
            result = self.server.get_freelancer_orders(self.test_freelancer_id, {'limit': 5})
            
            if result.get('success'):
                orders_count = len(result.get('orders', []))
                self.log_test("Get Freelancer Orders", True, f"Found {orders_count} orders")
                return True
            else:
                self.log_test("Get Freelancer Orders", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Freelancer Orders Test", False, error=str(e))
            return False
    
    def test_order_status_updates(self):
        """Test basic order status update - FIXED VERSION"""
        print("\n=== Testing Order Status Update ===")
        
        # Use an order created for the freelancer
        if not hasattr(self, 'freelancer_order_id'):
            # Create one if not exists
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Status Test Order',
                'description': 'Testing order status updates',
                'requirements': 'Test',
                'amount': 150.0,
                'currency': 'USD'
            }
            
            create_result = self.server.create_order(order_data)
            if not create_result.get('success'):
                self.log_test("Create Order for Status Test", False, error=create_result.get('error'))
                return False
            
            self.freelancer_order_id = create_result['order']['_id']
        
        try:
            # Test updating order status (simplified version)
            result = self.server.update_order_status(self.freelancer_order_id, 'confirmed', self.test_freelancer_id)
            
            if result.get('success'):
                self.log_test("Update Order Status", True, "Status updated to 'confirmed'")
                
                # Wait a moment and verify the update
                time.sleep(0.5)
                verify_result = self.server.get_order_by_id(self.freelancer_order_id, self.test_freelancer_id)
                if verify_result.get('success'):
                    current_status = verify_result['order']['status']
                    if current_status == 'confirmed':
                        self.log_test("Verify Status Update", True, "Status verified as 'confirmed'")
                    else:
                        self.log_test("Verify Status Update", False, 
                                    f"Expected 'confirmed', got '{current_status}'")
                else:
                    self.log_test("Verify Status Update", False, "Could not verify order")
                
                return True
            else:
                self.log_test("Update Order Status", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Order Status Update", False, error=str(e))
            return False
    
    def test_order_cancellation(self):
        """Test order cancellation"""
        print("\n=== Testing Order Cancellation ===")
        
        # Create a new order to cancel
        try:
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Order to Cancel',
                'description': 'This order will be cancelled',
                'requirements': 'Cancel test',
                'amount': 100.0,
                'currency': 'USD'
            }
            
            create_result = self.server.create_order(order_data)
            
            if not create_result.get('success'):
                self.log_test("Create Order for Cancellation", False, error=create_result.get('error'))
                return False
            
            cancel_order_id = create_result['order']['_id']
            print(f"   Created order to cancel: {create_result['order']['order_number']}")
            
            # Try to cancel using update_order_status
            result = self.server.update_order_status(cancel_order_id, 'cancelled', self.test_client_id)
            
            if result.get('success'):
                self.log_test("Cancel Order", True, "Order cancelled successfully")
                return True
            else:
                self.log_test("Cancel Order", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Order Cancellation", False, error=str(e))
            return False
    
    def test_get_all_orders_admin(self):
        """Test admin function to get all orders"""
        print("\n=== Testing Get All Orders (Admin) ===")
        
        try:
            result = self.server.get_all_orders_admin({'limit': 5})
            
            if result.get('success'):
                orders_count = len(result.get('orders', []))
                total_orders = result.get('pagination', {}).get('total', 0)
                self.log_test("Get All Orders Admin", True, 
                            f"Retrieved {orders_count} orders (Total in DB: {total_orders})")
                return True
            else:
                self.log_test("Get All Orders Admin", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get All Orders Admin", False, error=str(e))
            return False
    
    def test_order_timeline(self):
        """Test getting order timeline"""
        print("\n=== Testing Order Timeline ===")
        
        if not hasattr(self, 'order_id'):
            self.log_test("Order Timeline", False, error="No order ID available")
            return False
        
        try:
            result = self.server.get_order_timeline(self.order_id)
            
            if result.get('success'):
                timeline = result.get('timeline', [])
                self.log_test("Get Order Timeline", True, f"Found {len(timeline)} timeline events")
                
                for i, event in enumerate(timeline[:3]):  # Show first 3 events
                    print(f"   Event {i+1}: {event['title']}")
                if len(timeline) > 3:
                    print(f"   ... and {len(timeline) - 3} more events")
                
                return True
            else:
                self.log_test("Get Order Timeline", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Order Timeline", False, error=str(e))
            return False
    
    def run_all_tests(self):
        """Run all order service tests"""
        print("=" * 60)
        print("ORDER SERVICE TEST SUITE - FINAL VERSION")
        print("=" * 60)
        
        try:
            # Test basic order operations
            self.test_create_order()
            self.test_get_user_orders()
            self.test_get_order_by_id()
            
            # Test freelancer operations
            self.test_freelancer_orders()
            
            # Test order workflow
            self.test_order_status_updates()
            self.test_order_timeline()
            
            # Test other operations
            self.test_order_cancellation()
            self.test_get_all_orders_admin()
            
        except Exception as e:
            print(f"\n⚠️  Exception during testing: {e}")
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for r in self.test_results if r['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        
        if failed_tests > 0:
            print("\nFailed Tests:")
            for test in self.test_results:
                if not test['success']:
                    print(f"  - {test['test_name']}: {test.get('error', 'Unknown error')}")
        
        print("=" * 60)
        
        return failed_tests == 0

if __name__ == "__main__":
    # Wait a moment for server to be ready
    print("Starting tests in 2 seconds...")
    time.sleep(2)
    
    # Create test instance
    tester = OrderServiceTest()
    
    # Run all tests
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        exit(0)
    else:
        print("\n⚠️  Some tests failed!")
        exit(1)