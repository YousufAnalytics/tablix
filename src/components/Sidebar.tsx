import { useState } from "react";

const Sidebar = () => {
  const dimensions = ["Region", "Country", "Category", "Sub-Category"];
  const measures = ["Sales", "Profit", "Quantity"];

  const [activeTab, setActiveTab] = useState("Dimensions");

  const fields = activeTab === "Dimensions" ? dimensions : measures;

  return (
    <div className="w-64 bg-white border-r border-gray-100 p-5 shadow-sm h-screen flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {["Dimensions", "Measures"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm font-medium pb-2 border-b-2 transition duration-200 ${
              activeTab === tab
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Fields */}
      <ul className="space-y-3 flex-1 overflow-y-auto">
        {fields.map((field) => (
          <li
            key={field}
            draggable
            className={`p-2 px-4 rounded-full cursor-pointer text-sm font-medium shadow-sm hover:shadow transition duration-200 ${
              activeTab === "Dimensions"
                ? "bg-red-50 text-red-700 hover:bg-red-100"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
            style={{ opacity: 0.85 }}
          >
            {field}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
