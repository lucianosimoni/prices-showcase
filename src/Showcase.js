/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/alt-text */
import { storage } from "./utils/Firebase";
import { useParams } from "react-router-dom";
import "./Showcase.css";
import { ref } from "firebase/database";

function Showcase({ data }) {
  const params = useParams();
  const pageNum = params.page;
  const pageData = eval(`data.page${pageNum}`);

  function openFullscreen() {
    var elem = document.documentElement;
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
  openFullscreen();
  console.log(pageData.info.backgroundImageLeft);

  return (
    <div className="Showcase">
      <header className="Showcase-header">
        <h1 className="Showcase-title">{pageData.info.title}</h1>
      </header>

      <main
        className="Showcase-main"
        style={{
          gridTemplateColumns: `repeat(${pageData.info.columns}, 1fr)`,
        }}
      >
        {Object.values(pageData.itemsRef).map((itemRef, index) => {
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

      <div className="Showcase-background-images">
        <img
          src={pageData.info.bgImageLeft.url}
          className="Showcase-background-image"
          style={{
            opacity: pageData.info.bgImageLeft.opacity + "%",
            height: pageData.info.bgImageLeft.size + "%",
          }}
        />
        <img
          src={pageData.info.bgImageRight.url}
          className="Showcase-background-image"
          style={{
            opacity: pageData.info.bgImageRight.opacity + "%",
            height: pageData.info.bgImageRight.size + "%",
          }}
        />
      </div>
    </div>
  );
}

export default Showcase;
