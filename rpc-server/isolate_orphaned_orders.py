# isolate_orphaned_orders.py
"""
Isoler les commandes orphelines sans les supprimer
"""
from services.order_service import OrderService
from bson import ObjectId

def isolate_orphaned_orders():
    print("🔍 ISOLATION DES COMMANDES ORPHELINES")
    print("="*60)
    
    service = OrderService()
    
    # Trouver toutes les commandes
    all_orders = list(service.orders_collection.find())
    
    orphaned_orders = []
    valid_orders = []
    
    for order in all_orders:
        order_id = str(order['_id'])
        client_id = order.get('client_id')
        freelancer_id = order.get('freelancer_id')
        
        # Vérifier si les utilisateurs existent
        client_exists = service.users_collection.find_one({'_id': client_id}) if client_id else False
        freelancer_exists = service.users_collection.find_one({'_id': freelancer_id}) if freelancer_id else False
        
        if not client_exists or not freelancer_exists:
            orphaned_orders.append({
                'order_id': order_id,
                'client_id': str(client_id) if client_id else 'None',
                'client_exists': bool(client_exists),
                'freelancer_id': str(freelancer_id) if freelancer_id else 'None',
                'freelancer_exists': bool(freelancer_exists),
                'status': order.get('status', 'unknown'),
                'order_number': order.get('order_number', 'None')
            })
        else:
            valid_orders.append(order_id)
    
    print(f"📊 STATISTIQUES:")
    print(f"   Total commandes: {len(all_orders)}")
    print(f"   Commandes valides: {len(valid_orders)}")
    print(f"   Commandes orphelines: {len(orphaned_orders)}")
    
    if orphaned_orders:
        print(f"\n📋 COMMANDES ORPHELINES:")
        for i, order in enumerate(orphaned_orders, 1):
            print(f"\n{i}. ID: {order['order_id']}")
            print(f"   📦 Order #: {order['order_number']}")
            print(f"   📊 Statut: {order['status']}")
            print(f"   👤 Client: {order['client_id']} ({'✅' if order['client_exists'] else '❌'})")
            print(f"   🧑‍💻 Freelancer: {order['freelancer_id']} ({'✅' if order['freelancer_exists'] else '❌'})")
        
        # Marquer comme orphelines dans la base
        print(f"\n🔧 MARQUAGE COMME ORPHELINES...")
        for order in orphaned_orders:
            service.orders_collection.update_one(
                {"_id": ObjectId(order['order_id'])},
                {
                    "$set": {
                        "is_orphaned": True,
                        "needs_review": True,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            print(f"   ✅ {order['order_id']} marquée comme orpheline")
    
    print(f"\n🎯 RECOMMANDATION:")
    if len(orphaned_orders) <= 3:
        print("   Quelques commandes orphelines - peut être ignoré")
    else:
        print("   Plusieurs commandes orphelines - considérer une action")
    
    return orphaned_orders, valid_orders

if __name__ == "__main__":
    from datetime import datetime
    isolate_orphaned_orders()