import { useEffect, useState } from "react";
import { fench } from "../services/fench";
import toast from "react-hot-toast";

export function useMovieDB(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      if (!loading) setLoading(true);
      const result = await fench.get(endpoint);

      setLoading(false);
      setData(result.data);
    } catch (err) {
      toast.error(err.message == "Network Error" ? "Use a VPN" : err.message);
    }
  }

  useEffect(() => {
    loadData();
  }, [endpoint]);

  return [data, loading];
}
