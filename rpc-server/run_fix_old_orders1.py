# run_fix_old_orders.py
"""
Script pour corriger les anciennes commandes avec le OrderService corrigé
"""
from services.order_service import OrderService

def main():
    print("🚀 LANCEMENT DE LA CORRECTION DES ANCIENNES COMMANDES")
    print("="*60)
    
    service = OrderService()
    
    # 1. Vérifier l'état actuel
    total_orders = service.orders_collection.count_documents({})
    orders_without_number = service.orders_collection.count_documents({"order_number": None})
    
    print(f"📊 ÉTAT ACTUEL:")
    print(f"   Total commandes: {total_orders}")
    print(f"   Commandes sans order_number: {orders_without_number}")
    
    if orders_without_number == 0:
        print("✅ Toutes les commandes ont déjà un order_number!")
        return
    
    # 2. Appliquer la correction
    print(f"\n🔧 APPLICATION DE LA CORRECTION...")
    result = service.fix_old_orders()
    
    if result['success']:
        print(f"\n🎉 {result['message']}")
    else:
        print(f"\n⚠️  {result['message']}")
    
    # 3. Tester que tout fonctionne
    print(f"\n🧪 TEST APRÈS CORRECTION...")
    
    # Tester create_order
    client = service.users_collection.find_one({'role': 'client'})
    gig = service.gigs_collection.find_one()
    
    if client and gig:
        from datetime import datetime, UTC, timedelta
        
        order_data = {
            'gig_id': str(gig['_id']),
            'requirements': 'Test après correction complète',
            'deadline': (datetime.now(UTC) + timedelta(days=7)).isoformat(),
            'attachments': ['test.pdf']
        }
        
        result = service.create_order(str(client['_id']), order_data)
        
        if result['success']:
            print(f"✅ NOUVELLE COMMANDE CRÉÉE AVEC SUCCÈS!")
            print(f"   📦 Order #: {result['order'].get('order_number')}")
            print(f"   💰 Prix: {result['order'].get('price')}€")
            print(f"   📊 Statut: {result['order'].get('status')}")
        else:
            print(f"❌ Échec création: {result.get('error')}")
    
    print(f"\n🏁 CORRECTION TERMINÉE!")

if __name__ == "__main__":
    main()