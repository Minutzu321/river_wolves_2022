import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Stats({data}) {
  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
  );
}
