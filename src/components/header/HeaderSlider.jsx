import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MoviseCard from "../movies/MoviesCard";
import { useMovieDB } from "../../hooks/useMovieDB";

export default function HeaderSlider({ setBg }) {
  const [data] = useMovieDB("movie/popular");

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
        {data &&
          data.results.map((move) => (
            <SwiperSlide key={move.id}>
              <div
                onMouseOver={() =>
                  setBg(`https://image.tmdb.org/t/p/w780/${move.backdrop_path}`)
                }
              >
                <MoviseCard move={move} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
