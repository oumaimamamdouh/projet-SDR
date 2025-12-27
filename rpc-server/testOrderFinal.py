"""
Test final du OrderService corrigé
"""
import sys
import os
from datetime import datetime, timedelta

# CORRECTION : Ajouter le répertoire parent
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

def test_order_service_corrige():
    """Test du service corrigé"""
    
    print("=" * 70)
    print("🧪 TEST FINAL ORDER SERVICE CORRIGÉ")
    print("=" * 70)
    
    from services.order_service import OrderService
    service = OrderService()
    
    # 1. Vérifier la connexion
    print("1. 🔗 Vérification connexion...")
    try:
        gigs_count = service.gigs_collection.count_documents({})
        users_count = service.users_collection.count_documents({})
        orders_count = service.orders_collection.count_documents({})
        
        print(f"   📊 Stats base:")
        print(f"     🎨 Gigs: {gigs_count}")
        print(f"     👥 Users: {users_count}")
        print(f"     📦 Orders: {orders_count}")
    except Exception as e:
        print(f"   ❌ Erreur connexion: {e}")
        return False
    
    # 2. Chercher un gig existant
    print("\n2. 🔍 Recherche d'un gig...")
    gigs = list(service.gigs_collection.find().limit(5))
    
    if not gigs:
        print("❌ Aucun gig trouvé!")
        return False
    
    print(f"✅ {len(gigs)} gig(s) trouvé(s)")
    
    # 3. Vérifier la compatibilité de chaque gig
    for i, gig in enumerate(gigs, 1):
        print(f"\n   🎨 Gig #{i}: {gig.get('title', 'Sans titre')}")
        
        # Vérifier la compatibilité
        compat = service.check_gig_compatibility(str(gig['_id']))
        
        if compat['success']:
            compat_info = compat['compatibility']
            print(f"      ✅ Compatible: {compat_info['has_required_fields']}")
            print(f"      📋 Champs prix: {compat_info['present_price_fields']}")
            
            # Corriger si nécessaire
            if not compat_info['has_required_fields']:
                print(f"      🔧 Correction nécessaire...")
                fix_result = service.fix_gig_structure(str(gig['_id']))
                if fix_result['success']:
                    print(f"      ✅ Corrigé: {fix_result['message']}")
        else:
            print(f"      ❌ Erreur vérification: {compat['error']}")
    
    # 4. Chercher un client
    print("\n3. 👤 Recherche d'un client...")
    clients = list(service.users_collection.find({'role': 'client'}).limit(3))
    
    if not clients:
        print("❌ Aucun client trouvé!")
        return False
    
    client = clients[0]
    print(f"✅ Client trouvé: {client.get('username')}")
    print(f"   🆔 ID: {client['_id']}")
    
    # 5. Tester la création d'une commande
    print("\n4. 🛒 Test création de commande...")
    
    # Choisir le meilleur gig
    best_gig = gigs[0]
    
    # Vérifier qu'il est compatible
    compat = service.check_gig_compatibility(str(best_gig['_id']))
    if not compat['success'] or not compat['compatibility']['has_required_fields']:
        print("❌ Le gig sélectionné n'est pas compatible!")
        return False
    
    gig_id = str(best_gig['_id'])
    client_id = str(client['_id'])
    
    print(f"   🎯 Gig sélectionné: {best_gig.get('title')}")
    
    # Préparer les données
    order_data = {
        'gig_id': gig_id,
        'requirements': 'Test avec OrderService corrigé',
        'deadline': (datetime.utcnow() + timedelta(days=7)).isoformat(),
        'attachments': ['test.pdf']
    }
    
    # Ajouter package si nécessaire
    if 'packages' in best_gig and best_gig['packages']:
        if isinstance(best_gig['packages'], dict) and len(best_gig['packages']) > 0:
            package_name = list(best_gig['packages'].keys())[0]
            order_data['package'] = package_name
            print(f"   📦 Package: {package_name}")
    
    # Tester
    print(f"\n   ⚡ Exécution create_order...")
    result = service.create_order(client_id, order_data)
    
    print(f"   📊 Résultat: {'✅ SUCCÈS' if result['success'] else '❌ ÉCHEC'}")
    
    if result['success']:
        order = result['order']
        print(f"      🆔 Order ID: {order['_id']}")
        print(f"      💰 Prix: {order['price']}€")
        print(f"      📦 Package: {order['package']}")
        print(f"      📊 Statut: {order['status']}")
        
        print("\n" + "=" * 70)
        print("🎉 FÉLICITATIONS! ORDER SERVICE CORRIGÉ FONCTIONNE!")
        print("=" * 70)
        return True
    else:
        print(f"      ❌ Erreur: {result['error']}")
        
        print("\n" + "=" * 70)
        print("⚠️  IL RESTE DES PROBLÈMES")
        print("=" * 70)
        return False

if __name__ == "__main__":
    success = test_order_service_corrige()
    
    if not success:
        print("\n🔧 Solution rapide:")
        print("""
1. Vérifiez que vos gigs ont au moins un de ces champs:
   - 'base_price' (recommandé pour GigService)
   - 'price'
   - 'starting_price'

2. Vous pouvez corriger un gig existant avec:
   from services.order_service import OrderService
   service = OrderService()
   service.fix_gig_structure('ID_DU_GIG')

3. Ou créez un nouveau gig avec la bonne structure:
   POST /api/gigs
   {
     "title": "Mon Gig",
     "description": "Description",
     "base_price": 100,
     "price": 100,
     "starting_price": 80,
     ...
   }
        """)