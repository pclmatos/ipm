import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import PageLogin from "./pages/PageLogin"
import PageRegister from "./pages/PageRegister";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageLogin />} />
                <Route path="/register" element={<PageRegister />} />
                <Route path="/loggedin" element={<Navbar />} />
            </Routes>
        </Router>
    )
}