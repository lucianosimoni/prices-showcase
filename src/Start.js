import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./Start.css";

function Start() {
  const navigate = useNavigate();

  const goToShowcase = (page) => navigate(`/prices-showcase/showcase/${page}`);
  const goToAdmin = () => navigate("/prices-showcase/admin");

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  closeFullscreen();

  return (
    <div className="Start">
      <header className="Start-header">
        <img src={logo} className="Start-logo" alt="logo" />
        <span>The Garden Butcher</span>
      </header>
      <main>
        <section className="Start-section">
          <button className="Start-button" tabIndex={1} onClick={goToAdmin}>
            Admin
          </button>
        </section>
        <section className="Start-section">
          <button className="Start-button" onClick={() => goToShowcase(1)}>
            Tela 1
          </button>
          <button className="Start-button" onClick={() => goToShowcase(2)}>
            Tela 2
          </button>
          <button className="Start-button" onClick={() => goToShowcase(3)}>
            Tela 3
          </button>
          <button className="Start-button" onClick={() => goToShowcase(4)}>
            Tela 4
          </button>
        </section>
      </main>
    </div>
  );
}

export default Start;
