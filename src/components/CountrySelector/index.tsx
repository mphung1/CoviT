import React from "react";
import {
  FormControl,
  NativeSelect,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
    minWidth: 120,
  },
}));

export default function CountrySelector({
  countries,
  handleOnChange,
  value,
}: {
  countries: any;
  handleOnChange: any;
  value: any;
}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="country-selector">
        Quốc Gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map(
          ({ Country, ISO2 }: { Country: string; ISO2: string }) => (
            <option key={ISO2} value={ISO2.toLowerCase()}>
              {Country}
            </option>
          )
        )}
      </NativeSelect>
      <FormHelperText>Select Countries</FormHelperText>
    </FormControl>
  );
}

CountrySelector.defaultProps = {
  countries: [],
};
