import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./Start.css";

function Start() {
  const navigate = useNavigate();

  const goToShowcase = () => navigate("/prices-showcase/showcase");
  const goToAdmin = () => navigate("/prices-showcase/admin");

  return (
    <div className="Start">
      <header className="Start-header">
        <img src={logo} className="Start-logo" alt="logo" />
        <span>The Garden Butcher</span>
      </header>
      <main>
        <section className="Start-section">
          <button className="Start-button" tabIndex={1} onClick={goToShowcase}>
            Showcase
          </button>
          <button className="Start-button" tabIndex={2} onClick={goToAdmin}>
            Admin
          </button>
        </section>
      </main>
    </div>
  );
}

export default Start;
