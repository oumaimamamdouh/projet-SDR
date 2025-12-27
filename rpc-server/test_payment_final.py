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
            print(f"Total Earnings: ${result.get('total_earnings', 0)}")
            print(f"Total Payments: {len(result.get('earnings', []))}")
            if 'stats' in result:
                stats = result['stats']
                print(f"Completed Payments: {stats.get('completed_payments', 0)}")
                print(f"Pending Payments: {stats.get('pending_payments', 0)}")
                print(f"Average Order Value: ${stats.get('average_order_value', 0)}")
        elif 'withdrawals' in result:
            print(f"Total Withdrawals: {len(result.get('withdrawals', []))}")
            if 'stats' in result:
                stats = result['stats']
                print(f"Total Withdrawn: ${stats.get('total_withdrawn', 0)}")
                print(f"Pending Withdrawals: ${stats.get('pending_withdrawals', 0)}")
        elif 'analytics' in result:
            analytics = result['analytics']
            summary = analytics.get('summary', {})
            print(f"Total Revenue: ${summary.get('total_revenue', 0)}")
            print(f"Platform Fees: ${summary.get('platform_fees', 0)}")
            print(f"Net Earnings: ${summary.get('net_earnings', 0)}")
            print(f"Total Orders: {summary.get('total_orders', 0)}")
            print(f"Period: {analytics.get('period', 'N/A')}")
        
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
    
    # Use a confirmed order
    order_id = "6930d6289ca9d71a5da31121"  # ORD-2025-0007 (confirmed)
    client_id = "6920c49a747da49650b2d6d1"
    payment_method = "credit_card"
    
    print(f"Creating payment intent for Order ID: {order_id}")
    print(f"Order status: confirmed, amount: $150, total_amount: $180")
    
    result = proxy.create_payment_intent(order_id, client_id, payment_method)
    print_result("Create Payment Intent", result)
    
    return result.get('payment_intent_id') if result.get('success') else None

def test_process_payment():
    """Test processing a payment"""
    proxy = create_proxy()
    
    # Use a different order for processing
    order_id = "6930d62c9ca9d71a5da31122"  # ORD-2025-0008 (confirmed)
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nCreating payment intent for Order ID: {order_id}")
    print(f"Order status: confirmed, amount: $100, total_amount: $120")
    
    # Create payment intent first
    intent_result = proxy.create_payment_intent(order_id, client_id, "credit_card")
    if not intent_result.get('success'):
        print_result("Create Payment Intent", intent_result)
        return None
    
    # Process the payment
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
    
    # Test for client
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nGetting payment history for Client ID: {client_id}")
    
    # Get without filters
    result = proxy.get_payment_history(client_id)
    print_result("Get Payment History (Client - No Filters)", result)
    
    return result

def test_get_payment_details():
    """Test getting details of a specific payment"""
    proxy = create_proxy()
    
    # Get a payment that we just created
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nGetting recent payments for Client ID: {client_id}")
    history = proxy.get_payment_history(client_id, {'limit': 3})
    
    if history.get('success') and history['payments']:
        # Use the most recent payment (likely one we just created)
        payment_id = history['payments'][0]['_id']
        
        print(f"\nGetting payment details for Payment ID: {payment_id}")
        
        # Get as client
        client_result = proxy.get_payment_details(payment_id, client_id)
        print_result("Get Payment Details (Client)", client_result)
        
        # Get as admin
        admin_id = "6920c518747da49650b2d6d5"
        admin_result = proxy.get_payment_details(payment_id, admin_id)
        print_result("Get Payment Details (Admin)", admin_result)
        
        return payment_id
    
    print_result("Get Payment Details", {'success': False, 'error': 'No payments found'})
    return None

def test_request_refund():
    """Test requesting a refund"""
    proxy = create_proxy()
    
    # We need to find a completed payment first
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nFinding completed payment for refund test")
    
    # Get completed payments
    history = proxy.get_payment_history(client_id, {'status': 'completed', 'limit': 1})
    
    if history.get('success') and history['payments']:
        payment = history['payments'][0]
        order_id = payment['order_id']
        reason = "Not satisfied with the service quality"
        
        print(f"\nRequesting refund for Order ID: {order_id}")
        print(f"Reason: {reason}")
        
        result = proxy.request_refund(order_id, client_id, reason)
        print_result("Request Refund", result)
        
        return result.get('refund_id') if result.get('success') else None
    else:
        print("⚠️ No completed payments found for refund test")
        return None

