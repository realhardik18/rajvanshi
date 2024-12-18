import os
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
from bson import ObjectId
from .user import User

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

class Post:
    @staticmethod
    def create_post(user_id, content, file_path=None):
        post = {
            "user_id": ObjectId(user_id),
            "posted_by": User.get_user_by_id(ObjectId(user_id))['name'],
            "content": content,
            "file_path": file_path,
            "created_at": datetime.utcnow(),
            "likes": [],  # Array to store likes (user_ids of users who liked)
            "comments": []  # Array to store comments (list of dictionaries)
        }
        # Save to database (adjust to your DB logic)
        db.posts.insert_one(post)

    @staticmethod
    def get_all_posts():
        return db.posts.find().sort("created_at", -1)

    @staticmethod
    def get_posts_by_user(user_id):
        posts = db.posts.find({"user_id": user_id}).sort("created_at", -1)
        return list(posts)

    @staticmethod
    def get_user_by_id(user_id):
        user = db.users.find_one({"_id": user_id})
        return user

    @staticmethod
    def add_like(post_id, user_id):
        db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$addToSet": {"likes": user_id}}  # Prevent duplicate likes
        )

    @staticmethod
    def add_comment(post_id, user_id, comment_text):
        comment = {
            "user_id": ObjectId(user_id),
            "comment_text": comment_text,
            "created_at": datetime.utcnow()
        }
        db.posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$push": {"comments": comment}}  # Adds a new comment to the post
        )

    @staticmethod
    def get_post_by_id(post_id):
        return db.posts.find_one({"_id": ObjectId(post_id)})

    @staticmethod
    def get_comments(post_id):
        post = db.posts.find_one({"_id": ObjectId(post_id)})
        if post:
            return post.get("comments", [])
        return []
