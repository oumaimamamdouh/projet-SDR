import xmlrpc.client

# Connect to RPC server
rpc = xmlrpc.client.ServerProxy('http://localhost:8000/RPC2')

# Test user creation
try:
    user_data = {
        'email': 'test@example.com',
        'username': 'testuser',
        'password': 'testpassword123',
        'role': 'client',
        'full_name': 'Test User'
    }
    
    result = rpc.create_user(user_data)
    print("✅ User creation test:", result)
    
except Exception as e:
    print("❌ RPC Test failed:", e)