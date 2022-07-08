import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMapDataByCountryId } from "../../api";
import LineChart from "../Charts/LineChart";
import HighMaps from "../Charts/HighMaps";

export default function Summary({
  countryId,
  report,
}: {
  countryId: any;
  report: any;
}) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countryId) {
      getMapDataByCountryId(countryId)
        .then((res) => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [countryId]);

  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}