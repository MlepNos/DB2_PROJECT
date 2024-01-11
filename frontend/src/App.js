import "./App.css";
import FetchEvent from "./components/Fetch/FetchEvent";
import FetchTask from "./components/Fetch/FetchTask";
import Sidebar from "./components/Sidebar/Sidebar2";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <FetchEvent></FetchEvent>
        <FetchTask></FetchTask>
      </Sidebar>
    </div>
  );
}

export default App;
