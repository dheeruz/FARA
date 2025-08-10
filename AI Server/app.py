from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow all origins by default

# Sample event data
events = [
    {"id": 1, "title": "Tech Conference in Chennai", "description": "Latest trends in AI, ML, and cloud computing."},
    {"id": 2, "title": "Startup Meet Bangalore", "description": "Networking session for entrepreneurs and investors."},
    {"id": 3, "title": "Music Fest Hyderabad", "description": "Live music, food stalls, and cultural performances."},
    {"id": 4, "title": "AI Hackathon Delhi", "description": "48-hour coding event focusing on AI solutions."},
    {"id": 5, "title": "Art & Craft Expo", "description": "Display of handmade art, craft, and workshops."},
    {"id": 6, "title": "Career Fair 2025", "description": "Opportunities for students to meet recruiters."},
    {"id": 7, "title": "Yoga Wellness Camp", "description": "Holistic health, meditation, and yoga training."},
    {"id": 8, "title": "Cybersecurity Bootcamp", "description": "Hands-on training in ethical hacking and defense."},
    {"id": 9, "title": "College Cultural Fest", "description": "Drama, dance, music, and fun competitions."},
    {"id": 10, "title": "Photography Workshop", "description": "Basics to advanced photography techniques."}
]

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "✅ Flask API is running. Use POST /recommend to get event suggestions."}), 200

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json(force=True)
        query = data.get('query', '').strip()

        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Only use event titles for matching
        titles = [event['title'] for event in events]
        titles.append(query)  # Add user query as the last item

        # TF-IDF vectorization on titles only
        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(titles)

        # Cosine similarity between query and all event titles
        similarity_scores = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])[0]

        # Threshold to filter strong matches
        threshold = 0.3
        matched_indices = [i for i, score in enumerate(similarity_scores) if score >= threshold]

        # Prepare the matched events
        recommendations = [events[i] for i in matched_indices]

        return jsonify(recommendations), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
