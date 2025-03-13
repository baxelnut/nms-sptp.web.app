import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import PageNotFound from "./features/PageNotFound";
import HomePage from "./features/HomePage";
import SideBar from "./components/SideBar";

function AppContent() {
  const location = useLocation();
  const isNotFound = location.pathname !== "/" && location.pathname !== "/home";
  const [selectedPath, setSelectedPath] = useState(() => {
    return localStorage.getItem("selectedPath") || "https://pelindotpk.co.id";
  });

  useEffect(() => {
    localStorage.setItem("selectedPath", selectedPath);
  }, [selectedPath]);

  return (
    <div className="app-container">
      {!isNotFound && <SideBar setSelectedPath={setSelectedPath} />}
      <div className="content">
        {selectedPath.startsWith("http") ? (
          selectedPath.includes("pelindotpk.co.id") ? (
            <iframe
              src={selectedPath}
              title="External Page"
              style={{ width: "100%", height: "100vh", border: "none" }}
            />
          ) : (
            window.open(selectedPath, "_blank") || null
          )
        ) : (
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
