import "./App.css";
import FetchAuditTrail from "./components/Fetch/FetchAuditTrail";
import FetchEvent from "./components/Fetch/FetchEvent";
import FetchTask from "./components/Fetch/FetchTask";
import Sidebar from "./components/Sidebar/Sidebar2";
import { AuditTrailContextProvider } from "./context/AuditTrailContext";
function App() {
  return (
    <div className="App">
      <Sidebar>
        <FetchEvent></FetchEvent>
        <FetchTask></FetchTask>
        <AuditTrailContextProvider>
          <FetchAuditTrail></FetchAuditTrail>
        </AuditTrailContextProvider>
      </Sidebar>
    </div>
  );
}

export default App;
