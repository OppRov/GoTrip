import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../contexts/userContext";

const useFetchUser = ({ url, initialValue }) => {
  const [user, setUser] = useContext(userContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default useFetchUser;
