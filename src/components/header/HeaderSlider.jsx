import { SwiperSlide, Swiper } from "swiper/react";
// import imgea from "../../assets/hamed1.png";
import { Autoplay } from "swiper/modules";
import MoviseCard from "../movies/MoviesCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeaderSlider({ setBg }) {
  const [moviesImg, setMovies] = useState([]);

  async function loadMovies() {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=57f8c1b9148d92540486d9ecad2d99fc"
    );
    setMovies(data.results);
  }
  useEffect(() => {
    loadMovies();
  }, []);
  return (
    <div className="mt-6">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop
      >
        {moviesImg.map((move) => (
          <SwiperSlide key={move}>
            <div onMouseOver={() => setBg(`https://image.tmdb.org/t/p/w780/${move.backdrop_path}`)}>
              <MoviseCard
                move={move}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
