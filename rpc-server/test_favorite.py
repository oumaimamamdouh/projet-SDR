# # test_favorites.py
# import sys
# import os
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# from bson import ObjectId
# from datetime import datetime
# from services.favorites_service import FavoriteService

# def print_test_result(test_name, result):
#     """Helper function to print test results"""
#     print(f"\n{'='*60}")
#     print(f"Test: {test_name}")
#     print(f"{'='*60}")
#     if result.get('success'):
#         print(f"✅ SUCCESS: {result.get('message', 'Test passed')}")
#         if 'favorite_id' in result:
#             print(f"   Favorite ID: {result['favorite_id']}")
#         if 'is_favorite' in result:
#             print(f"   Is Favorite: {result['is_favorite']}")
#         if 'count' in result:
#             print(f"   Count: {result['count']}")
#         if 'deleted_count' in result:
#             print(f"   Deleted: {result['deleted_count']}")
#         if 'favorites' in result:
#             print(f"   Favorites found: {len(result['favorites'])}")
#             if result['favorites']:
#                 print(f"   First gig: {result['favorites'][0]['gig']['title']}")
#     else:
#         print(f"❌ FAILED: {result.get('error', 'Unknown error')}")
#     return result.get('success', False)

# def main():
#     print("🚀 Starting Favorites Service Tests")
#     print("=" * 60)
    
#     # Initialize service
#     service = FavoriteService()
    
#     # Test data from your MongoDB
#     TEST_CLIENT_ID = "6920c49a747da49650b2d6d1"  # client1@example.com
#     TEST_FREELANCER_ID = "6920c510747da49650b2d6d4"  # freelancer1@example.com
#     TEST_GIG_ID = "692a3be1f3be085d2499e02e"  # Python RPC Development Service
#     TEST_GIG_ID_2 = "692a3becf3be085d2499e031"  # Debug Gig
#     TEST_INVALID_ID = "invalid_id_123"
#     TEST_NONEXISTENT_ID = "692a3be1f3be085d2499e0ff"  # Non-existent ID
    
#     passed_tests = 0
#     total_tests = 0
    
#     # Test 1: Add to favorites
#     print("\n📌 Test 1: Add gig to favorites")
#     result = service.add_to_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
#     total_tests += 1
#     if print_test_result("Add to favorites", result):
#         passed_tests += 1
#         favorite_id = result.get('favorite_id')
    
#     # Test 2: Add same gig again (should fail)
#     print("\n📌 Test 2: Add duplicate favorite")
#     result = service.add_to_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Duplicate favorite prevented", result)
    
#     # Test 3: Add another gig to favorites
#     print("\n📌 Test 3: Add another gig to favorites")
#     result = service.add_to_favorites(TEST_CLIENT_ID, TEST_GIG_ID_2)
#     total_tests += 1
#     if print_test_result("Add second favorite", result):
#         passed_tests += 1
    
#     # Test 4: Add with invalid user ID
#     print("\n📌 Test 4: Add with invalid user ID")
#     result = service.add_to_favorites(TEST_INVALID_ID, TEST_GIG_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Invalid user ID validation", result)
    
#     # Test 5: Add with invalid gig ID
#     print("\n📌 Test 5: Add with invalid gig ID")
#     result = service.add_to_favorites(TEST_CLIENT_ID, TEST_INVALID_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Invalid gig ID validation", result)
    
#     # Test 6: Add with non-existent gig
#     print("\n📌 Test 6: Add non-existent gig")
#     result = service.add_to_favorites(TEST_CLIENT_ID, TEST_NONEXISTENT_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Non-existent gig validation", result)
    
#     # Test 7: Check if gig is favorite
#     print("\n📌 Test 7: Check if gig is favorite (should be True)")
#     result = service.is_favorite(TEST_CLIENT_ID, TEST_GIG_ID)
#     total_tests += 1
#     if result.get('success') and result.get('is_favorite'):
#         passed_tests += 1
#     print_test_result("Is favorite check", result)
    
#     # Test 8: Check if non-favorite gig is favorite
#     print("\n📌 Test 8: Check if non-added gig is favorite (should be False)")
#     # Get a gig that's not in favorites (use freelancer's gig)
#     result = service.is_favorite(TEST_CLIENT_ID, "692a3becf3be085d2499e031")
#     total_tests += 1
#     if result.get('success') and not result.get('is_favorite'):
#         passed_tests += 1
#     print_test_result("Is not favorite check", result)
    
