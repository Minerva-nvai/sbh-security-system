import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/camera" element={<Dashboard />} />
        <Route path="/logs" element={<Dashboard />} />

        <Route path="*" element={<div>Not Found !</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
