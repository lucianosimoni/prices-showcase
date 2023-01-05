import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./Admin.css";

function Admin({ data }) {
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
      <main className="Admin-main">
        <section className="Admin-section">
          <h1 className="Admin-h1">Lista dos Items</h1>
          <ul className="Admin-items-list">
            {Object.values(data.items).map((item, index) => {
              return (
                <li
                  key={index}
                  className="Admin-list-item"
                  tabIndex={index + 2}
                >
                  {item.name} - £{item.price}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Admin;
