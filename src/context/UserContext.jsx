import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fench } from "../services/fench";

export const UserContext = createContext({ user: {}, session: "" });
const apikey = "57f8c1b9148d92540486d9ecad2d99fc";
const baseUrl = "https://api.themoviedb.org/3";

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [session, setSession] = useState(initSession);

  async function getUserData() {
    const { data } = await axios.get(
      `${baseUrl}/account?api_key=${apikey}&session_id=${session}`
    );
    fetchFavoriteMovies(data.id);
    setUser(data);
  }

  async function fetchFavoriteMovies(id = user.id) {
    const favResult = await fench.get(`account/${id}/favorite/movies`);
    setFavoriteMovies(favResult.data.results);
  }

  useEffect(() => {
    if (session) {
      getUserData();
    }
  }, [session]);

  function logout() {
    setUser({});
    setSession(null);
    localStorage.clear();
  }

  function initSession() {
    return localStorage.getItem("session")
      ? localStorage.getItem("session")
      : null;
  }
  async function login(username, password) {
    try {
      const tokenResult = await axios.get(
        `${baseUrl}/authentication/token/new?api_key=${apikey}`
      );
      const authorize = await axios.post(
        `${baseUrl}/authentication/token/validate_with_login?api_key=${apikey}`,
        {
          username,
          password,
          request_token: tokenResult.data.request_token,
        }
      );

      const session = await axios.post(
        `${baseUrl}/authentication/session/new?api_key=${apikey}`,
        {
          request_token: tokenResult.data.request_token,
        }
      );
      setSession(session.data.session_id);
      localStorage.setItem("session", session.data.session_id);
      navigate("/profile", {
        replace: true,
      });
    } catch {
      toast.error("Invalid username and password!");
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        session,
        logout,
        favoriteMovies,
        fetchFavoriteMovies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
