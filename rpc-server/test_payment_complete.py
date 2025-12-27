
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
    
    if result and result.get('success'):
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
    elif result and not result.get('success'):
        print("❌ FAILED")
        print(f"Error: {result.get('error', 'Unknown error')}")
    else:
        print("⚠️ SKIPPED or NO RESULT")
    
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
    
    return result.get('payment_intent_id') if result and result.get('success') else None

def test_process_payment():
    """Test processing a payment"""
    proxy = create_proxy()
    
    # Use the order we just created payment intent for
    order_id = "6930d6289ca9d71a5da31121"  # Same order as above
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nProcessing payment for Order ID: {order_id}")
    
    # Process the payment
    payment_data = {
        'payment_method': 'credit_card',
        'card_last4': '4242',
        'card_brand': 'visa',
        'ip_address': '127.0.0.1',
        'user_agent': 'test-client/1.0'
    }
    
    result = proxy.process_payment(order_id, client_id, payment_data)
    print_result("Process Payment", result)
    
    return result.get('transaction_id') if result and result.get('success') else None

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
    
    if history and history.get('success') and history['payments']:
        # Use the most recent payment (likely one we just created)
        payment_id = history['payments'][0]['_id']
        
        print(f"\nGetting payment details for Payment ID: {payment_id}")
        
        # Get as client
        client_result = proxy.get_payment_details(payment_id, client_id)
        print_result("Get Payment Details (Client)", client_result)
        
        return payment_id
    
    print_result("Get Payment Details", {'success': False, 'error': 'No payments found'})
    return None

def test_request_refund_with_valid_order():
    """Test requesting a refund with a valid order from our database"""
    proxy = create_proxy()
    
    # Find a completed order in our database that has a payment
    client_id = "6920c49a747da49650b2d6d1"
    
    print(f"\nFinding a valid completed order for refund test")
    
    # First, let's check orders that exist in our database
    # Looking at your database, ORD-2025-0001 is completed
    order_id = "6930d6219ca9d71a5da3111b"  # ORD-2025-0001 (completed order)
    
    print(f"Trying refund for Order ID: {order_id}")
    print(f"This order exists and is marked as 'completed'")
    
    # First, let's check if this order has a payment
    # We need to create a payment first if none exists
    print("Checking if order has payment...")
    
    # Get payment history for this order
    history = proxy.get_payment_history(client_id)
    has_payment = False
    
    if history and history.get('success') and history['payments']:
        for payment in history['payments']:
            if payment.get('order_id') == order_id and payment.get('status') == 'completed':
                has_payment = True
                break
    
    if not has_payment:
        print("Order doesn't have completed payment. Creating one...")
        
        # Create payment intent
        intent_result = proxy.create_payment_intent(order_id, client_id, "credit_card")
        if intent_result and intent_result.get('success'):
            # Process payment
            payment_data = {
                'payment_method': 'credit_card',
                'card_last4': '1234',
                'card_brand': 'visa'
            }
            process_result = proxy.process_payment(order_id, client_id, payment_data)
            if process_result and process_result.get('success'):
                print("Payment created successfully for refund test")
            else:
                print("Failed to create payment for refund test")
                return None
        else:
            print("Failed to create payment intent for refund test")
            return None
    
    # Now request refund
    reason = "Not satisfied with the service quality"
    print(f"\nRequesting refund for Order ID: {order_id}")
    print(f"Reason: {reason}")
    
    result = proxy.request_refund(order_id, client_id, reason)
    print_result("Request Refund", result)
    
    return result.get('refund_id') if result and result.get('success') else None

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
            withdrawal_amount = min(25.0, available_balance)  # Smaller amount
            withdrawal_data = {
                'amount': withdrawal_amount,
                'payment_method': 'paypal',
                'paypal_email': 'test_freelancer@example.com'
            }
            
            print(f"\nRequesting withdrawal of ${withdrawal_amount}")
            result = proxy.request_withdrawal(freelancer_id, withdrawal_data)
            print_result("Request Withdrawal", result)
            
            return result.get('withdrawal_id') if result and result.get('success') else None
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
    """Test getting all payments (admin function) - FIXED version"""
    proxy = create_proxy()
    
    print("\nGetting all payments (admin view)")
    
    # Test without filters - with proper error handling
    try:
        result = proxy.get_all_payments()
        print_result("Get All Payments (No Filters)", result)
        
        # Also test with a simple filter
        print("\nGetting payments with simple filter (status: completed)")
        filtered_result = proxy.get_all_payments({'status': 'completed'}, {'limit': 5})
        print_result("Get All Payments (Filtered)", filtered_result)
        
        return result
    except xmlrpc.client.Fault as e:
        print(f"\n❌ XML-RPC Fault in get_all_payments: {e}")
        print("The get_all_payments function still has ObjectId serialization issues")
        return None
    except Exception as e:
        print(f"\n❌ Exception in get_all_payments: {type(e).__name__}: {str(e)}")
        return None

