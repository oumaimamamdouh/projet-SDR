
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
            if result['payments']:
                print(f"First payment status: {result['payments'][0].get('status', 'N/A')}")
                print(f"First payment amount: ${result['payments'][0].get('amount', 0)}")
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
    """Test creating a payment intent - FIXED for database"""
    proxy = create_proxy()
    
    # Using order_id that exists and is pending
    # ORD-2025-0003 is pending and has amount: 200, total_amount: 240
    order_id = "6930d6239ca9d71a5da3111d"  # ORD-2025-0003
    client_id = "6920c49a747da49650b2d6d1"  # client1@example.com
    payment_method = "credit_card"
    
    print(f"Creating payment intent for Order ID: {order_id}")
    print(f"Client ID: {client_id}")
    print(f"Order has amount: $200, total_amount: $240")
    
    result = proxy.create_payment_intent(order_id, client_id, payment_method)
    print_result("Create Payment Intent", result)
    
    return result.get('payment_intent_id') if result.get('success') else None

def test_process_payment():
    """Test processing a payment"""
    proxy = create_proxy()
    
    # First create a payment intent for a pending order
    # Using ORD-2025-0005 which is pending
    order_id = "6930d6269ca9d71a5da3111f"  # ORD-2025-0005 (pending, amount: 100, total_amount: 120)
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nCreating payment intent for Order ID: {order_id}")
    print(f"Order has amount: $100, total_amount: $120")
    
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
    
    print(f"\nProcessing payment for Order ID: {order_id}")
    result = proxy.process_payment(order_id, client_id, payment_data)
    print_result("Process Payment", result)
    
    return result.get('transaction_id') if result.get('success') else None

def test_get_payment_history():
    """Test getting payment history for a user"""
    proxy = create_proxy()
    
    # Test for client - client1@example.com
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nGetting payment history for Client ID: {client_id}")
    
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
    
    print(f"\nGetting payment history with filters: {filters}")
    filtered_result = proxy.get_payment_history(client_id, filters)
    print_result("Get Payment History (Client - With Filters)", filtered_result)
    
    # Test for freelancer - test_1ace5cfd@example.com
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    print(f"\nGetting payment history for Freelancer ID: {freelancer_id}")
    freelancer_result = proxy.get_payment_history(freelancer_id)
    print_result("Get Payment History (Freelancer)", freelancer_result)
    
    return result

def test_get_payment_details():
    """Test getting details of a specific payment"""
    proxy = create_proxy()
    
    # First get existing payments to find one to examine
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nGetting existing payments for Client ID: {client_id}")
    history = proxy.get_payment_history(client_id, {'limit': 5})
    
    if history.get('success') and history['payments']:
        # Use the first payment
        payment_id = history['payments'][0]['_id']
        
        print(f"\nGetting payment details for Payment ID: {payment_id}")
        
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
    
    print_result("Get Payment Details", {'success': False, 'error': 'No payments found'})
    return None

def test_request_refund():
    """Test requesting a refund"""
    proxy = create_proxy()
    
    # Need a completed order with payment - let's use one of the existing payments
    # Check existing payments in database first
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nChecking for completed payments for Client ID: {client_id}")
    
    # Get completed payments
    history = proxy.get_payment_history(client_id, {'status': 'completed', 'limit': 1})
    
    if history.get('success') and history['payments']:
        payment = history['payments'][0]
        order_id = payment['order_id']
        reason = "The service did not meet my expectations"
        
        print(f"\nRequesting refund for Order ID: {order_id}")
        print(f"Reason: {reason}")
        
        result = proxy.request_refund(order_id, client_id, reason)
        print_result("Request Refund", result)
        
        return result.get('refund_id') if result.get('success') else None
    else:
        print_result("Request Refund", {'success': False, 'error': 'No completed payments found'})
        return None

def test_get_earnings():
    """Test getting earnings for a freelancer"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"  # test_1ace5cfd@example.com
    
    print(f"\nGetting earnings for Freelancer ID: {freelancer_id}")
    
    # Get earnings without filters
    result = proxy.get_earnings(freelancer_id)
    print_result("Get Earnings (No Filters)", result)
    
    # Get earnings with filters
    filters = {
        'status': 'completed',
        'period': 'month'
    }
    
    print(f"\nGetting earnings with filters: {filters}")
    filtered_result = proxy.get_earnings(freelancer_id, filters)
    print_result("Get Earnings (With Filters)", filtered_result)
    
    return result

def test_request_withdrawal():
    """Test requesting a withdrawal"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    print(f"\nChecking earnings for withdrawal for Freelancer ID: {freelancer_id}")
    
    # First check earnings to know available balance
    earnings = proxy.get_earnings(freelancer_id)
    if earnings.get('success'):
        available_balance = earnings['total_earnings']
        print(f"Available balance: ${available_balance}")
        
        if available_balance >= 20:  # Minimum withdrawal amount
            withdrawal_amount = min(50.0, available_balance)
            withdrawal_data = {
                'amount': withdrawal_amount,
                'payment_method': 'paypal',
                'paypal_email': 'freelancer1@example.com'
            }
            
            print(f"\nRequesting withdrawal of ${withdrawal_amount}")
            result = proxy.request_withdrawal(freelancer_id, withdrawal_data)
            print_result("Request Withdrawal", result)
            
            return result.get('withdrawal_id') if result.get('success') else None
        else:
            print("❌ Insufficient balance for withdrawal (minimum $20)")
            return None
    else:
        print_result("Check Earnings for Withdrawal", earnings)
        return None

