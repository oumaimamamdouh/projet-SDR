# import xmlrpc.client
# import json
# from datetime import datetime, timedelta
# import time

# class PaymentTester:
#     def __init__(self, server_url="http://localhost:8000/RPC2"):
#         self.server = xmlrpc.client.ServerProxy(server_url)
#         print(f"Connected to RPC server at {server_url}")
        
#         # Test data
#         self.test_data = {
#             'client_id': '6920c49a747da49650b2d6d1',  # John Doe
#             'freelancer_id': '6920c49a747da49650b2d6d2',  # Jane Smith
#             'admin_id': '6920c49a747da49650b2d6d3',  # Admin
#             'order_id': '6920ce7df90eacd39969d18b',  # Pending SEO order
#             'payment_id': '6920d8caf90eacd39969d1da',  # Completed payment
#             'withdrawal_id': None  # Will be set after creating withdrawal
#         }
    
#     def print_result(self, method_name, result):
#         """Print test results in a formatted way"""
#         print(f"\n{'='*60}")
#         print(f"Testing: {method_name}")
#         print(f"{'='*60}")
        
#         if result.get('success'):
#             print("✅ SUCCESS")
#             # Pretty print the response
#             if 'payment' in result:
#                 print(f"Payment Details:")
#                 for key, value in result['payment'].items():
#                     if key not in ['_id', 'order_id', 'client_id']:
#                         print(f"  {key}: {value}")
#             elif 'payments' in result:
#                 print(f"Found {len(result['payments'])} payments")
#                 if result['payments']:
#                     print(f"First payment: {result['payments'][0].get('transaction_id', 'N/A')}")
#             elif 'earnings' in result:
#                 print(f"Total Earnings: ${result.get('total_earnings', 0):.2f}")
#                 print(f"Stats: {result.get('stats', {})}")
#             elif 'withdrawals' in result:
#                 print(f"Withdrawals: {len(result['withdrawals'])}")
#                 if result['withdrawals']:
#                     print(f"First withdrawal: {result['withdrawals'][0]}")
#             elif 'analytics' in result:
#                 analytics = result['analytics']
#                 print(f"Period: {analytics.get('period')}")
#                 summary = analytics.get('summary', {})
#                 print(f"Summary: {summary}")
#             elif 'pagination' in result:
#                 pagination = result['pagination']
#                 print(f"Page {pagination.get('page')} of {pagination.get('pages')}")
#                 print(f"Total: {pagination.get('total')} items")
#             else:
#                 print(f"Response: {result}")
#         else:
#             print("❌ FAILED")
#             print(f"Error: {result.get('error', 'Unknown error')}")
        
#         return result.get('success', False)
    
#     def test_create_payment_intent(self):
#         """Test creating a payment intent"""
#         result = self.server.create_payment_intent(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             'credit_card'
#         )
#         return self.print_result("create_payment_intent", result)
    
#     def test_process_payment(self):
#         """Test processing a payment"""
#         payment_data = {
#             'payment_method': 'credit_card',
#             'card_last4': '4242',
#             'card_brand': 'visa',
#             'ip_address': '192.168.1.100',
#             'user_agent': 'Mozilla/5.0 Test Client'
#         }
        
#         result = self.server.process_payment(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             payment_data
#         )
#         return self.print_result("process_payment", result)
    
#     def test_get_payment_history_client(self):
#         """Test getting payment history for client"""
#         filters = {
#             'status': 'completed',
#             'page': 1,
#             'limit': 5,
#             'sort_by': 'created_at',
#             'sort_order': 'desc'
#         }
        
#         result = self.server.get_payment_history(
#             self.test_data['client_id'],
#             filters
#         )
#         return self.print_result("get_payment_history (client)", result)
    
#     def test_get_payment_history_freelancer(self):
#         """Test getting payment history for freelancer"""
#         filters = {
#             'status': 'completed',
#             'page': 1,
#             'limit': 5
#         }
        
#         result = self.server.get_payment_history(
#             self.test_data['freelancer_id'],
#             filters
#         )
#         return self.print_result("get_payment_history (freelancer)", result)
    
#     def test_get_payment_details(self):
#         """Test getting payment details"""
#         result = self.server.get_payment_details(
#             self.test_data['payment_id'],
#             self.test_data['client_id']
#         )
#         return self.print_result("get_payment_details", result)
    
#     def test_request_refund(self):
#         """Test requesting a refund"""
#         # First need a completed order
#         result = self.server.request_refund(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             'Product not as described'
#         )
#         return self.print_result("request_refund", result)
    
#     def test_get_earnings(self):
#         """Test getting freelancer earnings"""
#         filters = {
#             'period': 'month',
#             'status': 'completed'
#         }
        
#         result = self.server.get_earnings(
#             self.test_data['freelancer_id'],
#             filters
#         )
#         return self.print_result("get_earnings", result)
    
#     def test_request_withdrawal(self):
#         """Test requesting a withdrawal"""
#         withdrawal_data = {
#             'amount': 100.0,
#             'payment_method': 'bank_transfer',
#             'account_holder': 'Jane Smith',
#             'account_number': '123456789',
#             'bank_name': 'Test Bank',
#             'routing_number': '021000021'
#         }
        
#         result = self.server.request_withdrawal(
#             self.test_data['freelancer_id'],
#             withdrawal_data
#         )
        
#         if result.get('success'):
#             self.test_data['withdrawal_id'] = result.get('withdrawal_id')
        
#         return self.print_result("request_withdrawal", result)
    
#     def test_get_withdrawal_history(self):
#         """Test getting withdrawal history"""
#         result = self.server.get_withdrawal_history(
#             self.test_data['freelancer_id']
#         )
#         return self.print_result("get_withdrawal_history", result)
    
#     def test_get_revenue_analytics(self):
#         """Test getting revenue analytics"""
#         result = self.server.get_revenue_analytics(
#             self.test_data['freelancer_id'],
#             'month'
#         )
#         return self.print_result("get_revenue_analytics", result)
    
