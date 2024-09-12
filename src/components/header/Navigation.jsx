import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
const menuItems = [
  {
    path: "/movies",
    text: "Movies",
  },
  {
    path: "/tv",
    text: "TV show",
  },
  {
    path: "/people",
    text: "People",
  },
  {
    path: "/more",
    text: "More",
  },
];

export default function Navigation() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { user, logout } = useContext(UserContext);

  function activeClass({ isActive }) {
    return isActive
      ? "text-yellow-300 transition-all duration-300"
      : "hover:text-white";
  }
  return (
    <>
      <nav className="flex items-baseline text-slate-200 bg-slate-900 p-4 md:container md:bg-transparent ">
        <div className="flex items-baseline">
          <Link to="/">
            <h1 className="text-3xl mr-8">
              Cyber<span className="text-yellow-500">Movies</span>
              <p className="text-xs text-center text-slate-500 font-light">
                Film Review
              </p>
            </h1>
          </Link>
          <ul className="hidden md:flex text-sm lg:text-base gap-5 uppercase">
            {menuItems.map((item) => (
              <li key={item}>
                <NavLink to={item.path} className={activeClass}>
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block ml-auto">
          {Object.entries(user).length ? (
            <>
              <div>
                {user.name}
                <button onClick={logout} className="text-red-700 ml-4">Logout</button>
              </div>
            </>
          ) : (
            <ul className="flex gap-4  uppercase">
              <li>
                <NavLink to="/login" className="text-white">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/singup"
                  className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl text-white"
                >
                  Sing up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="md:hidden text-sm lg:text-base ml-auto">
          <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 16 16"
              className=""
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`md:hidden bg-slate-900 text-center overflow-hidden  transition-all duration-500 text-slate-300${
          isOpenMenu
            ? "h-full py-4 border-t-2 border-slate-700"
            : "py-0 h-0 border-none"
        }`}
        style={{ height: isOpenMenu ? 255 : 0 }}
      >
        <ul className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <li key={item}>
              <NavLink
                className={activeClass}
                to={item.path}
                onClick={() => setIsOpenMenu(false)}
              >
                {item.text.toLocaleUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4 justify-center items-center border-t-2 pt-4 border-slate-700">
          <NavLink to="/login" className="text-xl text-white">
            Login
          </NavLink>
          <NavLink
            to="/singup"
            className="bg-rose-600 rounded-xl py-2 px-4 text-white"
          >
            Sing Up
          </NavLink>
        </div>
      </div>
    </>
  );
}
