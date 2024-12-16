from flask import Flask, render_template, request, redirect, session, flash
from models import User, Post
from bson import ObjectId

app = Flask(__name__)
app.secret_key = "your_secret_key"


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
        posts = Post.get_all_posts()
        return render_template("create.html", user=session["user"])
    return redirect('/login')    

@app.route('/post', methods=["POST"])
def post():
    if "user" not in session:
        return redirect("/login")

    content = request.form.get("content")
    if not content:
        flash("Post content cannot be empty.", "error")
        return redirect("/")

    Post.create_post(user_id=session["user"]["id"], content=content)
    flash("Post created successfully.", "success")
    return redirect("/")

app.run(debug=True)