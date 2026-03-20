// TODO: implement mastery tracking
//
// This hook should determine which cards in a deck have been "mastered"
// based on the user's review history in the card_reviews table.
//
// Suggested signature:
//
//   export function useMastery(deckId) {
//     // Query card_reviews for this deck's cards across all sessions.
//     // A card is considered mastered when it has been answered correctly
//     // a certain number of times in a row (e.g., 3).
//     // Return: { masteredCardIds: Set<string>, loading: boolean }
//   }
