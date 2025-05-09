import { useDrop } from "react-dnd";
import { useState } from "react";

const AxisShelfs = ({
    xFields,
    yFields,
    setXFields,
    setYFields,
  }: {
    xFields: string[];
    yFields: string[];
    setXFields: React.Dispatch<React.SetStateAction<string[]>>;
    setYFields: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {


  // X-axis drop
  const [{ isOver: isOverX }, dropX] = useDrop(() => ({
    accept: "FIELD",
    drop: (item: { field: string; name: string }) => {
      console.log(item);
      setXFields((prev) => [...prev, item.field]); // ✅ accumulate
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Y-axis drop
  const [{ isOver: isOverY }, dropY] = useDrop(() => ({
    accept: "FIELD",
    drop: (item: { field: string }) => {
      setYFields((prev) => [...prev, item.field]); // ✅ accumulate
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col gap-2">
      {/* X-axis shelf */}
      <div
        ref={(node) => {
          if (node) dropX(node);
        }}
        className={`w-[800px] h-[50px] border border-gray-300 bg-white shadow-sm flex items-center ${
          isOverX ? "bg-blue-50" : ""
        }`}
      >
        <div className="flex items-center px-3">
          <span className="text-sm font-medium text-gray-600">x-axis</span>
          <div className="w-px h-6 bg-gray-300 mx-3"></div>
        </div>

        <div className="flex-1 flex items-center space-x-2 px-2 overflow-x-auto">
          {xFields.length > 0 ? (
            xFields.map((field, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {field}
              </span>
            ))
          ) : (
            <div className="text-gray-400 text-sm">Drag fields here</div>
          )}
        </div>
      </div>

      {/* Y-axis shelf */}
      <div
        ref={(node) => {
          if (node) dropY(node);
        }}
        className={`w-[800px] h-[50px] border border-gray-300 bg-white shadow-sm flex items-center ${
          isOverY ? "bg-green-50" : ""
        }`}
      >
        <div className="flex items-center px-3">
          <span className="text-sm font-medium text-gray-600">y-axis</span>
          <div className="w-px h-6 bg-gray-300 mx-3"></div>
        </div>

        <div className="flex-1 flex items-center space-x-2 px-2 overflow-x-auto">
          {yFields.length > 0 ? (
            yFields.map((field, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {field}
              </span>
            ))
          ) : (
            <div className="text-gray-400 text-sm">Drag fields here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AxisShelfs;
