import "./App.css";
import FetchEvent from "./components/Fetch/FetchEvent";
import Sidebar from "./components/Sidebar/Sidebar2";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <FetchEvent></FetchEvent>
      </Sidebar>
    </div>
  );
}

export default App;
