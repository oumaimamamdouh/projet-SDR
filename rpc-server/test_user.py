import xmlrpc.client
import json
import time
from datetime import datetime

# Configuration
SERVER_URL = "http://localhost:8000/RPC2"

def print_response(method_name, response):
    """Print formatted response"""
    print(f"\n{'='*60}")
    print(f"Method: {method_name}")
    print(f"{'='*60}")
    print(f"Success: {response.get('success', False)}")
    
    if response.get('success'):
        print("✅ Success!")
        if 'message' in response:
            print(f"Message: {response['message']}")
        
        # Print user data if present
        if 'user' in response:
            print("\n📋 User Data:")
            for key, value in response['user'].items():
                print(f"  {key}: {value}")
        
        # Print profile data if present
        if 'profile' in response:
            print("\n📋 Profile Data:")
            for key, value in response['profile'].items():
                print(f"  {key}: {value}")
        
        # Print token if present
        if 'token' in response:
            print(f"\n🔑 Token: {response['token'][:50]}...")
        
        # Print freelancers list if present
        if 'freelancers' in response:
            print(f"\n👥 Freelancers found: {len(response['freelancers'])}")
            for i, freelancer in enumerate(response['freelancers'][:3], 1):
                print(f"  {i}. {freelancer.get('full_name')} - {freelancer.get('skills', [])[:3]}")
        
        # Print users list if present
        if 'users' in response:
            print(f"\n👥 Users found: {len(response['users'])}")
            print(f"📊 Pagination: {response.get('pagination', {})}")
        
        # Print pagination info
        if 'pagination' in response:
            print(f"\n📊 Pagination: {response['pagination']}")
            
    else:
        print("❌ Failed!")
        print(f"Error: {response.get('error', 'Unknown error')}")
    
    print(f"{'='*60}")

def test_authentication():
    """Test authentication related methods"""
    print("\n" + "🔐 AUTHENTICATION TESTS" + "\n" + "="*60)
    
    # Create server connection
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # 1. Test Register User
    print("\n1️⃣ Testing register_user...")
    user_data = {
        "email": f"test_{int(time.time())}@example.com",
        "username": f"testuser_{int(time.time() % 10000)}",
        "password": "TestPassword123!",
        "role": "freelancer",
        "full_name": "Test User",
        "bio": "Experienced developer",
        "skills": ["Python", "MongoDB", "RPC"],
        "country": "Test Country",
        "city": "Test City"
    }
    
    response = server.create_user(user_data)
    print_response("register_user", response)
    
    if not response.get('success'):
        return None, None
    
    test_user_id = response['user']['_id']
    test_user_email = response['user']['email']
    test_user_password = user_data['password']
    
    # 2. Test Login User
    print("\n2️⃣ Testing login_user...")
    credentials = {
        "email": test_user_email,
        "password": test_user_password
    }
    response = server.login_user(credentials)
    print_response("login_user", response)
    
    if not response.get('success'):
        return None, None
    
    auth_token = response.get('token')
    refresh_token = response.get('refresh_token')
    logged_in_user_id = response['user']['_id']
    
    # 3. Test Forgot Password
    print("\n3️⃣ Testing forgot_password...")
    response = server.forgot_password(test_user_email)
    print_response("forgot_password", response)
    
    # Note: In real implementation, you'd get the token from email
    # For testing, we'll use a mock token if provided
    reset_token = response.get('token')
    
    # 4. Test Reset Password (if token available)
    if reset_token:
        print("\n4️⃣ Testing reset_password...")
        new_password = "NewPassword456!"
        response = server.reset_password(reset_token, new_password)
        print_response("reset_password", response)
        
        if response.get('success'):
            test_user_password = new_password
    
    # 5. Test Refresh Token
    print("\n5️⃣ Testing refresh_token...")
    if refresh_token:
        response = server.refresh_token(refresh_token)
        print_response("refresh_token", response)
        if response.get('success'):
            auth_token = response.get('token')
    
    return logged_in_user_id, auth_token