#     # Test 9: Get user favorites (all)
#     print("\n📌 Test 9: Get all user favorites")
#     result = service.get_user_favorites(TEST_CLIENT_ID)
#     total_tests += 1
#     if print_test_result("Get all favorites", result):
#         passed_tests += 1
#         favorites_count = len(result.get('favorites', []))
    
#     # Test 10: Get user favorites with pagination
#     print("\n📌 Test 10: Get favorites with pagination (page 1, limit 1)")
#     result = service.get_user_favorites(TEST_CLIENT_ID, {'page': 1, 'limit': 1})
#     total_tests += 1
#     if print_test_result("Get favorites with pagination", result):
#         passed_tests += 1
#         if 'pagination' in result:
#             print(f"   Page: {result['pagination']['page']}")
#             print(f"   Limit: {result['pagination']['limit']}")
#             print(f"   Total: {result['pagination']['total']}")
#             print(f"   Pages: {result['pagination']['pages']}")
    
#     # Test 11: Get favorites count
#     print("\n📌 Test 11: Get favorites count")
#     result = service.get_favorites_count(TEST_CLIENT_ID)
#     total_tests += 1
#     if print_test_result("Get favorites count", result):
#         passed_tests += 1
    
#     # Test 12: Remove from favorites
#     print("\n📌 Test 12: Remove gig from favorites")
#     result = service.remove_from_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
#     total_tests += 1
#     if print_test_result("Remove from favorites", result):
#         passed_tests += 1
    
#     # Test 13: Remove non-existent favorite
#     print("\n📌 Test 13: Remove non-existent favorite")
#     result = service.remove_from_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Remove non-existent favorite", result)
    
#     # Test 14: Check if removed gig is still favorite
#     print("\n📌 Test 14: Check if removed gig is still favorite (should be False)")
#     result = service.is_favorite(TEST_CLIENT_ID, TEST_GIG_ID)
#     total_tests += 1
#     if result.get('success') and not result.get('is_favorite'):
#         passed_tests += 1
#     print_test_result("Check removed favorite", result)
    
#     # Test 15: Get favorites after removal
#     print("\n📌 Test 15: Get favorites after removal")
#     result = service.get_user_favorites(TEST_CLIENT_ID)
#     total_tests += 1
#     if print_test_result("Get favorites after removal", result):
#         passed_tests += 1
    
#     # Test 16: Clear all favorites
#     print("\n📌 Test 16: Clear all favorites")
#     result = service.clear_favorites(TEST_CLIENT_ID)
#     total_tests += 1
#     if print_test_result("Clear favorites", result):
#         passed_tests += 1
    
#     # Test 17: Get favorites after clearing
#     print("\n📌 Test 17: Get favorites after clearing (should be empty)")
#     result = service.get_user_favorites(TEST_CLIENT_ID)
#     total_tests += 1
#     if result.get('success') and len(result.get('favorites', [])) == 0:
#         passed_tests += 1
#     print_test_result("Get favorites after clearing", result)
    
#     # Test 18: Clear favorites for non-existent user
#     print("\n📌 Test 18: Clear favorites for non-existent user")
#     result = service.clear_favorites(TEST_NONEXISTENT_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Clear favorites non-existent user", result)
    
#     # Test 19: Add favorite with freelancer account (should work)
#     print("\n📌 Test 19: Add favorite with freelancer account")
#     # First add a test gig from another freelancer
#     other_gig_id = "692a3c83f3be085d2499e034"
#     result = service.add_to_favorites(TEST_FREELANCER_ID, other_gig_id)
#     total_tests += 1
#     if print_test_result("Freelancer adds favorite", result):
#         passed_tests += 1
    
#     # Test 20: Test _serialize_favorite method
#     print("\n📌 Test 20: Test _serialize_favorite method")
#     try:
#         test_favorite = {
#             '_id': ObjectId(),
#             'user_id': ObjectId(TEST_CLIENT_ID),
#             'gig_id': ObjectId(TEST_GIG_ID),
#             'created_at': datetime.utcnow(),
#             'test_none': None,
#             'test_string': 'test'
#         }
#         serialized = service._serialize_favorite(test_favorite)
#         print(f"✅ SUCCESS: Serialization test")
#         print(f"   Original ID type: {type(test_favorite['_id'])}")
#         print(f"   Serialized ID type: {type(serialized['_id'])}")
#         print(f"   Has None value: {serialized.get('test_none') == ''}")
#         passed_tests += 1
#         total_tests += 1
#     except Exception as e:
#         print(f"❌ FAILED: Serialization test - {e}")
#         total_tests += 1
    
