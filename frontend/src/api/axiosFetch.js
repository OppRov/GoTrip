import axios from "axios";
import { useEffect, useState } from "react";

export default function axiosFetch({ url, method, token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async (body) => {
    setLoading(true);
    setError(null);
    try {
        const headers = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
        };
        const methodType = method === "POST" || method === "PUT" || method === "PATCH";
        const response = await axios[method.toLowerCase()](url, methodType ? body : headers, methodType ? headers : null);

        setData(response.data);
    } catch (err) {
        console.log({ err });
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
