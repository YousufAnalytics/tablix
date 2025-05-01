const AxisShelfs = () => {
  return (
    <div className="flex flex-col gap-2">
         <div className="w-[800px] h-[50px] border border-gray-300 bg-white shadow-sm flex items-center">
  {/* Label */}
  <div className="flex items-center px-3">
    <span className="text-sm font-medium text-gray-600">x-axis</span>
    {/* Separator line */}
    <div className="w-px h-6 bg-gray-300 mx-3"></div>
  </div>

  {/* Placeholder for draggable fields */}
  <div className="flex-1 flex items-center space-x-2">
    {/* Fields will go here */}
    {/* Example placeholder */}
    <div className="text-gray-400 text-sm">Drag fields here</div>
  </div>
</div>
<div className="w-[800px] h-[50px] border border-gray-300 bg-white shadow-sm flex items-center">
  {/* Label */}
  <div className="flex items-center px-3">
    <span className="text-sm font-medium text-gray-600">y-axis</span>
    {/* Separator line */}
    <div className="w-px h-6 bg-gray-300 mx-3"></div>
  </div>

  {/* Placeholder for draggable fields */}
  <div className="flex-1 flex items-center space-x-2">
    {/* Fields will go here */}
    {/* Example placeholder */}
    <div className="text-gray-400 text-sm">Drag fields here</div>
  </div>
</div>
    </div>
   
  );
};

export default AxisShelfs;
