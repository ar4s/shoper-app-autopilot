import React from "react";

interface Props {
  datetime: Date | number;
}

export const DateTime: React.FC<Props> = ({ datetime }) => {
  const formatted = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Warsaw",
  }).format(datetime);
  return <>{formatted}</>;
};
