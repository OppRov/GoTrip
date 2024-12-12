import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios({ url, initialValue, method, body }) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const axiosGet = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios[method.toLowerCase()](url, body);
        setData(response.data);
      } catch (err) {
        console.error(err);
        if (err.response.status === 404) {
          setError("Not Found");
        } else {
          setError(err.response.data.message);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    axiosGet();
  }, [url, method, body]);
  return { data, loading, error };
}
