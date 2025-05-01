import "./App.css";
import View from "./components/View";
import AxisShelfs from "./components/shelfs/AxisShelfs";
import Sidebar from "./components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <div className="flex h-screen gap-15">
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <View />
        <AxisShelfs />
      </div>
      {/* <ShowMe /> */}
      {/* <Sheets /> */}
      </div>
      </DndProvider>
    </>
  );
}

export default App;
