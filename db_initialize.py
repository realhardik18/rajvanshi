from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
# MongoDB URI
print(os.getenv('MONGO_URI'))
client = MongoClient(os.getenv('MONGO_URI')) 
db = client["user_database"]  
users_collection = db["users"]  # Replace with your desired collection name

# Test data (optional)
initial_users = [
    {"name": "Alice", "phone": "1234567890", "password": "hashed_password_1"},
    {"name": "Bob", "phone": "0987654321", "password": "hashed_password_2"}
]

# Insert test data if the collection is empty
if users_collection.count_documents({}) == 0:
    users_collection.insert_many(initial_users)
    print("Database initialized with test users.")
else:
    print("Database already contains data.")
