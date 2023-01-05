/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from "react-router-dom";
import "./Showcase.css";

function Showcase({ data }) {
  const navigate = useNavigate();

  const goToStart = () => navigate("/prices-showcase/");

  return (
    <div className="Showcase">
      <header className="Showcase-header">
        <button className="Showcase-return" tabIndex={1} onClick={goToStart}>
          {"<"}
        </button>
      </header>
      <main className="Showcase-main">
        {Object.values(data.items).map((item, index) => {
          return (
            <div key={index} className="Showcase-item">
              <img src={item.imgUrl} className="Showcase-item-image" />
              <span className="Showcase-item-name">{item.name}</span>
              <span className="Showcase-item-price">
                <span className="Showcase-item-money-symbol">£</span>
                {item.price}
              </span>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Showcase;
