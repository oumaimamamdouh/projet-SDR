# import os
# from pymongo import MongoClient
# from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
# from dotenv import load_dotenv
# import logging
# import certifi

# # Load environment variables
# load_dotenv()

# class Database:
#     _instance = None
#     _client = None
#     _db = None
    
#     def __new__(cls):
#         if cls._instance is None:
#             cls._instance = super(Database, cls).__new__(cls)
#             cls._instance._connect()
#         return cls._instance
    
#     def _connect(self):
#         """Connect to MongoDB Atlas"""
#         try:
#             # Get connection string from environment variables
#             mongodb_uri = os.getenv('MONGODB_URI')
#             if not mongodb_uri:
#                 raise ValueError("MONGODB_URI environment variable is required")
            
#             print(f"🔗 Connecting to MongoDB: {mongodb_uri[:30]}...")
            
#             # FIX: Add tlsCAFile=certifi.where() and remove SRV if present
#             # Remove any SRV prefix if it's causing issues
#             if mongodb_uri.startswith('mongodb+srv://'):
#                 # Try with standard connection string
#                 standard_uri = mongodb_uri.replace('mongodb+srv://', 'mongodb://')
#                 print(f"🔄 Converting SRV URI to standard: {standard_uri[:40]}...")
                
#                 # Try both URIs
#                 try:
#                     self._client = MongoClient(
#                         standard_uri,
#                         serverSelectionTimeoutMS=10000,
#                         connectTimeoutMS=10000,
#                         socketTimeoutMS=10000,
#                         tlsCAFile=certifi.where()
#                     )
#                     self._client.admin.command('ping')
#                 except Exception as e:
#                     print(f"⚠️ Standard connection failed: {e}")
#                     print("🔄 Trying SRV connection with longer timeout...")
#                     # Fall back to SRV with longer timeout
#                     self._client = MongoClient(
#                         mongodb_uri,
#                         serverSelectionTimeoutMS=15000,
#                         connectTimeoutMS=15000,
#                         socketTimeoutMS=15000,
#                         tlsCAFile=certifi.where()
#                     )
#             else:
#                 # Standard MongoDB URI
#                 self._client = MongoClient(
#                     mongodb_uri,
#                     serverSelectionTimeoutMS=10000,
#                     connectTimeoutMS=10000,
#                     socketTimeoutMS=10000,
#                     tlsCAFile=certifi.where()
#                 )
            
#             # Test connection
#             self._client.admin.command('ping')
#             self._db = self._client['Worknet']
            
#             logging.info("✅ Successfully connected to MongoDB Atlas")
#             print("✅ Successfully connected to MongoDB Atlas")
            
#             # Print database info
#             db_info = self._db.command('dbStats')
#             print(f"📊 Database: {self._db.name}")
#             print(f"📁 Collections: {len(self._db.list_collection_names())}")
            
#         except (ConnectionFailure, ServerSelectionTimeoutError) as e:
#             logging.error(f"❌ Failed to connect to MongoDB: {e}")
#             print(f"❌ Failed to connect to MongoDB: {e}")
#             # Try local fallback
#             self._try_local_fallback()
#         except Exception as e:
#             logging.error(f"❌ Unexpected error: {e}")
#             print(f"❌ Unexpected error: {e}")
#             self._try_local_fallback()
    
#     def _try_local_fallback(self):
#         """Try local MongoDB as fallback"""
#         try:
#             print("🔄 Trying local MongoDB fallback...")
#             self._client = MongoClient(
#                 'mongodb://localhost:27017',
#                 serverSelectionTimeoutMS=5000,
#                 connectTimeoutMS=5000,
#                 socketTimeoutMS=5000
#             )
#             self._client.admin.command('ping')
#             self._db = self._client['Worknet']
#             print("✅ Connected to local MongoDB")
#         except Exception as e:
#             print(f"❌ Local fallback also failed: {e}")
#             raise ConnectionError("Could not connect to any MongoDB instance")
    
#     def get_collection(self, collection_name):
#         """Get a specific collection"""
#         if self._db is None:
#             self._connect()
#         return self._db[collection_name]
    
#     def list_collections(self):
#         """List all collections in the database"""
#         if self._db is None:
#             self._connect()
#         return self._db.list_collection_names()
    
#     def close_connection(self):
#         """Close database connection"""
#         if self._client:
#             self._client.close()
#             self._client = None
#             self._db = None

# # Global database instance
# db = Database()




















# services/database.py - FIXED VERSION
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from dotenv import load_dotenv
import logging
import certifi

# Load environment variables
load_dotenv()

class Database:
    _instance = None
    _client = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance._connect()
        return cls._instance
    
    def _connect(self):
        """Connect to MongoDB Atlas - ONLY USE SRV URI AS-IS"""
        try:
            # Get connection string from environment variables
            mongodb_uri = os.getenv('MONGODB_URI')
            if not mongodb_uri:
                raise ValueError("MONGODB_URI environment variable is required")
            
            print(f"🔗 Connecting to MongoDB Atlas with SRV URI...")
            
            # CRITICAL FIX: Use SRV URI directly, DO NOT convert it!
            # MongoDB Atlas SRV records only work with mongodb+srv://
            self._client = MongoClient(
                mongodb_uri,  # Use the original SRV URI
                serverSelectionTimeoutMS=15000,
                connectTimeoutMS=15000,
                socketTimeoutMS=15000,
                tlsCAFile=certifi.where()
            )
            
            # Test connection
            self._client.admin.command('ping')
            self._db = self._client['Worknet']
            
            logging.info("✅ Successfully connected to MongoDB Atlas")
            print("✅ Successfully connected to MongoDB Atlas")
            
            # Print database info
            collections = self._db.list_collection_names()
            print(f"📊 Database: {self._db.name}")
            print(f"📁 Collections: {len(collections)}")
            
        except Exception as e:
            logging.error(f"❌ Failed to connect to MongoDB: {e}")
            print(f"❌ Failed to connect to MongoDB: {e}")
            # Try local fallback
            self._try_local_fallback()
    
    def _try_local_fallback(self):
        """Try local MongoDB as fallback"""
        try:
            print("🔄 Trying local MongoDB fallback...")
            self._client = MongoClient(
                'mongodb://localhost:27017',
                serverSelectionTimeoutMS=5000,
                connectTimeoutMS=5000,
                socketTimeoutMS=5000
            )
            self._client.admin.command('ping')
            self._db = self._client['Worknet']
            print("✅ Connected to local MongoDB")
        except Exception as e:
            print(f"❌ Local fallback also failed: {e}")
            raise ConnectionError("Could not connect to any MongoDB instance")
    
    def get_collection(self, collection_name):
        """Get a specific collection"""
        if self._db is None:
            self._connect()
        return self._db[collection_name]
    
    def list_collections(self):
        """List all collections in the database"""
        if self._db is None:
            self._connect()
        return self._db.list_collection_names()
    
    def close_connection(self):
        """Close database connection"""
        if self._client:
            self._client.close()
            self._client = None
            self._db = None

# Global database instance
db = Database()