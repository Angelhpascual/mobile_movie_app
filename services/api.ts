export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    // Debug: verificar que el API key esté cargado
    console.log("API Key loaded:", !!process.env.EXPO_PUBLIC_MOVIE_API_KEY)
    console.log(
      "API Key length:",
      process.env.EXPO_PUBLIC_MOVIE_API_KEY?.length
    )

    if (!process.env.EXPO_PUBLIC_MOVIE_API_KEY) {
      throw new Error(
        "API key not found. Make sure EXPO_PUBLIC_MOVIE_API_KEY is set in .env"
      )
    }

    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    console.log("Fetching from endpoint:", endpoint)

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    })

    console.log("Response status:", response.status)
    console.log("Response ok:", response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error response:", errorText)
      throw new Error(
        `Failed to fetch movies: ${response.status} - ${errorText}`
      )
    }

    const data = await response.json()
    console.log("Movies fetched successfully:", data.results?.length || 0)
    return data.results
  } catch (error) {
    console.error("Error in fetchMovies:", error)
    throw error
  }
}

// const url =
//   /discover/movie
