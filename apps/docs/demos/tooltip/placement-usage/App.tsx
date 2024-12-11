import { Button, Grid, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Grid gap="8" gridTemplateColumns="3">
      <Tooltip align="start" content="Top Start" side="top">
        <Button py="20">Top Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Top Center" side="top">
        <Button py="20">Top Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Top End" side="top">
        <Button py="20">Top End</Button>
      </Tooltip>

      <Tooltip align="start" content="Right Start" side="right">
        <Button py="20">Right Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Right Center" side="right">
        <Button py="20">Right Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Right End" side="right">
        <Button py="20">Right End</Button>
      </Tooltip>

      <Tooltip align="start" content="bottom-start" side="bottom">
        <Button py="20">Bottom Start</Button>
      </Tooltip>
      <Tooltip align="center" content="bottom-center" side="bottom">
        <Button py="20">Bottom Center</Button>
      </Tooltip>
      <Tooltip align="end" content="bottom-end" side="bottom">
        <Button py="20">Bottom End</Button>
      </Tooltip>

      <Tooltip align="start" content="Left Start" side="left">
        <Button py="20">Left Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Left Center" side="left">
        <Button py="20">Left Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Left End" side="left">
        <Button py="20">Left End</Button>
      </Tooltip>
    </Grid>
  );
}
