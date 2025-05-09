import React from "react";
import * as d3 from "d3";

interface DataItem {
  [key: string]: string | number;
}

interface RectProps {
  cols: string[]; // X axis fields
  rows: string[]; // Y axis fields
  data: DataItem[];
}

const Rect: React.FC<RectProps> = ({ cols, rows, data }) => {
  const width = 800;
  const height = 500;
  const margin = { top: 30, right: 20, bottom: 30, left: 40 };

  const xField = cols[0];
  const yField = rows[0];

  // Utility: check if field is numeric (measure)
  const isNumeric = (field: string) => typeof data[0]?.[field] === "number";

  // Handle case when only X or only Y is dragged
  let finalXField = xField;
  let finalYField = yField;
  let chartData: DataItem[] = [];

  if (xField && !yField) {
    if (isNumeric(xField)) {
      // Measure on X ➔ sum aggregate
      chartData = [{ label: "Sum", value: d3.sum(data, (d) => Number(d[xField])) }];
      finalXField = "label";
      finalYField = "value";
    } else {
      // Dimension on X ➔ count frequency
      const grouped = d3.rollups(
        data,
        (v) => v.length,
        (d) => d[xField]
      );
      chartData = grouped.map(([key, count]) => ({ label: key, value: 0 }));
      finalXField = "label";
      finalYField = "value";
    }
  } else if (!xField && yField) {
    if (isNumeric(yField)) {
      // Measure on Y ➔ sum aggregate
      chartData = [{ label: "Sum", value: d3.sum(data, (d) => Number(d[yField])) }];
      finalXField = "label";
      finalYField = "value";
    } else {
      // Dimension on Y ➔ count frequency
      const grouped = d3.rollups(
        data,
        (v) => v.length,
        (d) => d[yField]
      );
      chartData = grouped.map(([key, count]) => ({ label: key, value: 0 }));
      finalXField = "label";
      finalYField = "value";
    }
  } else if (xField && yField) {
    chartData = data;
  } else {
    return <div className="text-gray-500">Please drag fields to X or Y axis</div>;
  }

  // Detect chart orientation (X numeric ➔ horizontal)
  const isXNumeric = typeof chartData[0]?.[finalXField] === "number";
  const isYNumeric = typeof chartData[0]?.[finalYField] === "number";
  const isVertical = !isXNumeric && isYNumeric;

  if (isVertical) {
    // 🟢 Vertical Bar Chart
    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => String(d[finalXField])))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => Number(d[finalYField]))!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xTicks = x.domain().map((d) => ({
      value: d,
      xOffset: x(d)! + x.bandwidth() / 2,
    }));

    const yTicks = y.ticks().map((d) => ({
      value: d,
      yOffset: y(d),
    }));

    return (
      <svg width={width} height={height} className="bg-white rounded shadow">
        {/* X Axis */}
        <g transform={`translate(0,${height - margin.bottom})`}>
          {xTicks.map((tick) => (
            <text
              key={tick.value}
              x={tick.xOffset}
              y={15}
              textAnchor="middle"
              className="text-xs fill-gray-700"
            >
              {tick.value}
            </text>
          ))}
        </g>

        {/* Y Axis */}
        <g transform={`translate(${margin.left},0)`}>
          {yTicks.map((tick) => (
            <g key={tick.value}>
              <text
                x={-10}
                y={tick.yOffset}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs fill-gray-700"
              >
                {tick.value}
              </text>
              <line
                x1={0}
                x2={width - margin.left - margin.right}
                y1={tick.yOffset}
                y2={tick.yOffset}
                stroke="#e5e7eb"
              />
            </g>
          ))}
        </g>

        {/* Bars */}
        {chartData.map((d, i) => (
          <rect
            key={i}
            x={x(String(d[finalXField]))}
            y={y(Number(d[finalYField]))}
            width={x.bandwidth()}
            height={y(0) - y(Number(d[finalYField]))}
            fill="steelblue"
          />
        ))}
      </svg>
    );
  } else {
    // 🔄 Horizontal Bar Chart
    const y = d3
      .scaleBand()
      .domain(chartData.map((d) => String(d[finalYField])))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => Number(d[finalXField]))!])
      .nice()
      .range([margin.left, width - margin.right]);

    const xTicks = x.ticks().map((d) => ({
      value: d,
      xOffset: x(d),
    }));

    const yTicks = y.domain().map((d) => ({
      value: d,
      yOffset: y(d)! + y.bandwidth() / 2,
    }));

    return (
      <svg width={width} height={height} className="bg-white rounded shadow">
        {/* X Axis */}
        <g transform={`translate(0,${height - margin.bottom})`}>
          {xTicks.map((tick) => (
            <text
              key={tick.value}
              x={tick.xOffset}
              y={15}
              textAnchor="middle"
              className="text-xs fill-gray-700"
            >
              {tick.value}
            </text>
          ))}
        </g>

        {/* Y Axis */}
        <g transform={`translate(${margin.left},0)`}>
          {yTicks.map((tick) => (
            <text
              key={tick.value}
              x={-10}
              y={tick.yOffset}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-xs fill-gray-700"
            >
              {tick.value}
            </text>
          ))}
        </g>

        {/* Bars */}
        {chartData.map((d, i) => (
          <rect
            key={i}
            x={x(0)}
            y={y(String(d[finalYField]))}
            width={x(Number(d[finalXField])) - x(0)}
            height={y.bandwidth()}
            fill="steelblue"
          />
        ))}
      </svg>
    );
  }
};

export default Rect;
