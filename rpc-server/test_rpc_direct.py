# test_rpc_direct.py
import xmlrpc.client
import json

# Connect to RPC server
proxy = xmlrpc.client.ServerProxy('http://localhost:8000/')

print("🔍 Testing RPC connection...")
methods = proxy.system.listMethods()
print(f"✅ Available methods: {len(methods)}")
print(f"Has update_category_order: {'update_category_order' in methods}")

# Test with simple data
test_data = [
    {'id': '692dbb7515355c3dedcfb35e', 'order': 100},
    {'id': '692dbb7515355c3dedcfb35f', 'order': 200}
]

print(f"\n📤 Sending test data:")
print(f"Data: {test_data}")
print(f"Data type: {type(test_data)}")
print(f"First item type: {type(test_data[0])}")

try:
    print(f"\n🔄 Calling update_category_order...")
    result = proxy.update_category_order(test_data)
    print(f"✅ Result: {result}")
except Exception as e:
    print(f"❌ Error: {e}")
    print(f"Error type: {type(e)}")

# Test with different data format
print(f"\n🔧 Testing with different formats...")

# Format 1: Simple dicts
format1 = [
    {'id': '692dbb7515355c3dedcfb35e', 'order': 1},
    {'id': '692dbb7515355c3dedcfb35f', 'order': 2}
]

# Format 2: Using _id
format2 = [
    {'_id': '692dbb7515355c3dedcfb35e', 'sort_order': 10},
    {'_id': '692dbb7515355c3dedcfb35f', 'sort_order': 20}
]

# Format 3: Mixed
format3 = [
    {'category_id': '692dbb7515355c3dedcfb35e', 'order': 100},
    {'category_id': '692dbb7515355c3dedcfb35f', 'order': 200}
]

for i, data in enumerate([format1, format2, format3], 1):
    print(f"\n📋 Testing format {i}:")
    print(f"Data: {data}")
    try:
        result = proxy.update_category_order(data)
        print(f"✅ Success: {result}")
    except Exception as e:
        print(f"❌ Error: {e}")