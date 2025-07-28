from flask import Flask, request, jsonify, send_file
from firebase_config import db, bucket, auth
from tryon_processor import process_tryon
import os, uuid

app = Flask(__name__)
os.makedirs("uploads/temp", exist_ok=True)
os.makedirs("static/results", exist_ok=True)

# Health Check
@app.route("/")
def ping():
    return "Flask backend is running."

# 1. Try-On
@app.route("/tryon", methods=["POST"])
def tryon():
    user_img = request.files['user_image']
    cloth_img = request.files['cloth_image']

    user_path = "uploads/temp/user.jpg"
    cloth_path = "uploads/temp/cloth.jpg"
    user_img.save(user_path)
    cloth_img.save(cloth_path)

    output_path = process_tryon(user_path, cloth_path)
    return send_file(output_path, mimetype="image/jpeg")

# 2. Wishlist: Add Item
@app.route("/wishlist/<uid>", methods=["POST"])
def add_to_wishlist(uid):
    data = request.json  # Expect product_id, product_name, etc.
    db.collection("wishlists").document(uid).collection("items").add(data)
    return jsonify({"message": "Item added to wishlist"})

# 3. Wishlist: Get All
@app.route("/wishlist/<uid>", methods=["GET"])
def get_wishlist(uid):
    docs = db.collection("wishlists").document(uid).collection("items").stream()
    items = [doc.to_dict() for doc in docs]
    return jsonify(items)

# 4. Save to History Gallery
@app.route("/gallery/<uid>", methods=["POST"])
def save_gallery_image(uid):
    image = request.files['image']
    filename = f"{uid}_{uuid.uuid4().hex}.jpg"
    blob = bucket.blob(f"history/{filename}")
    blob.upload_from_file(image, content_type='image/jpeg')
    blob.make_public()

    # Save URL to Firestore history collection
    db.collection("gallery").document(uid).collection("images").add({"url": blob.public_url})
    return jsonify({"url": blob.public_url})

# 5. Fetch Gallery
@app.route("/gallery/<uid>", methods=["GET"])
def get_gallery(uid):
    docs = db.collection("gallery").document(uid).collection("images").stream()
    urls = [doc.to_dict()["url"] for doc in docs]
    return jsonify({"images": urls})

# 6. Verify Firebase Token
@app.route("/verify-token", methods=["POST"])
def verify_token():
    id_token = request.json.get("idToken")
    try:
        decoded_token = auth.verify_id_token(id_token)
        return jsonify({"uid": decoded_token["uid"], "email": decoded_token["email"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 401

if __name__ == '__main__':
    app.run(debug=True)
