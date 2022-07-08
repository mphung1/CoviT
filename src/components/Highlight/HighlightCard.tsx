import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CountUp from "react-countup";

const useStyles = makeStyles({
  wrapper: (props: any) => {
    console.log({ props });
    if (props.type === "confirmed") return { borderLeft: "5px solid red" };
    if (props.type === "recovered") return { borderLeft: "5px solid green" };
    else return { borderLeft: "5px solid gray" };
  },
  title: { fontSize: 18, marginBottom: 5 },
  count: { fontWeight: "bold", fontSize: 18 },
});

export default function HighlightCard({
  title,
  count,
  type,
}: {
  title: string;
  count: number;
  type: any;
}) {
  const classes = useStyles({ type });
  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Typography variant="body2" component="p" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" component="span" className={classes.count}>
          <CountUp end={count} separator=" " duration={2} />
        </Typography>
      </CardContent>
    </Card>
  );
}
