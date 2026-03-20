// TODO: implement AI card generation
//
// This module should POST to the Flask backend, which calls the OpenAI API
// and returns generated flashcards.
//
// The Flask server runs at http://localhost:5000 (start it with `python app.py`
// inside the backend/ directory).
//
// Suggested implementation:
//
//   const BACKEND_URL = 'http://localhost:5000'
//
//   export async function generateCards(notes, deckId) {
//     const res = await fetch(`${BACKEND_URL}/generate-cards`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ notes, deckId }),
//     })
//     if (!res.ok) throw new Error('Failed to generate cards')
//     const { cards } = await res.json()
//     return cards  // [{ front, back }, ...]
//   }
