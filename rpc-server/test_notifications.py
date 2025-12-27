#!/usr/bin/env python3
"""
test_notifications.py - Comprehensive testing for NotificationService
"""

import xmlrpc.client
import time
import json
from datetime import datetime, timedelta

class NotificationTester:
    """Test all notification functions"""
    
    def __init__(self, server_url='http://localhost:8000'):
        self.server = xmlrpc.client.ServerProxy(server_url)
        self.test_results = []
        
        # Test data from your database
        self.client_id = '6920c49a747da49650b2d6d1'  # client1@example.com
        self.freelancer_id = '6920c510747da49650b2d6d4'  # freelancer1@example.com
        self.admin_id = '6920c518747da49650b2d6d5'  # admin@example.com
        self.freelancer2_id = '692a3bd6f3be085d2499e02d'  # test_1ace5cfd@example.com
        self.client2_id = '692a3beaf3be085d2499e030'  # client_bb50a308@example.com
        
        # Order IDs for testing
        self.order_id = '6930d6219ca9d71a5da3111b'  # ORD-2025-0001
        self.order2_id = '6930d6229ca9d71a5da3111c'  # ORD-2025-0002
        
        # Tracking created notification IDs
        self.created_notification_ids = []
    
    def run_tests(self):
        """Run all notification tests"""
        print("🧪 Starting Notification Service Tests")
        print("=" * 60)
        
        # Clear any existing notifications for test users first
        self.cleanup_test_notifications()
        
        # Run test suites
        self.test_user_functions()
        self.test_system_functions()
        self.test_admin_functions()
        self.test_helper_functions()
        self.test_error_cases()
        
        # Print summary
        self.print_summary()
        
        # Cleanup
        self.cleanup_test_data()
    
    def cleanup_test_notifications(self):
        """Clean up notifications from previous test runs"""
        print("\n🧹 Cleaning up old test notifications...")
        try:
            # Get all notifications for test users
            users = [self.client_id, self.freelancer_id, self.freelancer2_id, self.client2_id]
            for user_id in users:
                result = self.server.get_user_notifications(user_id, {'limit': 100})
                if result.get('success'):
                    for notification in result.get('notifications', []):
                        if 'test' in notification.get('title', '').lower() or 'test' in notification.get('message', '').lower():
                            self.server.delete_notification(notification['_id'], user_id)
            print("✅ Cleanup completed")
        except Exception as e:
            print(f"⚠️  Cleanup warning: {e}")
    
    def cleanup_test_data(self):
        """Clean up test data after tests"""
        print("\n🧹 Cleaning up test notifications...")
        try:
            for notification_id in self.created_notification_ids[:]:  # Copy list for iteration
                # Try to delete with different user IDs since we don't know which user created it
                for user_id in [self.client_id, self.freelancer_id, self.admin_id, self.freelancer2_id, self.client2_id]:
                    try:
                        result = self.server.delete_notification(notification_id, user_id)
                        if result.get('success'):
                            self.created_notification_ids.remove(notification_id)
                            break
                    except:
                        pass
        except Exception as e:
            print(f"⚠️  Cleanup warning: {e}")
    
    def test_user_functions(self):
        """Test user notification functions"""
        print("\n👤 Testing User Functions")
        print("-" * 40)
        
        # 1. Create test notifications first
        print("\n1. Creating test notifications...")
        test_notifications = [
            {
                'user_id': self.client_id,
                'type': 'order_received',
                'title': 'Test Order Notification',
                'message': 'This is a test order notification for the client',
                'action_url': f'/orders/{self.order_id}',
                'related_entity_type': 'order',
                'related_entity_id': self.order_id
            },
            {
                'user_id': self.freelancer_id,
                'type': 'payment_received',
                'title': 'Test Payment Notification',
                'message': 'Test payment of $150 has been received',
                'action_url': '/earnings',
                'related_entity_type': 'order',
                'related_entity_id': self.order_id
            },
            {
                'user_id': self.client_id,
                'type': 'new_message',
                'title': 'Test Message Notification',
                'message': 'You have a new test message',
                'action_url': f'/messages/{self.order_id}',
                'related_entity_type': 'order',
                'related_entity_id': self.order_id
            }
        ]
        
        for notification_data in test_notifications:
            result = self.server.create_notification(notification_data)
            if result.get('success'):
                self.created_notification_ids.append(result['notification']['_id'])
                print(f"✅ Created: {notification_data['title']}")
            else:
                print(f"❌ Failed: {result.get('error')}")
        
        # Wait a moment for notifications to be processed
        time.sleep(1)
        
        # 2. Test get_user_notifications
        print("\n2. Testing get_user_notifications...")
        result = self.server.get_user_notifications(self.client_id)
        self.check_test("get_user_notifications - basic", result.get('success', False))
        if result.get('success'):
            print(f"   Found {len(result.get('notifications', []))} notifications")
            print(f"   Total: {result.get('total', 0)} notifications")
        
        # 3. Test get_user_notifications with filters
        print("\n3. Testing get_user_notifications with filters...")
        filters = {
            'is_read': False,
            'limit': 5,
            'page': 1
        }
        result = self.server.get_user_notifications(self.client_id, filters)
        self.check_test("get_user_notifications with filters", result.get('success', False))
        if result.get('success'):
            unread = len([n for n in result.get('notifications', []) if not n.get('is_read', True)])
            print(f"   Found {unread} unread notifications")
        
        # 4. Test get_unread_notification_count
        print("\n4. Testing get_unread_notification_count...")
        result = self.server.get_unread_notification_count(self.client_id)
        self.check_test("get_unread_notification_count", result.get('success', False))
        if result.get('success'):
            print(f"   Unread count: {result.get('count', 0)}")
            # Save first notification for mark_as_read test
            if result.get('count', 0) > 0:
                notifications_result = self.server.get_user_notifications(self.client_id, {'is_read': False})
                if notifications_result.get('success') and notifications_result.get('notifications'):
                    self.test_notification_id = notifications_result['notifications'][0]['_id']
        
        # 5. Test mark_notification_as_read
        if hasattr(self, 'test_notification_id'):
            print("\n5. Testing mark_notification_as_read...")
            result = self.server.mark_notification_as_read(self.test_notification_id, self.client_id)
            self.check_test("mark_notification_as_read", result.get('success', False))
            if result.get('success'):
                print(f"   Marked notification {self.test_notification_id[:8]}... as read")
        
        # 6. Test mark_all_notifications_as_read
        print("\n6. Testing mark_all_notifications_as_read...")
        result = self.server.mark_all_notifications_as_read(self.client_id)
        self.check_test("mark_all_notifications_as_read", result.get('success', False))
        if result.get('success'):
            print(f"   Marked {result.get('count', 0)} notifications as read")
        
        # 7. Verify all are read
        print("\n7. Verifying all notifications are read...")
        result = self.server.get_unread_notification_count(self.client_id)
        if result.get('success'):
            print(f"   Unread count after mark_all: {result.get('count', 0)}")
        
        # 8. Test delete_notification
        print("\n8. Testing delete_notification...")
        # Create one more notification to delete
        delete_test_data = {
            'user_id': self.client_id,
            'type': 'system_announcement',
            'title': 'Delete Test Notification',
            'message': 'This notification will be deleted'
        }
        create_result = self.server.create_notification(delete_test_data)
        if create_result.get('success'):
            delete_id = create_result['notification']['_id']
            self.created_notification_ids.append(delete_id)
            result = self.server.delete_notification(delete_id, self.client_id)
            self.check_test("delete_notification", result.get('success', False))
            if result.get('success'):
                print(f"   Deleted notification {delete_id[:8]}...")
    
    def test_system_functions(self):
        """Test system notification functions"""
        print("\n🔧 Testing System Functions")
        print("-" * 40)
        
        # 1. Test create_notification (already tested in user functions)
        print("\n1. Testing create_notification with different types...")
        notification_types = ['order_received', 'payment_received', 'new_message', 'system_announcement']
        for ntype in notification_types:
            data = {
                'user_id': self.freelancer2_id,
                'type': ntype,
                'title': f'Test {ntype} Notification',
                'message': f'This is a test {ntype} notification',
                'action_url': f'/{ntype}s'
            }
            result = self.server.create_notification(data)
            success = result.get('success', False)
            self.check_test(f"create_notification - {ntype}", success)
            if success:
                self.created_notification_ids.append(result['notification']['_id'])
        
        # 2. Test send_bulk_notification
        print("\n2. Testing send_bulk_notification...")
        user_ids = [self.client_id, self.freelancer_id, self.freelancer2_id]
        bulk_data = {
            'type': 'platform_update',
            'title': 'System Maintenance Notice',
            'message': 'The platform will be down for maintenance on Friday.',
            'action_url': '/announcements',
            'metadata': {'maintenance_date': '2025-12-15'}
        }
        result = self.server.send_bulk_notification(user_ids, bulk_data)
        self.check_test("send_bulk_notification", result.get('success', False))
        if result.get('success'):
            print(f"   Sent to {result.get('count', 0)} users")
    
    def test_admin_functions(self):
        """Test admin notification functions"""
        print("\n👑 Testing Admin Functions")
        print("-" * 40)
        
        # 1. Test get_all_notifications
        print("\n1. Testing get_all_notifications...")
        result = self.server.get_all_notifications({'limit': 10})
        self.check_test("get_all_notifications", result.get('success', False))
        if result.get('success'):
            print(f"   Total notifications in system: {result.get('total', 0)}")
            if 'stats' in result:
                stats = result['stats']
                print(f"   Unread: {stats.get('unread', 0)}")
                print(f"   By type: {stats.get('by_type', {})}")
        
        # 2. Test get_all_notifications with filters
        print("\n2. Testing get_all_notifications with filters...")
        filters = {
            'type': 'order_received',
            'is_read': False,
            'limit': 5
        }
        result = self.server.get_all_notifications(filters)
        self.check_test("get_all_notifications with filters", result.get('success', False))
        
        # 3. Test send_platform_notification
        print("\n3. Testing send_platform_notification...")
        platform_data = {
            'type': 'system_announcement',
            'title': 'Important Platform Update',
            'message': 'New features have been released! Check them out.',
            'action_url': '/updates',
            'metadata': {'version': '2.0.0', 'release_date': '2025-12-01'}
        }
        result = self.server.send_platform_notification(platform_data)
        self.check_test("send_platform_notification", result.get('success', False))
        if result.get('success'):
            print(f"   Platform notification sent to {result.get('count', 0)} users")
    
    def test_helper_functions(self):
        """Test helper notification functions"""
        print("\n🛠️  Testing Helper Functions")
        print("-" * 40)
        
        # 1. Test notify_order_received
        print("\n1. Testing notify_order_received...")
        result = self.server.notify_order_received(
            self.freelancer2_id,
            self.order_id,
            'Python RPC Development Service'
        )
        self.check_test("notify_order_received", result.get('success', False))
        if result.get('success'):
            self.created_notification_ids.append(result['notification']['_id'])
            print(f"   Notified freelancer of new order")
        
        # 2. Test notify_order_accepted
        print("\n2. Testing notify_order_accepted...")
        result = self.server.notify_order_accepted(self.client_id, self.order_id)
        self.check_test("notify_order_accepted", result.get('success', False))
        if result.get('success'):
            self.created_notification_ids.append(result['notification']['_id'])
            print(f"   Notified client of order acceptance")
        
        # 3. Test notify_order_delivered
        print("\n3. Testing notify_order_delivered...")
        result = self.server.notify_order_delivered(self.client2_id, self.order2_id)
        self.check_test("notify_order_delivered", result.get('success', False))
        if result.get('success'):
            self.created_notification_ids.append(result['notification']['_id'])
            print(f"   Notified client of order delivery")
        
        # 4. Test notify_payment_received
        print("\n4. Testing notify_payment_received...")
        result = self.server.notify_payment_received(self.freelancer_id, self.order_id, 150.0)
        self.check_test("notify_payment_received", result.get('success', False))
        if result.get('success'):
            self.created_notification_ids.append(result['notification']['_id'])
            print(f"   Notified freelancer of $150 payment")
        
        # 5. Test notify_new_message
        print("\n5. Testing notify_new_message...")
        result = self.server.notify_new_message(
            self.client_id,
            'Freelancer One',
            self.order_id
        )
        self.check_test("notify_new_message", result.get('success', False))
        if result.get('success'):
            self.created_notification_ids.append(result['notification']['_id'])
            print(f"   Notified client of new message from Freelancer One")
        
        # 6. Test cleanup_old_notifications
        print("\n6. Testing cleanup_old_notifications...")
        result = self.server.cleanup_old_notifications(1)  # Clean up notifications older than 1 day
        self.check_test("cleanup_old_notifications", result.get('success', False))
        if result.get('success'):
            print(f"   Cleaned up {result.get('count', 0)} old notifications")
    
    def test_error_cases(self):
        """Test error cases and edge cases"""
        print("\n⚠️  Testing Error Cases")
        print("-" * 40)
        
        # 1. Test with invalid user ID
        print("\n1. Testing with invalid user ID...")
        result = self.server.get_user_notifications('invalid_user_id')
        self.check_test("get_user_notifications with invalid ID", not result.get('success', True))
        if not result.get('success'):
            print(f"   Expected error: {result.get('error', 'No error returned')}")
        
        # 2. Test mark_as_read with wrong user
        print("\n2. Testing mark_as_read with wrong user...")
        if hasattr(self, 'test_notification_id'):
            result = self.server.mark_notification_as_read(self.test_notification_id, 'wrong_user_id')
            self.check_test("mark_as_read with wrong user", not result.get('success', True))
        
        # 3. Test delete with wrong user
        print("\n3. Testing delete_notification with wrong user...")
        # Create a notification first
        test_data = {
            'user_id': self.client_id,
            'type': 'test',
            'title': 'Error Test',
            'message': 'Testing error cases'
        }
        create_result = self.server.create_notification(test_data)
        if create_result.get('success'):
            test_id = create_result['notification']['_id']
            self.created_notification_ids.append(test_id)
            result = self.server.delete_notification(test_id, self.freelancer_id)  # Wrong user
            self.check_test("delete_notification with wrong user", not result.get('success', True))
        
        # 4. Test create_notification with missing fields
        print("\n4. Testing create_notification with missing fields...")
        invalid_data = {
            'user_id': self.client_id,
            'type': 'test'
            # Missing title and message
        }
        result = self.server.create_notification(invalid_data)
        self.check_test("create_notification with missing fields", not result.get('success', True))
        
        # 5. Test get_user_notifications with invalid filters
        print("\n5. Testing get_user_notifications with invalid filters...")
        result = self.server.get_user_notifications(self.client_id, {'invalid_filter': 'value'})
        self.check_test("get_user_notifications with invalid filters", result.get('success', False))
    
    def check_test(self, test_name, condition):
        """Check test result and add to results"""
        if condition:
            self.test_results.append((test_name, True))
            print(f"   ✅ {test_name}")
        else:
            self.test_results.append((test_name, False))
            print(f"   ❌ {test_name}")
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for _, success in self.test_results if success)
        total = len(self.test_results)
        
        print(f"\nTotal Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total*100):.1f}%")
        
        if total - passed > 0:
            print("\n❌ Failed Tests:")
            for test_name, success in self.test_results:
                if not success:
                    print(f"  - {test_name}")
        
        print("\n" + "=" * 60)
        if passed == total:
            print("🎉 ALL TESTS PASSED!")
        else:
            print("⚠️  Some tests failed. Check the failed tests above.")
        print("=" * 60)

