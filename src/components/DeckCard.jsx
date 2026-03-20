import { Link } from 'react-router-dom'
import styles from './DeckCard.module.css'

// Displays a single deck as a card with links to view, study, and generate.
export default function DeckCard({ deck }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{deck.title}</h3>
        {deck.description && (
          <p className={styles.description}>{deck.description}</p>
        )}
      </div>

      <div className={styles.actions}>
        <Link to={`/deck/${deck.id}`}>
          <button className="btn-secondary">View cards</button>
        </Link>
        <Link to={`/deck/${deck.id}/study`}>
          <button className="btn-primary">Study</button>
        </Link>
      </div>
    </div>
  )
}
