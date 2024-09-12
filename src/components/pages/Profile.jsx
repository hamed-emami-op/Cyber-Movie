import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { imgUrl } from "../../helpers/imgUrl";

export default function porfile() {
  const { user, session } = useContext(UserContext);
  return session ? (
    <div>
      <h2>hello</h2>
      <h1>{user.name}</h1>
      <img src={imgUrl(user?.avatar?.tmdb?.avatar_path, "w185")} alt="" />
    </div>
  ) : (
    <Navigate to={"/login"} replace />
  );
}