#     def test_get_all_payments_admin(self):
#         """Test getting all payments (admin)"""
#         filters = {
#             'status': 'completed',
#             'start_date': (datetime.utcnow() - timedelta(days=30)).isoformat(),
#             'end_date': datetime.utcnow().isoformat(),
#             'min_amount': 100,
#             'sort_by': 'amount',
#             'sort_order': 'desc'
#         }
        
#         pagination = {
#             'page': 1,
#             'limit': 10
#         }
        
#         result = self.server.get_all_payments(filters, pagination)
#         return self.print_result("get_all_payments (admin)", result)
    
#     def test_process_withdrawal(self):
#         """Test processing a withdrawal (admin)"""
#         if not self.test_data['withdrawal_id']:
#             print("Skipping process_withdrawal - no withdrawal created")
#             return False
        
#         result = self.server.process_withdrawal(
#             self.test_data['withdrawal_id'],
#             'completed'
#         )
#         return self.print_result("process_withdrawal", result)
    
#     def test_update_payment_status(self):
#         """Test updating payment status (admin)"""
#         # Use the pending payment
#         pending_payment_id = '6920d8caf90eacd39969d1dc'
        
#         result = self.server.update_payment_status(
#             pending_payment_id,
#             'processing'
#         )
#         return self.print_result("update_payment_status", result)
    
#     def test_get_platform_earnings(self):
#         """Test getting platform earnings (admin)"""
#         result = self.server.get_platform_earnings('month')
#         return self.print_result("get_platform_earnings", result)
    
#     def test_existing_payment_functions(self):
#         """Test existing payment functions for backward compatibility"""
#         print(f"\n{'='*60}")
#         print("Testing Existing Payment Functions")
#         print(f"{'='*60}")
        
#         # Test create_payment (existing function)
#         payment_data = {
#             'order_id': self.test_data['order_id'],
#             'client_id': self.test_data['client_id'],
#             'amount': 500.0,
#             'currency': 'USD',
#             'payment_method': 'credit_card'
#         }
        
#         result = self.server.create_payment(payment_data)
#         if result.get('success'):
#             print("✅ create_payment works")
#             new_payment_id = result['payment']['_id']
#         else:
#             print(f"❌ create_payment failed: {result.get('error')}")
#             return False
        
#         # Test update_payment_status (existing function)
#         time.sleep(1)  # Small delay
#         result = self.server.update_payment_status(new_payment_id, 'completed', 'TXN_TEST_001')
#         if result.get('success'):
#             print("✅ update_payment_status works")
#         else:
#             print(f"❌ update_payment_status failed: {result.get('error')}")
        
#         # Test get_user_payments (existing function)
#         result = self.server.get_user_payments(self.test_data['client_id'], 'client')
#         if result.get('success'):
#             print(f"✅ get_user_payments works - found {len(result['payments'])} payments")
#         else:
#             print(f"❌ get_user_payments failed: {result.get('error')}")
        
#         return True
    
#     def run_all_tests(self):
#         """Run all payment function tests"""
#         print(f"\n{'#'*80}")
#         print("STARTING PAYMENT SERVICE TESTS")
#         print(f"{'#'*80}\n")
        
#         test_results = {}
        
#         # Test client functions
#         print(f"\n{'='*80}")
#         print("TESTING CLIENT FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['create_payment_intent'] = self.test_create_payment_intent()
#         test_results['process_payment'] = self.test_process_payment()
#         test_results['get_payment_history_client'] = self.test_get_payment_history_client()
#         test_results['get_payment_details'] = self.test_get_payment_details()
#         test_results['request_refund'] = self.test_request_refund()
        
#         # Test freelancer functions
#         print(f"\n{'='*80}")
#         print("TESTING FREELANCER FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['get_earnings'] = self.test_get_earnings()
#         test_results['request_withdrawal'] = self.test_request_withdrawal()
#         test_results['get_withdrawal_history'] = self.test_get_withdrawal_history()
#         test_results['get_revenue_analytics'] = self.test_get_revenue_analytics()
        
#         # Test admin functions
#         print(f"\n{'='*80}")
#         print("TESTING ADMIN FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['get_all_payments_admin'] = self.test_get_all_payments_admin()
#         test_results['process_withdrawal'] = self.test_process_withdrawal()
#         test_results['update_payment_status'] = self.test_update_payment_status()
#         test_results['get_platform_earnings'] = self.test_get_platform_earnings()
        
#         # Test existing functions
#         print(f"\n{'='*80}")
#         print("TESTING EXISTING FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['existing_functions'] = self.test_existing_payment_functions()
        
#         # Summary
#         print(f"\n{'#'*80}")
#         print("TEST SUMMARY")
#         print(f"{'#'*80}")
        
#         passed = sum(test_results.values())
#         total = len(test_results)
        
#         print(f"\nPassed: {passed}/{total} tests")
#         print(f"Success rate: {(passed/total)*100:.1f}%\n")
        
#         for test_name, result in test_results.items():
#             status = "✅ PASS" if result else "❌ FAIL"
#             print(f"{status} - {test_name}")
        
#         return test_results
    
#     def run_quick_test(self):
#         """Run a quick subset of tests"""
#         print(f"\n{'#'*80}")
#         print("QUICK TEST - ESSENTIAL FUNCTIONS")
#         print(f"{'#'*80}\n")
        
#         essential_tests = [
#             ('create_payment_intent', self.test_create_payment_intent),
#             ('process_payment', self.test_process_payment),
#             ('get_payment_history', self.test_get_payment_history_client),
#             ('get_earnings', self.test_get_earnings),
#             ('get_platform_earnings', self.test_get_platform_earnings)
#         ]
        
#         results = {}
#         for test_name, test_func in essential_tests:
#             results[test_name] = test_func()
#             time.sleep(0.5)  # Small delay between tests
        
#         passed = sum(results.values())
#         total = len(results)
        
#         print(f"\nQuick Test Results: {passed}/{total} passed")
#         return results
    
