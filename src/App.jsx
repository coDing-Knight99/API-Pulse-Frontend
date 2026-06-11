import Navbar from "./components/Navbar";
import ApiKeys from "./pages/ApiKeys";
import ApiSandbox from "./pages/ApiSandbox";
import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import ServiceAnalytics from "./pages/ServiceAnalytics";
import KeyAnalytics from "./pages/KeyAnalytics";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound.jsx"
function App() {
  return (
    <div className="min-h-screen bg-[#050508]">
      
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<ProtectedRoute><Service /></ProtectedRoute>} />
        <Route path="/services/:serviceId/analytics" element={<ProtectedRoute><ServiceAnalytics /></ProtectedRoute>} />
        <Route path="/api-keys" element={<ProtectedRoute><ApiKeys /></ProtectedRoute>} />
        <Route path="/api-keys/:keyId/analytics" element={<ProtectedRoute><KeyAnalytics /></ProtectedRoute>} />
        <Route path="/api-sandbox" element={<ProtectedRoute><ApiSandbox /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
