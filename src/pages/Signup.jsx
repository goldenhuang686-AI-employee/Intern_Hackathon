import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'
import styles from './Auth.module.css'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handleSubmit({ email, password, displayName }) {
    setError('')
    const { error } = await signUp(email, password, displayName)
    if (error) {
      setError(error.message)
    } else {
      // Supabase may require email confirmation depending on your project settings.
      // If email confirmation is disabled, the user is logged in immediately.
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create your account</h1>
        <AuthForm mode="signup" onSubmit={handleSubmit} error={error} />
        <p className={styles.switch}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