#     def interactive_test(self):
#         """Interactive test mode"""
#         print(f"\n{'#'*80}")
#         print("INTERACTIVE PAYMENT TESTER")
#         print(f"{'#'*80}\n")
        
#         tests = {
#             '1': ('Create Payment Intent', self.test_create_payment_intent),
#             '2': ('Process Payment', self.test_process_payment),
#             '3': ('Get Payment History (Client)', self.test_get_payment_history_client),
#             '4': ('Get Payment Details', self.test_get_payment_details),
#             '5': ('Request Refund', self.test_request_refund),
#             '6': ('Get Earnings', self.test_get_earnings),
#             '7': ('Request Withdrawal', self.test_request_withdrawal),
#             '8': ('Get Withdrawal History', self.test_get_withdrawal_history),
#             '9': ('Get Revenue Analytics', self.test_get_revenue_analytics),
#             '10': ('Get All Payments (Admin)', self.test_get_all_payments_admin),
#             '11': ('Process Withdrawal', self.test_process_withdrawal),
#             '12': ('Update Payment Status', self.test_update_payment_status),
#             '13': ('Get Platform Earnings', self.test_get_platform_earnings),
#             '14': ('Test Existing Functions', self.test_existing_payment_functions),
#             'A': ('Run All Tests', self.run_all_tests),
#             'Q': ('Quick Test', self.run_quick_test)
#         }
        
#         while True:
#             print(f"\n{'='*60}")
#             print("Available Tests:")
#             for key, (name, _) in tests.items():
#                 print(f"  {key}. {name}")
#             print(f"\n  X. Exit")
#             print(f"{'='*60}")
            
#             choice = input("\nSelect test (number or A/Q/X): ").strip().upper()
            
#             if choice == 'X':
#                 print("Exiting interactive tester.")
#                 break
#             elif choice in tests:
#                 test_name, test_func = tests[choice]
#                 print(f"\nRunning: {test_name}")
#                 test_func()
#             else:
#                 print("Invalid choice. Please try again.")
            
#             input("\nPress Enter to continue...")

# if __name__ == "__main__":
#     import sys
    
#     # Check for command line arguments
#     if len(sys.argv) > 1:
#         server_url = sys.argv[1]
#         tester = PaymentTester(server_url)
#     else:
#         tester = PaymentTester()
    
#     # Check for test mode
#     if len(sys.argv) > 2:
#         mode = sys.argv[2].lower()
#         if mode == 'all':
#             tester.run_all_tests()
#         elif mode == 'quick':
#             tester.run_quick_test()
#         elif mode == 'interactive':
#             tester.interactive_test()
#         else:
#             print(f"Usage: python test_payment.py [server_url] [all|quick|interactive]")
#             print(f"Example: python test_payment.py http://localhost:8000/RPC2 all")
#             print(f"Default: interactive mode")
#             tester.interactive_test()
#     else:
#         tester.interactive_test()



















# import xmlrpc.client
# import json
# from datetime import datetime, timedelta
# import time

# class PaymentTester:
#     def __init__(self, server_url="http://localhost:8000/RPC2"):
#         self.server = xmlrpc.client.ServerProxy(server_url)
#         print(f"Connected to RPC server at {server_url}")
        
#         # Test data - MIS À JOUR avec vos données actuelles
#         self.test_data = {
#             'client_id': '6920c49a747da49650b2d6d1',  # Alice Johnson
#             'freelancer_id': '692a3bd6f3be085d2499e02d',  # Freelancer actif
#             'admin_id': '6920c518747da49650b2d6d5',  # Admin
#             'order_id': '6930d6239ca9d71a5da3111d',  # Commande pending actuelle
#             'payment_id': '6920d8caf90eacd39969d1da',  # Completed payment existant
#             'withdrawal_id': None  # Will be set after creating withdrawal
#         }
    
#     def print_result(self, method_name, result):
#         """Print test results in a formatted way"""
#         print(f"\n{'='*60}")
#         print(f"Testing: {method_name}")
#         print(f"{'='*60}")
        
#         if result.get('success'):
#             print("✅ SUCCESS")
#             if 'payment' in result:
#                 print(f"Payment Details:")
#                 for key, value in result['payment'].items():
#                     if key not in ['_id', 'order_id', 'client_id', 'order', 'client', 'freelancer']:
#                         print(f"  {key}: {value}")
#             elif 'payments' in result:
#                 print(f"Found {len(result['payments'])} payments")
#                 if result['payments']:
#                     print(f"Sample payment: {result['payments'][0].get('transaction_id', 'N/A')}")
#             elif 'earnings' in result:
#                 print(f"Total Earnings: ${result.get('total_earnings', 0):.2f}")
#                 print(f"Stats: {result.get('stats', {})}")
#             elif 'withdrawals' in result:
#                 print(f"Withdrawals: {len(result['withdrawals'])}")
#             elif 'analytics' in result:
#                 analytics = result['analytics']
#                 print(f"Period: {analytics.get('period')}")
#                 summary = analytics.get('summary', {})
#                 print(f"Summary: {summary}")
#             elif 'pagination' in result:
#                 pagination = result['pagination']
#                 print(f"Page {pagination.get('page')} of {pagination.get('pages')}")
#                 print(f"Total: {pagination.get('total')} items")
#             elif 'message' in result:
#                 print(f"Message: {result['message']}")
#             else:
#                 print(f"Response: {json.dumps(result, indent=2, default=str)}")
#         else:
#             print("❌ FAILED")
#             print(f"Error: {result.get('error', 'Unknown error')}")
        
#         return result.get('success', False)
    
#     def test_create_payment_intent(self):
#         """Test creating a payment intent"""
#         result = self.server.create_payment_intent(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             'credit_card'
#         )
#         return self.print_result("create_payment_intent", result)
    
#     def test_process_payment(self):
#         """Test processing a payment"""
#         payment_data = {
#             'payment_method': 'credit_card',
#             'card_last4': '4242',
#             'card_brand': 'visa',
#             'ip_address': '192.168.1.100',
#             'user_agent': 'Mozilla/5.0 Test Client'
#         }
        
