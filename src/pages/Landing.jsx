import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  return (
    <main className={styles.hero}>
      <h1 className={styles.title}>Study smarter with <span>FlashGenius</span></h1>
      <p className={styles.subtitle}>
        Paste your notes, let AI generate flashcards, and master any subject with
        spaced-repetition study sessions.
      </p>
      <div className={styles.cta}>
        <Link to="/signup">
          <button className="btn-primary">Get started — it's free</button>
        </Link>
        <Link to="/login">
          <button className="btn-secondary">Log in</button>
        </Link>
      </div>
    </main>
  )
}
