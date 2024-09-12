import { Link } from "react-router-dom";
import { imgUrl } from "../../../../helpers/imgUrl";

export default function Person({ item }) {
  return (
    <Link to={`/people/${item.id}`}>
      <div className="flex items-center text-sm gap-3">
        <img
          className="object-cover w-11 h-11 rounded-md"
          src={
            item.profile_path ? imgUrl(item.profile_path, "w45") : "/avatar.png"
          }
          alt=""
        />
        <p>{item.name}</p>
      </div>
    </Link>
  );
}
