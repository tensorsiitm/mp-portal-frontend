import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import Desktop10 from "./pages/New-Event/New-Event";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/new-event" element={<Desktop10 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
