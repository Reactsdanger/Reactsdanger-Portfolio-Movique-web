import { IMovies, MovieSearchResponse, PlayerResponse } from "./Interfaces";
import { $ApiBase } from "./instance";

const apiKey = process.env.NEXT_PUBLIC_TMBD_API_KEY;

export const FetchMovies = async () => {
  const totalPages = 10;
  const allMovies: IMovies[] = [];
  const movieIdsSet = new Set<number>();  
  
  try {
    for (let page = 1; page <= totalPages; page++) {
      const response = await $ApiBase.get("discover/movie", {
        params: {
          api_key: apiKey,
          page,
          language: "en-US",
          include_adult: false,
          include_video: false,
          sort_by: "popularity.desc",
        },
      });

      response.data.results.forEach((movie: IMovies) => {
        if (!movieIdsSet.has(movie.id)) {
          movieIdsSet.add(movie.id);  
          allMovies.push(movie);  
        }
      });
    }
    return allMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};



export async function MList(tit: string) {
  const res = await $ApiBase.get<MovieSearchResponse>(
    `/search/movie?api_key=${apiKey}&query=${tit}`
  );
  return res.data.results?.[0] || {};
}

export async function FetchPlayer(movieId: number) {
  const res = await $ApiBase.get<PlayerResponse>(
    `/movie/${movieId}/videos?api_key=${apiKey}`
  );
  return res.data;
}

export async function NowPlayn() {
  try {
    const res = await $ApiBase.get<MovieSearchResponse>(
      `movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );
    return res.data.results;  
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw new Error("Failed to fetch now playing movies.");
  }
}



