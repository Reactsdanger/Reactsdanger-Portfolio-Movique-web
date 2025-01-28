export interface IMovies {
  genre_ids: number[];  
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}
export interface MovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface VideoResult {
  key: string;
  name: string;
}

export interface MovieSearchResponse {
  page: number;
  results: MovieResult[];
  total_results: number;
  total_pages: number;
}

export interface PlayerResponse {
  results: VideoResult[];
}

export interface Video {
  result: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
  };
}
