import React from "react";
import Canvas from "./Canvas";
import Render from "../Render";
type ViewProps = {
  xFields: string[];
  yFields: string[];
};

const View: React.FC<ViewProps> = ({ xFields, yFields }) => {
  const hasBothFields = xFields.length > 0 || yFields.length > 0;

  return (
    <Canvas>
      {hasBothFields ? (
        <Render
          mark="bar"
          cols={xFields}
          rows={yFields}
          data={[
            { Region: "East", Sales: 100 },
            { Region: "West", Sales: 200 },
            { Region: "North", Sales: 150 },
          ]}
        />
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
          Drag fields to X and Y axis to start visualizing
        </div>
      )}
    </Canvas>
  );
};

export default View;
