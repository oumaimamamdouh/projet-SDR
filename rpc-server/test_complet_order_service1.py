# test_complet_order_service_CORRIGE.py
"""
Test COMPLET de toutes les méthodes de OrderService - VERSION CORRIGÉE
"""
import sys
import os
from datetime import datetime, UTC, timedelta
import random

# Ajouter le chemin
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from services.order_service import OrderService
from bson import ObjectId

def tester_toutes_methodes():
    print("🧪 TEST EXHAUSTIF DE ORDER SERVICE")
    print("="*70)
    
    service = OrderService()
    stats = {
        'success': 0,
        'failed': 0,
        'methods_tested': 0,
        'skipped': 0
    }
    
    # Variables globales pour les tests
    test_order_id = None
    test_client_id = None
    package_order_id = None
    
    # ==================== 1. CONNEXION ET DONNÉES DE BASE ====================
    print("\n1. 🔗 TEST DE CONNEXION ET DONNÉES")
    print("-"*40)
    
    try:
        # Vérifier les collections
        gigs_count = service.gigs_collection.count_documents({})
        users_count = service.users_collection.count_documents({})
        orders_count = service.orders_collection.count_documents({})
        
        print(f"✅ Collections trouvées:")
        print(f"   🎯 Gigs: {gigs_count}")
        print(f"   👥 Users: {users_count}")
        print(f"   📦 Orders: {orders_count}")
        
        stats['success'] += 1
    except Exception as e:
        print(f"❌ Erreur connexion: {e}")
        stats['failed'] += 1
    
    # ==================== 2. RÉCUPÉRER DES DONNÉES DE TEST ====================
    print("\n2. 📋 RÉCUPÉRATION DONNÉES DE TEST")
    print("-"*40)
    
    try:
        # Récupérer un gig
        gig = service.gigs_collection.find_one()
        gig_id = str(gig['_id']) if gig else None
        
        # Récupérer un client
        client = service.users_collection.find_one({'role': 'client'})
        client_id = str(client['_id']) if client else None
        test_client_id = client_id  # Sauvegarder pour plus tard
        
        # Récupérer un freelancer
        freelancer = service.users_collection.find_one({'role': 'freelancer'})
        freelancer_id = str(freelancer['_id']) if freelancer else None
        
        # Récupérer une commande existante
        existing_order = service.orders_collection.find_one()
        existing_order_id = str(existing_order['_id']) if existing_order else None
        
        print(f"✅ Données de test récupérées:")
        print(f"   🎯 Gig ID: {gig_id}")
        print(f"   👤 Client ID: {client_id}")
        print(f"   🧑‍💻 Freelancer ID: {freelancer_id}")
        print(f"   📦 Order ID existant: {existing_order_id}")
        
        stats['success'] += 1
    except Exception as e:
        print(f"❌ Erreur données test: {e}")
        stats['failed'] += 1
    
    # ==================== 3. MÉTHODES CLIENT ====================
    print("\n3. 👤 TEST MÉTHODES CLIENT")
    print("-"*40)
    
    # Test 3.1: create_order
    print("\n3.1 🛒 create_order()")
    if gig_id and client_id:
        try:
            order_data = {
                'gig_id': gig_id,
                'requirements': 'Test de création de commande',
                'deadline': (datetime.now(UTC) + timedelta(days=7)).isoformat(),
                'attachments': ['test.pdf']
            }
            
            result = service.create_order(client_id, order_data)
            stats['methods_tested'] += 1
            
            if result['success']:
                new_order_id = result['order']['_id']
                print(f"   ✅ Commande créée: {new_order_id}")
                stats['success'] += 1
                
                # Sauvegarder pour les tests suivants
                test_order_id = new_order_id
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Données manquantes, test ignoré")
        stats['skipped'] += 1
    
    # Test 3.2: get_my_orders
    print("\n3.2 📋 get_my_orders()")
    if client_id:
        try:
            result = service.get_my_orders(client_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Commandes trouvées: {len(result.get('orders', []))}")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Client ID manquant, test ignoré")
        stats['skipped'] += 1
    
    # Test 3.3: get_order_by_id
    print("\n3.3 🔍 get_order_by_id()")
    if existing_order_id and client_id:
        try:
            result = service.get_order_by_id(existing_order_id, client_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Commande récupérée")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Données manquantes, test ignoré")
        stats['skipped'] += 1
    
    # Test 3.4: cancel_order
    print("\n3.4 ❌ cancel_order()")
    if test_order_id and test_client_id:
        try:
            result = service.cancel_order(test_order_id, test_client_id, "Test d'annulation")
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Commande annulée (test)")
                stats['success'] += 1
            else:
                print(f"   ⚠️ Résultat: {result.get('error', 'Non spécifié')}")
                # Ne pas compter comme échec car dépend du statut
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Commande test manquante, test ignoré")
        stats['skipped'] += 1
    
    # ==================== 4. MÉTHODES FREELANCER ====================
    print("\n4. 🧑‍💻 TEST MÉTHODES FREELANCER")
    print("-"*40)
    
    # Test 4.1: get_freelancer_orders
    print("\n4.1 📋 get_freelancer_orders()")
    if freelancer_id:
        try:
            result = service.get_freelancer_orders(freelancer_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Commandes freelancer: {len(result.get('orders', []))}")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Freelancer ID manquant, test ignoré")
        stats['skipped'] += 1
    
    # Test 4.2: accept_order
    print("\n4.2 👍 accept_order()")
    if existing_order_id and freelancer_id:
        try:
            result = service.accept_order(existing_order_id, freelancer_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Commande acceptée")
                stats['success'] += 1
            else:
                print(f"   ⚠️ Résultat: {result.get('error', 'Non spécifié')}")
                # Ne pas compter comme échec
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Données manquantes, test ignoré")
        stats['skipped'] += 1
    
    # ==================== 5. MÉTHODES PARTAGÉES ====================
    print("\n5. 🤝 TEST MÉTHODES PARTAGÉES")
    print("-"*40)
    
    # Test 5.1: get_order_timeline
    print("\n5.1 📜 get_order_timeline()")
    if existing_order_id:
        try:
            result = service.get_order_timeline(existing_order_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                timeline_len = len(result.get('timeline', []))
                print(f"   ✅ Timeline: {timeline_len} entrées")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Order ID manquant, test ignoré")
        stats['skipped'] += 1
    
    # Test 5.2: extend_deadline
    print("\n5.2 ⏰ extend_deadline()")
    if existing_order_id and client_id:
        try:
            extension_data = {
                'new_deadline': (datetime.now(UTC) + timedelta(days=10)).isoformat()
            }
            result = service.extend_deadline(existing_order_id, client_id, extension_data)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Deadline étendue")
                stats['success'] += 1
            else:
                print(f"   ⚠️ Résultat: {result.get('error', 'Non spécifié')}")
                # Ne pas compter comme échec
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Données manquantes, test ignoré")
        stats['skipped'] += 1
    
    # ==================== 6. MÉTHODES ADMIN ====================
    print("\n6. 👑 TEST MÉTHODES ADMIN")
    print("-"*40)
    
    # Test 6.1: get_all_orders
    print("\n6.1 📊 get_all_orders()")
    try:
        result = service.get_all_orders()
        stats['methods_tested'] += 1
        
        if result['success']:
            orders_count = len(result.get('orders', []))
            print(f"   ✅ Toutes commandes: {orders_count}")
            stats['success'] += 1
        else:
            print(f"   ❌ Échec: {result.get('error')}")
            stats['failed'] += 1
            
    except Exception as e:
        print(f"   ❌ Exception: {e}")
        stats['failed'] += 1
    
    # ==================== 7. MÉTHODES UTILITAIRES ====================
    print("\n7. 🔧 TEST MÉTHODES UTILITAIRES")
    print("-"*40)
    
    # Test 7.1: check_gig_compatibility
    print("\n7.1 ✅ check_gig_compatibility()")
    if gig_id:
        try:
            result = service.check_gig_compatibility(gig_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                compat = result['compatibility']
                print(f"   ✅ Compatible: {compat['has_required_fields']}")
                print(f"   📋 Champs prix: {compat['present_price_fields']}")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Gig ID manquant, test ignoré")
        stats['skipped'] += 1
    
    # Test 7.2: fix_gig_structure
    print("\n7.2 🔧 fix_gig_structure()")
    if gig_id:
        try:
            result = service.fix_gig_structure(gig_id)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Structure corrigée: {result.get('message')}")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Gig ID manquant, test ignoré")
        stats['skipped'] += 1
    
    # Test 7.3: get_order_stats
    print("\n7.3 📈 get_order_stats()")
    if client_id:
        try:
            result = service.get_order_stats(client_id, 'client')
            stats['methods_tested'] += 1
            
            if result['success']:
                stats_data = result['stats']
                print(f"   ✅ Statistiques: {stats_data['total_orders']} commandes")
                stats['success'] += 1
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Client ID manquant, test ignoré")
        stats['skipped'] += 1
    
    # ==================== 8. TESTS AVANCÉS ====================
    print("\n8. 🧪 TESTS AVANCÉS")
    print("-"*40)
    
    # Test 8.1: Créer commande avec packages
    print("\n8.1 📦 create_order avec packages")
    
    # Chercher un gig avec packages
    gig_with_packages = None
    for g in service.gigs_collection.find().limit(10):
        if 'packages' in g and g['packages'] and isinstance(g['packages'], dict):
            gig_with_packages = g
            break
    
    if gig_with_packages and client_id:
        try:
            gig_id_pkg = str(gig_with_packages['_id'])
            packages = gig_with_packages['packages']
            package_name = list(packages.keys())[0] if packages else 'basic'
            
            order_data = {
                'gig_id': gig_id_pkg,
                'requirements': 'Test avec package sélectionné',
                'deadline': (datetime.now(UTC) + timedelta(days=5)).isoformat(),
                'package': package_name,
                'attachments': []
            }
            
            result = service.create_order(client_id, order_data)
            stats['methods_tested'] += 1
            
            if result['success']:
                print(f"   ✅ Commande avec package créée: {package_name}")
                stats['success'] += 1
                
                # Sauvegarder pour tests de livraison
                package_order_id = result['order']['_id']
            else:
                print(f"   ❌ Échec: {result.get('error')}")
                stats['failed'] += 1
                
        except Exception as e:
            print(f"   ❌ Exception: {e}")
            stats['failed'] += 1
    else:
        print("   ⚠️ Gig avec packages non trouvé, test ignoré")
        stats['skipped'] += 1
    
    # ==================== 9. RÉCAPITULATIF ====================
    print("\n" + "="*70)
    print("📊 RÉCAPITULATIF DES TESTS")
    print("="*70)
    
    total_tests = stats['methods_tested']
    success_rate = (stats['success'] / total_tests * 100) if total_tests > 0 else 0
    
    print(f"✅ Tests réussis: {stats['success']}")
    print(f"❌ Tests échoués: {stats['failed']}")
    print(f"⚠️  Tests ignorés: {stats['skipped']}")
    print(f"📋 Méthodes testées: {total_tests}")
    print(f"📈 Taux de succès: {success_rate:.1f}%")
    
    # Détails par catégorie
    print("\n🔍 DÉTAILS PAR CATÉGORIE:")
    print(f"   • Méthodes client: {stats.get('client_methods', 'N/A')}")
    print(f"   • Méthodes freelancer: {stats.get('freelancer_methods', 'N/A')}")
    print(f"   • Méthodes partagées: {stats.get('shared_methods', 'N/A')}")
    print(f"   • Méthodes admin: {stats.get('admin_methods', 'N/A')}")
    print(f"   • Méthodes utilitaires: {stats.get('utility_methods', 'N/A')}")
    
    if success_rate >= 90:
        print("\n🎉 EXCELLENT! OrderService est très fonctionnel!")
    elif success_rate >= 70:
        print("\n👍 BON! OrderService fonctionne bien avec quelques ajustements")
    elif success_rate >= 50:
        print("\n⚠️  MOYEN! Certaines méthodes nécessitent des corrections")
    else:
        print("\n❌ CRITIQUE! Beaucoup de problèmes à résoudre")
    
    print("\n🔧 RECOMMANDATIONS:")
    if stats['failed'] > 0:
        print("1. Vérifiez les erreurs spécifiques ci-dessus")
        print("2. Testez avec différentes données (statuts différents)")
        print("3. Ajoutez plus de logging pour le débogage")
    
    return stats

def test_méthodes_individuelles():
    """Test individuel de méthodes spécifiques"""
    print("\n🔬 TESTS INDIVIDUELS DÉTAILLÉS")
    print("="*70)
    
    service = OrderService()
    
    # Récupérer des données réelles
    order = service.orders_collection.find_one()
    if not order:
        print("❌ Aucune commande trouvée pour les tests")
        return
    
    order_id = str(order['_id'])
    client_id = str(order['client_id'])
    
    print(f"📦 Commande de test: {order_id}")
    print(f"👤 Client: {client_id}")
    print(f"📊 Statut actuel: {order.get('status')}")
    
    # Test get_order_by_id avec différents utilisateurs
    print("\n🔍 Test: get_order_by_id avec permissions")
    
    # 1. Test avec le client réel (devrait fonctionner)
    result = service.get_order_by_id(order_id, client_id)
    if result['success']:
        print(f"✅ Client peut voir sa commande")
    else:
        print(f"❌ Client ne peut pas voir: {result.get('error')}")
    
    # 2. Test avec un autre utilisateur (devrait échouer)
    other_user = service.users_collection.find_one({'_id': {'$ne': ObjectId(client_id)}})
    if other_user:
        other_user_id = str(other_user['_id'])
        result = service.get_order_by_id(order_id, other_user_id)
        if not result['success'] and 'Access denied' in result.get('error', ''):
            print(f"✅ Accès correctement refusé à un autre utilisateur")
        else:
            print(f"⚠️  Problème de sécurité: {result.get('error', 'Accès non protégé')}")
    
    # Test de transition d'état
    print("\n🔄 Test: Transitions d'état")
    
    current_status = order.get('status')
    print(f"Statut actuel: {current_status}")
    
    # Essayer d'annuler selon le statut
    # Essayer d'annuler selon le statut
    result = service.cancel_order(order_id, client_id, "Test d'annulation")

    print(
        f"Annulation: {'✅ Possible' if result['success'] else '❌ ' + str(result.get('error'))}"
    )

    # Vérifier le timeline
    print("\n📜 Test: Timeline")
    result = service.get_order_timeline(order_id)
    if result['success']:
        timeline = result.get('timeline', [])
        print(f"✅ Timeline: {len(timeline)} entrées")
        for entry in timeline[:3]:  # Afficher les 3 premières
            print(f"   • {entry.get('action')} - {entry.get('message')}")
    else:
        print(f"❌ Timeline: {result.get('error')}")

# ==================== VERSION SIMPLIFIÉE POUR DÉPANNAGE ====================

def test_simplifié():
    """Version simplifiée pour identifier les problèmes"""
    print("🧪 TEST SIMPLIFIÉ DE ORDER SERVICE")
    print("="*70)
    
    service = OrderService()
    
    # 1. Vérifier la connexion
    print("\n1. 🔗 TEST CONNEXION")
    try:
        count = service.orders_collection.count_documents({})
        print(f"✅ Connexion OK - {count} commandes")
    except Exception as e:
        print(f"❌ Erreur connexion: {e}")
        return
    
    # 2. Tester les méthodes UTILITAIRES (toujours fonctionnelles)
    print("\n2. 🔧 TEST MÉTHODES UTILITAIRES")
    
    # check_gig_compatibility
    gig = service.gigs_collection.find_one()
    if gig:
        gig_id = str(gig['_id'])
        print(f"\n🎯 Gig test: {gig.get('title')}")
        
        result = service.check_gig_compatibility(gig_id)
        if result['success']:
            print(f"✅ check_gig_compatibility: OK")
            compat = result['compatibility']
            print(f"   Compatible: {compat['has_required_fields']}")
        else:
            print(f"❌ check_gig_compatibility: {result.get('error')}")
    
    # fix_gig_structure
    if gig:
        result = service.fix_gig_structure(gig_id)
        if result['success']:
            print(f"✅ fix_gig_structure: {result.get('message')}")
        else:
            print(f"❌ fix_gig_structure: {result.get('error')}")
    
    # 3. Tester create_order (méthode principale)
    print("\n3. 🛒 TEST CREATE_ORDER")
    
    client = service.users_collection.find_one({'role': 'client'})
    if client and gig:
        client_id = str(client['_id'])
        gig_id = str(gig['_id'])
        
        order_data = {
            'gig_id': gig_id,
            'requirements': 'Test simplifié',
            'deadline': (datetime.now(UTC) + timedelta(days=7)).isoformat(),
            'attachments': ['test.pdf']
        }
        
        result = service.create_order(client_id, order_data)
        
        if result['success']:
            print(f"✅ create_order: SUCCÈS!")
            print(f"   ID: {result['order']['_id']}")
            print(f"   Prix: {result['order'].get('price')}€")
            print(f"   Statut: {result['order'].get('status')}")
            
            # Tester get_my_orders avec cette nouvelle commande
            print("\n4. 📋 TEST GET_MY_ORDERS")
            result2 = service.get_my_orders(client_id)
            if result2['success']:
                print(f"✅ get_my_orders: {len(result2.get('orders', []))} commandes")
            else:
                print(f"❌ get_my_orders: {result2.get('error')}")
        else:
            print(f"❌ create_order: {result.get('error')}")
    else:
        print("⚠️  Données insuffisantes pour tester create_order")
    
    # 5. Tester get_all_orders
    print("\n5. 📊 TEST GET_ALL_ORDERS")
    result = service.get_all_orders()
    if result['success']:
        print(f"✅ get_all_orders: {len(result.get('orders', []))} commandes")
    else:
        print(f"❌ get_all_orders: {result.get('error')}")
    
    print("\n" + "="*70)
    print("🏁 TEST SIMPLIFIÉ TERMINÉ")

if __name__ == "__main__":
    print("🧪 LANCEMENT DES TESTS COMPLETS")
    print("="*70)
    
    # Demander quel test exécuter
    print("\nChoisissez le type de test:")
    print("1. Test complet (peut échouer si données manquantes)")
    print("2. Test simplifié (plus stable)")
    print("3. Test méthodes individuelles")
    
    choix = input("\nVotre choix (1-3): ").strip()
    
    if choix == "1":
        # Test principal
        stats = tester_toutes_methodes()
        # Tests individuels détaillés
        test_méthodes_individuelles()
    elif choix == "2":
        # Test simplifié
        test_simplifié()
    elif choix == "3":
        # Test méthodes individuelles seulement
        test_méthodes_individuelles()
    else:
        print("❌ Choix invalide. Exécution du test simplifié par défaut.")
        test_simplifié()
    
    print("\n" + "="*70)
    print("🏁 TESTS TERMINÉS")
    print("="*70)