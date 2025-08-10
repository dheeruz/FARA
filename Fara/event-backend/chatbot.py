from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample event database (could also come from MySQL)
events = [
    {"name": "Tech Fest 2025", "date": "2025-08-15", "location": "Chennai"},
    {"name": "Music Mania", "date": "2025-09-10", "location": "Hyderabad"},
    {"name": "Startup Expo", "date": "2025-10-05", "location": "Bangalore"},
]

def get_event_response(user_input):
    user_input = user_input.lower()
    
    if "event" in user_input or "show" in user_input:
        return "Here are our upcoming events:\n" + "\n".join(
            [f"{e['name']} on {e['date']} at {e['location']}" for e in events]
        )
    elif "register" in user_input:
        return "You can register for events on our Events page."
    elif "when" in user_input or "date" in user_input:
        return "The next event is on " + events[0]["date"]
    elif "location" in user_input:
        return "Our events take place in Chennai, Hyderabad, and Bangalore."
    elif "hi" in user_input or "hello" in user_input:
        return "Hi there! Ask me about our upcoming events."
    else:
        return "Sorry, I didn't understand that. You can ask me about event dates, locations, or how to register."

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
