import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginOrSignup from "./pages/LoginOrSignup";
import ProfilePage from "./pages/ProfilePage";
import ModeToggle from "./components/mode-toggle";
function App() {
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-950">
        <BrowserRouter>
          <div className="absolute top-3 sm:top-6 right-4 sm:right-7">
            <ModeToggle />
          </div>
          <Routes>
            <Route path="/" element={<LoginOrSignup />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
