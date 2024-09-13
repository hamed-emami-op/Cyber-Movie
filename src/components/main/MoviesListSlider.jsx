// MoviesListSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MoviesCard from "../movies/MoviesCard";
import { useMovieDB } from "../../hooks/useMovieDB";

export default function MoviesListSlider({ type, activeTab }) {
  const [data] = useMovieDB(`${type}/${activeTab}`)

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
      {data && data.results.map((move) => (
        <SwiperSlide key={move.id}>
          <MoviesCard move={move} imgSize="w342" type={type} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
