from flask import Flask, render_template, request, redirect, session, flash
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import os
from dotenv import load_dotenv

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
bcrypt = Bcrypt(app)

# MongoDB setup
client = MongoClient(os.getenv('MONGO_URI'))
db = client["user_database"]  # Replace with your DB name
users_collection = db["users"]

# Routes
@app.route('/')
def index():
    if "user" in session:
        # Fetch all users to display on the home page
        users = list(users_collection.find({}, {"_id": 0, "name": 1, "phone": 1}))
        return render_template("home.html", users=users, current_user=session["user"])
    return redirect('/login')

@app.route('/signup', methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("name")
        phone = request.form.get("phone")
        password = request.form.get("password")
        
        # Check if phone number already exists
        if users_collection.find_one({"phone": phone}):
            flash("Phone number already exists. Please log in.", "error")
            return redirect("/signup")

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        
        # Insert the user into the database
        users_collection.insert_one({
            "name": name,
            "phone": phone,
            "password": hashed_password
        })
        flash("Account created successfully! Please log in.", "success")
        return redirect("/login")
    return render_template("signup.html")

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        phone = request.form.get("phone")
        password = request.form.get("password")

        # Find the user
        user = users_collection.find_one({"phone": phone})
        if user and bcrypt.check_password_hash(user["password"], password):
            # Save user to session
            session["user"] = {"name": user["name"], "phone": user["phone"]}
            flash("Login successful!", "success")
            return redirect("/")
        flash("Invalid phone number or password.", "error")
    return render_template("login.html")

@app.route('/logout')
def logout():
    session.pop("user", None)
    flash("Logged out successfully.", "success")
    return redirect("/login")

if __name__ == '__main__':
    app.run(debug=True)
