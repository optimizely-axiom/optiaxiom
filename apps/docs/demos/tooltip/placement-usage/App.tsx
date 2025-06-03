import { Button, Grid, Tooltip } from "@optiaxiom/react";
import { Fragment } from "react";

export function App() {
  return (
    <Grid gap="8" gridTemplateColumns="3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Fragment key={side}>
          {(["start", "center", "end"] as const).map((align) => (
            <Tooltip
              align={align}
              content={`${side} ${align}`}
              key={align}
              side={side}
            >
              <Button justifyContent="center" py="20">
                {side} {align}
              </Button>
            </Tooltip>
          ))}
        </Fragment>
      ))}
    </Grid>
  );
}