#         # D'abord créer un intent
#         intent_result = self.server.create_payment_intent(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             'credit_card'
#         )
        
#         if not intent_result.get('success'):
#             print("Failed to create payment intent")
#             return False
        
#         # Puis traiter le paiement
#         result = self.server.process_payment(
#             self.test_data['order_id'],
#             self.test_data['client_id'],
#             payment_data
#         )
#         return self.print_result("process_payment", result)
    
#     def test_get_payment_history_client(self):
#         """Test getting payment history for client"""
#         filters = {
#             'page': 1,
#             'limit': 5
#         }
        
#         result = self.server.get_payment_history(
#             self.test_data['client_id'],
#             filters
#         )
#         return self.print_result("get_payment_history (client)", result)
    
#     def test_get_payment_history_freelancer(self):
#         """Test getting payment history for freelancer"""
#         filters = {
#             'page': 1,
#             'limit': 5
#         }
        
#         result = self.server.get_payment_history(
#             self.test_data['freelancer_id'],
#             filters
#         )
#         return self.print_result("get_payment_history (freelancer)", result)
    
#     def test_get_payment_details(self):
#         """Test getting payment details"""
#         result = self.server.get_payment_details(
#             self.test_data['payment_id'],
#             self.test_data['client_id']
#         )
#         return self.print_result("get_payment_details", result)
    
#     def test_request_refund(self):
#         """Test requesting a refund"""
#         # Utiliser une commande avec paiement complet
#         order_id = '6920cdeef90eacd39969d188'  # Commande avec paiement complet
#         result = self.server.request_refund(
#             order_id,
#             self.test_data['client_id'],
#             'Product not as described'
#         )
#         return self.print_result("request_refund", result)
    
#     def test_get_earnings(self):
#         """Test getting freelancer earnings"""
#         filters = {
#             'period': 'month'
#         }
        
#         result = self.server.get_earnings(
#             self.test_data['freelancer_id'],
#             filters
#         )
#         return self.print_result("get_earnings", result)
    
#     def test_request_withdrawal(self):
#         """Test requesting a withdrawal"""
#         # Vérifier d'abord si le freelancer a des gains
#         earnings_result = self.server.get_earnings(self.test_data['freelancer_id'])
#         if not earnings_result.get('success') or earnings_result.get('total_earnings', 0) < 20:
#             print("Freelancer doesn't have enough earnings for withdrawal")
#             return False
        
#         withdrawal_data = {
#             'amount': 50.0,
#             'payment_method': 'paypal',
#             'paypal_email': 'freelancer@example.com'
#         }
        
#         result = self.server.request_withdrawal(
#             self.test_data['freelancer_id'],
#             withdrawal_data
#         )
        
#         if result.get('success'):
#             self.test_data['withdrawal_id'] = result.get('withdrawal_id')
        
#         return self.print_result("request_withdrawal", result)
    
#     def test_get_withdrawal_history(self):
#         """Test getting withdrawal history"""
#         result = self.server.get_withdrawal_history(
#             self.test_data['freelancer_id']
#         )
#         return self.print_result("get_withdrawal_history", result)
    
#     def test_get_revenue_analytics(self):
#         """Test getting revenue analytics"""
#         result = self.server.get_revenue_analytics(
#             self.test_data['freelancer_id'],
#             'month'
#         )
#         return self.print_result("get_revenue_analytics", result)
    
#     def test_get_all_payments_admin(self):
#         """Test getting all payments (admin)"""
#         filters = {
#             'page': 1,
#             'limit': 10
#         }
        
#         pagination = {
#             'page': 1,
#             'limit': 10
#         }
        
#         result = self.server.get_all_payments(filters, pagination)
#         return self.print_result("get_all_payments (admin)", result)
    
#     def test_process_withdrawal(self):
#         """Test processing a withdrawal (admin)"""
#         if not self.test_data['withdrawal_id']:
#             print("Skipping process_withdrawal - no withdrawal created")
#             return False
        
#         result = self.server.process_withdrawal(
#             self.test_data['withdrawal_id'],
#             'completed'
#         )
#         return self.print_result("process_withdrawal", result)
    
#     def test_update_payment_status(self):
#         """Test updating payment status (admin)"""
#         # Utiliser un paiement en pending
#         pending_payment_id = '6920d8caf90eacd39969d1dc'
        
#         result = self.server.update_payment_status(
#             pending_payment_id,
#             'processing'
#         )
#         return self.print_result("update_payment_status", result)
    
#     def test_get_platform_earnings(self):
#         """Test getting platform earnings (admin)"""
#         result = self.server.get_platform_earnings('month')
#         return self.print_result("get_platform_earnings", result)
    
#     def test_existing_payment_functions(self):
#         """Test existing payment functions for backward compatibility"""
#         print(f"\n{'='*60}")
#         print("Testing Existing Payment Functions")
#         print(f"{'='*60}")
        
#         # Note: create_payment n'est pas enregistré dans le serveur
#         # On va tester d'autres fonctions à la place
#         print("⚠️  Note: create_payment n'est pas enregistré comme méthode RPC")
        
#         # Tester une fonction qui existe
#         result = self.server.get_payment_details(
#             self.test_data['payment_id'],
#             self.test_data['client_id']
#         )
        
#         if result.get('success'):
#             print("✅ get_payment_details works through RPC")
#             return True
#         else:
#             print(f"❌ get_payment_details failed: {result.get('error')}")
#             return False
    
#     def run_all_tests(self):
#         """Run all payment function tests"""
#         print(f"\n{'#'*80}")
#         print("STARTING PAYMENT SERVICE TESTS")
#         print(f"{'#'*80}\n")
        
#         test_results = {}
        
#         # Test client functions
#         print(f"\n{'='*80}")
#         print("TESTING CLIENT FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['create_payment_intent'] = self.test_create_payment_intent()
#         test_results['process_payment'] = self.test_process_payment()
#         test_results['get_payment_history_client'] = self.test_get_payment_history_client()
#         test_results['get_payment_details'] = self.test_get_payment_details()
#         test_results['request_refund'] = self.test_request_refund()
        