def test_get_withdrawal_history():
    """Test getting withdrawal history"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    print(f"\nGetting withdrawal history for Freelancer ID: {freelancer_id}")
    
    result = proxy.get_withdrawal_history(freelancer_id)
    print_result("Get Withdrawal History", result)
    
    return result

def test_get_revenue_analytics():
    """Test getting revenue analytics"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    print(f"\nGetting revenue analytics for Freelancer ID: {freelancer_id}")
    
    # Test different periods
    periods = ['day', 'week', 'month', 'year']
    
    for period in periods:
        print(f"\nGetting analytics for period: {period}")
        result = proxy.get_revenue_analytics(freelancer_id, period)
        print_result(f"Get Revenue Analytics ({period.capitalize()})", result)
    
    return result

def test_get_all_payments():
    """Test getting all payments (admin function)"""
    proxy = create_proxy()
    
    print("\nGetting all payments (admin view)")
    
    # Test without filters
    result = proxy.get_all_payments()
    print_result("Get All Payments (No Filters)", result)
    
    # Test with filters
    filters = {
        'status': 'completed',
        'start_date': datetime.datetime(2024, 1, 1).isoformat(),  # Use 2024 for existing payments
        'end_date': datetime.datetime(2024, 12, 31).isoformat(),
        'min_amount': 100,
        'max_amount': 1000
    }
    
    pagination = {
        'page': 1,
        'limit': 10
    }
    
    print(f"\nGetting all payments with filters: {filters}")
    filtered_result = proxy.get_all_payments(filters, pagination)
    print_result("Get All Payments (With Filters)", filtered_result)
    
    return result

def test_process_withdrawal():
    """Test processing a withdrawal (admin function)"""
    proxy = create_proxy()
    
    print("\nProcessing withdrawal (admin function)")
    
    # First need a pending withdrawal
    # Let's try to find one from withdrawal history
    freelancer_id = "692a3bd6f3be085d2499e02d"
    withdrawals = proxy.get_withdrawal_history(freelancer_id)
    
    if withdrawals.get('success') and withdrawals['withdrawals']:
        # Find a pending withdrawal
        pending_withdrawals = [w for w in withdrawals['withdrawals'] if w['status'] == 'pending']
        
        if pending_withdrawals:
            withdrawal_id = pending_withdrawals[0]['_id']
            
            print(f"\nProcessing withdrawal ID: {withdrawal_id} as 'completed'")
            
            # Process as completed
            result = proxy.process_withdrawal(withdrawal_id, 'completed')
            print_result("Process Withdrawal (Completed)", result)
            
            return result
        else:
            print("⚠️ No pending withdrawals found")
            return None
    
    print("⚠️ No withdrawals found in history")
    return None

def test_update_payment_status():
    """Test updating payment status (admin function)"""
    proxy = create_proxy()
    
    print("\nUpdating payment status (admin function)")
    
    # First need a payment to update
    # Let's get a pending or processing payment
    all_payments = proxy.get_all_payments({'status': 'pending'}, {'limit': 1})
    
    if all_payments.get('success') and all_payments['payments']:
        payment_id = all_payments['payments'][0]['_id']
        
        print(f"\nUpdating payment ID: {payment_id} status to 'processing'")
        
        # Update to processing
        result = proxy.update_payment_status(payment_id, 'processing')
        print_result("Update Payment Status (to processing)", result)
        
        # Then to completed
        if result.get('success'):
            print(f"\nUpdating payment ID: {payment_id} status to 'completed'")
            result2 = proxy.update_payment_status(payment_id, 'completed')
            print_result("Update Payment Status (to completed)", result2)
            
            return result2
    else:
        print("⚠️ No pending payments found to update")
    
    # Try with processing payments
    all_payments = proxy.get_all_payments({'status': 'processing'}, {'limit': 1})
    if all_payments.get('success') and all_payments['payments']:
        payment_id = all_payments['payments'][0]['_id']
        
        print(f"\nUpdating processing payment ID: {payment_id} status to 'completed'")
        result = proxy.update_payment_status(payment_id, 'completed')
        print_result("Update Payment Status (to completed)", result)
        
        return result
    
    print("⚠️ No suitable payments found to update")
    return None

