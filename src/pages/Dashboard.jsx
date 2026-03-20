// TODO: implement the dashboard
//
// What to build:
// 1. Fetch all decks belonging to the logged-in user from the `decks` table
//    - Use useAuth() to get the current user, then query Supabase
//    - Order by created_at descending so the newest deck appears first
// 2. Show a loading state while the fetch is in progress
// 3. Show an empty state when the user has no decks yet
// 4. Render each deck using the <DeckCard> component
// 5. Add a "New deck" button that reveals a form to create a deck (title + description)
//    - Insert the new deck into the `decks` table
//    - Append it to the displayed list without a full page reload
// 6. Handle and display errors if any Supabase call fails
//
// Imports you'll likely need:
//   import { useState, useEffect } from 'react'
//   import { useAuth } from '../hooks/useAuth'
//   import { supabase } from '../services/supabase'
//   import DeckCard from '../components/DeckCard'
//
// Tables:
//   decks — id, user_id, title, description, created_at

export default function Dashboard() {
  return (
    <div className="page-container">
      <p>Dashboard not yet implemented.</p>
    </div>
  )
}