#         # Test freelancer functions
#         print(f"\n{'='*80}")
#         print("TESTING FREELANCER FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['get_earnings'] = self.test_get_earnings()
#         test_results['request_withdrawal'] = self.test_request_withdrawal()
#         test_results['get_withdrawal_history'] = self.test_get_withdrawal_history()
#         test_results['get_revenue_analytics'] = self.test_get_revenue_analytics()
        
#         # Test admin functions
#         print(f"\n{'='*80}")
#         print("TESTING ADMIN FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['get_all_payments_admin'] = self.test_get_all_payments_admin()
#         test_results['process_withdrawal'] = self.test_process_withdrawal()
#         test_results['update_payment_status'] = self.test_update_payment_status()
#         test_results['get_platform_earnings'] = self.test_get_platform_earnings()
        
#         # Test existing functions
#         print(f"\n{'='*80}")
#         print("TESTING EXISTING FUNCTIONS")
#         print(f"{'='*80}")
#         test_results['existing_functions'] = self.test_existing_payment_functions()
        
#         # Summary
#         print(f"\n{'#'*80}")
#         print("TEST SUMMARY")
#         print(f"{'#'*80}")
        
#         passed = sum(test_results.values())
#         total = len(test_results)
        
#         print(f"\nPassed: {passed}/{total} tests")
#         print(f"Success rate: {(passed/total)*100:.1f}%\n")
        
#         for test_name, result in test_results.items():
#             status = "✅ PASS" if result else "❌ FAIL"
#             print(f"{status} - {test_name}")
        
#         return test_results
    
#     def run_quick_test(self):
#         """Run a quick subset of tests"""
#         print(f"\n{'#'*80}")
#         print("QUICK TEST - ESSENTIAL FUNCTIONS")
#         print(f"{'#'*80}\n")
        
#         essential_tests = [
#             ('get_payment_history', self.test_get_payment_history_client),
#             ('get_payment_details', self.test_get_payment_details),
#             ('get_earnings', self.test_get_earnings),
#             ('get_platform_earnings', self.test_get_platform_earnings)
#         ]
        
#         results = {}
#         for test_name, test_func in essential_tests:
#             results[test_name] = test_func()
#             time.sleep(0.5)  # Small delay between tests
        
#         passed = sum(results.values())
#         total = len(results)
        
#         print(f"\nQuick Test Results: {passed}/{total} passed")
#         return results
    
#     def interactive_test(self):
#         """Interactive test mode"""
#         print(f"\n{'#'*80}")
#         print("INTERACTIVE PAYMENT TESTER")
#         print(f"{'#'*80}\n")
        
#         tests = {
#             '1': ('Create Payment Intent', self.test_create_payment_intent),
#             '2': ('Process Payment', self.test_process_payment),
#             '3': ('Get Payment History (Client)', self.test_get_payment_history_client),
#             '4': ('Get Payment Details', self.test_get_payment_details),
#             '5': ('Request Refund', self.test_request_refund),
#             '6': ('Get Earnings', self.test_get_earnings),
#             '7': ('Request Withdrawal', self.test_request_withdrawal),
#             '8': ('Get Withdrawal History', self.test_get_withdrawal_history),
#             '9': ('Get Revenue Analytics', self.test_get_revenue_analytics),
#             '10': ('Get All Payments (Admin)', self.test_get_all_payments_admin),
#             '11': ('Process Withdrawal', self.test_process_withdrawal),
#             '12': ('Update Payment Status', self.test_update_payment_status),
#             '13': ('Get Platform Earnings', self.test_get_platform_earnings),
#             '14': ('Test Existing Functions', self.test_existing_payment_functions),
#             'A': ('Run All Tests', self.run_all_tests),
#             'Q': ('Quick Test', self.run_quick_test)
#         }
        
#         while True:
#             print(f"\n{'='*60}")
#             print("Available Tests:")
#             for key, (name, _) in tests.items():
#                 print(f"  {key}. {name}")
#             print(f"\n  X. Exit")
#             print(f"{'='*60}")
            
#             choice = input("\nSelect test (number or A/Q/X): ").strip().upper()
            
#             if choice == 'X':
#                 print("Exiting interactive tester.")
#                 break
#             elif choice in tests:
#                 test_name, test_func = tests[choice]
#                 print(f"\nRunning: {test_name}")
#                 test_func()
#             else:
#                 print("Invalid choice. Please try again.")
            
#             input("\nPress Enter to continue...")

# if __name__ == "__main__":
#     import sys
    
#     # Check for command line arguments
#     if len(sys.argv) > 1:
#         server_url = sys.argv[1]
#         tester = PaymentTester(server_url)
#     else:
#         tester = PaymentTester()
    
#     # Check for test mode
#     if len(sys.argv) > 2:
#         mode = sys.argv[2].lower()
#         if mode == 'all':
#             tester.run_all_tests()
#         elif mode == 'quick':
#             tester.run_quick_test()
#         elif mode == 'interactive':
#             tester.interactive_test()
#         else:
#             print(f"Usage: python test_payment.py [server_url] [all|quick|interactive]")
#             print(f"Example: python test_payment.py http://localhost:8000/RPC2 all")
#             print(f"Default: interactive mode")
#             tester.interactive_test()
#     else:
#         tester.interactive_test()




import xmlrpc.client
import datetime
import json
from typing import Dict, Any

# RPC Server configuration
SERVER_URL = "http://localhost:8000/RPC2"

def create_proxy():
    """Create XML-RPC proxy"""
    return xmlrpc.client.ServerProxy(SERVER_URL, allow_none=True)

