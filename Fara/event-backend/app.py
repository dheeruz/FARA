from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# ✅ MySQL connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",      # MySQL host
        user="root",           # MySQL username
        password="dheeraj123",           # MySQL password
        database="event_planner"     # Your database name
    )

# ✅ Sample events data
events = [
    {"name": "Tech Fest 2025", "date": "2025-08-15", "location": "Chennai"},
    {"name": "Music Mania", "date": "2025-09-10", "location": "Hyderabad"},
    {"name": "Startup Expo", "date": "2025-10-05", "location": "Bangalore"},
]

# ✅ Chatbot response logic
def get_event_response(user_input):
    user_input = user_input.lower()

    if "event" in user_input or "show" in user_input:
        return "Here are our upcoming events:\n" + "\n".join(
            [f"{e['name']} on {e['date']} at {e['location']}" for e in events]
        )
    elif "register" in user_input:
        return "You can register for events on our Events page."
    elif "when" in user_input or "date" in user_input:
        return f"The next event is on {events[0]['date']}."
    elif "location" in user_input:
        return "Our events take place in Chennai, Hyderabad, and Bangalore."
    elif "hi" in user_input or "hello" in user_input:
        return "Hi there! Ask me about our upcoming events."
    else:
        return "Sorry, I didn't understand that. You can ask me about event dates, locations, or how to register."

# ✅ Login route
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401

        if check_password_hash(user["password"], password):
            return jsonify({"success": True, "message": "Login successful", "role": user["role"]})
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401

    except Error as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# ✅ Chatbot route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")

    if not message:
        return jsonify({"response": "Please send a valid message."}), 400

    response = get_event_response(message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
