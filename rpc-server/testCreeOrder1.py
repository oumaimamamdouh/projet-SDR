# create_order_manual.py
from services.order_service import OrderService
from bson import ObjectId
from datetime import datetime, UTC
import random

service = OrderService()

def create_order_manually():
    print("🛒 CRÉATION MANUELLE D'UNE COMMANDE")
    print("="*50)
    
    # 1. Choisir un gig
    gigs = list(service.gigs_collection.find().limit(5))
    print("Gigs disponibles:")
    for i, gig in enumerate(gigs, 1):
        print(f"{i}. {gig.get('title')} - ID: {gig['_id']}")
    
    gig_index = int(input("\nNuméro du gig: ")) - 1
    gig = gigs[gig_index]
    gig_id = str(gig['_id'])
    
    # 2. Choisir un client
    clients = list(service.users_collection.find({'role': 'client'}).limit(5))
    print("\nClients disponibles:")
    for i, client in enumerate(clients, 1):
        print(f"{i}. {client.get('username')} - ID: {client['_id']}")
    
    client_index = int(input("\nNuméro du client: ")) - 1
    client = clients[client_index]
    client_id = str(client['_id'])
    
    # 3. Générer un order_number UNIQUE
    # Format: ORD-YYYYMMDD-XXXX (où XXXX est un nombre aléatoire)
    date_str = datetime.now().strftime("%Y%m%d")
    random_num = random.randint(1000, 9999)
    order_number = f"ORD-{date_str}-{random_num}"
    
    print(f"\n📝 Génération order_number: {order_number}")
    
    # 4. Vérifier que ce order_number n'existe pas déjà
    existing = service.orders_collection.find_one({"order_number": order_number})
    if existing:
        print("⚠️  order_number existe déjà, régénération...")
        random_num = random.randint(1000, 9999)
        order_number = f"ORD-{date_str}-{random_num}"
        print(f"Nouveau order_number: {order_number}")
    
    # 5. Créer la commande directement dans MongoDB
    order_data = {
        "order_number": order_number,
        "client_id": client_id,
        "gig_id": gig_id,
        "price": gig.get('base_price', gig.get('price', 0)),
        "status": "pending",
        "requirements": "Commande créée manuellement",
        "package": "default",
        "attachments": [],
        "deadline": (datetime.now(UTC) + timedelta(days=7)),
        "created_at": datetime.now(UTC),
        "updated_at": datetime.now(UTC)
    }
    
    # 6. Insérer la commande
    print("\n⚡ Insertion dans MongoDB...")
    result = service.orders_collection.insert_one(order_data)
    
    if result.inserted_id:
        print(f"✅ COMMANDE CRÉÉE AVEC SUCCÈS!")
        print(f"   🆔 ID: {result.inserted_id}")
        print(f"   📦 Order Number: {order_number}")
        print(f"   💰 Prix: {order_data['price']}€")
        print(f"   👤 Client: {client.get('username')}")
        print(f"   🎯 Gig: {gig.get('title')}")
        print(f"   📊 Statut: {order_data['status']}")
    else:
        print("❌ Échec de création")

if __name__ == "__main__":
    from datetime import timedelta
    create_order_manually()