def print_result(test_name: str, result: Dict[str, Any]):
    """Print test result in a formatted way"""
    print(f"\n{'='*60}")
    print(f"TEST: {test_name}")
    print(f"{'='*60}")
    
    if result.get('success'):
        print("✅ SUCCESS")
        
        # Print relevant data based on test
        if 'payment_intent_id' in result:
            print(f"Payment Intent ID: {result['payment_intent_id']}")
            print(f"Amount: ${result['amount']}")
            print(f"Client Secret: {result['client_secret']}")
        elif 'transaction_id' in result:
            print(f"Transaction ID: {result['transaction_id']}")
            print(f"Message: {result['message']}")
        elif 'refund_id' in result:
            print(f"Refund ID: {result['refund_id']}")
            print(f"Message: {result['message']}")
        elif 'withdrawal_id' in result:
            print(f"Withdrawal ID: {result['withdrawal_id']}")
            print(f"Message: {result['message']}")
        elif 'payments' in result:
            print(f"Total Payments: {result['pagination']['total']}")
            print(f"Page: {result['pagination']['page']}/{result['pagination']['pages']}")
        elif 'payment' in result:
            payment = result['payment']
            print(f"Payment ID: {payment['_id']}")
            print(f"Status: {payment['status']}")
            print(f"Amount: ${payment['amount']}")
            print(f"Platform Fee: ${payment.get('platform_fee', 0)}")
            print(f"Freelancer Earnings: ${payment.get('freelancer_earnings', 0)}")
        elif 'earnings' in result:
            print(f"Total Earnings: ${result['total_earnings']}")
            print(f"Total Payments: {len(result['earnings'])}")
            if 'stats' in result:
                stats = result['stats']
                print(f"Completed Payments: {stats['completed_payments']}")
                print(f"Pending Payments: {stats['pending_payments']}")
                print(f"Average Order Value: ${stats['average_order_value']}")
        elif 'withdrawals' in result:
            print(f"Total Withdrawals: {len(result['withdrawals'])}")
            if 'stats' in result:
                stats = result['stats']
                print(f"Total Withdrawn: ${stats['total_withdrawn']}")
                print(f"Pending Withdrawals: ${stats['pending_withdrawals']}")
        elif 'analytics' in result:
            analytics = result['analytics']
            summary = analytics['summary']
            print(f"Total Revenue: ${summary['total_revenue']}")
            print(f"Platform Fees: ${summary['platform_fees']}")
            print(f"Net Earnings: ${summary['net_earnings']}")
            print(f"Total Orders: {summary['total_orders']}")
            print(f"Period: {analytics['period']}")
        
        # Print additional info if available
        if 'message' in result and 'transaction_id' not in result and 'refund_id' not in result:
            print(f"Message: {result['message']}")
    else:
        print("❌ FAILED")
        print(f"Error: {result.get('error', 'Unknown error')}")
    
    print(f"{'='*60}")

def test_create_payment_intent():
    """Test creating a payment intent"""
    proxy = create_proxy()
    
    # Using order_id from your database (ORD-2025-0003 which is pending)
    order_id = "6930d6239ca9d71a5da3111d"  # ORD-2025-0003
    client_id = "6920c49a747da49650b2d6d1"  # client1@example.com
    payment_method = "credit_card"
    
    result = proxy.create_payment_intent(order_id, client_id, payment_method)
    print_result("Create Payment Intent", result)
    
    return result.get('payment_intent_id') if result.get('success') else None

def test_process_payment():
    """Test processing a payment"""
    proxy = create_proxy()
    
    # First create a payment intent
    order_id = "6930d6259ca9d71a5da3111e"  # ORD-2025-0004 (revision_requested)
    client_id = "6920c49a747da49650b2d6d1"
    
    # Create payment intent first
    intent_result = proxy.create_payment_intent(order_id, client_id, "credit_card")
    if not intent_result.get('success'):
        print_result("Create Payment Intent (for processing)", intent_result)
        return None
    
    # Now process the payment
    payment_data = {
        'payment_method': 'credit_card',
        'card_last4': '4242',
        'card_brand': 'visa',
        'ip_address': '127.0.0.1',
        'user_agent': 'test-client/1.0'
    }
    
    result = proxy.process_payment(order_id, client_id, payment_data)
    print_result("Process Payment", result)
    
    return result.get('transaction_id') if result.get('success') else None

def test_get_payment_history():
    """Test getting payment history for a user"""
    proxy = create_proxy()
    
    # Test for client
    client_id = "6920c49a747da49650b2d6d1"
    
    # Get without filters
    result = proxy.get_payment_history(client_id)
    print_result("Get Payment History (Client - No Filters)", result)
    
    # Get with filters
    filters = {
        'status': 'completed',
        'page': 1,
        'limit': 5,
        'sort_by': 'amount',
        'sort_order': 'desc'
    }
    
    filtered_result = proxy.get_payment_history(client_id, filters)
    print_result("Get Payment History (Client - With Filters)", filtered_result)
    
    # Test for freelancer
    freelancer_id = "692a3bd6f3be085d2499e02d"  # test_1ace5cfd@example.com
    
    freelancer_result = proxy.get_payment_history(freelancer_id)
    print_result("Get Payment History (Freelancer)", freelancer_result)
    
    return result

def test_get_payment_details():
    """Test getting details of a specific payment"""
    proxy = create_proxy()
    
    # First need to have a payment - let's create and process one
    order_id = "6930d62c9ca9d71a5da31122"  # ORD-2025-0008 (confirmed)
    client_id = "6920c49a747da49650b2d6d1"
    
    # Create and process payment
    intent_result = proxy.create_payment_intent(order_id, client_id, "credit_card")
    if intent_result.get('success'):
        payment_data = {
            'payment_method': 'credit_card',
            'card_last4': '1234',
            'card_brand': 'mastercard'
        }
        process_result = proxy.process_payment(order_id, client_id, payment_data)
        
        if process_result.get('success'):
            # Now get payment details
            # We need to find the payment ID - in a real scenario we would store this
            # For now, let's get payment history and use the first payment
            history = proxy.get_payment_history(client_id, {'limit': 1})
            if history.get('success') and history['payments']:
                payment_id = history['payments'][0]['_id']
                
                # Get payment details as client
                result = proxy.get_payment_details(payment_id, client_id)
                print_result("Get Payment Details (Client)", result)
                
                # Get payment details as freelancer
                freelancer_id = "692a3bd6f3be085d2499e02d"
                freelancer_result = proxy.get_payment_details(payment_id, freelancer_id)
                print_result("Get Payment Details (Freelancer)", freelancer_result)
                
                # Get payment details as admin
                admin_id = "6920c518747da49650b2d6d5"  # admin@example.com
                admin_result = proxy.get_payment_details(payment_id, admin_id)
                print_result("Get Payment Details (Admin)", admin_result)
                
                return payment_id
    
    print_result("Get Payment Details", {'success': False, 'error': 'Could not create test payment'})
    return None

