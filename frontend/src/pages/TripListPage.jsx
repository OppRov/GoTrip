import React, { useEffect } from "react";
import axiosFetch from "../api/axiosFetch";
import TripCard from "../components/TripCard";

const TripListPage = () => {
  const [trips, setTrips] = useState([]);
  const { data, loading, error, fetchData } = axiosFetch({
    url: TRIPS_URL,
    method: "GET",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTrips(data.data.trips);
    }
  }, [data, loading, error]);

  return (
    <>
      <h1>Trips</h1>
      {trips.map((trip) => (
        <TripCard key={trip._id} props={trip} />
      ))}
    </>
  );
};

export default TripListPage;
