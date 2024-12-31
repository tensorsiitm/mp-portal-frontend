import "./App.css";
import Add from "./pages/add_form/add_form";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/new-form" element={<Add />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
