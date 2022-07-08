import { Grid } from "@mui/material";
import React from "react";
import HighlightCard from "./HighlightCard";

export default function Highlight({ summary }: { summary: any }) {
  return (
    <Grid container spacing={3}>
      {summary.map((data: { title: string; count: number; type: any }) => (
        <Grid item sm={4} xs={12}>
          <HighlightCard
            title={data.title}
            count={data.count}
            type={data.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
