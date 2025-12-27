import secrets
import base64

# Generate a secure random secret
secret = base64.b64encode(secrets.token_bytes(32)).decode('utf-8')
print(f"🔐 Your JWT Secret: {secret}")
print("📋 Copy this to your .env file as JWT_SECRET=")