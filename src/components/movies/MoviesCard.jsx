import { Link } from "react-router-dom";

export default function MoviesCard({ move }) {

  if (!move || !move.id || !move.poster_path || !move.title || !move.vote_average) {
    return <div>Loading...</div>; 
  }

  const { id, poster_path, title, vote_average } = move;

  return (
    <Link to={`/Movies/${id}`} className="block">
      <div className="bg-gray-300 aspect-[2/3] relative rounded overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
          className="object-cover w-full h-full"
          alt={title}
        />
        <div className="flex flex-col justify-end p-8 absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <div className="flex gap-2 mt-2 items-center">
            <span className="text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </span>
            <span className="text-white">{vote_average} / 10</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