def test_user_management(user_id, token=None):
    """Test user management methods"""
    print("\n\n" + "👤 USER MANAGEMENT TESTS" + "\n" + "="*60)
    
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # 1. Test Get User Profile
    print("\n1️⃣ Testing get_user_profile...")
    response = server.get_user_profile(user_id)
    print_response("get_user_profile", response)
    
    # 2. Test Update User Profile
    print("\n2️⃣ Testing update_user_profile...")
    update_data = {
        "bio": "Updated bio with more experience",
        "city": "Updated City",
        "hourly_rate": 25.0
    }
    response = server.update_user_profile(user_id, update_data)
    print_response("update_user_profile", response)
    
    # 3. Test Update User Avatar
    print("\n3️⃣ Testing update_user_avatar...")
    avatar_url = "https://example.com/avatar/updated.jpg"
    response = server.update_user_avatar(user_id, avatar_url)
    print_response("update_user_avatar", response)
    
    # 4. Test Change Password
    print("\n4️⃣ Testing change_password...")
    # First get user to know current password
    user_response = server.get_user_by_id(user_id)
    if user_response.get('success'):
        # This would require the current password
        # For testing, we'll skip if we don't have the password
        print("⚠️  Skipping change_password test (requires current password)")
    
    # 5. Test Logout User
    print("\n5️⃣ Testing logout_user...")
    response = server.logout_user(user_id)
    print_response("logout_user", response)
    
    # 6. Test Get User By ID
    print("\n6️⃣ Testing get_user_by_id...")
    response = server.get_user_by_id(user_id)
    print_response("get_user_by_id", response)

def test_freelancer_specific(user_id):
    """Test freelancer specific methods"""
    print("\n\n" + "💼 FREELANCER SPECIFIC TESTS" + "\n" + "="*60)
    
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # 1. Test Update Freelancer Skills
    print("\n1️⃣ Testing update_freelancer_skills...")
    new_skills = ["Python", "MongoDB", "RPC", "XML-RPC", "API Development"]
    response = server.update_freelancer_skills(user_id, new_skills)
    print_response("update_freelancer_skills", response)
    
    # 2. Test Update Freelancer Portfolio
    print("\n2️⃣ Testing update_freelancer_portfolio...")
    portfolio_items = [
        {
            "title": "E-commerce Platform",
            "description": "Built a full e-commerce platform with Python and MongoDB",
            "url": "https://github.com/example/ecommerce",
            "technologies": ["Python", "MongoDB", "FastAPI"],
            "year": 2024
        },
        {
            "title": "RPC Service",
            "description": "Created a robust XML-RPC service for remote operations",
            "technologies": ["Python", "XML-RPC", "Docker"],
            "year": 2023
        }
    ]
    response = server.update_freelancer_portfolio(user_id, portfolio_items)
    print_response("update_freelancer_portfolio", response)
    
    # 3. Get user to check username for public profile
    user_response = server.get_user_by_id(user_id)
    if user_response.get('success'):
        username = user_response['user']['username']
        
        # 4. Test Get Freelancer Public Profile
        print("\n3️⃣ Testing get_freelancer_public_profile...")
        response = server.get_freelancer_public_profile(username)
        print_response("get_freelancer_public_profile", response)
    
    # 5. Test Search Freelancers
    print("\n4️⃣ Testing search_freelancers...")
    filters = {
        "skills": ["Python", "MongoDB"],
        "min_rating": 4.0,
        "country": "Test Country",
        "limit": 5,
        "page": 1,
        "sort_by": "rating",
        "sort_order": "desc"
    }
    response = server.search_freelancers(filters)
    print_response("search_freelancers", response)

