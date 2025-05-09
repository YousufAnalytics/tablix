import React, { ReactNode } from "react";

type CanvasProps = {
  children: ReactNode;
};

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  return (
    <div className="w-full h-[500px] border border-gray-300 rounded-lg bg-gray-50 relative overflow-hidden">
      {children}
    </div>
  );
};

export default Canvas;
