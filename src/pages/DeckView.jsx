// TODO: implement the deck view
//
// What to build:
// 1. Read the deck id from the URL using useParams()
// 2. Fetch the deck details and its cards from Supabase in parallel
//    - decks: single row matching the id
//    - cards: all rows where deck_id matches, ordered by created_at ascending
// 3. Show a loading state; show a "not found" message if the deck doesn't exist
// 4. Render the deck title and description in a header, with links to:
//    - /deck/:id/study  (Study button)
//    - /deck/:id/generate  (AI Generate button)
// 5. Render each card using the <CardItem> component
// 6. Add an "Add card" button that reveals a form with two textareas (front, back)
//    - Insert the new card into the `cards` table
//    - Append it to the displayed list without a full page reload
// 7. Handle and display errors from any failed Supabase call
//
// Imports you'll likely need:
//   import { useState, useEffect } from 'react'
//   import { useParams, Link } from 'react-router-dom'
//   import { supabase } from '../services/supabase'
//   import CardItem from '../components/CardItem'
//
// Tables:
//   decks — id, user_id, title, description, created_at
//   cards — id, deck_id, front, back, created_at

export default function DeckView() {
  return (
    <div className="page-container">
      <p>Deck view not yet implemented.</p>
    </div>
  )
}
