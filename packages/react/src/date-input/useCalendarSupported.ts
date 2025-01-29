"use client";

import { useEffect, useState } from "react";

export const useCalendarSupported = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? CSS.supports("selector(::-webkit-datetime-edit)") : null;
};
