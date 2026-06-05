import Navbar from "./components/Navbar";
import ApiKeys from "./pages/ApiKeys";
import ApiSandbox from "./pages/ApiSandbox";
import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import ServiceAnalytics from "./pages/ServiceAnalytics";
import KeyAnalytics from "./pages/KeyAnalytics";
import Login from "./pages/Login";
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Service />} />
        <Route path="/services/:serviceId/analytics" element={<ServiceAnalytics />} />
        <Route path="/api-keys" element={<ApiKeys />} />
        <Route path="/api-keys/:keyId/analytics" element={<KeyAnalytics />} />
        <Route path="/api-sandbox" element={<ApiSandbox />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
