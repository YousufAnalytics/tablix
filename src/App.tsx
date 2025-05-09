import "./App.css";
import View from "./components/View";
import AxisShelfs from "./components/shelfs/AxisShelfs";
import Sidebar from "./components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

function App() {
  const [xFields, setXFields] = useState<string[]>([]);
  const [yFields, setYFields] = useState<string[]>([]);

  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <div className="flex h-screen gap-15">
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <View xFields={xFields} yFields={yFields}/>
        <AxisShelfs  xFields={xFields}
        yFields={yFields}
        setXFields={setXFields}
        setYFields={setYFields}/>
      </div>
      {/* <ShowMe /> */}
      {/* <Sheets /> */}
      </div>
      </DndProvider>
    </>
  );
}

export default App;