def quick_test():
    """Quick test to verify server is responding"""
    print("🔍 Running Quick Connection Test...")
    try:
        server = xmlrpc.client.ServerProxy('http://localhost:8000')
        
        # Test connection
        methods = server.system.listMethods()
        print(f"✅ Connected to RPC server")
        print(f"📡 Available methods: {len(methods)}")
        
        # Check if notification methods exist
        notification_methods = [m for m in methods if 'notification' in m.lower()]
        print(f"🔔 Notification methods: {len(notification_methods)}")
        
        # Test a simple notification method
        print("\n🧪 Testing get_unread_notification_count...")
        # Using a test user ID from your data
        test_user_id = '6920c49a747da49650b2d6d1'  # client1@example.com
        result = server.get_unread_notification_count(test_user_id)
        
        if result.get('success'):
            print(f"✅ get_unread_notification_count works!")
            print(f"   Count: {result.get('count', 0)}")
        else:
            print(f"⚠️  Method returned error: {result.get('error', 'Unknown error')}")
        
        return True
    except ConnectionRefusedError:
        print("❌ Could not connect to RPC server. Make sure server.py is running.")
        print("   Run: python server.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 WorkNet Notification Service Tester")
    print("=" * 60)
    
    # First, run quick connection test
    if not quick_test():
        print("\n❌ Cannot proceed with tests. Please fix connection issues first.")
        exit(1)
    
    print("\n" + "=" * 60)
    print("Starting comprehensive notification tests...")
    print("=" * 60)
    
    # Run comprehensive tests
    tester = NotificationTester()
    
    try:
        tester.run_tests()
        
        print("\n📝 Test Results Summary:")
        print(f"   Created {len(tester.created_notification_ids)} test notifications")
        print(f"   Cleaned up {len(tester.created_notification_ids)} test notifications")
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
    except Exception as e:
        print(f"\n❌ Unexpected error during tests: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n🧹 Cleaning up...")
    tester.cleanup_test_data()
    
    print("\n✅ Testing complete!")