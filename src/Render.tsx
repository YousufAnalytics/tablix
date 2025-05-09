import React from "react";
import Rect from "./Rect";

interface RenderProps {
  mark: string;
  cols: string[];
  rows: string[];
  data: { [key: string]: any }[];
}

const Render: React.FC<RenderProps> = ({ mark, cols, rows, data }) => {
    if (mark === "bar") {
      return <Rect cols={cols} rows={rows} data={data} />;
    }
  
    return <div className="text-gray-500">Select a chart type</div>;
  };
  

export default Render;