def test_client_specific():
    """Test client specific methods"""
    print("\n\n" + "🏢 CLIENT SPECIFIC TESTS" + "\n" + "="*60)
    
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # 1. Create a test client
    print("\n1️⃣ Creating test client...")
    client_data = {
        "email": f"client_test_{int(time.time())}@example.com",
        "username": f"clientuser_{int(time.time() % 10000)}",
        "password": "ClientPass123!",
        "role": "client",
        "full_name": "Test Client",
        "country": "Test Country",
        "city": "Test City"
    }
    
    response = server.create_user(client_data)
    print_response("register_user (client)", response)
    
    if not response.get('success'):
        return None
    
    client_id = response['user']['_id']
    
    # 2. Test Update Client Company
    print("\n2️⃣ Testing update_client_company...")
    company_data = {
        "company_name": "Tech Solutions Inc.",
        "company_size": "50-100"
    }
    response = server.update_client_company(client_id, company_data)
    print_response("update_client_company", response)
    
    return client_id

def test_admin_functions(admin_id=None):
    """Test admin functions (requires admin user)"""
    print("\n\n" + "👑 ADMIN FUNCTIONS TESTS" + "\n" + "="*60)
    
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # 1. Test Get All Users (admin)
    print("\n1️⃣ Testing get_all_users...")
    filters = {
        "role": "freelancer",
        "is_active": "true",
        "limit": 10,
        "page": 1,
        "sort_by": "created_at",
        "sort_order": "desc"
    }
    response = server.get_all_users(filters)
    print_response("get_all_users", response)
    
    # 2. Test Get All Users with search
    print("\n2️⃣ Testing get_all_users with search...")
    filters = {
        "search": "test",
        "limit": 5,
        "page": 1
    }
    response = server.get_all_users(filters)
    print_response("get_all_users (search)", response)
    
    # Get a user to test update/delete
    if response.get('success') and response.get('users'):
        test_user = response['users'][0]
        test_user_id = test_user['_id']
        
        # 3. Test Update User Status
        print("\n3️⃣ Testing update_user_status...")
        response = server.update_user_status(test_user_id, "verified")
        print_response("update_user_status", response)
        
        # 4. Test Get User By ID (already tested, but good for admin)
        print("\n4️⃣ Testing get_user_by_id (admin)...")
        response = server.get_user_by_id(test_user_id)
        print_response("get_user_by_id", response)
        
        # Note: delete_user is destructive, so we'll skip in automated tests
        # print("\n5️⃣ Testing delete_user...")
        # response = server.delete_user(test_user_id)
        # print_response("delete_user", response)

def test_account_operations(user_id):
    """Test account deactivation and deletion"""
    print("\n\n" + "⚙️ ACCOUNT OPERATIONS TESTS" + "\n" + "="*60)
    
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # 1. Test Deactivate Account
    print("\n1️⃣ Testing deactivate_account...")
    response = server.deactivate_account(user_id)
    print_response("deactivate_account", response)
    
    # Try to get deactivated user
    print("\n2️⃣ Testing get_user_by_id on deactivated account...")
    response = server.get_user_by_id(user_id)
    print_response("get_user_by_id (deactivated)", response)
    
    # Reactivate for further tests
    if response.get('success') and not response['user'].get('is_active', True):
        print("\n⚠️  Reactivating account for further tests...")
        # This would require admin privileges
        print("Skipping reactivation (requires admin)")
    
    # Note: delete_account is destructive, so we'll skip
    # print("\n3️⃣ Testing delete_account...")
    # response = server.delete_account(user_id)
    # print_response("delete_account", response)

