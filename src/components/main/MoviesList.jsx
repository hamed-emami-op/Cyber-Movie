import MoviesListSlider from "./MoviesListSlider";

const movies = [
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider1.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider2.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider3.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider4.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider1.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider2.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider3.jpg`,
  `http://busterhtml.mbkip3ms9u-e92498n216kr.p.temp-site.link/images/uploads/slider4.jpg`,
];

export default function MoviesList() {
  return (
    <div className="container">
      <div className="pt-8">
        <div className="md:flex gap-8 items-center md:mb-4">
          <h2 className="text-slate-300 text-2xl ">what`s Popular</h2>
          <ul className="my-6 flex flex-col gap-4 md:gap-8 text-yellow-100 md:flex-row items-baseline">
            <li>Streaming</li>
            <li className="text-yellow-400 text-xl">On TV</li>
            <li>For Rent</li>
            <li>In Theaters</li>
          </ul>
        </div>
        <MoviesListSlider movies={movies} />
      </div>

      <div className="pt-8">
        <div className="md:flex gap-8 items-center md:mb-4">
          <h2 className="text-slate-300 text-2xl ">Free To Watch</h2>
          <ul className="my-6 flex flex-col gap-4 md:gap-8 text-yellow-100 md:flex-row items-baseline">
            <li className="text-yellow-300 text-xl">Movies</li>
            <li>TV</li>
          </ul>
        </div>
        <MoviesListSlider movies={movies} />
      </div>
    </div>
  );
}
