import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/ReduxStore";
import MaterialUISwitch from "../MaterialUISwitch";
import { HandleClick, SearchRes } from "../redux/ReduxToolkit";
import { useRouter } from "next/router";
import { genres } from "@/pages";

const Header = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.mainR.searchQuery
  );
  const initial = useSelector((state: RootState) => state.mainR.Theme);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(SearchRes(e.target.value));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 p-4 shadow-lg ${
          initial ? "bg-gray-800" : "bg-slate-400"
        }`}
      >
        <div className="flex justify-between items-center">
          <nav className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {genres.map((genre) => (
              <a
                key={genre.id}
                href={`#${genre.name}`}
                className={`text-white font-medium hover:text-blue-400 transition duration-200`}
              >
                <h1 className={`${initial ? "text-white" : "text-black"}`}>
                  {genre.name}
                </h1>
              </a>
            ))}
          </nav>

          <div>
            <MaterialUISwitch
              checked={initial}
              onChange={() => dispatch(HandleClick())}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onClick={() => router.push('#Action')}
              onChange={handleSearchChange}
              className={`p-2 rounded-md ${
                initial ? "bg-gray-700" : "bg-white"
              } ${
                initial ? "text-white" : "text-black"
              } placeholder-gray-400 outline-none focus:ring focus:ring-blue-400`}
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(SearchRes(""))}
                className="text-white text-sm ml-2 hover:text-blue-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
