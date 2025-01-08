import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function axiosFetch() {
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async ({ url, method, body, token }) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const methodType =
        method === "POST" || method === "PUT" || method === "PATCH";
      const response = await axios[method.toLowerCase()](
        url,
        methodType ? body : headers,
        methodType ? headers : null,
      );

      setData(response.data);
      return response.data;
    } catch (err) {
      console.log({ err });
      if (err.response) {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          nav("/login");
        }
        setError(err.response);
      } else setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
