// /* eslint-disable */
import { useEffect, useState } from "react";
import axiosFetch from "../api/axiosFetch.js";
import { TRIPS_URL } from "../../constants/endpoints";
import { Button, Container, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function AdminPanel() {

    const { data, loading, error, fetchData } = axiosFetch();
    const [trips, setTrips] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [selectedRow, setSelectedRow] = useState();
    const [newRatingCount, setNewRatingCount] = useState(0);

    useEffect(() => {
      fetchData({
          url: `${TRIPS_URL}/getAllTripsUser`,
          method: "GET",
          token: localStorage.getItem("token"),
      })
    }, []);

    useEffect(() => {
      if (!loading && !error && data) {
          data.data.forEach((value, index) => {
              value.id = index + 1;
              value.fromDate = new Date(value.fromDate).toDateString();
              value.toDate = new Date(value.toDate).toDateString();
          });
          setTrips(data.data);
      }
    }, [data, loading, error]);

    const paginationModel = { page: 0, pageSize: 8 };
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: '_id', headerName: 'trip  iD', width: 70 },
      { field: 'userID', headerName: 'userID', width: 130 },
      { field: 'tripName', headerName: 'tripName', width: 130 },
      { field: 'fromDate', headerName: 'fromDate', width: 150},
      { field: 'toDate', headerName: 'toDate', width: 150},
      { field: 'budget', headerName: 'budget', width: 90},
      { field: 'location', headerName: 'location', width: 90},
      { field: 'recommended', headerName: 'recommended', width: 90},
      { field: 'ratingCount', headerName: 'ratingCount', width: 60 },
    ];

    const onSelectRecommendedTrip = async (trip) => {
        if (selectedRow) setNewRatingCount(newRatingCount + 1);
        const tripData = {
            _id: trip._id,
            userID: trip.userID,
            ratingCount: newRatingCount,
            recommended: true
        };
        console.log(tripData);
        const d = await fetch(TRIPS_URL, {
            method: "PUT",
            body: JSON.stringify(tripData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const dJSON = await d.json();
        console.log(dJSON);
        // if (!loading && !error && data) console.log(data);
    };
    return (
        <Container sx={ { display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: 800 } }>
            <Paper>
                <DataGrid
                rows={trips}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                sx={{ border: 0, width: "100%" }}
                checked={isChecked}
                onRowSelectionModelChange={(ids) => {
                  const selectedRowData = trips.filter((row) => ids.includes(row.id));
                  if (!selectedRow) setNewRatingCount(selectedRowData[0].ratingCount + 1);
                  setSelectedRow(selectedRowData[0]);
                }}
                />
            </Paper>

            <Button variant="contained" onClick={() => {
                setIsChecked(false);
                onSelectRecommendedTrip(selectedRow);
            }}>
                Click on me to Recommend on a trip
            </Button>
        </Container>
    )
}
