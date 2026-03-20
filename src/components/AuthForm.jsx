import { useState } from 'react'
import styles from './AuthForm.module.css'

// Reusable auth form used by both Login and Signup pages.
// `mode` is either "login" or "signup".
export default function AuthForm({ mode, onSubmit, error }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ email, password, displayName })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {mode === 'signup' && (
        <div className={styles.field}>
          <label htmlFor="displayName">Name</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="btn-primary">
        {mode === 'login' ? 'Log in' : 'Create account'}
      </button>
    </form>
  )
}
