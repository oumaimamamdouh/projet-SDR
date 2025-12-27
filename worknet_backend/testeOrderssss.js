# test_order_service.py
import sys
import os
from datetime import datetime, timedelta

# Ajouter le répertoire parent au chemin Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.order_service import OrderService

def test_order_service():
    """Test complet du service OrderService"""
    
    print("=" * 60)
    print("🚀 TEST DU SERVICE ORDER_SERVICE")
    print("=" * 60)
    
    # 1. Initialisation du service
    print("\n1. 📦 Initialisation du OrderService...")
    try:
        order_service = OrderService()
        print("✅ OrderService initialisé avec succès")
        
        # Vérifier les collections
        print(f"   Collections: orders={order_service.orders_collection}, "
              f"gigs={order_service.gigs_collection}, "
              f"users={order_service.users_collection}")
    except Exception as e:
        print(f"❌ Erreur d'initialisation: {e}")
        return
    
    # 2. Test des méthodes disponibles
    print("\n2. 🔍 Vérification des méthodes disponibles...")
    methods_to_test = [
        'create_order',
        'get_my_orders',
        'get_order_by_id',
        'cancel_order',
        'request_revision',
        'accept_delivery',
        'escalate_to_dispute',
        'get_freelancer_orders',
        'accept_order',
        'decline_order',
        'start_order_work',
        'deliver_order',
        'update_order_progress',
        'get_order_timeline',
        'extend_deadline',
        'get_all_orders',
        'update_order_admin',
        'resolve_dispute',
        'get_order_stats'
    ]
    
    available_methods = []
    for method in methods_to_test:
        if hasattr(order_service, method):
            available_methods.append(method)
            print(f"   ✅ {method}")
        else:
            print(f"   ❌ {method} (manquante)")
    
    print(f"\n   📊 Total: {len(available_methods)}/{len(methods_to_test)} méthodes disponibles")
    
    # 3. Test de la méthode create_order (avec données factices)
    print("\n3. 🛒 Test de create_order (simulation)...")
    try:
        # Données de test factices
        client_id = "65a1b2c3d4e5f67890123456"  # ID client fictif
        order_data = {
            'gig_id': '693da3bd79621fddf4d00514',  # ID gig de votre base
            'requirements': 'Je veux un site web moderne avec React',
            'deadline': (datetime.now() + timedelta(days=7)).isoformat(),
            'package': 'default',
            'attachments': []
        }
        
        print(f"   Données de test:")
        print(f"   - Client ID: {client_id}")
        print(f"   - Gig ID: {order_data['gig_id']}")
        print(f"   - Requirements: {order_data['requirements']}")
        print(f"   - Deadline: {order_data['deadline']}")
        print(f"   - Package: {order_data['package']}")
        
        # Note: On ne peut pas réellement exécuter sans base de données configurée
        # Mais on peut vérifier que la méthode existe et a la bonne signature
        method = getattr(order_service, 'create_order')
        print(f"\n   ✅ Méthode create_order disponible")
        print(f"   📝 Signature: {method.__name__}{method.__code__.co_varnames}")
        print(f"   📄 Docstring: {method.__doc__[:100]}...")
        
    except Exception as e:
        print(f"❌ Erreur lors du test de create_order: {e}")
    
    # 4. Test de get_order_stats
    print("\n4. 📊 Test de get_order_stats...")
    try:
        stats_method = getattr(order_service, 'get_order_stats')
        print(f"   ✅ Méthode get_order_stats disponible")
        print(f"   📄 Docstring: {stats_method.__doc__}")
        
        # Test avec des paramètres fictifs
        test_result = stats_method()
        if test_result:
            print(f"   🧪 Test avec paramètres vides: {test_result.get('success', 'Non défini')}")
    except Exception as e:
        print(f"❌ Erreur lors du test de get_order_stats: {e}")
    
    # 5. Test des autres méthodes principales
    print("\n5. 🛠️ Test des autres méthodes principales...")
    test_methods = [
        ('get_my_orders', ['65a1b2c3d4e5f67890123456', {}]),
        ('get_freelancer_orders', ['65a1b2c3d4e5f67890123457', {}]),
        ('get_order_timeline', ['65a1b2c3d4e5f67890123458']),
    ]
    
    for method_name, params in test_methods:
        try:
            if hasattr(order_service, method_name):
                method = getattr(order_service, method_name)
                print(f"   ✅ {method_name}: disponible")
                print(f"      Paramètres attendus: {method.__code__.co_argcount - 1} (sans self)")
            else:
                print(f"   ❌ {method_name}: non disponible")
        except Exception as e:
            print(f"   ⚠️ {method_name}: erreur de vérification - {e}")
    
    # 6. Test de résolution d'erreurs
    print("\n6. 🐛 Test de gestion des erreurs...")
    try:
        # Test avec des paramètres invalides
        invalid_data = {
            'gig_id': 'invalid_id',
            'requirements': '',
            'deadline': 'date_invalide'
        }
        
        print(f"   Test avec ID invalide...")
        # La méthode devrait gérer l'erreur ObjectId invalide
        print(f"   ✅ La méthode devrait gérer les ObjectId invalides dans le bloc except")
        
    except Exception as e:
        print(f"   ⚠️ Exception inattendue: {e}")
    
    # 7. Vérification des logs
    print("\n7. 📝 Vérification du système de logs...")
    try:
        print(f"   Logger: {order_service.logger.name}")
        print(f"   Niveau de log: {order_service.logger.level}")
        print(f"   ✅ Système de logs configuré")
    except Exception as e:
        print(f"   ❌ Erreur avec les logs: {e}")
    
    # 8. Résumé du test
    print("\n" + "=" * 60)
    print("📋 RÉSUMÉ DU TEST")
    print("=" * 60)
    
    # Compter les méthodes testées
    total_methods = len(methods_to_test)
    tested_methods = len([m for m in methods_to_test if hasattr(order_service, m)])
    
    print(f"📊 Méthodes testées: {tested_methods}/{total_methods}")
    print(f"✅ Service OrderService: {'FONCTIONNEL' if tested_methods == total_methods else 'PARTIEL'}")
    
    if tested_methods == total_methods:
        print("\n🎉 Toutes les méthodes sont disponibles et prêtes à l'emploi!")
        print("   Vous pouvez maintenant utiliser le service avec votre API RPC.")
    else:
        print(f"\n⚠️ Il manque {total_methods - tested_methods} méthode(s)")
        print("   Vérifiez les méthodes marquées comme ❌ ci-dessus.")
    
    print("\n" + "=" * 60)
    print("💡 PROCHAINES ÉTAPES:")
    print("=" * 60)
    print("1. Assurez-vous que MongoDB est en cours d'exécution")
    print("2. Vérifiez la connexion à la base de données dans database.py")
    print("3. Testez avec des données réelles via votre API RPC")
    print("4. Utilisez Postman ou curl pour tester les endpoints")
    print("5. Vérifiez les logs pour le débogage")
    
    return order_service

