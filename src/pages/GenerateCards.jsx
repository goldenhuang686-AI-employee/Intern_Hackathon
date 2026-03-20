import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './GenerateCards.module.css'

// TODO: implement AI card generation
//
// What to build:
// 1. When the user clicks "Generate", call src/services/openai.js
//    which should POST to the Flask backend at http://localhost:5000/generate-cards
// 2. The Flask server calls OpenAI and returns { cards: [{ front, back }] }
// 3. Insert the returned cards into the `cards` table for this deck
// 4. Show the generated cards to the user and redirect to the deck view
//
// The Flask stub is at: backend/app.py
// The frontend service stub is at: src/services/openai.js

export default function GenerateCards() {
  const { id } = useParams()
  const [notes, setNotes] = useState('')

  return (
    <div className="page-container">
      <div className={styles.header}>
        <h1>Generate cards with AI</h1>
        <Link to={`/deck/${id}`}>
          <button className="btn-secondary">Back to deck</button>
        </Link>
      </div>

      <p className={styles.instructions}>
        Paste your notes or study material below. The AI will turn them into flashcards.
      </p>

      <textarea
        className={styles.notesInput}
        placeholder="Paste your notes here…"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={12}
      />

      {/* TODO: enable this button and wire up the generate logic */}
      <button className="btn-primary" disabled>
        Generate cards
      </button>
    </div>
  )
}
