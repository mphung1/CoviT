import React, { useState, useEffect, useMemo } from "react";
import { sortBy } from "lodash";
import { getCountries, getReportByCountry } from "./api";
import CountrySelector from "./components/CountrySelector/index";
import Highlight from "./components/Highlight/index";
import Summary from "./components/Summary/index";
import "@fontsource/roboto";
import moment from "moment";
import "moment/locale/vi";
import { Container, Typography } from "@mui/material";

moment.locale("vi");

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnChange = React.useCallback((e: any) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log("getReportByCountry", { res });
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, countries]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: "Total Cases",
          count: latestData.Confirmed,
          type: "confirmed",
        },
        {
          title: "Recovered",
          count: latestData.Recovered,
          type: "recovered",
        },
        {
          title: "Deaths",
          count: latestData.Deaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        COVID-19 Statistics
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        handleOnChange={handleOnChange}
        countries={countries}
        value={selectedCountryId}
      />
      <Highlight summary={summary} />
      <Summary countryId={selectedCountryId} report={report} />
    </Container>
  );
};

export default App;
