import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { FetchPlayer, MList } from "./api/fetchMovies";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { lexend } from ".";
import Link from "next/link";

interface Video {
  key: string;
  name: string;
}

interface PlayerResponse {
  results: Video[];
}

const MovieList: React.FC = () => {
  const router = useRouter();
  const { movie } = router.query;

  const { data, error, isLoading } = useQuery({
    queryFn: () => (movie ? MList(movie as string) : Promise.resolve(null)),
    queryKey: ["list", movie],
    enabled: !!movie,
  });

  const {
    data: data1,
    isLoading: loading,
    error: error1,
  } = useQuery<PlayerResponse>({
    queryFn: () => (data?.id ? FetchPlayer(data.id) : Promise.resolve({ results: [] })),
    queryKey: ["player", data?.id],
    enabled: !!data?.id,
  });

  useEffect(() => {
    if (error || error1) {
      router.push("/error");
    }
  }, [error, error1, router]);

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid place-items-center">
          <CircularProgress sx={{ color: "grey.500" }} />
        </div>
      </div>
    );

  const videoKey = data1?.results?.[0]?.key;
  const videoTitle = data1?.results?.[0]?.name;

  return (
    <>
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${data?.backdrop_path}')`,
          fontFamily: lexend.style.fontFamily,
        }}
      >
        <Link href="/">
          <div className="absolute top-2 left-2 flex items-center justify-center space-x-2 cursor-pointer p-2 sm:p-3 rounded-lg text-base sm:text-sm lg:text-lg bg-gray-800 hover:bg-gray-700 text-white shadow-lg transition-all duration-300 ease-in-out">
            <svg
              xmlns="https://freesvgicons.com/"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-left sm:w-4 sm:h-4 lg:w-6 lg:h-6"
              viewBox="0 0 20 20"
            >
              <path d="M10.843 13.069L6.232 8.384a.546.546 0 0 1 0-.768l4.61-4.685a.552.552 0 0 0 0-.771a.53.53 0 0 0-.759 0l-4.61 4.684a1.65 1.65 0 0 0 0 2.312l4.61 4.684a.53.53 0 0 0 .76 0a.552.552 0 0 0 0-.771" />
            </svg>
            <h1 className="hidden sm:block font-medium tracking-wide">
              Back to Main page
            </h1>
          </div>
        </Link>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl w-full p-4 bg-opacity-80 bg-black rounded-md">
          <div className="mb-4 md:mb-0">
            <div className="w-64 h-96 overflow-hidden rounded-md">
              <Image
                alt={'image'}
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                width={256}
                height={384}
                objectFit="cover"
              />
            </div>
          </div>

          <div className="ml-0 md:ml-20 text-white text-center md:text-left">
            <h1 className="text-2xl md:text-3xl">{data?.title}</h1>
            <p className="overflow-y-auto max-h-96 mt-2">{data?.overview}</p>
            <p className="pt-2 text-lg md:text-xl">
              Release date: {data?.release_date}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          {videoTitle || "Video Player"}
        </h1>
        {videoKey ? (
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title={videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No video available</p>
        )}
      </div>
    </>
  );
};

export default MovieList;