#     # Test 21: Get favorites with invalid user ID
#     print("\n📌 Test 21: Get favorites with invalid user ID")
#     result = service.get_user_favorites(TEST_INVALID_ID)
#     total_tests += 1
#     if not result.get('success'):  # Should fail
#         passed_tests += 1
#         print_test_result("Get favorites invalid user", result)
    
#     # Test 22: Get favorites count for non-existent user
#     print("\n📌 Test 22: Get favorites count for non-existent user")
#     result = service.get_favorites_count(TEST_NONEXISTENT_ID)
#     total_tests += 1
#     # Should return 0 count even for non-existent user (count_documents returns 0)
#     if result.get('success') and result.get('count') == 0:
#         passed_tests += 1
#     print_test_result("Get count non-existent user", result)
    
#     # Summary
#     print(f"\n{'='*60}")
#     print("📊 TEST SUMMARY")
#     print(f"{'='*60}")
#     print(f"Total tests: {total_tests}")
#     print(f"Passed: {passed_tests}")
#     print(f"Failed: {total_tests - passed_tests}")
#     success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
#     print(f"Success rate: {success_rate:.1f}%")
    
#     if passed_tests == total_tests:
#         print("\n🎉 All tests passed successfully!")
#     else:
#         print(f"\n⚠️  {total_tests - passed_tests} test(s) failed")
    
#     # Cleanup
#     print(f"\n🧹 Cleaning up test data...")
#     service.clear_favorites(TEST_CLIENT_ID)
#     service.clear_favorites(TEST_FREELANCER_ID)
#     print("✅ Cleanup complete!")

# if __name__ == "__main__":
#     main()

# test_favorite.py - VERSION CORRIGÉE
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from bson import ObjectId
from datetime import datetime, timezone
from services.favorites_service import FavoriteService

def print_test_result(test_name, result, expect_failure=False):
    """Helper function to print test results"""
    print(f"\n{'='*60}")
    print(f"Test: {test_name}")
    print(f"{'='*60}")
    
    success = result.get('success', False)
    
    if expect_failure:
        # Pour les tests qui DEVRAIENT échouer
        if not success:
            print(f"✅ SUCCESS (Expected failure): {result.get('error', 'Test passed as expected')}")
            return True
        else:
            print(f"❌ FAILED: Expected failure but got success")
            return False
    else:
        # Pour les tests qui DEVRAIENT réussir
        if success:
            print(f"✅ SUCCESS: {result.get('message', 'Test passed')}")
            if 'favorite_id' in result:
                print(f"   Favorite ID: {result['favorite_id']}")
            if 'is_favorite' in result:
                print(f"   Is Favorite: {result['is_favorite']}")
            if 'count' in result:
                print(f"   Count: {result['count']}")
            if 'deleted_count' in result:
                print(f"   Deleted: {result['deleted_count']}")
            if 'favorites' in result:
                print(f"   Favorites found: {len(result['favorites'])}")
                if result['favorites']:
                    print(f"   First gig: {result['favorites'][0]['gig']['title']}")
            return True
        else:
            print(f"❌ FAILED: {result.get('error', 'Unknown error')}")
            return False

