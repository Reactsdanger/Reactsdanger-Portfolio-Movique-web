import { Geist, Geist_Mono, Lexend } from "next/font/google";
import NowPlayng from "./api/Compos/NowPlayng";
import { RootState } from "./api/redux/ReduxStore";
import Header from "./api/Compos/Header";
import MainPage from "./api/Compos/MainPage";
import { useSelector } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const lexend = Lexend({
  variable: "--font-lexend",  
  subsets: ["latin"],  
  weight: ["400", "500", "600"],  
});

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 27, name: "Horror" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 10402, name: "Music" },
];

export default function Home() {
  const initial = useSelector((state: RootState) => state.mainR.Theme);

  return (
    <div
      className={`${geistSans.variable} ${
        geistMono.variable
      } text-white min-h-screen ${initial ? "bg-gray-900" : "bg-white"}`}
      style={{ fontFamily: lexend.style.fontFamily }}
    >
        <Header/>
      <div>
        <NowPlayng />
      </div>
        <MainPage/>
    </div>
  );
}
