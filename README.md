# FlashGenius — Hackathon Starter

An AI-powered flashcard web app built with React 18, Vite, Supabase, a Python/Flask backend, and the OpenAI API.

---

## Setup Instructions

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Once the project is ready, open the **SQL Editor** and paste the contents of
   `supabase/migrations/001_initial_schema.sql`. Run it. This creates all tables,
   enables Row-Level Security, and sets up a trigger to auto-create user profiles.
3. In **Authentication → Settings**, disable email confirmation if you want
   sign-ups to work immediately without verifying an inbox.

### 2. Configure frontend environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the two Supabase values:

| Variable | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API → anon/public key |

### 3. Start the React frontend

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Set up and start the Flask backend

The Flask server handles OpenAI API calls. Run it in a separate terminal.

```bash
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure the OpenAI key
cp backend/.env.example backend/.env
# Open backend/.env and set OPENAI_API_KEY

# Start the server
python app.py
```

The API will be available at `http://localhost:5000`.

---

## Project Structure

```
├── backend/
│   ├── app.py                       ← Flask API server (stub — you implement OpenAI here)
│   ├── requirements.txt
│   └── .env.example                 ← OPENAI_API_KEY goes here
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   ← Run this in Supabase SQL Editor
└── src/
    ├── components/
    │   ├── AuthForm.jsx             ← Reusable login/signup form
    │   ├── CardItem.jsx             ← Displays one flashcard (front + back)
    │   ├── DeckCard.jsx             ← Displays a deck in the dashboard grid
    │   └── Navbar.jsx               ← Top navigation bar
    ├── hooks/
    │   ├── useAuth.js               ← Auth context + helpers (fully working)
    │   └── useMastery.js            ← Mastery tracking hook (stub — you build this)
    ├── pages/
    │   ├── Landing.jsx              ← Public home page
    │   ├── Login.jsx                ← Login page (fully working)
    │   ├── Signup.jsx               ← Signup page (fully working)
    │   ├── Dashboard.jsx            ← Deck list + create deck (stub — you build this)
    │   ├── DeckView.jsx             ← Card list + add card (stub — you build this)
    │   ├── StudyMode.jsx            ← Study session (stub — you build this)
    │   └── GenerateCards.jsx        ← AI generation UI (stub — you build this)
    ├── services/
    │   ├── supabase.js              ← Supabase client initialisation
    │   └── openai.js                ← Fetch wrapper for the Flask API (stub — you build this)
    ├── App.jsx                      ← Routes + protected route wrappers
    └── main.jsx                     ← React entry point
```

---

## What's Already Working

- **Auth**: sign up, log in, log out, session persistence across page reloads
- **Routing**: protected routes redirect unauthenticated users to `/login`
- **RLS**: every Supabase query is scoped to the authenticated user
- **Components**: `DeckCard`, `CardItem`, `AuthForm`, `Navbar` are ready to use

---

## Your Challenge

You have **24 hours** to implement the five stub features below. They build on each other — work in order.

### Feature 1 — Dashboard (`src/pages/Dashboard.jsx`)

Build the main page users see after logging in:

1. Fetch all decks for the current user from the `decks` table.
2. Display a loading state and an empty state when there are no decks.
3. Render each deck using the provided `<DeckCard>` component.
4. Add a "New deck" button that reveals a form (title + description).
5. Insert the new deck and add it to the list without a full reload.
6. Display any errors returned by Supabase.

---

### Feature 2 — Deck View (`src/pages/DeckView.jsx`)

Build the page that shows cards inside a deck:

1. Read the deck `id` from the URL with `useParams`.
2. Fetch the deck and its cards from Supabase in parallel.
3. Render the deck title/description and links to Study and AI Generate.
4. Render each card using the provided `<CardItem>` component.
5. Add an "Add card" form (front textarea + back textarea).
6. Insert the new card and append it to the list without a full reload.

---

### Feature 3 — Study Mode (`src/pages/StudyMode.jsx`)

Build an interactive study session:

1. Fetch the cards for the current deck.
2. Show one card at a time — front first.
3. Let the user tap/click to flip the card and reveal the back.
4. Show **Got it** and **Missed it** buttons after the flip.
5. Record each review in `card_reviews` (with `was_correct` and a `session_id`).
6. When all cards are done, show a summary (e.g., "8/10 correct").

**Tip:** Create a row in `study_sessions` when the session starts, then update
`ended_at` when it finishes.

---

### Feature 4 — AI Card Generation (`backend/app.py` + `src/services/openai.js` + `src/pages/GenerateCards.jsx`)

Wire up the full AI pipeline across the Flask backend and the React frontend:

1. **Flask route** (`backend/app.py`): the `POST /generate-cards` route is already
   stubbed and returns mock data. Replace the mock block with a real OpenAI
   `chat.completions` call. Prompt the model to return JSON like
   `[{ "front": "...", "back": "..." }]`. The `OPENAI_API_KEY` is already loaded
   from `backend/.env` via `python-dotenv`.
2. **Frontend service** (`src/services/openai.js`): implement `generateCards(notes, deckId)`
   — a `fetch` POST to `http://localhost:5000/generate-cards` that returns the
   cards array.
3. **Page** (`src/pages/GenerateCards.jsx`): enable the Generate button, call
   `generateCards`, insert the returned cards into the `cards` table via Supabase,
   then navigate back to the deck view.

---

### Feature 5 — Mastery Tracking (`src/hooks/useMastery.js`)

Implement the `useMastery` hook:

1. Query `card_reviews` for all reviews of cards in this deck.
2. Define a mastery threshold (e.g., 3 correct answers in a row without a miss).
3. Return a `masteredCardIds` Set so that `DeckView` and `StudyMode` can visually
   flag mastered cards.

---

## Grading Rubric

| Criterion | Points | What we look for |
|---|---|---|
| **Dashboard + deck view work** | 20 | Decks and cards load correctly, create/add forms work, errors handled |
| **Study mode works** | 20 | Flip cards, mark correct/incorrect, reviews saved to DB |
| **AI generation works** | 20 | Paste notes → real cards appear in the deck (not the mock) |
| **Mastery tracking** | 15 | Cards marked mastered after enough correct answers; reflected in the UI |
| **Code quality** | 15 | Clean component structure, logic in hooks/services not JSX, consistent patterns, no console.errors |
| **Stretch feature** | 10 | One meaningful extra (see ideas below) |

**Stretch feature ideas:**
- Spaced-repetition scheduling (show due cards first based on review history)
- Deck sharing (generate a shareable read-only link)
- Export deck to PDF or CSV
- AI hint system (ask the AI for a hint on the current card without revealing the answer)
- Progress charts (show mastery over time using a simple canvas/SVG chart)

---

## Tech Reference

| Tool | Docs |
|---|---|
| Supabase JS v2 | https://supabase.com/docs/reference/javascript |
| OpenAI Python SDK | https://platform.openai.com/docs/api-reference/chat |
| Flask | https://flask.palletsprojects.com |
| Flask-CORS | https://flask-cors.readthedocs.io |
| React Router v6 | https://reactrouter.com/en/main |
| Vite | https://vitejs.dev |

Good luck — build something great!