def test_get_platform_earnings():
    """Test getting platform earnings (admin function)"""
    proxy = create_proxy()
    
    print("\nGetting platform earnings (admin function)")
    
    # Test different periods
    periods = ['day', 'week', 'month', 'year']
    
    for period in periods:
        print(f"\nGetting platform earnings for period: {period}")
        result = proxy.get_platform_earnings(period)
        
        # Fix for the KeyError in test output formatting
        if result.get('success'):
            print(f"\n{'='*60}")
            print(f"TEST: Get Platform Earnings ({period.capitalize()})")
            print(f"{'='*60}")
            print("✅ SUCCESS")
            
            analytics = result['analytics']
            summary = analytics['summary']
            
            # Use .get() to handle missing keys safely
            print(f"Total Revenue: ${summary.get('total_revenue', 0)}")
            print(f"Platform Earnings: ${summary.get('platform_earnings', 0)}")
            print(f"Freelancer Earnings: ${summary.get('freelancer_earnings', 0)}")
            print(f"Total Orders: {summary.get('total_orders', 0)}")
            print(f"Average Order Value: ${summary.get('average_order_value', 0)}")
            print(f"Period: {analytics.get('period', 'N/A')}")
            
            if 'distribution' in analytics:
                dist = analytics['distribution']
                if 'payment_methods' in dist:
                    print(f"Payment Methods: {dist['payment_methods']}")
        else:
            print_result(f"Get Platform Earnings ({period.capitalize()})", result)
    
    return result

def run_all_tests():
    """Run all payment tests"""
    print("🚀 Starting Payment Service Tests")
    print("="*60)
    print("NOTE: These tests use your actual database data")
    print("="*60)
    
    test_results = {}
    
    try:
        # Test 1: Create Payment Intent
        print("\n" + "="*60)
        print("📝 TEST 1: Create Payment Intent")
        print("="*60)
        test_results['payment_intent'] = test_create_payment_intent()
        
        # Test 2: Process Payment
        print("\n" + "="*60)
        print("💳 TEST 2: Process Payment")
        print("="*60)
        test_results['process_payment'] = test_process_payment()
        
        # Test 3: Get Payment History
        print("\n" + "="*60)
        print("📊 TEST 3: Get Payment History")
        print("="*60)
        test_results['payment_history'] = test_get_payment_history()
        
        # Test 4: Get Payment Details
        print("\n" + "="*60)
        print("🔍 TEST 4: Get Payment Details")
        print("="*60)
        test_results['payment_details'] = test_get_payment_details()
        
        # Test 5: Request Refund
        print("\n" + "="*60)
        print("↩️  TEST 5: Request Refund")
        print("="*60)
        test_results['request_refund'] = test_request_refund()
        
        # Test 6: Get Earnings
        print("\n" + "="*60)
        print("💰 TEST 6: Get Earnings")
        print("="*60)
        test_results['get_earnings'] = test_get_earnings()
        
        # Test 7: Request Withdrawal
        print("\n" + "="*60)
        print("🏦 TEST 7: Request Withdrawal")
        print("="*60)
        test_results['request_withdrawal'] = test_request_withdrawal()
        
        # Test 8: Get Withdrawal History
        print("\n" + "="*60)
        print("📈 TEST 8: Get Withdrawal History")
        print("="*60)
        test_results['withdrawal_history'] = test_get_withdrawal_history()
        
        # Test 9: Get Revenue Analytics
        print("\n" + "="*60)
        print("📊 TEST 9: Get Revenue Analytics")
        print("="*60)
        test_results['revenue_analytics'] = test_get_revenue_analytics()
        
        # Test 10: Get All Payments (Admin)
        print("\n" + "="*60)
        print("👑 TEST 10: Get All Payments (Admin)")
        print("="*60)
        test_results['all_payments'] = test_get_all_payments()
        
        # Test 11: Process Withdrawal (Admin)
        print("\n" + "="*60)
        print("👑 TEST 11: Process Withdrawal (Admin)")
        print("="*60)
        test_results['process_withdrawal'] = test_process_withdrawal()
        
        # Test 12: Update Payment Status (Admin)
        print("\n" + "="*60)
        print("👑 TEST 12: Update Payment Status (Admin)")
        print("="*60)
        test_results['update_payment_status'] = test_update_payment_status()
        
        # Test 13: Get Platform Earnings (Admin)
        print("\n" + "="*60)
        print("👑 TEST 13: Get Platform Earnings (Admin)")
        print("="*60)
        test_results['platform_earnings'] = test_get_platform_earnings()
        
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        successful_tests = 0
        total_tests = 0
        
        for test_name, result in test_results.items():
            total_tests += 1
            if result is not None:
                print(f"✅ {test_name}: Success")
                successful_tests += 1
            else:
                print(f"❌ {test_name}: Failed or Skipped")
        
        print(f"\n🎯 Success Rate: {successful_tests}/{total_tests} ({successful_tests/total_tests*100:.1f}%)")
        print("="*60)
        print("🎉 Payment Service Tests Completed!")
        
    except xmlrpc.client.Fault as e:
        print(f"\n❌ XML-RPC Fault: {e.faultCode} - {e.faultString}")
    except ConnectionRefusedError:
        print("\n❌ Cannot connect to RPC server. Make sure server.py is running on localhost:8000")
    except Exception as e:
        print(f"\n❌ Unexpected error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    run_all_tests()