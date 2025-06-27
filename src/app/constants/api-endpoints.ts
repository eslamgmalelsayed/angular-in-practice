export const API_ENDPOINTS = {
  // Movie endpoints
  SEARCH_MOVIES: '/search?q=',
} as const;

// Optional: Export individual endpoints for convenience
export const { SEARCH_MOVIES } = API_ENDPOINTS;
