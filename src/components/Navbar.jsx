import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>FlashGenius</Link>

      <div className={styles.actions}>
        {user ? (
          <>
            <Link to="/dashboard">My Decks</Link>
            <span className={styles.email}>{user.email}</span>
            <button className="btn-secondary" onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">
              <button className="btn-primary">Sign up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