def test_request_refund():
    """Test requesting a refund"""
    proxy = create_proxy()
    
    # Need a completed order for refund - using ORD-2025-0001 which is completed
    order_id = "6930d6219ca9d71a5da3111b"  # ORD-2025-0001
    client_id = "6920c49a747da49650b2d6d1"
    reason = "The service did not meet my expectations"
    
    # First check if there's a payment for this order
    # In a real scenario, we would check or create payment first
    # For now, we'll just attempt the refund
    
    result = proxy.request_refund(order_id, client_id, reason)
    print_result("Request Refund", result)
    
    return result.get('refund_id') if result.get('success') else None

def test_get_earnings():
    """Test getting earnings for a freelancer"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    # Get earnings without filters
    result = proxy.get_earnings(freelancer_id)
    print_result("Get Earnings (No Filters)", result)
    
    # Get earnings with filters
    filters = {
        'status': 'completed',
        'period': 'month'
    }
    
    filtered_result = proxy.get_earnings(freelancer_id, filters)
    print_result("Get Earnings (With Filters)", filtered_result)
    
    return result

def test_request_withdrawal():
    """Test requesting a withdrawal"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    # First check earnings to know available balance
    earnings = proxy.get_earnings(freelancer_id)
    if earnings.get('success'):
        available_balance = earnings['total_earnings']
        print(f"Available balance: ${available_balance}")
        
        if available_balance >= 20:  # Minimum withdrawal amount
            withdrawal_data = {
                'amount': min(50.0, available_balance),  # Withdraw $50 or available balance
                'payment_method': 'paypal',
                'paypal_email': 'freelancer1@example.com'
            }
            
            result = proxy.request_withdrawal(freelancer_id, withdrawal_data)
            print_result("Request Withdrawal", result)
            
            return result.get('withdrawal_id') if result.get('success') else None
        else:
            print("Insufficient balance for withdrawal (minimum $20)")
            return None
    
    return None

def test_get_withdrawal_history():
    """Test getting withdrawal history"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    result = proxy.get_withdrawal_history(freelancer_id)
    print_result("Get Withdrawal History", result)
    
    return result

def test_get_revenue_analytics():
    """Test getting revenue analytics"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    # Test different periods
    periods = ['day', 'week', 'month', 'year']
    
    for period in periods:
        result = proxy.get_revenue_analytics(freelancer_id, period)
        print_result(f"Get Revenue Analytics ({period.capitalize()})", result)
    
    return result

def test_get_all_payments():
    """Test getting all payments (admin function)"""
    proxy = create_proxy()
    
    # Test without filters
    result = proxy.get_all_payments()
    print_result("Get All Payments (No Filters)", result)
    
    # Test with filters
    filters = {
        'status': 'completed',
        'start_date': datetime.datetime(2025, 12, 1).isoformat(),
        'end_date': datetime.datetime(2025, 12, 31).isoformat(),
        'min_amount': 100,
        'max_amount': 500
    }
    
    pagination = {
        'page': 1,
        'limit': 10
    }
    
    filtered_result = proxy.get_all_payments(filters, pagination)
    print_result("Get All Payments (With Filters)", filtered_result)
    
    return result

def test_process_withdrawal():
    """Test processing a withdrawal (admin function)"""
    proxy = create_proxy()
    
    # First need a pending withdrawal
    # Let's try to find one from withdrawal history
    freelancer_id = "692a3bd6f3be085d2499e02d"
    withdrawals = proxy.get_withdrawal_history(freelancer_id)
    
    if withdrawals.get('success') and withdrawals['withdrawals']:
        # Find a pending withdrawal
        pending_withdrawals = [w for w in withdrawals['withdrawals'] if w['status'] == 'pending']
        
        if pending_withdrawals:
            withdrawal_id = pending_withdrawals[0]['_id']
            
            # Process as completed
            result = proxy.process_withdrawal(withdrawal_id, 'completed')
            print_result("Process Withdrawal (Completed)", result)
            
            # Could also test rejected
            # result = proxy.process_withdrawal(withdrawal_id, 'rejected')
            # print_result("Process Withdrawal (Rejected)", result)
            
            return result
        else:
            print("No pending withdrawals found")
            return None
    
    print("No withdrawals found")
    return None

def test_update_payment_status():
    """Test updating payment status (admin function)"""
    proxy = create_proxy()
    
    # First need a payment to update
    # Let's get a pending payment
    all_payments = proxy.get_all_payments({'status': 'pending'}, {'limit': 1})
    
    if all_payments.get('success') and all_payments['payments']:
        payment_id = all_payments['payments'][0]['_id']
        
        # Update to processing
        result = proxy.update_payment_status(payment_id, 'processing')
        print_result("Update Payment Status (to processing)", result)
        
        # Then to completed
        if result.get('success'):
            result2 = proxy.update_payment_status(payment_id, 'completed')
            print_result("Update Payment Status (to completed)", result2)
            
            return result2
    
    print("No pending payments found to update")
    return None

def test_get_platform_earnings():
    """Test getting platform earnings (admin function)"""
    proxy = create_proxy()
    
    # Test different periods
    periods = ['day', 'week', 'month', 'year']
    
    for period in periods:
        result = proxy.get_platform_earnings(period)
        print_result(f"Get Platform Earnings ({period.capitalize()})", result)
    
    return result

