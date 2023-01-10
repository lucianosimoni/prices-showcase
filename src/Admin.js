/* eslint-disable no-eval */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import { database } from "./utils/Firebase";
import { ref, remove, set, update } from "firebase/database";

function Admin({ data }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState({ show: false, data: {} });
  const [showPageEdit, setShowPageEdit] = useState(false);
  const navigate = useNavigate();

  const goToStart = () => navigate("/prices-showcase/");

  const addItemClicked = () => {
    setShowEdit({ show: false, data: {} });
    setShowPageEdit({ show: false, pageNum: null });
    setShowAdd(true);
  };
  const editItemClicked = (item) => {
    setShowAdd(false);
    setShowPageEdit({ show: false, pageNum: null });
    setShowEdit({ show: true, itemData: item });
  };
  const editPageClicked = (pageNum) => {
    setShowAdd(false);
    setShowEdit({ show: false, data: {} });
    setShowPageEdit({ show: true, pageNum: pageNum });
  };
  const closeAside = () => {
    setShowPageEdit({ show: false, pageData: {} });
    setShowAdd(false);
    setShowEdit({ show: false, data: {} });
  };

  const reOrderItem = (event, upOrDown, index) => {
    event.preventDefault();
    const pageItemsRef = Object.values(
      eval(`data.page${showPageEdit.pageNum}.itemsRef`)
    );
    const lastIndex = pageItemsRef.length - 1;
    let toIndex;
    if (upOrDown === "up") {
      index === 0 ? (toIndex = lastIndex) : (toIndex = index - 1);
    } else {
      index === lastIndex ? (toIndex = 0) : (toIndex = index + 1);
    }

    const newPosArray = arrayMoveImmutable(pageItemsRef, index, toIndex);
    const newPosObject = Object.assign({}, newPosArray);
    // Updates the Order in the DB
    set(
      ref(database, `/thegardenbutcher/page${showPageEdit.pageNum}/itemsRef`),
      newPosObject
    );
  };

  const pageEditSubmit = (event) => {
    event.preventDefault();
    const newColumnsNum = event.target[0].value;
    // Update the Columns info in the DB
    update(
      ref(database, `/thegardenbutcher/page${showPageEdit.pageNum}/info`),
      { columns: newColumnsNum }
    );
    event.target[0].value = "";
  };

  const itemEditSubmit = (event) => {
    event.preventDefault();

    const newNamePtBr = event.target[0];
    const newNameEn = event.target[1];
    const newPrice = event.target[2];
    const newPage = event.target[3];

    // Update newPage value
    // If there is a value assigned to Page, Check and Update Page:Id ItemsRef
    if (newPage.value !== "") {
      if (!(newPage.value > 4) && !(newPage.value <= 0)) {
        updateItemPage(
          showEdit.itemData.id,
          eval(`data.items.${showEdit.itemData.id}.page`), // Old page
          newPage.value // New page
        );
      } else return alert("Pagina tem que ser entre 1 e 4 apenas!");
    }

    // Update Items
    update(ref(database, `/thegardenbutcher/items/${showEdit.itemData.id}`), {
      // New name or same
      namePtBr:
        newNamePtBr.value === ""
          ? eval(`data.items.${showEdit.itemData.id}.namePtBr`)
          : newNamePtBr.value,
      // New name or same
      nameEn:
        newNameEn.value === ""
          ? eval(`data.items.${showEdit.itemData.id}.nameEn`)
          : newNameEn.value,
      // New price or same
      price:
        newPrice.value === ""
          ? eval(`data.items.${showEdit.itemData.id}.price`)
          : newPrice.value,
      // New page or same
      page:
        newPage.value === ""
          ? eval(`data.items.${showEdit.itemData.id}.page`)
          : newPage.value,
    });

    newNamePtBr.value = "";
    newNameEn.value = "";
    newPrice.value = "";
    newPage.value = "";
  };

  const updateItemPage = (itemId, oldPage, newPage) => {
    // OLD PAGE --------------
    let oldPageItemsRef = Object.values(eval(`data.page${oldPage}.itemsRef`));
    oldPageItemsRef = oldPageItemsRef.filter((item) => item !== itemId);
    set(
      ref(database, `/thegardenbutcher/page${oldPage}/itemsRef`),
      Object.assign({}, oldPageItemsRef) // Array to Object
    );

    // NEW PAGE --------------
    const newPageItemsRef = Object.values(eval(`data.page${newPage}.itemsRef`));
    newPageItemsRef.push(itemId);
    set(
      ref(database, `/thegardenbutcher/page${newPage}/itemsRef`),
      Object.assign({}, newPageItemsRef)
    );
  };

  const deleteItem = (item) => {
    const deleteItem = window.confirm("Deletar item?");
    if (deleteItem) {
      // Find the Index of the itemRef to remove
      let pageItemsRef = Object.values(eval(`data.page${item.page}.itemsRef`));
      pageItemsRef = pageItemsRef.filter((itemRef) => itemRef !== item.id);
      set(
        ref(database, `/thegardenbutcher/page${item.page}/itemsRef`),
        Object.assign({}, pageItemsRef)
      );

      // Remove from Items
      remove(ref(database, `/thegardenbutcher/items/${item.id}`));

      closeAside();
    }
  };

  const addItemSubmit = (event) => {
    event.preventDefault();

    // Create ID
    let id = String(event.target[0].value);
    id = id.replace(/\s/g, "");
    id = id.charAt(0).toLowerCase() + id.slice(1);
    console.log("id is: ", id);

    const namePtBr = event.target[0].value;
    const nameEn = event.target[1].value;
    const price = event.target[2].value;
    const page = event.target[3].value;

    // Check if the id already exists
    const foundItem = Object.values(data.items).find((item) => item.id === id);
    if (foundItem !== undefined) {
      return alert(
        `⚠️ Um Item com o nome [${id}] foi encontrado no Servidor! 
        \nItem existente: 
        - ID: ${foundItem.id} ⬅️
        - Nome: ${foundItem.namePtBr}
        - Página: ${foundItem.page}
        \n
        ⚠️ O id deve ser Unico. Ele é criado a partir do Nome
        🔴Tente novamente com um novo Nome.🔴 ⬅️`
      );
    }

    // Save to DB items
    set(ref(database, `/thegardenbutcher/items/${id}`), {
      id: id,
      nameEn: nameEn,
      namePtBr: namePtBr,
      page: page,
      price: price,
    });

    // Save to page ItemsRef
    const pageItemsRef = Object.values(eval(`data.page${page}.itemsRef`));
    pageItemsRef.push(id);
    set(
      ref(database, `/thegardenbutcher/page${page}/itemsRef`),
      Object.assign({}, pageItemsRef)
    );

    closeAside();
  };

  return (
    <div className="Admin">
      <header className="Admin-header">
        <button className="Admin-return" tabIndex={1} onClick={goToStart}>
          {"<"}
        </button>
        <span>The Garden Butcher</span>
      </header>

      <main className="Admin-main">
        {/* Actions menu */}
        <section className="Admin-section">
          <button
            className="Admin-add-item"
            tabIndex={2}
            onClick={addItemClicked}
          >
            Add Item
          </button>
        </section>

        {/* List of Items */}
        <section className="Admin-section">
          <h1 className="Admin-h1">Lista dos Items</h1>
          <ul className="Admin-items-list">
            {Object.values(data.items).map((item, index) => {
              return (
                <li
                  key={index}
                  className="Admin-list-item"
                  tabIndex={index + 3}
                  onClick={() => editItemClicked(item)}
                >
                  {item.namePtBr} - £{item.price}
                </li>
              );
            })}
          </ul>
        </section>

        {/* List of Pages */}
        <section className="Admin-section">
          <h1 className="Admin-h1">Editar layout das Páginas</h1>
          <ul className="Admin-items-list">
            <li className="Admin-list-item" onClick={() => editPageClicked(1)}>
              Página 1
            </li>
            <li className="Admin-list-item" onClick={() => editPageClicked(2)}>
              Página 2
            </li>
            <li className="Admin-list-item" onClick={() => editPageClicked(3)}>
              Página 3
            </li>
            <li className="Admin-list-item" onClick={() => editPageClicked(4)}>
              Página 4
            </li>
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

        {/* Add menu */}
        {showAdd && (
          <form
            className="Admin-edit-form"
            onSubmit={(event) => addItemSubmit(event)}
          >
            <h2>
              Adicionando <span>Novo item</span>
            </h2>
            {/* PORTUGUESE NAME */}
            <label htmlFor="namePtBr">Nome 🇧🇷:</label>
            <input
              id="namePtBr"
              type={"text"}
              placeholder="Digite nome em Potuguês"
              required
            />
            {/* ENGLISH NAME */}
            <label htmlFor="nameEn">Nome 🇬🇧:</label>
            <input
              id="nameEn"
              type={"text"}
              placeholder="Digite nome em Inglês"
              required
            />
            {/* PRICE */}
            <label htmlFor="price">Preço: </label>
            <input
              id="price"
              type={"number"}
              placeholder="0.00"
              step=".01"
              required
            />
            {/* PAGE */}
            <label htmlFor="page-add">Página: </label>
            <input
              id="page-add"
              type={"number"}
              placeholder="De 1 a 4"
              required
            />
            {/* SUBMIT */}
            <button type="submit">Criar Item</button>
          </form>
        )}

        {/* Edit item menu */}
        {showEdit.show && (
          <form
            className="Admin-edit-form"
            onSubmit={(event) => itemEditSubmit(event)}
          >
            {/* TITLE */}
            <h2>
              Editando item{" "}
              <span>{eval(`data.items.${showEdit.itemData.id}.namePtBr`)}</span>{" "}
            </h2>
            {/* PORTUGUESE NAME */}
            <label htmlFor="namePtBr">Nome 🇧🇷:</label>
            <input
              id="namePtBr"
              type={"text"}
              placeholder={eval(`data.items.${showEdit.itemData.id}.namePtBr`)}
            />
            {/* ENGLISH NAME */}
            <label htmlFor="nameEn">Nome 🇬🇧:</label>
            <input
              id="nameEn"
              type={"text"}
              placeholder={eval(`data.items.${showEdit.itemData.id}.nameEn`)}
            />
            {/* PRICE */}
            <label htmlFor="price">Preço: </label>
            <input
              id="price"
              type={"number"}
              step=".01"
              placeholder={eval(`data.items.${showEdit.itemData.id}.price`)}
            />
            {/* PAGE */}
            <label htmlFor="page">Página: </label>
            <input
              id="page"
              type={"number"}
              placeholder={eval(`data.items.${showEdit.itemData.id}.page`)}
            />
            {/* DELETE */}
            <button
              type="button"
              className="Admin-delete-button"
              onClick={() => deleteItem(showEdit.itemData)}
            >
              Excluir Item
            </button>
            {/* SUBMIT */}
            <button className="Admin-save-button" type="submit">
              Salvar
            </button>
          </form>
        )}

        {/* Edit page menu */}
        {showPageEdit.show && (
          <form
            className="Admin-edit-form"
            onSubmit={(event) => pageEditSubmit(event)}
          >
            <h2>
              Editando Pagina <span>{showPageEdit.pageNum}</span>
            </h2>
            <label htmlFor="pageColumns">Numero de Colunas:</label>
            <input
              id="pageColumns"
              type={"number"}
              placeholder={eval(
                `data.page${showPageEdit.pageNum}.info.columns`
              )}
              required
            />
            <label>Ordem dos Items da pagina:</label>
            <ul>
              {Object.values(
                eval(`data.page${showPageEdit.pageNum}.itemsRef`)
              ).map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    className="Admin-reorder-button"
                    onClick={(event) => reOrderItem(event, "up", index)}
                  >
                    ↑
                  </button>
                  <button
                    className="Admin-reorder-button"
                    onClick={(event) => reOrderItem(event, "down", index)}
                  >
                    ↓
                  </button>
                </li>
              ))}
            </ul>
            <button type="submit">Salvar</button>
          </form>
        )}
      </aside>
    </div>
  );
}

export default Admin;
