import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rockets from "./pages/Rockets";
import TelemetryPage from "./pages/TelemetryPage";
import "react-notifications/lib/notifications.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rockets />}></Route>
        <Route index element={<Rockets />} />
        <Route path="rockets" element={<Rockets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
