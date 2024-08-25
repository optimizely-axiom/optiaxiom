import React from "react";

import { withIcon } from "./withIcon";

interface SortIconProps {
  sortDirection: "asc" | "desc" | false;
}

const SortIcon = ({ sortDirection }: SortIconProps) => (
  <>
    <path
      d="M7.04245 9.28571H12.9576C13.4933 9.28571 13.7835 8.63839 13.3817 8.23661L10.4353 5.20089C10.3237 5.06696 10.1675 5 10.0112 5C9.85495 5 9.67638 5.06696 9.56477 5.20089L6.61834 8.23661C6.21656 8.63839 6.50674 9.28571 7.04245 9.28571Z"
      fill="currentColor"
      style={{ opacity: sortDirection === "asc" ? 1 : 0.3 }}
    />
    <path
      d="M7.04245 10.7143H12.9576C13.4933 10.7143 13.7835 11.3839 13.3817 11.7857L10.4353 14.8214C10.3237 14.9554 10.1675 15 10.0112 15C9.83263 15 9.67638 14.9554 9.56477 14.8214L6.61834 11.7857C6.21656 11.3839 6.50674 10.7143 7.04245 10.7143Z"
      fill="currentColor"
      style={{ opacity: sortDirection === "desc" ? 1 : 0.3 }}
    />
  </>
);

export const IconSort = ({ sortDirection }: SortIconProps) => {
  const Icon = React.useMemo(
    () =>
      withIcon(
        { height: 20, name: "IconSort", width: 20 },
        <SortIcon sortDirection={sortDirection} />,
      ),
    [sortDirection],
  );

  return <Icon />;
};
