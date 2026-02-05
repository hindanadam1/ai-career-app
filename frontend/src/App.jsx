import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CV from "./pages/CV";
import Letter from "./pages/letter";
import Entretien from  "./pages/entretien" ;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cv" element={<CV />} />
       <Route path="/lettre" element={<Letter />} />
      <Route path="/entretien" element={<Entretien />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
