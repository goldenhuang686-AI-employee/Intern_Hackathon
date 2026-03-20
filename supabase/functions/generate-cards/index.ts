// Supabase Edge Function — generate-cards
// ------------------------------------------------------------
// STUB: This function returns a hardcoded mock response.
// TODO (intern): Replace the mock with a real OpenAI API call.
//
// Expected request body:
//   { notes: string, deckId: string }
//
// Expected response body:
//   { cards: Array<{ front: string, back: string }> }
// ------------------------------------------------------------

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { notes, deckId } = await req.json()

    if (!notes || !deckId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: notes, deckId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ----------------------------------------------------------
    // MOCK RESPONSE — replace this block with an OpenAI API call
    // ----------------------------------------------------------
    const mockCards = [
      { front: 'What is the capital of France?', back: 'Paris' },
      { front: 'What is 2 + 2?', back: '4' },
      { front: 'Who wrote Romeo and Juliet?', back: 'William Shakespeare' },
    ]
    // ----------------------------------------------------------

    return new Response(
      JSON.stringify({ cards: mockCards }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
