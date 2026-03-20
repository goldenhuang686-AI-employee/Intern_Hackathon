import styles from './CardItem.module.css'

// Displays a single flashcard's front and back text.
export default function CardItem({ card }) {
  return (
    <div className={styles.item}>
      <div className={styles.side}>
        <span className={styles.label}>Front</span>
        <p>{card.front}</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.side}>
        <span className={styles.label}>Back</span>
        <p>{card.back}</p>
      </div>
    </div>
  )
}
