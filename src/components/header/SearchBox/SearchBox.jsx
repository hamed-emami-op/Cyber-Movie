import { useEffect, useState } from "react";
import { fench } from "../../../services/fench";
import TV from "./items/TV";
import Person from "./items/Person";
import Movie from "./items/Movie";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query) {
        const { data } = await fench("search/multi", {
          params: {
            query,
          },
        });
        setSearchResult(data.results);
      } else {
        setSearchResult([]);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  function showItem(item) {
    switch (item.media_type) {
      case "tv":
        return <TV item={item} key={item.id} />;
      case "person":
        return <Person item={item} key={item.id} />;
      case "movie":
        return <Movie item={item} key={item.id} />;
    }
  }

  return (
    <section className="m-2 text-slate-20 0">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="max-w-full min-w-full bg-slate-600 text-1xl p-3 border-slate-900 placeholder:text-slate-500 border-4 rounded-md outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className={`flex flex-col gap-2 p-2 bg-opacity-95 bg-slate-600 border-slate-900 border-4 border-t-0 absolute w-full z-10 rounded-md transition-all duration-200 text-black ${
            searchResult && searchResult.length && query
              ? "max-h-[325px] overflow-auto"
              : "h-0 overflow-hidden opacity-0"
          }`}
        >
          {searchResult.map((item) => (
            <div
              className="border-b-2 border-slate-700 border-opacity-30 pb-2"
              onClick={() => setSearchResult([])}
              key={item.id}
            >
              {showItem(item)}
            </div>
          ))}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 bg-slate-600 hidden md:block"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
    </section>
  );
}
