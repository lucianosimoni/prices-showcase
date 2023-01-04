import { useNavigate } from "react-router-dom";
import "./Showcase.css";

function Showcase() {
  const navigate = useNavigate();

  const goToStart = () => navigate("/prices-showcase/");

  return (
    <div className="Showcase">
      <header className="Showcase-header">
        <button className="Showcase-return" tabIndex={1} onClick={goToStart}>
          {"<"}
        </button>
      </header>
      <main className="Showcase-main"></main>
    </div>
  );
}

export default Showcase;