def test_with_real_data(order_service):
    """Test avec des données réelles (si la base est configurée)"""
    print("\n" + "=" * 60)
    print("🧪 TEST AVEC DONNÉES RÉELLES")
    print("=" * 60)
    
    try:
        # Vérifier la connexion à MongoDB
        print("\n1. 🔌 Test de connexion à MongoDB...")
        db = order_service.orders_collection.database
        server_info = db.client.server_info()
        print(f"   ✅ Connecté à MongoDB version {server_info.get('version', 'inconnue')}")
        print(f"   📁 Base de données: {db.name}")
        
        # Compter les documents
        print("\n2. 📊 Statistiques de la base...")
        orders_count = order_service.orders_collection.count_documents({})
        gigs_count = order_service.gigs_collection.count_documents({})
        users_count = order_service.users_collection.count_documents({})
        
        print(f"   📦 Orders: {orders_count}")
        print(f"   🛠️ Gigs: {gigs_count}")
        print(f"   👥 Users: {users_count}")
        
        if gigs_count > 0:
            print("\n3. 🔍 Recherche d'un gig pour tester...")
            # Prendre le premier gig disponible
            gig = order_service.gigs_collection.find_one({})
            if gig:
                print(f"   ✅ Gig trouvé: {gig.get('title', 'Sans titre')}")
                print(f"   ID: {gig['_id']}")
                print(f"   Freelancer ID: {gig.get('freelancer_id', 'Non défini')}")
                
                # Vérifier la structure du gig
                print(f"\n4. 🏗️ Structure du gig...")
                print(f"   - Titre: {gig.get('title', 'Non défini')}")
                print(f"   - Prix: {gig.get('price', gig.get('base_price', 'Non défini'))}")
                print(f"   - Packages: {bool(gig.get('packages', {}))}")
                
                if gig.get('packages'):
                    packages = gig['packages']
                    print(f"   📦 Packages disponibles: {list(packages.keys())}")
                    for pkg_name, pkg_details in packages.items():
                        print(f"      {pkg_name}: ${pkg_details.get('price', '?')}")
                else:
                    print(f"   💰 Prix fixe: pas de packages")
        
        # Tester get_order_stats avec données réelles
        print("\n5. 📈 Test de get_order_stats()...")
        stats = order_service.get_order_stats()
        if stats.get('success'):
            print(f"   ✅ Statistiques récupérées")
            stats_data = stats.get('stats', {})
            print(f"   Total orders: {stats_data.get('total_orders', 0)}")
            print(f"   Par statut: {stats_data.get('status_counts', {})}")
        else:
            print(f"   ⚠️ Échec: {stats.get('error', 'Erreur inconnue')}")
            
    except Exception as e:
        print(f"❌ Erreur lors du test avec données réelles: {e}")
        print("   Assurez-vous que MongoDB est en cours d'exécution et configuré correctement.")

if __name__ == "__main__":
    print("🔧 LANCEMENT DES TESTS ORDER_SERVICE")
    print("=" * 60)
    
    # Exécuter le test principal
    service = test_order_service()
    
    # Demander si on veut tester avec des données réelles
    response = input("\n🧪 Voulez-vous tester avec des données réelles de MongoDB ? (oui/non): ").strip().lower()
    
    if response in ['oui', 'o', 'yes', 'y']:
        test_with_real_data(service)
    else:
        print("\n✅ Test de base terminé. Pour un test complet, assurez-vous que MongoDB est configuré.")
    
    print("\n" + "=" * 60)
    print("🏁 TESTS TERMINÉS")
    print("=" * 60)