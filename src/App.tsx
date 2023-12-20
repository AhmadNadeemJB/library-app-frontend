import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProfilePage from "./pages/ProfilePage"
function App() {

  return (
    <>
      <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<ProfilePage />} />

        </Routes>
    </BrowserRouter>
      </div>
    </>
  )
}

export default App
