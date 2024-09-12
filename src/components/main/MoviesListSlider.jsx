import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { fench} from "../../services/fench"
import MoviesCard from "../movies/MoviesCard"
import { useEffect, useState } from "react";

export default function MovieListSlider({ type, activeTab }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fench(`${type}/${activeTab}`);
        console.log(result);  // بررسی داده‌ها
        if (result && Array.isArray(result)) {
          setMovies(result);  // اگر آرایه باشد
        } else if (result?.results) {
          setMovies(result.results);  // اگر داخل result.results باشد
        } else {
          console.error("Unexpected data structure", result);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [type, activeTab]);
  
  return (
    <Swiper
      modules={[Autoplay]}
      centeredSlides
      loop
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MoviesCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
