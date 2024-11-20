import { Routes, Route } from "react-router-dom";

import LayoutApp from "./pages/layout.page";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutApp />}>
                    {/* <Route path="/" element={<PostDetail />} /> */}
                </Route>
            </Routes>
        </>
    );
}

export default App;
