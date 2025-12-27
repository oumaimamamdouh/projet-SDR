# test_xmlrpc_serialization.py
import xmlrpc.client
import xml.etree.ElementTree as ET

# Create a simple server to see what XML is generated
class TestServer:
    def test_method(self, data):
        print(f"\n📥 Received in Python:")
        print(f"Type: {type(data)}")
        print(f"Data: {data}")
        
        if isinstance(data, list):
            print(f"List length: {len(data)}")
            for i, item in enumerate(data):
                print(f"  Item {i}: {item}, type: {type(item)}")
                if hasattr(item, 'items'):
                    item_dict = dict(item)
                    print(f"    As dict: {item_dict}")
                    for key, value in item_dict.items():
                        print(f"      {key}: {repr(value)} (type: {type(value)})")
        return {'success': True, 'data': str(data)}

# Test what JavaScript might be sending
print("🔍 Testing XML-RPC serialization...")

# Simulate what might come from JavaScript
test_cases = [
    # Case 1: Regular dict
    [{'id': '692dbb7515355c3dedcfb35e', 'order': 100}],
    
    # Case 2: XML-RPC OrderedDict (what actually comes through)
    [xmlrpc.client.OrderedDict([('id', '692dbb7515355c3dedcfb35e'), ('order', 100)])],
    
    # Case 3: With string IDs
    [{'id': str('692dbb7515355c3dedcfb35e'), 'order': 100}],
]

server = TestServer()
proxy = xmlrpc.client.ServerProxy('http://localhost:8000/')

for i, test_case in enumerate(test_cases, 1):
    print(f"\n🔬 Test case {i}:")
    print(f"Input: {test_case}")
    print(f"Input type: {type(test_case)}")
    
    # Try with local server first
    try:
        result = server.test_method(test_case)
        print(f"Local result: {result}")
    except Exception as e:
        print(f"Local error: {e}")
    
    # Try with actual RPC server
    try:
        result = proxy.update_category_order(test_case)
        print(f"RPC result: {result}")
    except Exception as e:
        print(f"RPC error: {e}")