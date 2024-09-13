import ReactStars from "react-rating-stars-component";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { fench } from "../../services/fench";
import { Helmet } from "react-helmet";
import { useMovieDB } from "../../hooks/useMovieDB";

const apikey = "57f8c1b9148d92540486d9ecad2d99fc";
const baseUrl = "https://api.themoviedb.org/3";

export default function Movie() {
  const { id } = useParams();
  const [move] = useMovieDB(`movie/${id}`);

  const [isFavorite, setIsFavorite] = useState(false);
  const { user, session, favoriteMovies, fetchFavoriteMovies } =
    useContext(UserContext);

  useEffect(() => {
    if (move && favoriteMovies.length) {
      const favMovie = favoriteMovies.find((f) => f.id == move?.id);

      setIsFavorite(Boolean(favMovie));
      console.log(isFavorite);
    }
  }, [move, favoriteMovies]);

  async function handleFavorite() {
    try {
      await fench.post(
        `${baseUrl}/account/${user.id}/favorite?api_key=${apikey}&session_id=${session}`,
        {
          media_type: "movie",
          media_id: move.id,
          favorite: !isFavorite,
        }
      );
      fetchFavoriteMovies();

      toast.success(
        `${move.title} ${isFavorite ? "remove" : "added"} to your favourites`
      );
    } catch (error) {
      toast.error(
        "Failed to add to favourites. Please check your internet connection."
      );
      console.error(error);
    }
  }

  async function ratingChanged(rate) {
    await fench.post(`movie/${move.id}/rating`, { value: rate * 2 });
    toast.success("Your vote is submitted.");
  }

  return (
    <div className="mt-10">
      <Helmet>
        <title>CyberMovies | {move?.title || ""}</title>
      </Helmet>
      {move ? (
        <div className="container grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <img
              src={`https://image.tmdb.org/t/p/w780/${move.poster_path}`}
              alt={move.title}
            />
          </div>
          <div className="col-span-3">
            <div className="flex gap-3 items-center">
              <h1 className="text-3xl">{move.title}</h1>
              <time className="text-slate-500">
                {move.release_date.split("-")[0]}
              </time>
            </div>
            <div className="flex gap-8 mt-8 text-yellow-500">
              <button
                className="flex items-center gap-2"
                onClick={handleFavorite}
              >
                <p className="border w-9 h-9 border-yellow-500 rounded-full flex items-center justify-center">
                  {isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                  )}
                </p>
                <span>
                  {isFavorite ? "Remove from favorite" : "Add to favorite"}
                </span>
              </button>
              <button className="flex items-center gap-2">
                <p className="border w-9 h-9 border-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
                  </svg>
                </p>
                Share
              </button>
            </div>
            <div className="grid grid-cols-4 border-slate-500 border-opacity-30 border-t-2 border-b-2 mt-8 ">
              <div className="col-span-1 border-r-2 flex items-center text-slate-300">
                <div className="flex items-center gap-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-yellow-500"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>{parseInt(move.vote_average)} / 10</div>
                    <div>{move.vote_count} reviews</div>
                  </div>
                </div>
              </div>

              <div className="col-span-3 pl-4 flex gap-4 items-center  py-2">
                <p className="text-slate-300 text-lg">Rate this movie: </p>
                <div>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    value={parseInt(move.vote_average) / 2}
                    emptyIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mx-2"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                      </svg>
                    }
                    filledIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mx-2"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    }
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-2xl">Loading...</h1>
      )}
    </div>
  );
}
