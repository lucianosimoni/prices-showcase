/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from "react-router-dom";
import "./Showcase.css";

function Showcase({ data }) {
  const navigate = useNavigate();
  const params = useParams();
  const pageNum = params.page;
  const goToStart = () => {
    closeFullscreen();
    navigate("/prices-showcase/");
  };
  const pageReference = eval(`data.page${pageNum}`);

  var elem = document.documentElement;
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
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

  openFullscreen();

  return (
    <div className="Showcase">
      <header className="Showcase-header">
        <button className="Showcase-return" tabIndex={1} onClick={goToStart}>
          {"<"}
        </button>
      </header>
      <main
        className="Showcase-main"
        style={{
          gridTemplateColumns: `repeat(${pageReference.info.columns}, 1fr)`,
        }}
      >
        {Object.values(pageReference.itemsRef).map((itemRef, index) => {
          const item = eval(`data.items.${itemRef}`);
          return (
            <div key={index} className="Showcase-item">
              <div className="Showcase-item-names">
                <span className="Showcase-item-name-br">{item.namePtBr}</span>
                <br />
                <span className="Showcase-item-name-en">{item.nameEn}</span>
              </div>
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
