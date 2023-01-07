/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from "react-router-dom";
import "./Showcase.css";

function Showcase({ data }) {
  const navigate = useNavigate();
  const params = useParams();
  const pageNum = params.page;
  const goToStart = () => navigate("/prices-showcase/");
  let pageReference = eval(`data.page${pageNum}.itemsRef`);

  return (
    <div className="Showcase">
      <header className="Showcase-header">
        <button className="Showcase-return" tabIndex={1} onClick={goToStart}>
          {"<"}
        </button>
      </header>
      <main className="Showcase-main">
        {Object.values(pageReference).map((itemRef, index) => {
          const item = eval(`data.items.${itemRef}`);
          return (
            <div key={index} className="Showcase-item">
              <span className="Showcase-item-name-br">{item.namePtBr}</span>
              <span className="Showcase-item-name-en">{item.nameEn}</span>
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