def run_all_tests():
    """Run all payment tests"""
    print("🚀 Starting Payment Service Tests")
    print("="*60)
    
    test_results = {}
    
    try:
        # Test 1: Create Payment Intent
        test_results['payment_intent'] = test_create_payment_intent()
        
        # Test 2: Process Payment
        test_results['process_payment'] = test_process_payment()
        
        # Test 3: Get Payment History
        test_results['payment_history'] = test_get_payment_history()
        
        # Test 4: Get Payment Details
        test_results['payment_details'] = test_get_payment_details()
        
        # Test 5: Request Refund
        test_results['request_refund'] = test_request_refund()
        
        # Test 6: Get Earnings
        test_results['get_earnings'] = test_get_earnings()
        
        # Test 7: Request Withdrawal
        test_results['request_withdrawal'] = test_request_withdrawal()
        
        # Test 8: Get Withdrawal History
        test_results['withdrawal_history'] = test_get_withdrawal_history()
        
        # Test 9: Get Revenue Analytics
        test_results['revenue_analytics'] = test_get_revenue_analytics()
        
        # Test 10: Get All Payments (Admin)
        test_results['all_payments'] = test_get_all_payments()
        
        # Test 11: Process Withdrawal (Admin)
        test_results['process_withdrawal'] = test_process_withdrawal()
        
        # Test 12: Update Payment Status (Admin)
        test_results['update_payment_status'] = test_update_payment_status()
        
        # Test 13: Get Platform Earnings (Admin)
        test_results['platform_earnings'] = test_get_platform_earnings()
        
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        for test_name, result in test_results.items():
            if result is not None:
                print(f"✅ {test_name}: Success")
            else:
                print(f"❌ {test_name}: Failed or Skipped")
        
        print("="*60)
        print("🎉 Payment Service Tests Completed!")
        
    except xmlrpc.client.Fault as e:
        print(f"\n❌ XML-RPC Fault: {e.faultCode} - {e.faultString}")
    except ConnectionRefusedError:
        print("\n❌ Cannot connect to RPC server. Make sure server.py is running on localhost:8000")
    except Exception as e:
        print(f"\n❌ Unexpected error: {type(e).__name__}: {str(e)}")

def interactive_test():
    """Interactive testing mode"""
    proxy = create_proxy()
    
    while True:
        print("\n" + "="*60)
        print("💰 PAYMENT SERVICE INTERACTIVE TEST")
        print("="*60)
        print("1. Create Payment Intent")
        print("2. Process Payment")
        print("3. Get Payment History")
        print("4. Get Payment Details")
        print("5. Request Refund")
        print("6. Get Earnings (Freelancer)")
        print("7. Request Withdrawal")
        print("8. Get Withdrawal History")
        print("9. Get Revenue Analytics")
        print("10. Get All Payments (Admin)")
        print("11. Process Withdrawal (Admin)")
        print("12. Update Payment Status (Admin)")
        print("13. Get Platform Earnings (Admin)")
        print("0. Exit")
        print("="*60)
        
        choice = input("Select test (0-13): ").strip()
        
        try:
            if choice == '0':
                print("Exiting...")
                break
            elif choice == '1':
                order_id = input("Order ID: ").strip() or "6930d6239ca9d71a5da3111d"
                client_id = input("Client ID: ").strip() or "6920c49a747da49650b2d6d1"
                payment_method = input("Payment Method: ").strip() or "credit_card"
                test_create_payment_intent()
            elif choice == '2':
                order_id = input("Order ID: ").strip() or "6930d6259ca9d71a5da3111e"
                client_id = input("Client ID: ").strip() or "6920c49a747da49650b2d6d1"
                test_process_payment()
            elif choice == '3':
                user_id = input("User ID: ").strip() or "6920c49a747da49650b2d6d1"
                test_get_payment_history()
            elif choice == '4':
                payment_id = input("Payment ID: ").strip()
                user_id = input("User ID: ").strip() or "6920c49a747da49650b2d6d1"
                if payment_id:
                    proxy.get_payment_details(payment_id, user_id)
                else:
                    test_get_payment_details()
            elif choice == '5':
                order_id = input("Order ID: ").strip() or "6930d6219ca9d71a5da3111b"
                client_id = input("Client ID: ").strip() or "6920c49a747da49650b2d6d1"
                reason = input("Reason: ").strip() or "Test refund"
                test_request_refund()
            elif choice == '6':
                freelancer_id = input("Freelancer ID: ").strip() or "692a3bd6f3be085d2499e02d"
                test_get_earnings()
            elif choice == '7':
                freelancer_id = input("Freelancer ID: ").strip() or "692a3bd6f3be085d2499e02d"
                test_request_withdrawal()
            elif choice == '8':
                freelancer_id = input("Freelancer ID: ").strip() or "692a3bd6f3be085d2499e02d"
                test_get_withdrawal_history()
            elif choice == '9':
                freelancer_id = input("Freelancer ID: ").strip() or "692a3bd6f3be085d2499e02d"
                period = input("Period (day/week/month/year): ").strip() or "month"
                proxy.get_revenue_analytics(freelancer_id, period)
            elif choice == '10':
                test_get_all_payments()
            elif choice == '11':
                withdrawal_id = input("Withdrawal ID: ").strip()
                status = input("Status (completed/rejected): ").strip() or "completed"
                if withdrawal_id:
                    proxy.process_withdrawal(withdrawal_id, status)
                else:
                    test_process_withdrawal()
            elif choice == '12':
                payment_id = input("Payment ID: ").strip()
                status = input("Status: ").strip() or "completed"
                if payment_id:
                    proxy.update_payment_status(payment_id, status)
                else:
                    test_update_payment_status()
            elif choice == '13':
                period = input("Period (day/week/month/year): ").strip() or "month"
                test_get_platform_earnings()
            else:
                print("Invalid choice!")
        
        except Exception as e:
            print(f"Error: {type(e).__name__}: {str(e)}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--interactive":
        interactive_test()
    else:
        run_all_tests()