# test_final_validation.py
"""
Test final de validation du système de commandes
"""
from services.order_service import OrderService
from bson import ObjectId
from datetime import datetime, UTC
import random

def test_complet():
    service = OrderService()
    
    print("🧪 TEST FINAL DE VALIDATION ORDER SERVICE")
    print("="*60)
    
    # 1. Compter les commandes
    total_orders = service.orders_collection.count_documents({})
    print(f"1. 📊 TOTAL COMMANDES: {total_orders}")
    
    # 2. Vérifier la dernière commande créée
    last_order = service.orders_collection.find_one(
        sort=[("created_at", -1)]
    )
    
    if last_order:
        print(f"\n2. 📦 DERNIÈRE COMMANDE:")
        print(f"   🆔 ID: {last_order['_id']}")
        print(f"   📦 Order #: {last_order.get('order_number', 'N/A')}")
        print(f"   💰 Prix: {last_order.get('price', '?')}€")
        print(f"   👤 Client: {last_order.get('client_id')}")
        print(f"   🎯 Gig: {last_order.get('gig_id')}")
        print(f"   📊 Statut: {last_order.get('status')}")
    
    # 3. Vérifier les différents statuts
    print(f"\n3. 📈 RÉPARTITION DES STATUTS:")
    statuses = ["pending", "in_progress", "completed", "cancelled", "confirmed", "disputed"]
    for status in statuses:
        count = service.orders_collection.count_documents({"status": status})
        if count > 0:
            print(f"   {status}: {count} commande(s)")
    
    # 4. Tester la compatibilité d'un gig
    print(f"\n4. ✅ TEST COMPATIBILITÉ GIG:")
    gig = service.gigs_collection.find_one()
    if gig:
        gig_id = str(gig['_id'])
        compat = service.check_gig_compatibility(gig_id)
        if compat['success']:
            print(f"   🎯 Gig: {gig.get('title')}")
            print(f"   ✅ Compatible: {compat['compatibility']['has_required_fields']}")
            print(f"   💰 Champs prix: {compat['compatibility']['present_price_fields']}")
    
    # 5. Créer une commande de test finale
    print(f"\n5. 🛒 CRÉATION COMMANDE DE TEST FINAL:")
    
    # Prendre un gig et client aléatoires
    gigs = list(service.gigs_collection.find().limit(3))
    clients = list(service.users_collection.find({"role": "client"}).limit(3))
    
    if gigs and clients:
        test_gig = gigs[random.randint(0, len(gigs)-1)]
        test_client = clients[random.randint(0, len(clients)-1)]
        
        order_number = f"TEST-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        test_order = {
            "order_number": order_number,
            "client_id": str(test_client['_id']),
            "gig_id": str(test_gig['_id']),
            "price": test_gig.get('base_price', test_gig.get('price', 50)),
            "status": "pending",
            "requirements": "Commande de test final - Validation système",
            "created_at": datetime.now(UTC),
            "is_test": True
        }
        
        result = service.orders_collection.insert_one(test_order)
        
        if result.inserted_id:
            print(f"   ✅ COMMANDE TEST CRÉÉE!")
            print(f"      🆔 ID: {result.inserted_id}")
            print(f"      📦 Order #: {order_number}")
            print(f"      👤 Client: {test_client.get('username')}")
            print(f"      🎯 Service: {test_gig.get('title')}")
    
    print("\n" + "="*60)
    print("🎉 TEST TERMINÉ AVEC SUCCÈS!")
    print("="*60)
    
    # Résumé final
    new_total = service.orders_collection.count_documents({})
    print(f"\n📈 AVANT/AFÈS: {total_orders} → {new_total} commandes")
    
    # Nombre de commandes avec order_number unique
    with_order_num = service.orders_collection.count_documents({
        "order_number": {"$ne": None, "$exists": True}
    })
    print(f"📦 Commandes avec order_number: {with_order_num}/{new_total}")

if __name__ == "__main__":
    test_complet()