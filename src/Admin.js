/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./Admin.css";
import { useState } from "react";

function Admin({ data }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState({ show: false, data: {} });
  const navigate = useNavigate();

  const goToStart = () => navigate("/prices-showcase/");

  const addItemClicked = () => {
    setShowEdit({ show: false, data: {} });
    setShowAdd(true);
  };
  const editItemClicked = (item, index) => {
    setShowAdd(false);
    setShowEdit({ show: true, data: { item: item, index: index } });
  };
  const closeAside = () => {
    setShowAdd(false);
    setShowEdit({ show: false, data: {} });
  };

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
          <button
            className="Admin-add-item"
            tabIndex={2}
            onClick={addItemClicked}
          >
            Add Item
          </button>
        </section>
        <section className="Admin-section">
          <h1 className="Admin-h1">Lista dos Items</h1>
          <ul className="Admin-items-list">
            {Object.values(data.items).map((item, index) => {
              return (
                <li
                  key={index}
                  className="Admin-list-item"
                  tabIndex={index + 3}
                  onClick={(event) => editItemClicked(item, index)}
                >
                  {item.name} - £{item.price}
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <aside className="Admin-aside">
        <h1>Menu de ações</h1>
        <button
          className="Admin-aside-close"
          tabIndex={9999}
          onClick={closeAside}
        >
          X
        </button>
        {showAdd && (
          <form className="Admin-add-form">
            <h2>Add item</h2>
          </form>
        )}
        {showEdit.show && (
          <form className="Admin-edit-form">
            <h2>Editando item {showEdit.data.item.name} </h2>
            <img className="Admin-form-img" src={showEdit.data.item.imgUrl} />
            <h4>Price: £{showEdit.data.item.price}</h4>
          </form>
        )}
      </aside>
    </div>
  );
}

export default Admin;
