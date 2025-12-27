# test_final_validation.py
"""
Test final de validation complète
"""
from services.order_service import OrderService
from datetime import datetime, UTC, timedelta

def test_final():
    print("🧪 TEST FINAL DE VALIDATION COMPLÈTE")
    print("="*70)
    
    service = OrderService()
    stats = {'success': 0, 'total': 0}
    
    # 1. Test create_order
    print("\n1. 🛒 TEST CREATE_ORDER")
    client = service.users_collection.find_one({'role': 'client'})
    gig = service.gigs_collection.find_one()
    
    if client and gig:
        order_data = {
            'gig_id': str(gig['_id']),
            'requirements': 'Test final de validation',
            'deadline': (datetime.now(UTC) + timedelta(days=3)).isoformat(),
            'attachments': ['specs.pdf']
        }
        
        result = service.create_order(str(client['_id']), order_data)
        stats['total'] += 1
        
        if result['success']:
            print(f"   ✅ SUCCÈS! Order #: {result['order'].get('order_number')}")
            stats['success'] += 1
            test_order_id = result['order']['_id']
            test_client_id = str(client['_id'])
        else:
            print(f"   ❌ ÉCHEC: {result.get('error')}")
    else:
        print("   ⚠️  Données manquantes")
    
    # 2. Test get_my_orders
    print("\n2. 📋 TEST GET_MY_ORDERS")
    if client:
        result = service.get_my_orders(str(client['_id']))
        stats['total'] += 1
        
        if result['success']:
            print(f"   ✅ {len(result.get('orders', []))} commande(s) trouvée(s)")
            stats['success'] += 1
        else:
            print(f"   ❌ ÉCHEC: {result.get('error')}")
    
    # 3. Test cancel_order
    print("\n3. ❌ TEST CANCEL_ORDER")
    if 'test_order_id' in locals() and 'test_client_id' in locals():
        result = service.cancel_order(test_order_id, test_client_id, "Test d'annulation")
        stats['total'] += 1
        
        if result['success']:
            print(f"   ✅ Commande annulée avec succès")
            stats['success'] += 1
        else:
            print(f"   ⚠️  Résultat: {result.get('error', 'Non spécifié')}")
    
    # 4. Test get_all_orders
    print("\n4. 📊 TEST GET_ALL_ORDERS")
    result = service.get_all_orders()
    stats['total'] += 1
    
    if result['success']:
        orders = result.get('orders', [])
        print(f"   ✅ {len(orders)} commande(s) totale(s)")
        
        # Afficher un résumé
        status_count = {}
        for order in orders:
            status = order.get('status', 'unknown')
            status_count[status] = status_count.get(status, 0) + 1
        
        print(f"   📈 Répartition: {status_count}")
        stats['success'] += 1
    else:
        print(f"   ❌ ÉCHEC: {result.get('error')}")
    
    # 5. Test check_gig_compatibility
    print("\n5. ✅ TEST CHECK_GIG_COMPATIBILITY")
    if gig:
        result = service.check_gig_compatibility(str(gig['_id']))
        stats['total'] += 1
        
        if result['success']:
            compat = result['compatibility']
            print(f"   ✅ Compatible: {compat['has_required_fields']}")
            print(f"   💰 Champs prix: {compat['present_price_fields']}")
            stats['success'] += 1
        else:
            print(f"   ❌ ÉCHEC: {result.get('error')}")
    
    # 6. Résumé
    print("\n" + "="*70)
    print("📊 RÉSUMÉ FINAL")
    print("="*70)
    
    success_rate = (stats['success'] / stats['total'] * 100) if stats['total'] > 0 else 0
    
    print(f"✅ Tests réussis: {stats['success']}/{stats['total']}")
    print(f"📈 Taux de succès: {success_rate:.1f}%")
    
    if success_rate >= 90:
        print("\n🎉 EXCELLENT! OrderService est PRÊT POUR LA PRODUCTION!")
    elif success_rate >= 80:
        print("\n👍 TRÈS BON! OrderService fonctionne très bien")
    elif success_rate >= 70:
        print("\n⚠️  BON! Quelques ajustements mineurs nécessaires")
    else:
        print("\n🔧 AMÉLIORATIONS NÉCESSAIRES")
    
    print("\n🔍 ÉTAT DU SYSTÈME:")
    total_orders = service.orders_collection.count_documents({})
    orders_with_number = service.orders_collection.count_documents({"order_number": {"$ne": None}})
    
    print(f"   📦 Commandes totales: {total_orders}")
    print(f"   🔢 Commandes avec order_number: {orders_with_number}")
    print(f"   ✅ Taux de complétude: {(orders_with_number/total_orders*100):.1f}%")

if __name__ == "__main__":
    test_final()