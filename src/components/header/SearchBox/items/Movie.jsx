import { Link } from "react-router-dom";
import { imgUrl } from "../../../../helpers/imgUrl";

export default function Movie({ item }) {
  return (
    <Link to={`/movies/${item.id}`}>
      <div className="flex items-center text-sm gap-3">
        <img
          className="object-cover w-11 h-11 rounded-md"
          src={
            item.poster_path
              ? imgUrl(item.poster_path, "w92")
              : "/img-icon-movie.png"
          }
          alt=""
        />
        <p>{item.title}</p>
      </div>
    </Link>
  );
}
