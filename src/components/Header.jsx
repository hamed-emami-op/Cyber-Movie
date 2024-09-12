import FollowUs from "./header/FollowUs";
import Navigation from "./header/Navigation";
import SearchBox from "./header/SearchBox/SearchBox";
import HeaderSlider from "./header/HeaderSlider";
import { useState } from "react";
import { useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const [bg, setBg] = useState("/vite.svg");

  return (
    <header
      className={`bg-cover bg-center pb-8 md:py-8 ${location.pathname !== '/' ? 'h-[600px]' : ''}`}
      style={{
        backgroundImage: ` linear-gradient(to bottom , rgb(30 41 59 / 100%) , rgb(30 41 59/ 60%), rgb(30 41 59 / 30%)),  url("${bg}")`,
      }}
    >
      <Navigation />
      <div className="container md:py-12 ">
        <SearchBox />
        {location.pathname === "/" && (
          <div className={`${location.pathname !== `/` ? 'hidden' : ''}`}>
            <FollowUs />
            <HeaderSlider setBg={setBg} />
          </div>
        )}
      </div>
    </header>
  );
}
