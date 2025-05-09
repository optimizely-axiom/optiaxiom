"use client";

import type { ComponentPropsWithoutRef } from "react";

import beach from "@/demos/beach.jpg";
import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";
import Image from "next/image";

export function App({
  objectFit = "cover",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "objectFit">) {
  return (
    <Canvas striped style={{ aspectRatio: 3 }}>
      <Box asChild objectFit={objectFit} rounded="inherit" size="full">
        <Image
          alt="brown glass bottle beside white book on blue and white textile"
          src={beach}
        />
      </Box>
    </Canvas>
  );
}
