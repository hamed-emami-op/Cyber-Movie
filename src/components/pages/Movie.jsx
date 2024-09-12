import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const apikey = "57f8c1b9148d92540486d9ecad2d99fc";
const baseUrl = "https://api.themoviedb.org/3";

export default function Movie() {
  const [move, setMove] = useState(null);
  const { id } = useParams();
  const { user, session } = useContext(UserContext);
  async function handleAddtoWatchList() {
    try{
      const result = await axios.post(
        `${baseUrl}/account/${user.id}/favorite?api_key=${apikey}&session_id=${session}`,
        {
          media_type: "movie",
          media_id: move.id,
          favorite: true,
        }
      );
      toast.success(`${move.title} has been added to your favourites`);
    }catch{
      toast.error('no internet')
    }
  }

  async function loadMovie() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=57f8c1b9148d92540486d9ecad2d99fc`
    );
    console.log(move);
    setMove(data);
  }

  useEffect(() => {
    loadMovie();
  }, [id]);
  return (
    <div>
      {move ? (
        <div>
          <h1>{move.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w780/${move.poster_path}`}
            alt={move.title}
          />

          <button
            className="p-2 bg-blue-600 text-white"
            onClick={handleAddtoWatchList}
          >
            add to watch list
          </button>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