def main():
    print("🚀 Starting Favorites Service Tests")
    print("=" * 60)
    
    # Initialize service
    service = FavoriteService()
    
    # Test data from your MongoDB
    TEST_CLIENT_ID = "6920c49a747da49650b2d6d1"  # client1@example.com
    TEST_FREELANCER_ID = "6920c510747da49650b2d6d4"  # freelancer1@example.com
    TEST_GIG_ID = "692a3be1f3be085d2499e02e"  # Python RPC Development Service
    TEST_GIG_ID_2 = "692a3becf3be085d2499e031"  # Debug Gig
    TEST_GIG_ID_3 = "692a3c83f3be085d2499e034"  # Another gig (not in favorites initially)
    TEST_INVALID_ID = "invalid_id_123"
    TEST_NONEXISTENT_ID = "692a3be1f3be085d2499e0ff"  # Non-existent ID
    
    passed_tests = 0
    total_tests = 0
    
    # Nettoyage initial pour tests propres
    print("\n🧹 Initial cleanup...")
    service.clear_favorites(TEST_CLIENT_ID)
    service.clear_favorites(TEST_FREELANCER_ID)
    
    # Test 1: Add to favorites
    print("\n📌 Test 1: Add gig to favorites")
    result = service.add_to_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Add to favorites", result):
        passed_tests += 1
        favorite_id = result.get('favorite_id')
    
    # Test 2: Add same gig again (should fail - c'est NORMAL)
    print("\n📌 Test 2: Add duplicate favorite (should fail)")
    result = service.add_to_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Duplicate favorite prevented", result, expect_failure=True):
        passed_tests += 1
    
    # Test 3: Add another gig to favorites
    print("\n📌 Test 3: Add another gig to favorites")
    result = service.add_to_favorites(TEST_CLIENT_ID, TEST_GIG_ID_2)
    total_tests += 1
    if print_test_result("Add second favorite", result):
        passed_tests += 1
    
    # Test 4: Add with invalid user ID (should fail)
    print("\n📌 Test 4: Add with invalid user ID (should fail)")
    result = service.add_to_favorites(TEST_INVALID_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Invalid user ID validation", result, expect_failure=True):
        passed_tests += 1
    
    # Test 5: Add with invalid gig ID (should fail)
    print("\n📌 Test 5: Add with invalid gig ID (should fail)")
    result = service.add_to_favorites(TEST_CLIENT_ID, TEST_INVALID_ID)
    total_tests += 1
    if print_test_result("Invalid gig ID validation", result, expect_failure=True):
        passed_tests += 1
    
    # Test 6: Add with non-existent gig (should fail)
    print("\n📌 Test 6: Add non-existent gig (should fail)")
    result = service.add_to_favorites(TEST_CLIENT_ID, TEST_NONEXISTENT_ID)
    total_tests += 1
    if print_test_result("Non-existent gig validation", result, expect_failure=True):
        passed_tests += 1
    
    # Test 7: Check if gig is favorite (should be True)
    print("\n📌 Test 7: Check if gig is favorite (should be True)")
    result = service.is_favorite(TEST_CLIENT_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Is favorite check", result) and result.get('is_favorite'):
        passed_tests += 1
    
    # Test 8: Check if non-added gig is favorite (should be False)
    print("\n📌 Test 8: Check if non-added gig is favorite (should be False)")
    result = service.is_favorite(TEST_CLIENT_ID, TEST_GIG_ID_3)
    total_tests += 1
    if print_test_result("Is not favorite check", result) and not result.get('is_favorite'):
        passed_tests += 1
    
    # Test 9: Get user favorites (all)
    print("\n📌 Test 9: Get all user favorites")
    result = service.get_user_favorites(TEST_CLIENT_ID)
    total_tests += 1
    if print_test_result("Get all favorites", result):
        passed_tests += 1
        favorites_count = len(result.get('favorites', []))
    
    # Test 10: Get user favorites with pagination
    print("\n📌 Test 10: Get favorites with pagination (page 1, limit 1)")
    result = service.get_user_favorites(TEST_CLIENT_ID, {'page': 1, 'limit': 1})
    total_tests += 1
    if print_test_result("Get favorites with pagination", result):
        passed_tests += 1
        if 'pagination' in result:
            print(f"   Page: {result['pagination']['page']}")
            print(f"   Limit: {result['pagination']['limit']}")
            print(f"   Total: {result['pagination']['total']}")
            print(f"   Pages: {result['pagination']['pages']}")
    
    # Test 11: Get favorites count
    print("\n📌 Test 11: Get favorites count")
    result = service.get_favorites_count(TEST_CLIENT_ID)
    total_tests += 1
    if print_test_result("Get favorites count", result):
        passed_tests += 1
    
    # Test 12: Remove from favorites
    print("\n📌 Test 12: Remove gig from favorites")
    result = service.remove_from_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Remove from favorites", result):
        passed_tests += 1
    
    # Test 13: Remove non-existent favorite (should fail - c'est NORMAL)
    print("\n📌 Test 13: Remove non-existent favorite (should fail)")
    result = service.remove_from_favorites(TEST_CLIENT_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Remove non-existent favorite", result, expect_failure=True):
        passed_tests += 1
    
    # Test 14: Check if removed gig is still favorite (should be False)
    print("\n📌 Test 14: Check if removed gig is still favorite (should be False)")
    result = service.is_favorite(TEST_CLIENT_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Check removed favorite", result) and not result.get('is_favorite'):
        passed_tests += 1
    
    # Test 15: Get favorites after removal
    print("\n📌 Test 15: Get favorites after removal")
    result = service.get_user_favorites(TEST_CLIENT_ID)
    total_tests += 1
    if print_test_result("Get favorites after removal", result):
        passed_tests += 1
    
    # Test 16: Clear all favorites
    print("\n📌 Test 16: Clear all favorites")
    result = service.clear_favorites(TEST_CLIENT_ID)
    total_tests += 1
    if print_test_result("Clear favorites", result):
        passed_tests += 1
    
    # Test 17: Get favorites after clearing (should be empty)
    print("\n📌 Test 17: Get favorites after clearing (should be empty)")
    result = service.get_user_favorites(TEST_CLIENT_ID)
    total_tests += 1
    if print_test_result("Get favorites after clearing", result):
        if len(result.get('favorites', [])) == 0:
            passed_tests += 1
        else:
            print(f"   WARNING: Expected 0 favorites but got {len(result.get('favorites', []))}")
    
    # Test 18: Clear favorites for non-existent user (should fail)
    print("\n📌 Test 18: Clear favorites for non-existent user (should fail)")
    result = service.clear_favorites(TEST_NONEXISTENT_ID)
    total_tests += 1
    if print_test_result("Clear favorites non-existent user", result, expect_failure=True):
        passed_tests += 1
    
    # Test 19: Add favorite with freelancer account (should work)
    print("\n📌 Test 19: Add favorite with freelancer account")
    result = service.add_to_favorites(TEST_FREELANCER_ID, TEST_GIG_ID)
    total_tests += 1
    if print_test_result("Freelancer adds favorite", result):
        passed_tests += 1
    
    # Test 20: Test _serialize_favorite method (sans utcnow déprécié)
    print("\n📌 Test 20: Test _serialize_favorite method")
    try:
        test_favorite = {
            '_id': ObjectId(),
            'user_id': ObjectId(TEST_CLIENT_ID),
            'gig_id': ObjectId(TEST_GIG_ID),
            'created_at': datetime.now(timezone.utc),  # Utilisation corrigée
            'test_none': None,
            'test_string': 'test'
        }
        serialized = service._serialize_favorite(test_favorite)
        print(f"✅ SUCCESS: Serialization test")
        print(f"   Original ID type: {type(test_favorite['_id'])}")
        print(f"   Serialized ID type: {type(serialized['_id'])}")
        print(f"   Has None value: {serialized.get('test_none') == ''}")
        passed_tests += 1
        total_tests += 1
    except Exception as e:
        print(f"❌ FAILED: Serialization test - {e}")
        total_tests += 1
    
    # Test 21: Get favorites with invalid user ID (should fail)
    print("\n📌 Test 21: Get favorites with invalid user ID (should fail)")
    result = service.get_user_favorites(TEST_INVALID_ID)
    total_tests += 1
    if print_test_result("Get favorites invalid user", result, expect_failure=True):
        passed_tests += 1
    
    # Test 22: Get favorites count for non-existent user
    print("\n📌 Test 22: Get favorites count for non-existent user")
    result = service.get_favorites_count(TEST_NONEXISTENT_ID)
    total_tests += 1
    # Should return 0 count even for non-existent user
    if print_test_result("Get count non-existent user", result) and result.get('count') == 0:
        passed_tests += 1
    
    # Summary
    print(f"\n{'='*60}")
    print("📊 TEST SUMMARY")
    print(f"{'='*60}")
    print(f"Total tests: {total_tests}")
    print(f"Passed: {passed_tests}")
    print(f"Failed: {total_tests - passed_tests}")
    success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
    print(f"Success rate: {success_rate:.1f}%")
    
    if passed_tests == total_tests:
        print("\n🎉 All tests passed successfully!")
    else:
        print(f"\n⚠️  {total_tests - passed_tests} test(s) failed")
    
    # Cleanup final
    print(f"\n🧹 Final cleanup...")
    service.clear_favorites(TEST_CLIENT_ID)
    service.clear_favorites(TEST_FREELANCER_ID)
    print("✅ Cleanup complete!")

if __name__ == "__main__":
    main()