def test_get_earnings():
    """Test getting earnings for a freelancer"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    print(f"\nGetting earnings for Freelancer ID: {freelancer_id}")
    
    # Get earnings without filters
    result = proxy.get_earnings(freelancer_id)
    print_result("Get Earnings (No Filters)", result)
    
    return result

def test_request_withdrawal():
    """Test requesting a withdrawal"""
    proxy = create_proxy()
    
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    print(f"\nChecking earnings for Freelancer ID: {freelancer_id}")
    
    # First check earnings
    earnings = proxy.get_earnings(freelancer_id)
    if earnings and earnings.get('success'):
        available_balance = earnings.get('total_earnings', 0)
        print(f"Available balance: ${available_balance}")
        
        if available_balance >= 20:
            withdrawal_amount = min(30.0, available_balance)  # Smaller amount
            withdrawal_data = {
                'amount': withdrawal_amount,
                'payment_method': 'paypal',
                'paypal_email': 'test_freelancer@example.com'
            }
            
            print(f"\nRequesting withdrawal of ${withdrawal_amount}")
            result = proxy.request_withdrawal(freelancer_id, withdrawal_data)
            print_result("Request Withdrawal", result)
            
            return result.get('withdrawal_id') if result.get('success') else None
        else:
            print(f"⚠️ Insufficient balance: ${available_balance} (minimum $20)")
            return None
    else:
        print("⚠️ Could not get earnings data")
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
    
    # Test month period
    period = 'month'
    print(f"\nGetting analytics for period: {period}")
    result = proxy.get_revenue_analytics(freelancer_id, period)
    print_result(f"Get Revenue Analytics ({period.capitalize()})", result)
    
    return result

def test_get_all_payments():
    """Test getting all payments (admin function)"""
    proxy = create_proxy()
    
    print("\nGetting all payments (admin view)")
    
    # Test without filters
    try:
        result = proxy.get_all_payments()
        print_result("Get All Payments (No Filters)", result)
        return result
    except xmlrpc.client.Fault as e:
        print(f"\n❌ XML-RPC Fault in get_all_payments: {e}")
        print("This indicates ObjectId serialization issue in the service")
        return None

def test_process_withdrawal():
    """Test processing a withdrawal (admin function)"""
    proxy = create_proxy()
    
    print("\nProcessing withdrawal (admin function)")
    
    # First create a withdrawal if needed
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    # Check existing withdrawals
    withdrawals = proxy.get_withdrawal_history(freelancer_id)
    
    if withdrawals.get('success') and withdrawals['withdrawals']:
        # Find pending withdrawal
        pending_withdrawals = [w for w in withdrawals['withdrawals'] if w.get('status') == 'pending']
        
        if pending_withdrawals:
            withdrawal_id = pending_withdrawals[0]['_id']
            
            print(f"\nProcessing withdrawal ID: {withdrawal_id}")
            result = proxy.process_withdrawal(withdrawal_id, 'completed')
            print_result("Process Withdrawal", result)
            
            return result
        else:
            print("⚠️ No pending withdrawals found")
    else:
        print("⚠️ No withdrawals found")
    
    return None

def test_update_payment_status():
    """Test updating payment status (admin function)"""
    proxy = create_proxy()
    
    print("\nUpdating payment status (admin function)")
    
    # Find a processing payment to update
    try:
        result = proxy.get_all_payments({'status': 'processing'}, {'limit': 1})
        
        if result and result.get('success') and result['payments']:
            payment_id = result['payments'][0]['_id']
            
            print(f"\nUpdating payment ID: {payment_id} status to 'completed'")
            update_result = proxy.update_payment_status(payment_id, 'completed')
            print_result("Update Payment Status", update_result)
            
            return update_result
        else:
            print("⚠️ No processing payments found to update")
            return None
    except:
        print("⚠️ Could not get payments (get_all_payments might have issues)")
        return None

def test_get_platform_earnings():
    """Test getting platform earnings (admin function)"""
    proxy = create_proxy()
    
    print("\nGetting platform earnings (admin function)")
    
    # Test month period
    period = 'month'
    print(f"\nGetting platform earnings for period: {period}")
    result = proxy.get_platform_earnings(period)
    
    if result.get('success'):
        print(f"\n{'='*60}")
        print(f"TEST: Get Platform Earnings ({period.capitalize()})")
        print(f"{'='*60}")
        print("✅ SUCCESS")
        
        analytics = result['analytics']
        summary = analytics.get('summary', {})
        
        print(f"Total Revenue: ${summary.get('total_revenue', 0)}")
        print(f"Platform Earnings: ${summary.get('platform_earnings', 0)}")
        print(f"Freelancer Earnings: ${summary.get('freelancer_earnings', 0)}")
        print(f"Total Orders: {summary.get('total_orders', 0)}")
        print(f"Average Order Value: ${summary.get('average_order_value', 0)}")
        print(f"Period: {analytics.get('period', 'N/A')}")
    else:
        print_result(f"Get Platform Earnings ({period.capitalize()})", result)
    
    return result

def run_comprehensive_test():
    """Run comprehensive payment tests"""
    print("🚀 Starting Comprehensive Payment Service Tests")
    print("="*60)
    print("Testing all payment functionality")
    print("="*60)
    
    tests = [
        ("Create Payment Intent", test_create_payment_intent),
        ("Process Payment", test_process_payment),
        ("Get Payment History", test_get_payment_history),
        ("Get Payment Details", test_get_payment_details),
        ("Request Refund", test_request_refund),
        ("Get Earnings", test_get_earnings),
        ("Request Withdrawal", test_request_withdrawal),
        ("Get Withdrawal History", test_get_withdrawal_history),
        ("Get Revenue Analytics", test_get_revenue_analytics),
        ("Get All Payments (Admin)", test_get_all_payments),
        ("Process Withdrawal (Admin)", test_process_withdrawal),
        ("Update Payment Status (Admin)", test_update_payment_status),
        ("Get Platform Earnings (Admin)", test_get_platform_earnings),
    ]
    
    results = {}
    
    for i, (test_name, test_func) in enumerate(tests, 1):
        print(f"\n{'='*60}")
        print(f"TEST {i}: {test_name}")
        print(f"{'='*60}")
        
        try:
            result = test_func()
            results[test_name] = result
        except Exception as e:
            print(f"❌ Exception in {test_name}: {type(e).__name__}: {str(e)}")
            results[test_name] = None
    
    # Summary
    print(f"\n{'='*60}")
    print("📊 TEST SUMMARY")
    print(f"{'='*60}")
    
    successful = 0
    total = len(results)
    
    for test_name, result in results.items():
        if result is not None:
            print(f"✅ {test_name}: Success")
            successful += 1
        else:
            print(f"❌ {test_name}: Failed or Skipped")
    
    print(f"\n🎯 Success Rate: {successful}/{total} ({successful/total*100:.1f}%)")
    print(f"{'='*60}")
    
    if successful == total:
        print("🎉 ALL TESTS PASSED!")
    elif successful >= total * 0.7:
        print("👍 Most tests passed!")
    else:
        print("⚠️ Some tests need attention")
    
    print(f"{'='*60}")
    
    # Detailed analysis
    print("\n📋 DETAILED ANALYSIS:")
    print(f"{'='*60}")
    
    issues = []
    if results.get("Get All Payments (Admin)") is None:
        issues.append("Fix get_all_payments() - ObjectId serialization issue")
    if results.get("Request Refund") is None:
        issues.append("Refund test skipped - need completed payment")
    if results.get("Update Payment Status (Admin)") is None:
        issues.append("Update payment status needs processing payments")
    
    if issues:
        print("Issues to fix:")
        for issue in issues:
            print(f"  • {issue}")
    else:
        print("No major issues found!")
    
    print(f"{'='*60}")

def quick_test():
    """Run quick essential tests"""
    print("🚀 Quick Payment Tests")
    print("="*60)
    
    quick_tests = [
        ("Create Payment Intent", test_create_payment_intent),
        ("Process Payment", test_process_payment),
        ("Get Payment History", test_get_payment_history),
        ("Get Earnings", test_get_earnings),
    ]
    
    for test_name, test_func in quick_tests:
        print(f"\n➡️ Testing: {test_name}")
        try:
            result = test_func()
            if result is not None:
                print(f"   ✅ {test_name} passed")
            else:
                print(f"   ❌ {test_name} failed")
        except Exception as e:
            print(f"   ❌ {test_name} error: {e}")
    
    print(f"\n{'='*60}")
    print("✅ Quick tests completed")
    print(f"{'='*60}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--quick":
        quick_test()
    else:
        run_comprehensive_test()