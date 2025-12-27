# TestCompletOrders_CORRIGE.py
"""
Menu test interactif CORRIGÉ pour OrderService
"""

import sys
import os
from datetime import datetime, timedelta, UTC
from bson import ObjectId

# Ajouter le chemin
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from services.order_service import OrderService

def afficher_ordre(ordre):
    """Affiche une commande de manière lisible"""
    print("\n" + "="*60)
    print("📦 DÉTAILS DE LA COMMANDE")
    print("="*60)
    
    ordre['_id'] = str(ordre['_id'])
    
    # Champs principaux
    champs_importants = ['_id', 'status', 'price', 'client_id', 'gig_id', 
                         'package', 'requirements', 'deadline', 'created_at']
    
    for champ in champs_importants:
        if champ in ordre:
            valeur = ordre[champ]
            if isinstance(valeur, datetime):
                valeur = valeur.strftime("%Y-%m-%d %H:%M:%S")
            print(f"🔹 {champ}: {valeur}")
    
    # Champs restants
    autres_champs = [c for c in ordre.keys() if c not in champs_importants]
    if autres_champs:
        print(f"\n📋 Autres champs: {', '.join(autres_champs)}")

def menu_test():
    """Menu interactif pour tester votre OrderService"""
    
    service = OrderService()
    
    while True:
        print("\n" + "="*60)
        print("🧪 MENU TEST ORDER SERVICE (CORRIGÉ)")
        print("="*60)
        print("1. 📋 Lister tous les gigs")
        print("2. 👥 Lister tous les clients")
        print("3. 📦 Lister toutes les commandes")
        print("4. 🛒 Créer une nouvelle commande")
        print("5. 🔍 Rechercher une commande par ID")
        print("6. 👤 Voir commandes d'un client")
        print("7. 🔄 Changer statut d'une commande")
        print("8. ✅ Vérifier compatibilité gig")
        print("9. 📊 Voir méthode create_order (debug)")
        print("10. 🚪 Quitter")
        
        choix = input("\nVotre choix (1-10): ").strip()
        
        if choix == "1":
            print("\n🎯 GIGS DISPONIBLES:")
            gigs = list(service.gigs_collection.find())
            for i, gig in enumerate(gigs, 1):
                print(f"{i}. ID: {gig['_id']}")
                print(f"   Titre: {gig.get('title', 'Sans titre')}")
                prix = gig.get('base_price', gig.get('price', 'Non défini'))
                print(f"   Prix: {prix}€")
                print(f"   Catégorie: {gig.get('category', 'Non définie')}")
                print()
        
        elif choix == "2":
            print("\n👤 CLIENTS DISPONIBLES:")
            clients = list(service.users_collection.find({'role': 'client'}))
            for i, client in enumerate(clients, 1):
                print(f"{i}. ID: {client['_id']}")
                print(f"   Username: {client.get('username', 'Sans nom')}")
                print(f"   Email: {client.get('email', 'Non défini')}")
                print()
        
        elif choix == "3":
            print("\n📦 COMMANDES EXISTANTES:")
            orders = list(service.orders_collection.find())
            for i, order in enumerate(orders, 1):
                print(f"{i}. ID: {order['_id']}")
                print(f"   Statut: {order.get('status', 'inconnu')}")
                prix = order.get('price', '?')
                if prix != '?':
                    print(f"   Prix: {prix}€")
                else:
                    print(f"   Prix: {prix}")
                print(f"   Client: {order.get('client_id', '?')}")
                print(f"   Gig: {order.get('gig_id', '?')}")
                print()
        
        elif choix == "4":
            print("\n🛒 CRÉER UNE NOUVELLE COMMANDE")
            
            # Lister les gigs
            gigs = list(service.gigs_collection.find().limit(5))
            print("Gigs disponibles:")
            for i, gig in enumerate(gigs, 1):
                titre = gig.get('title', 'Sans titre')
                prix = gig.get('base_price', gig.get('price', '?'))
                print(f"{i}. {titre} - {prix}€ (ID: {gig['_id']})")
            
            try:
                gig_choice = input("\nNuméro du gig (1-5): ")
                gig_idx = int(gig_choice) - 1
                selected_gig = gigs[gig_idx]
                gig_id = str(selected_gig['_id'])
                
                # Lister les clients
                clients = list(service.users_collection.find({'role': 'client'}).limit(3))
                print("\nClients disponibles:")
                for i, client in enumerate(clients, 1):
                    username = client.get('username', 'Anonyme')
                    print(f"{i}. {username} (ID: {client['_id']})")
                
                client_choice = input("\nNuméro du client (1-3): ")
                client_idx = int(client_choice) - 1
                client_id = str(clients[client_idx]['_id'])
                client_username = clients[client_idx].get('username', 'Anonyme')
                
                # Données de la commande
                print(f"\n📝 Création de commande pour {client_username}:")
                requirements = input("Exigences (Enter pour 'Test'): ") or "Test création manuelle"
                deadline = (datetime.now(UTC) + timedelta(days=7)).isoformat()
                
                order_data = {
                    'gig_id': gig_id,
                    'requirements': requirements,
                    'deadline': deadline,
                    'attachments': ['test.pdf']
                }
                
                # Ajouter package si disponible
                if 'packages' in selected_gig and selected_gig['packages']:
                    if isinstance(selected_gig['packages'], dict):
                        packages = list(selected_gig['packages'].keys())
                        print(f"\n📦 Packages disponibles: {packages}")
                        package_choice = input("Nom du package (Enter pour 'default'): ") or 'default'
                        order_data['package'] = package_choice
                        print(f"Package sélectionné: {package_choice}")
                
                print(f"\n⚡ Appel de service.create_order()...")
                result = service.create_order(client_id, order_data)
                
                if result['success']:
                    print(f"✅ Commande créée avec succès!")
                    afficher_ordre(result['order'])
                else:
                    print(f"❌ Erreur: {result['error']}")
                    
            except (ValueError, IndexError) as e:
                print(f"❌ Choix invalide: {e}")
            except Exception as e:
                print(f"❌ Erreur inattendue: {e}")
        
        elif choix == "5":
            order_id = input("\n🔍 ID de la commande: ").strip()
            
            try:
                # Rechercher directement dans la collection
                order = service.orders_collection.find_one({"_id": ObjectId(order_id)})
                
                if order:
                    afficher_ordre(order)
                else:
                    print("❌ Commande non trouvée")
                    
            except Exception as e:
                print(f"❌ Erreur: {e}")
        
        elif choix == "6":
            client_id = input("\n👤 ID du client: ").strip()
            
            try:
                # Rechercher les commandes du client
                orders = list(service.orders_collection.find({"client_id": client_id}))
                
                if orders:
                    print(f"✅ {len(orders)} commande(s) trouvée(s) pour ce client:")
                    for i, order in enumerate(orders, 1):
                        print(f"\n{i}. ID: {order['_id']}")
                        print(f"   Statut: {order.get('status')}")
                        prix = order.get('price')
                        if prix:
                            print(f"   Prix: {prix}€")
                        print(f"   Gig: {order.get('gig_id')}")
                        if 'created_at' in order:
                            date = order['created_at']
                            if isinstance(date, datetime):
                                date = date.strftime("%Y-%m-%d")
                            print(f"   Créée le: {date}")
                else:
                    print("❌ Aucune commande trouvée pour ce client")
                    
            except Exception as e:
                print(f"❌ Erreur: {e}")
        
        elif choix == "7":
            order_id = input("\n🔄 ID de la commande: ").strip()
            print("Statuts disponibles: pending, in_progress, completed, cancelled, confirmed, disputed")
            new_status = input("Nouveau statut: ").strip()
            
            try:
                # Mettre à jour directement dans la collection
                result = service.orders_collection.update_one(
                    {"_id": ObjectId(order_id)},
                    {"$set": {"status": new_status, "updated_at": datetime.now(UTC)}}
                )
                
                if result.matched_count > 0:
                    print(f"✅ Statut mis à jour à '{new_status}'")
                    # Afficher la commande mise à jour
                    updated_order = service.orders_collection.find_one({"_id": ObjectId(order_id)})
                    afficher_ordre(updated_order)
                else:
                    print("❌ Commande non trouvée")
                    
            except Exception as e:
                print(f"❌ Erreur: {e}")
        
        elif choix == "8":
            gig_id = input("\n✅ ID du gig à vérifier: ").strip()
            
            try:
                result = service.check_gig_compatibility(gig_id)
                
                if result['success']:
                    compat = result['compatibility']
                    print(f"\n✅ RÉSULTAT DE COMPATIBILITÉ:")
                    print(f"   Compatible: {'✅ OUI' if compat['has_required_fields'] else '❌ NON'}")
                    print(f"   Champs prix présents: {compat['present_price_fields']}")
                    print(f"   Structure détectée: {compat['structure']}")
                    
                    if not compat['has_required_fields']:
                        print(f"\n⚠️  Ce gig n'est pas compatible!")
                        corriger = input("Voulez-vous le corriger? (oui/non): ").lower()
                        if corriger == 'oui':
                            fix_result = service.fix_gig_structure(gig_id)
                            print(f"Résultat: {fix_result['message']}")
                else:
                    print(f"❌ Erreur: {result.get('error')}")
                    
            except Exception as e:
                print(f"❌ Erreur: {e}")
        
        elif choix == "9":
            print("\n🔧 DEBUG: Méthodes disponibles dans OrderService")
            print("="*60)
            
            # Lister les méthodes
            methods = [m for m in dir(service) if not m.startswith('_')]
            print(f"Nombre de méthodes: {len(methods)}")
            print("\nMéthodes disponibles:")
            for method in sorted(methods):
                print(f"- {method}")
            
            # Voir les attributs des collections
            print(f"\n📊 Collections accessibles:")
            print(f"- gigs_collection: {service.gigs_collection.name}")
            print(f"- users_collection: {service.users_collection.name}")
            print(f"- orders_collection: {service.orders_collection.name}")
        
        elif choix == "10":
            print("\n👋 Au revoir!")
            break
        
        else:
            print("\n❌ Choix invalide, réessayez")

if __name__ == "__main__":
    try:
        menu_test()
    except KeyboardInterrupt:
        print("\n\n👋 Programme interrompu par l'utilisateur")
    except Exception as e:
        print(f"\n❌ Erreur critique: {e}")
        import traceback
        traceback.print_exc()