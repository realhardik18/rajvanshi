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


class Coach:
    @staticmethod
    def create(name, experience, academy_name, city, number, age, speciality, avatar_url):
        """
        Create a new coach with the given attributes and save it to the database.
        """
        coach_data = {
            "name": name,
            "experience": experience,
            "academy_name": academy_name,
            "city": city,
            "number": number,
            "age": age,
            "speciality": speciality,
            "avatar_url": avatar_url,
            "created_at": datetime.utcnow()
        }
        # Insert the coach data into the MongoDB collection
        coaches_collection.insert_one(coach_data)

    @staticmethod
    def get_all():
        """
        Retrieve all coaches from the database.
        """
        return list(coaches_collection.find())

    @staticmethod
    def find_specific(filter):
        """
        Retrieve coaches that match a specific filter.
        """
        return list(coaches_collection.find(filter))
    
    @staticmethod
    def send_all():
        return list(coaches_collection.find())

    @staticmethod
    def update(coach_id, updates):
        """
        Update a specific coach by ID with new values.
        """
        result = coaches_collection.update_one(
            {"_id": ObjectId(coach_id)}, {"$set": updates}
        )
        return result.modified_count > 0
