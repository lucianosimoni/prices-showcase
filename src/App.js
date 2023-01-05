import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./Start";
import Showcase from "./Showcase";
import Admin from "./Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/prices-showcase/" element={<Start />} />
          <Route path="/prices-showcase/showcase" element={<Showcase />} />
          <Route path="/prices-showcase/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
