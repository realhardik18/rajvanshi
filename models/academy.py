import os
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
from bson import ObjectId

# Load environment variables
load_dotenv()

# Initialize Flask-Bcrypt
bcrypt = Bcrypt()

# MongoDB Setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client["my_app_database"]
users_collection = db["users"]
posts_collection = db["posts"]
academies_collection=db["academies"]
coaches_collection=db["coaches"]


class Academy:
    @staticmethod
    def create( name, address, city, state, pincode, phone_number):
        academy_data = {
            "name": name,
            "address": address,
            "city": city,
            "state": state,
            "pincode": pincode,
            "phone_number": phone_number,
            "created_at": datetime.utcnow()
        }
        # Insert the academy data into the MongoDB collection
        academies_collection.insert_one(academy_data)
    def get_all():
        return academies_collection.find()
    def find_specific(filter):
        return academies_collection.find(filter)

