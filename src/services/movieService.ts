import axios from "axios";
import type { Movie } from "../types/movie";

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<FetchMoviesResponse> => {
  if (!query) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const response = await axios.get<FetchMoviesResponse>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      query,
      page,
      language: "en-US",
      include_adult: false,
    },
  });

  return response.data;
};
