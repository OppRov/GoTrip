import React, { useEffect, useState } from "react";
import axiosFetch from "../api/axiosFetch";
import { TRIPS_URL } from "../../constants/endpoints";

const TripListPage = () => {
  const [trips, setTrips] = useState([]);
  const { data, loading, error, fetchData } = axiosFetch({
    url: TRIPS_URL,
    method: "GET",
  });

  useEffect(() => {
    //fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setTrips(data.data.trips);
    }
  }, [data, loading, error]);

  return (
    <>
      <h1>Trips</h1>
      {/* {trips.map((trip) => hello)} */}
    </>
  );
};

export default TripListPage;
