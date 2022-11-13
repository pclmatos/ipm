import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLogin from "./LRcomponents/PageLogin"
import PageRegister from "./LRcomponents/PageRegister";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageLogin />} />
                <Route path="/register" element={<PageRegister />}/>
            </Routes>
        </Router>
    )
}