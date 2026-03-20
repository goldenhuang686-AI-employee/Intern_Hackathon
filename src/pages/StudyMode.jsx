import { useParams, Link } from 'react-router-dom'
import styles from './StudyMode.module.css'

// TODO: implement study mode
//
// What to build:
// 1. Fetch the cards for this deck (use useParams to get `id`)
// 2. Show one card at a time — display the front first
// 3. Let the user flip the card to reveal the back
// 4. After flipping, show "Got it" / "Try again" buttons
// 5. Record each review in the `card_reviews` table (was_correct, session_id, card_id)
// 6. When all cards are reviewed, show a summary screen
//
// Tables you'll need:
//   study_sessions — create one when the session starts, update ended_at when done
//   card_reviews   — insert one row per card reviewed
//
// Hint: create the study session with supabase.from('study_sessions').insert(...)
//       then insert card_reviews as the user goes through each card.

export default function StudyMode() {
  const { id } = useParams()

  return (
    <div className="page-container">
      <div className={styles.placeholder}>
        <h2>Study mode coming soon</h2>
        <p>This page is yours to build. See the comments in <code>StudyMode.jsx</code> for guidance.</p>
        <Link to={`/deck/${id}`}>
          <button className="btn-secondary">Back to deck</button>
        </Link>
      </div>
    </div>
  )
}
