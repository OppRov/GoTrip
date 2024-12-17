import axios from "axios";
import { useEffect, useState } from "react";

export default function axiosFetch({ url, method }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios[method.toLowerCase()](url, body);
      setData(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
