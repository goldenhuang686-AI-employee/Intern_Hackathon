from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # allows the React dev server (localhost:5173) to call this API


@app.route('/generate-cards', methods=['POST'])
def generate_cards():
    """
    POST /generate-cards
    Body (JSON): { "notes": "<raw study text>", "deckId": "<uuid>" }
    Returns:     { "cards": [{ "front": "...", "back": "..." }, ...] }

    TODO: replace the mock response below with a real OpenAI API call.

    Steps:
    1. Pull OPENAI_API_KEY from the environment (already loaded via dotenv).
    2. Build a chat.completions request that instructs the model to convert
       the provided notes into flashcard JSON. A good system prompt might be:
         "You are a flashcard generator. Given study notes, return a JSON array
          of objects with 'front' and 'back' keys. Return ONLY valid JSON."
    3. Parse the model's response content as JSON.
    4. Return { "cards": <parsed list> } with a 200 status.

    Hint:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {'role': 'system', 'content': SYSTEM_PROMPT},
                {'role': 'user', 'content': notes},
            ],
            response_format={'type': 'json_object'},
        )
    """
    data = request.get_json()
    notes = data.get('notes')
    deck_id = data.get('deckId')

    if not notes or not deck_id:
        return jsonify({'error': 'Missing required fields: notes, deckId'}), 400

    # ------------------------------------------------------------------
    # MOCK RESPONSE — delete this block and replace with an OpenAI call
    # ------------------------------------------------------------------
    mock_cards = [
        {'front': 'What is the capital of France?', 'back': 'Paris'},
        {'front': 'What is 2 + 2?', 'back': '4'},
        {'front': 'Who wrote Romeo and Juliet?', 'back': 'William Shakespeare'},
    ]
    # ------------------------------------------------------------------

    return jsonify({'cards': mock_cards}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
