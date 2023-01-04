import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const goToStart = () => navigate("/prices-showcase/");

  return (
    <div className="Admin">
      <header className="Admin-header">
        <button className="Admin-return" tabIndex={1} onClick={goToStart}>
          {"<"}
        </button>
        <img src={logo} className="Admin-logo" alt="logo" />
        <span>The Garden Butcher</span>
      </header>
      <main className="Admin-main"></main>
    </div>
  );
}

export default Admin;