def test_process_withdrawal():
    """Test processing a withdrawal (admin function)"""
    proxy = create_proxy()
    
    print("\nProcessing withdrawal (admin function)")
    
    # First create a withdrawal if needed
    freelancer_id = "692a3bd6f3be085d2499e02d"
    
    # Check existing withdrawals
    withdrawals = proxy.get_withdrawal_history(freelancer_id)
    
    if withdrawals and withdrawals.get('success') and withdrawals['withdrawals']:
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
        # Use get_payment_history to find a processing payment
        client_id = "6920c49a747da49650b2d6d1"
        history = proxy.get_payment_history(client_id, {'status': 'processing', 'limit': 1})
        
        if history and history.get('success') and history['payments']:
            payment_id = history['payments'][0]['_id']
            
            print(f"\nUpdating payment ID: {payment_id} status to 'completed'")
            update_result = proxy.update_payment_status(payment_id, 'completed')
            print_result("Update Payment Status", update_result)
            
            return update_result
        else:
            print("⚠️ No processing payments found to update")
            return None
    except Exception as e:
        print(f"⚠️ Error in update payment status test: {e}")
        return None

def test_get_platform_earnings():
    """Test getting platform earnings (admin function)"""
    proxy = create_proxy()
    
    print("\nGetting platform earnings (admin function)")
    
    # Test month period
    period = 'month'
    print(f"\nGetting platform earnings for period: {period}")
    result = proxy.get_platform_earnings(period)
    
    print_result(f"Get Platform Earnings ({period.capitalize()})", result)
    
    return result

def run_all_tests():
    """Run all payment tests"""
    print("🚀 Starting Complete Payment Service Tests")
    print("="*60)
    print("Testing ALL payment functionality")
    print("="*60)
    
    tests = [
        ("1. Create Payment Intent", test_create_payment_intent),
        ("2. Process Payment", test_process_payment),
        ("3. Get Payment History", test_get_payment_history),
        ("4. Get Payment Details", test_get_payment_details),
        ("5. Request Refund (Valid Order)", test_request_refund_with_valid_order),
        ("6. Get Earnings", test_get_earnings),
        ("7. Request Withdrawal", test_request_withdrawal),
        ("8. Get Withdrawal History", test_get_withdrawal_history),
        ("9. Get Revenue Analytics", test_get_revenue_analytics),
        ("10. Get All Payments (Admin)", test_get_all_payments),
        ("11. Process Withdrawal (Admin)", test_process_withdrawal),
        ("12. Update Payment Status (Admin)", test_update_payment_status),
        ("13. Get Platform Earnings (Admin)", test_get_platform_earnings),
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        print(f"\n{'='*60}")
        print(f"🧪 {test_name}")
        print(f"{'='*60}")
        
        try:
            result = test_func()
            results[test_name] = result
        except Exception as e:
            print(f"❌ Exception in {test_name}: {type(e).__name__}: {str(e)}")
            results[test_name] = None
    
    # Summary
    print(f"\n{'='*60}")
    print("📊 FINAL TEST SUMMARY")
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
    
    # Analysis
    print("\n📋 ISSUE ANALYSIS:")
    print(f"{'='*60}")
    
    if results.get("10. Get All Payments (Admin)") is None:
        print("• get_all_payments() - Needs ObjectId serialization fix in service")
        print("  ↳ All ObjectId fields must be converted to strings before returning")
    
    if results.get("5. Request Refund (Valid Order)") is None:
        print("• Refund test - May need a completed order with payment")
        print("  ↳ Check if order exists and has completed payment status")
    
    print(f"{'='*60}")
    
    if successful == total:
        print("\n🎉 CONGRATULATIONS! ALL TESTS PASSED! 🎉")
    elif successful >= total * 0.8:
        print(f"\n👍 EXCELLENT! {successful}/{total} tests passed!")
    elif successful >= total * 0.6:
        print(f"\n✅ GOOD PROGRESS! {successful}/{total} tests passed!")
    else:
        print(f"\n⚠️ NEEDS WORK: {successful}/{total} tests passed")
    
    print(f"{'='*60}")

if __name__ == "__main__":
    run_all_tests()