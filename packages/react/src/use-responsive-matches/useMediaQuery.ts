import { useEffect, useMemo, useState } from "react";

export const useMediaQuery = (query: string) => {
  const mql = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(mql.matches);
  useEffect(() => {
    const listener = () => setMatches(mql.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [mql]);

  return matches;
};
