import { useState } from "react";
import MoviesListSlider from "./MoviesListSlider";

export default function MoviseList() {
  const [moviesActiveTab, setMoviesActiveTab] = useState("latest");

  function handleChangeMoviesActiveTab(tab) {
    setMoviesActiveTab(tab);
  }

  function activeClass(tab) {
    return tab === moviesActiveTab ? "text-yellow-400 text-xl " : " ";
  }

  return (
    <div className="container">
      <div className="pt-8">
        <div className="md:flex gap-8 items-center md:mb-4">
          <h2 className="text-slate-300 text-2xl ">Movies</h2>
          <ul
            className="my-6 flex flex-col gap-4 md:gap-8 text-yellow-100 md:flex-row items-baseline [&>*]:cursor-pointer
cursor-pointer"
          >
            <li
              onClick={() => handleChangeMoviesActiveTab("latest")}
              className={activeClass("latest")}
            >
              Latest
            </li>
            <li
              onClick={() => handleChangeMoviesActiveTab("now_playing")}
              className={activeClass("now_playing")}
            >
              Now Playing
            </li>
            <li
              onClick={() => handleChangeMoviesActiveTab("popular")}
              className={activeClass("popular")}
            >
              Popular
            </li>
            <li
              onClick={() => handleChangeMoviesActiveTab("top-rated")}
              className={activeClass("top-rated")}
            >
              Top reted
            </li>
            <li
              onClick={() => handleChangeMoviesActiveTab("upcoming")}
              className={activeClass("upcoming")}
            >
              Upcoming
            </li>
          </ul>
        </div>
        <MoviesListSlider type="movie" activeTab={moviesActiveTab}/>
      </div>

      <div className="pt-8">
        <div className="md:flex gap-8 items-center md:mb-4">
          <h2 className="text-slate-300 text-2xl ">Free To Watch</h2>
          <ul className="my-6 flex flex-col gap-4 md:gap-8 text-yellow-100 md:flex-row items-baseline">
            <li className="text-yellow-300 text-xl">Movies</li>
            <li>TV</li>
          </ul>
        </div>
        {/* <MoviseListSlider /> */}
      </div>
    </div>
  );
}
