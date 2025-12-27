# test_message.py

import xmlrpc.client
import time
import base64

class MessageServiceTest:
    def __init__(self, server_url="http://localhost:8000"):
        self.server = xmlrpc.client.ServerProxy(server_url)
        self.test_results = []
        
        # Use known working data from your database
        self.test_client_id = "6920c49a747da49650b2d6d1"  # client1@example.com
        self.test_freelancer_id = "6920c510747da49650b2d6d4"  # freelancer1@example.com
        self.test_gig_id = "692a3be1f3be085d2499e02e"  # Python RPC Development Service
        
        # We'll create an order for testing messages
        self.test_order_id = None
    
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
    
    def setup_test_order(self):
        """Create an order for testing messages"""
        print("\n=== Setting up Test Order ===")
        
        try:
            # Create order data
            order_data = {
                'client_id': self.test_client_id,
                'freelancer_id': self.test_freelancer_id,
                'gig_id': self.test_gig_id,
                'title': 'Test Order for Messages',
                'description': 'Testing message functionality',
                'requirements': 'Test message requirements',
                'amount': 200.0,
                'currency': 'USD'
            }
            
            # Call create_order method
            result = self.server.create_order(order_data)
            
            if result.get('success'):
                self.test_order_id = result['order']['_id']
                self.test_order_number = result['order']['order_number']
                print(f"✅ Created test order: {self.test_order_number} (ID: {self.test_order_id})")
                return True
            else:
                print(f"❌ Failed to create test order: {result.get('error')}")
                return False
                
        except Exception as e:
            print(f"❌ Error creating test order: {e}")
            return False
    
    def test_get_conversations(self):
        """Test getting conversations for a user"""
        print("\n=== Testing Get Conversations ===")
        
        # Test for client
        try:
            result = self.server.get_conversations(self.test_client_id)
            
            if result.get('success'):
                conversations = result.get('conversations', [])
                self.log_test("Get Client Conversations", True, 
                            f"Found {len(conversations)} conversations")
                
                if conversations:
                    print("   Sample conversation:")
                    conv = conversations[0]
                    print(f"     Order: {conv.get('order', {}).get('title', 'N/A')}")
                    print(f"     Status: {conv.get('order', {}).get('status', 'N/A')}")
                    if conv.get('last_message'):
                        print(f"     Last message: {conv['last_message']['content'][:50]}...")
                
                return True
            else:
                self.log_test("Get Client Conversations", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Client Conversations", False, error=str(e))
            return False
    
    def test_send_message(self):
        """Test sending a message"""
        print("\n=== Testing Send Message ===")
        
        if not self.test_order_id:
            print("❌ No test order available")
            return False
        
        try:
            # Send a message from client to freelancer
            message_data = {
                'content': 'Hello freelancer, I have some questions about the order.',
                'message_type': 'text'
            }
            
            result = self.server.send_message(self.test_order_id, self.test_client_id, message_data)
            
            if result.get('success'):
                self.sent_message_id = result['message']['_id']
                self.log_test("Send Message", True, 
                            f"Message sent: {result['message']['content'][:30]}...")
                
                # Store message details for later tests
                self.test_message_content = message_data['content']
                self.test_message_sender = self.test_client_id
                
                return True
            else:
                self.log_test("Send Message", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Send Message", False, error=str(e))
            return False
    
    def test_get_order_messages(self):
        """Test getting messages for an order"""
        print("\n=== Testing Get Order Messages ===")
        
        if not self.test_order_id:
            print("❌ No test order available")
            return False
        
        try:
            # Get messages as client
            result = self.server.get_order_messages(self.test_order_id, self.test_client_id, {'limit': 10})
            
            if result.get('success'):
                messages = result.get('messages', [])
                self.log_test("Get Order Messages", True, 
                            f"Found {len(messages)} messages")
                
                if messages:
                    print("   Recent messages:")
                    for i, msg in enumerate(messages[-3:]):  # Show last 3 messages
                        sender = msg.get('sender', {}).get('username', 'Unknown')
                        print(f"     {sender}: {msg['content'][:40]}...")
                
                # Check if we have order info
                if result.get('order'):
                    print(f"   Order: {result['order']['title']}")
                
                # Check if we have other party info
                if result.get('other_party'):
                    print(f"   Other party: {result['other_party']['full_name']}")
                
                return True
            else:
                self.log_test("Get Order Messages", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Order Messages", False, error=str(e))
            return False
    
    def test_mark_messages_as_read(self):
        """Test marking messages as read"""
        print("\n=== Testing Mark Messages as Read ===")
        
        if not self.test_order_id:
            print("❌ No test order available")
            return False
        
        try:
            # First send another message from freelancer to client
            message_data = {
                'content': 'Hello client, I have received your order and will start working on it.',
                'message_type': 'text'
            }
            
            send_result = self.server.send_message(self.test_order_id, self.test_freelancer_id, message_data)
            
            if not send_result.get('success'):
                self.log_test("Send Reply Message", False, error=send_result.get('error'))
                return False
            
            self.log_test("Send Reply Message", True, "Reply message sent")
            
            # Now mark messages as read for client
            result = self.server.mark_messages_as_read(self.test_order_id, self.test_client_id)
            
            if result.get('success'):
                self.log_test("Mark Messages as Read", True, 
                            f"{result.get('count', 0)} messages marked as read")
                return True
            else:
                self.log_test("Mark Messages as Read", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Mark Messages as Read", False, error=str(e))
            return False
    
    def test_send_system_message(self):
        """Test sending a system message"""
        print("\n=== Testing Send System Message ===")
        
        if not self.test_order_id:
            print("❌ No test order available")
            return False
        
        try:
            # Send a system message
            result = self.server.send_system_message(self.test_order_id, 'order_accepted')
            
            if result.get('success'):
                self.log_test("Send System Message", True, "System message sent successfully")
                return True
            else:
                self.log_test("Send System Message", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Send System Message", False, error=str(e))
            return False
    
    def test_get_unread_count(self):
        """Test getting unread message count"""
        print("\n=== Testing Get Unread Count ===")
        
        try:
            # Get unread count for freelancer
            result = self.server.get_unread_count(self.test_freelancer_id)
            
            if result.get('success'):
                unread_count = result.get('unread_count', 0)
                self.log_test("Get Unread Count", True, f"Unread messages: {unread_count}")
                return True
            else:
                self.log_test("Get Unread Count", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Unread Count", False, error=str(e))
            return False
    
    def test_get_all_messages_admin(self):
        """Test getting all messages (admin function)"""
        print("\n=== Testing Get All Messages (Admin) ===")
        
        try:
            result = self.server.get_all_messages({'limit': 5})
            
            if result.get('success'):
                messages = result.get('messages', [])
                total = result.get('pagination', {}).get('total', 0)
                self.log_test("Get All Messages Admin", True, 
                            f"Retrieved {len(messages)} messages (Total: {total})")
                
                if messages:
                    print("   Sample messages:")
                    for i, msg in enumerate(messages[:2]):
                        sender = msg.get('sender', {}).get('username', 'Unknown')
                        receiver = msg.get('receiver', {}).get('username', 'Unknown')
                        print(f"     {sender} → {receiver}: {msg.get('content', '')[:30]}...")
                
                return True
            else:
                self.log_test("Get All Messages Admin", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get All Messages Admin", False, error=str(e))
            return False
    
    def test_get_message_stats(self):
        """Test getting message statistics"""
        print("\n=== Testing Get Message Stats ===")
        
        try:
            result = self.server.get_message_stats()
            
            if result.get('success'):
                stats = result.get('stats', {})
                self.log_test("Get Message Stats", True, 
                            f"Total messages: {stats.get('total_messages', 0)}")
                
                # Print some stats
                print(f"   Total messages: {stats.get('total_messages', 0)}")
                print(f"   Unread messages: {stats.get('unread_messages', 0)}")
                
                if stats.get('messages_by_type'):
                    print("   Messages by type:")
                    for msg_type, count in stats['messages_by_type'].items():
                        print(f"     {msg_type}: {count}")
                
                return True
            else:
                self.log_test("Get Message Stats", False, error=result.get('error'))
                return False
                
        except Exception as e:
            self.log_test("Get Message Stats", False, error=str(e))
            return False
    
    def test_message_flow(self):
        """Test complete message flow"""
        print("\n=== Testing Complete Message Flow ===")
        
        if not self.test_order_id:
            print("❌ No test order available")
            return False
        
        try:
            # Test 1: Client sends initial message
            msg1_data = {
                'content': 'Hi, I wanted to clarify the requirements for my order.',
                'message_type': 'text'
            }
            result1 = self.server.send_message(self.test_order_id, self.test_client_id, msg1_data)
            self.log_test("Flow: Client Message", result1.get('success'), 
                         error=result1.get('error') if not result1.get('success') else None)
            
            # Test 2: Freelancer replies
            msg2_data = {
                'content': 'Sure, please let me know what specific requirements you need clarification on.',
                'message_type': 'text'
            }
            result2 = self.server.send_message(self.test_order_id, self.test_freelancer_id, msg2_data)
            self.log_test("Flow: Freelancer Reply", result2.get('success'),
                         error=result2.get('error') if not result2.get('success') else None)
            
            # Test 3: Client sends another message
            msg3_data = {
                'content': 'I need the design to be in blue theme with modern UI elements.',
                'message_type': 'text'
            }
            result3 = self.server.send_message(self.test_order_id, self.test_client_id, msg3_data)
            self.log_test("Flow: Client Details", result3.get('success'),
                         error=result3.get('error') if not result3.get('success') else None)
            
            # Test 4: Get the conversation
            result4 = self.server.get_order_messages(self.test_order_id, self.test_client_id, {'limit': 10})
            if result4.get('success'):
                msg_count = len(result4.get('messages', []))
                self.log_test("Flow: Get Conversation", True, f"Total messages in conversation: {msg_count}")
            else:
                self.log_test("Flow: Get Conversation", False, error=result4.get('error'))
            
            # Test 5: Mark as read
            result5 = self.server.mark_messages_as_read(self.test_order_id, self.test_freelancer_id)
            self.log_test("Flow: Mark as Read", result5.get('success'),
                         error=result5.get('error') if not result5.get('success') else None)
            
            return True
                
        except Exception as e:
            self.log_test("Message Flow Test", False, error=str(e))
            return False
    
    def test_edge_cases(self):
        """Test edge cases and error conditions"""
        print("\n=== Testing Edge Cases ===")
        
        try:
            # Test 1: Try to get messages for non-existent order
            result1 = self.server.get_order_messages('000000000000000000000000', self.test_client_id)
            if not result1.get('success'):
                self.log_test("Edge: Non-existent Order", True, "Correctly rejected non-existent order")
            else:
                self.log_test("Edge: Non-existent Order", False, "Should have failed for non-existent order")
            
            # Test 2: Try to send message to wrong order
            wrong_order_data = {
                'content': 'This should fail',
                'message_type': 'text'
            }
            # Use a made-up order ID
            result2 = self.server.send_message('000000000000000000000000', self.test_client_id, wrong_order_data)
            if not result2.get('success'):
                self.log_test("Edge: Wrong Order ID", True, "Correctly rejected wrong order ID")
            else:
                self.log_test("Edge: Wrong Order ID", False, "Should have failed for wrong order ID")
            
            # Test 3: Try to access messages without permission
            # Create another user's order (we'll just test with random ID)
            result3 = self.server.get_order_messages(self.test_order_id, '000000000000000000000000')
            if not result3.get('success'):
                self.log_test("Edge: Unauthorized Access", True, "Correctly rejected unauthorized access")
            else:
                self.log_test("Edge: Unauthorized Access", False, "Should have failed for unauthorized access")
            
            return True
                
        except Exception as e:
            self.log_test("Edge Cases Test", False, error=str(e))
            return False
    
    def run_all_tests(self):
        """Run all message service tests"""
        print("=" * 60)
        print("MESSAGE SERVICE TEST SUITE")
        print("=" * 60)
        
        # Wait for server to be ready
        time.sleep(2)
        
        # Setup test order first
        if not self.setup_test_order():
            print("❌ Failed to setup test order. Some tests may fail.")
        
        try:
            # Test basic functionality
            self.test_get_conversations()
            self.test_send_message()
            self.test_get_order_messages()
            self.test_mark_messages_as_read()
            
            # Test system messages
            self.test_send_system_message()
            
            # Test utility functions
            self.test_get_unread_count()
            
            # Test admin functions
            self.test_get_all_messages_admin()
            self.test_get_message_stats()
            
            # Test complete flow
            self.test_message_flow()
            
            # Test edge cases
            self.test_edge_cases()
            
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
        
        # Cleanup (optional - in production you might want to keep test data)
        print("\nNote: Test order and messages were created for testing.")
        print(f"Order ID: {self.test_order_id}")
        print("You may want to clean up test data manually if needed.")
        
        return failed_tests == 0

if __name__ == "__main__":
    # Create test instance
    tester = MessageServiceTest()
    
    # Run all tests
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All message service tests passed!")
        exit(0)
    else:
        print("\n⚠️  Some message service tests failed!")
        exit(1)