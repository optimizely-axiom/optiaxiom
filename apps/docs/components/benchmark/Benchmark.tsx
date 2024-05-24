import { Box, Button, Stack, Text } from "@optiaxiom/react";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useRef, useState } from "react";

import { Table as TableBaseline } from "./Table.baseline";
import { Table as TableSprinkles } from "./Table.sprinkles";

const Components = {
  axiom: TableSprinkles,
  baseline: TableBaseline,
};

function avg(samples: number[]) {
  let s = 0;
  for (let i = 0; i < samples.length; i++) {
    s += samples[i];
  }
  return s / samples.length;
}

function getTable(max = 40) {
  const table = [];
  let n = 0;
  for (let i = 0; i < max; i++) {
    table[i] = [0];
    for (let j = 1; j < max; j++) {
      table[i].push(n++);
    }
  }
  return table;
}

let frame = 0;

export function Benchmark() {
  const [component, setComponent] = useState<keyof typeof Components>("axiom");
  const [table, setTable] = useState(getTable());

  const Table = Components[component];

  const runningRef = useRef(false);
  const timingRef = useRef({ samples: [0], start: 0 });

  function loop() {
    if (timingRef.current.start) {
      timingRef.current.samples.push(
        1000 / (performance.now() - timingRef.current.start),
      );
      if (timingRef.current.samples.length > 30) {
        timingRef.current.samples.shift();
      }
    }
    timingRef.current.start = performance.now();
    setTable(getTable());
    if (runningRef.current) {
      frame++;
      requestAnimationFrame(loop);
    }
  }

  return (
    <Box
      alignItems="stretch"
      border="1"
      display="flex"
      flexDirection="column"
      rounded="sm"
    >
      <Stack
        borderB="1"
        flexDirection="row"
        grow="1"
        justifyContent="start"
        p="12"
      >
        <select
          onChange={(event) =>
            setComponent(event.target.value as typeof component)
          }
        >
          <option value="axiom">Axiom</option>
          <option value="baseline">CSS Modules</option>
        </select>

        <Button
          leftSection={
            runningRef.current ? (
              <IconPlayerPauseFilled size={16} />
            ) : (
              <IconPlayerPlayFilled size={16} />
            )
          }
          onClick={() => {
            runningRef.current = !runningRef.current;
            if (runningRef.current) {
              loop();
            }
          }}
        >
          {runningRef.current ? "Stop" : "Start"}
        </Button>
        <Text fontSize="2xl" fontWeight="600">
          {`${avg(timingRef.current.samples).toFixed(1)}`} fps
        </Text>
      </Stack>

      <Table frame={frame} table={table} />
    </Box>
  );
}
