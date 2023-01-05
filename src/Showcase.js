import { onValue } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Showcase.css";
import { database, itemsRef } from "./utils/Firebase";

function Showcase() {
  const [items, setItems] = useState();
  const navigate = useNavigate();

  const goToStart = () => navigate("/prices-showcase/");

  onValue(itemsRef, (snapshot) => {
    setItems(snapshot.val());
    console.log("Snapshot received");
    console.log(snapshot.val());
  });

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
