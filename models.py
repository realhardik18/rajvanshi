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

class User:
    @staticmethod
    def create_user(name, phone, password):
        """Create a new user with hashed password."""
        # Check if user already exists
        if users_collection.find_one({"phone": phone}):
            return {"error": "User with this phone already exists."}

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        users_collection.insert_one({
            "name": name,
            "phone": phone,
            "password": hashed_password,
            "created_at": datetime.utcnow()
        })
        return {"success": "User created successfully."}

    @staticmethod
    def authenticate(phone, password):
        """Authenticate user by phone and password."""
        user = users_collection.find_one({"phone": phone})
        if user and bcrypt.check_password_hash(user["password"], password):
            return user  # Return user object if authenticated
        return None
    
    @staticmethod
    def update_name(user_id, new_name):        
        result = users_collection.update_one(
            {"_id": user_id},  # Match the user by their ID
            {"$set": {"name": new_name}}
        )
        if result.matched_count:
            return {"success": "Name updated successfully."}
        return {"error": "User not found."}  
    @staticmethod
    def get_posts_by_user(user_id):
        # Replace with your database query logic
        posts = db.posts.find({"user_id": user_id}).sort("created_at", -1)
        return list(posts)      
    
    @staticmethod
    def get_user_by_id(user_id):
        # Replace with your database query logic
        user = db.users.find_one({"_id": user_id})
        return user       
    




class Post:
    @staticmethod
    def create_post(user_id, content, file_path=None):
        # Example implementation using a database like MongoDB
        post = {
            "user_id": ObjectId(user_id),
            "posted_by":User.get_user_by_id(ObjectId(user_id))['name'],
            "content": content,
            "file_path": file_path,
            "created_at": datetime.utcnow(),

        }
        # Save to database (adjust to your DB logic)
        db.posts.insert_one(post)

    @staticmethod
    def get_all_posts():
        # Fetch posts from the database
        return db.posts.find().sort("created_at", -1)
    
    @staticmethod
    def get_posts_by_user(user_id):
        # Replace with your database query logic
        posts = db.posts.find({"user_id": user_id}).sort("created_at", -1)
        return list(posts)      
    
    @staticmethod
    def get_user_by_id(user_id):
        # Replace with your database query logic
        user = db.users.find_one({"_id": user_id})
        return user            

    