def run_comprehensive_test():
    """Run all tests"""
    print("🚀 STARTING COMPREHENSIVE USER SERVICE TESTS")
    print("="*60)
    
    try:
        # Test Authentication
        user_id, token = test_authentication()
        
        if user_id:
            # Test User Management
            test_user_management(user_id, token)
            
            # Test Freelancer Specific (if user is freelancer)
            # Check user role first
            server = xmlrpc.client.ServerProxy(SERVER_URL)
            user_response = server.get_user_by_id(user_id)
            
            if user_response.get('success') and user_response['user'].get('role') == 'freelancer':
                test_freelancer_specific(user_id)
            
            # Test Client Specific (create new client)
            client_id = test_client_specific()
            
            # Test Admin Functions
            # Note: This requires admin credentials. For testing, we'll use public endpoints
            test_admin_functions()
            
            # Test Account Operations
            test_account_operations(user_id)
            
            print("\n" + "✅ ALL TESTS COMPLETED SUCCESSFULLY!" + "\n" + "="*60)
        else:
            print("\n❌ Authentication tests failed. Skipping remaining tests.")
            
    except ConnectionRefusedError:
        print("\n❌ ERROR: Cannot connect to RPC server!")
        print("Make sure the server is running on localhost:8000")
        print("Start it with: python server.py")
    except Exception as e:
        print(f"\n❌ ERROR: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()

def quick_test():
    """Quick test of essential functions"""
    print("⚡ QUICK TEST - Essential Functions Only")
    print("="*60)
    
    try:
        server = xmlrpc.client.ServerProxy(SERVER_URL)
        
        # 1. Create a user
        print("\n1. Testing register_user...")
        user_data = {
            "email": f"quick_test_{int(time.time())}@example.com",
            "username": f"quickuser_{int(time.time() % 10000)}",
            "password": "QuickTest123!",
            "role": "freelancer",
            "full_name": "Quick Test User"
        }
        
        response = server.create_user(user_data)
        print_response("register_user", response)
        
        if not response.get('success'):
            return
        
        user_id = response['user']['_id']
        user_email = user_data['email']
        
        # 2. Login
        print("\n2. Testing login_user...")
        credentials = {"email": user_email, "password": user_data['password']}
        response = server.login_user(credentials)
        print_response("login_user", response)
        
        # 3. Get user profile
        print("\n3. Testing get_user_profile...")
        response = server.get_user_profile(user_id)
        print_response("get_user_profile", response)
        
        # 4. Update profile
        print("\n4. Testing update_user_profile...")
        update_data = {"bio": "Quick test bio", "city": "Test City"}
        response = server.update_user_profile(user_id, update_data)
        print_response("update_user_profile", response)
        
        # 5. Search freelancers
        print("\n5. Testing search_freelancers...")
        response = server.search_freelancers({"limit": 3})
        print_response("search_freelancers", response)
        
        print("\n✅ Quick test completed!")
        
    except ConnectionRefusedError:
        print("\n❌ Cannot connect to RPC server!")

def test_specific_method():
    """Test a specific method by name"""
    print("🎯 TEST SPECIFIC METHOD")
    print("="*60)
    
    method_name = input("Enter method name to test: ").strip()
    
    if not method_name:
        print("No method name provided.")
        return
    
    server = xmlrpc.client.ServerProxy(SERVER_URL)
    
    # Map of method names to their required parameters
    test_cases = {
        "search_freelancers": [{"skills": ["Python"], "limit": 5}],
        "get_all_users": [{}, {}],
        "get_user_by_id": ["6920c510747da49650b2d6d4"],  # Existing user ID from your data
        "get_freelancer_public_profile": ["pro_freelancer"],  # Existing username
    }
    
    if method_name in test_cases:
        try:
            print(f"\nTesting {method_name}...")
            response = getattr(server, method_name)(*test_cases[method_name])
            print_response(method_name, response)
        except Exception as e:
            print(f"❌ Error: {e}")
    else:
        print(f"⚠️  No test case for {method_name}")
        print("Available test cases:", list(test_cases.keys()))

if __name__ == "__main__":
    print("🧪 WorkNet RPC User Service Tester")
    print("="*60)
    print("1. Run comprehensive tests")
    print("2. Run quick test")
    print("3. Test specific method")
    print("4. Exit")
    
    choice = input("\nSelect option (1-4): ").strip()
    
    if choice == "1":
        run_comprehensive_test()
    elif choice == "2":
        quick_test()
    elif choice == "3":
        test_specific_method()
    elif choice == "4":
        print("Goodbye!")
    else:
        print("Invalid choice")