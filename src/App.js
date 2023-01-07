import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Start from "./Start";
import Showcase from "./Showcase";
import Admin from "./Admin";
import { onValue } from "firebase/database";
import { dataRef } from "./utils/Firebase";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    onValue(
      dataRef,
      (snapshot) => {
        console.log("Snapshot received");
        console.log(snapshot.val());
        setData(snapshot.val());
      },
      (error) => {
        window.alert(error);
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/prices-showcase/" element={<Start />} />
          <Route path="*" element={<Navigate to="/prices-showcase/" />} />
          <Route element={<RedirectToMain data={data} />}>
            <Route
              path="/prices-showcase/showcase/:page"
              element={<Showcase data={data} />}
            />
            <Route
              path="/prices-showcase/admin"
              element={<Admin data={data} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const RedirectToMain = ({ data }) => {
  if (data === undefined) {
    return <Navigate to="/prices-showcase" />;
  }
  return <Outlet />;
};

export default App;
