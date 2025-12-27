#!/usr/bin/env python3
"""
WorkNet RPC Server Startup Script
"""
import os
from dotenv import load_dotenv
from server import WorkNetRPCServer

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # Check if MongoDB URI is set
    if not os.getenv('MONGODB_URI'):
        print("❌ ERROR: MONGODB_URI environment variable is not set")
        print("Please create a .env file with your MongoDB Atlas connection string")
        exit(1)
    
    # Start the RPC server
    server = WorkNetRPCServer('localhost', 8000)
    server.start_server()