from flask import Flask, render_template, request, redirect, session, flash,jsonify
from models.user import User
from models.academy import Academy
from models.post import Post
from models.coach import Coach
from bson import ObjectId
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"
UPLOAD_FOLDER = "static/uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "mp4", "mov", "avi"}

app.config["UPLOAD_FOLDER"] = 'static/uploads'

# Ensure the upload folder exists
os.makedirs('static/uploads', exist_ok=True)

@app.route('/')
def home():
    if "user" in session:
        posts = Post.get_all_posts()
        return render_template("feed.html", posts=posts, user=session["user"])
    return redirect('/login')

@app.route('/edit-profile', methods=["GET", "POST"])
def edit_profile():
    if "user" not in session:
        return redirect("/login")

    user_id = session["user"]["id"]

    if request.method == "POST":
        new_name = request.form.get("name")
        if not new_name.strip():
            flash("Name cannot be empty.", "error")
            return redirect("/edit-profile")

        result = User.update_name(ObjectId(user_id), new_name)
        if "success" in result:
            # Update session with new name
            session["user"]["name"] = new_name
            flash(result["success"], "success")
            return redirect("/")
        else:
            flash(result["error"], "error")

    return render_template("edit_profile.html", user=session["user"])

@app.route('/signup', methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("name")
        phone = request.form.get("phone")
        password = request.form.get("password")

        result = User.create_user(name, phone, password)
        if "error" in result:
            flash(result["error"], "error")
        else:
            flash(result["success"], "success")
            return redirect("/login")
    return render_template("signup.html")

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        phone = request.form.get("phone")
        password = request.form.get("password")
        user = User.authenticate(phone, password)

        if user:
            session["user"] = {"id": str(user["_id"]), "name": user["name"], "phone": user["phone"]}
            flash("Login successful!", "success")
            return redirect("/")
        flash("Invalid phone number or password.", "error")
    return render_template("login.html")

@app.route('/logout')
def logout():
    session.pop("user", None)
    flash("Logged out successfully.", "success")
    return redirect("/login")

@app.route('/create')
def create():
    if "user" in session:
        return render_template("create.html", user=session["user"])
    return redirect('/login')        

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/post', methods=["POST"])
def post():
    if "user" not in session:
        return redirect("/login")

    content = request.form.get("content")
    file = request.files.get("file")

    if not content and not file:
        flash("Post content or file is required.", "error")
        return redirect("/create")

    file_path = None
    if file and allowed_file(file.filename):
        # Secure the filename to avoid any security issues
        filename = secure_filename(file.filename)
        
        # Construct the file path
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        
        # Save the file
        file.save(file_path)

        # Debugging: Check if the file is saved correctly        

    # Save the post to the database
    Post.create_post(
        user_id=session["user"]["id"],
        content=content,
        file_path=file_path  # Store the file path in the post
    )
    flash("Post created successfully.", "success")
    return redirect("/")

@app.route('/user/<id>')
def user_profile(id):
    user = User.get_user_by_id(ObjectId(id))
    if not user:
        flash("User not found.", "error")
        return redirect("/")

    posts = Post.get_posts_by_user(ObjectId(id))
    is_current_user = "user" in session and session["user"]["id"] == id

    return render_template("user_profile.html", user=user, posts=posts, is_current_user=is_current_user)

from flask import request

@app.route('/academy', methods=['GET'])
def view_academies():
    search_query = request.args.get('search', '')  # Get search term from query string

    # Build the search filter
    filter_criteria = {}
    if search_query:
        filter_criteria = {
            "$or": [
                {"name": {"$regex": search_query, "$options": "i"}},  # Case-insensitive regex search for name
                {"city": {"$regex": search_query, "$options": "i"}},  # Case-insensitive regex search for city
                {"state": {"$regex": search_query, "$options": "i"}},
                {"pincode": {"$regex": search_query, "$options": "i"}}  # Case-insensitive regex search for state
            ]
        }

    # Fetch academies based on search filter
    academies = Academy.get_all()
    
    # Convert ObjectId to string for easier rendering in HTML
    academies = [{**academy, "_id": str(academy["_id"])} for academy in academies]

    return render_template('academy.html', academies=academies, search_query={})

@app.route('/academy/search', methods=['GET'])
def search_academies():
    search_query = request.args.get('search', '')  # Get search term from query string

    # Build the search filter
    filter_criteria = {}
    if search_query:
        filter_criteria = {
            "$or": [
                {"name": {"$regex": search_query, "$options": "i"}},  # Case-insensitive regex search for name
                {"city": {"$regex": search_query, "$options": "i"}},  # Case-insensitive regex search for city
                {"state": {"$regex": search_query, "$options": "i"}},  # Case-insensitive regex search for state
                {"pincode": {"$regex": search_query, "$options": "i"}}  # Case-insensitive regex search for state
            ]
        }

    # Fetch academies based on search filter
    academies = Academy.find_specific(filter_criteria)
    
    # Convert ObjectId to string for easier rendering in HTML
    academies = [{**academy, "_id": str(academy["_id"])} for academy in academies]

    return jsonify(academies)

@app.route('/coach', methods=['GET'])
def coach_page():
    return render_template('coaches.html')

# Serve coaches data as JSON
@app.route('/coaches', methods=['GET'])
def get_coaches():
    coaches = Coach.send_all()
    coaches = [{**coach, "_id": str(coach["_id"])} for coach in coaches]
    return jsonify(coaches)

app.run(debug=True)