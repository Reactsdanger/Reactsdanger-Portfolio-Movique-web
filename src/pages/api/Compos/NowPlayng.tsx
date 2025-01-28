import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { MovieResult } from "../Interfaces";
import { NowPlayn } from "../fetchMovies";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { lexend } from "../..";
import { useSelector } from "react-redux";
import { RootState } from "../redux/ReduxStore";

const getPopularityStars = (popularity: number) => {
  const maxStars = 5;
  const stars = Math.round(popularity / 2);  
  return Array.from({ length: maxStars }, (_, index) =>
    index < stars ? "★" : "☆"
  );
};

const NowPlaying = () => {
  const Theme = useSelector((state: RootState) => state.mainR.Theme);

  const { data, error, isLoading } = useQuery<MovieResult[]>({
    queryFn: NowPlayn,
    queryKey: ["now"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div>Error loading movies. Please try again later.</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div>No movies available at the moment.</div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ fontFamily: lexend.style.fontFamily }}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        speed={700}
        loop
        className="w-full h-[700px]"
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data.map((movie: MovieResult) => (
          <SwiperSlide key={movie.id}>
            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black bg-opacity-60 text-left">
              <div className="text-left">
                <h1 className="text-white text-3xl font-bold mb-2 text-center">
                  {movie.title}
                </h1>
                <h2 className="text-white text-lg mb-4">
                  {`Popularity: ${getPopularityStars(movie.popularity).join(
                    " "
                  )}`}
                </h2>
                <h2 className="text-white text-ls mb-4">{`Release date: ${movie.release_date}`}</h2>
              </div>
              <div className="group">
                <Link href={`/${movie.title}`} passHref>
                  <button
                    className={`rounded-full p-3 px-7 ${
                      Theme
                        ? "bg-cyan-950 text-white  hover:bg-red-950 hover:border-red-600"
                        : "bg-slate-300 text-black hover:bg-red-400 hover:border-red-600"
                    } border-2 border-blue-600 hover:scale-105 m-2 hover:border-2 transition-all duration-500 ease-in-out`}
                  >
                    Watch Trailer
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative w-full h-full ">
              <Image
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "/default-image.jpg"
                }
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                priority
                className="bg-opacity-50"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-1/2 inset-0 flex flex-col justify-center items-center z-40 text-left pointer-events-none">
        <svg
          xmlns="https://freesvgicons.com/"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-chevron-down animate-bounce"
          viewBox="0 0 20 20"
        >
          <path d="M7 9a1 1 0 0 0-.707 1.707l5 5a1 1 0 0 0 1.414 0l5-5A1 1 0 0 0 17 9H7Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/2 inset-0 flex flex-col justify-center items-center z-20 text-left pointer-events-none">
        <h1 className="text-4xl text-white mb-4">New Popular Movies</h1>
      </div>
    </div>
  );
};

export default NowPlaying;
