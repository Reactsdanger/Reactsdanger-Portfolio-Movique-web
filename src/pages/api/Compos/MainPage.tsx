import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/ReduxStore';
import { FetchMovies } from '../fetchMovies';
import { useQuery } from '@tanstack/react-query';
import { genres } from '@/pages';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const MainPage = () => {
    const initial = useSelector((state: RootState) => state.mainR.Theme);
    const search = useSelector((state: RootState) => state.mainR.searchQuery);

    const { data, isLoading, error } = useQuery({
    queryFn: FetchMovies,
    queryKey: ["movies"],
    initialData: [],
    });

    const fallbackPoster = "https://via.placeholder.com/150x225.png?text=No+Image";

    const filteredMovies = data.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );

    const categorizedMovies = genres.map((genre) => ({
    genre,
    movies: filteredMovies.filter((movie) =>
        movie.genre_ids.includes(genre.id)
    ),
    }));

    if (error)
    return <h1 className="text-red-500">Error: {error.message}</h1>;

  return (
    <>
      <main className="p-4 space-y-12">
        {categorizedMovies.map((category) => (
          <section id={category.genre.name} key={category.genre.id}>
            <h1
              className={`text-2xl font-semibold mb-6 ${
                initial ? "text-white" : "text-black"
              }`}
            >
              {category.genre.name}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {!isLoading && category.movies.length === 0
                ? Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        width={200}
                        height={300}
                        sx={{
                          backgroundColor: initial ? "#374151" : "#E5E7EB",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          marginBottom: "16px",
                        }}
                      />
                    ))
                : category.movies.map((movie) => (
                    <Link href={`/${movie.title}`} key={movie.id}>
                      <div className="text-center">
                        <Image
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : fallbackPoster
                          }
                          alt={movie.title}
                          width={150}
                          height={225}
                          className="rounded-md shadow-lg object-cover w-full"
                        />
                        <h3
                          className={`mt-2 text-center text-sm ${
                            initial ? "text-white" : "text-black"
                          }`}
                        >
                          {movie.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default MainPage
