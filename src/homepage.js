import { get, set, values, del, update } from "idb-keyval";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [inputlist, setInputList] = useState("");
  const [b, setb] = useState(true);
  const [Items, setItems] = useState([]);
  const [update, setupdate] = useState([]);

  useEffect(() => {
    setb(true);
    get("TODO").then((val) => {
      if (val) setItems(val);
    });
  }, []);

  const clickHandler = () => {
    if (inputlist !== "") {
      set("TODO", [...Items, { name: inputlist, id: uuidv4() }])
        .then(() => {
          get("TODO").then((val) => {
            console.log("worked");
            setInputList("");
          });
        })
        .catch((err) => console.log("It failed!", err));

      get("TODO").then((val) =>
        setItems(() => {
          console.log(val);
          return val;
        })
      );
    }
  };

  const deleteHandler = (name) => {
    // console.log(Items.length);
    setItems((Items) => {
      const x = Items.filter((Items) => Items.id !== name.id);
      set("TODO", x);

      return x;
    });
    console.log(Items);
  };

  const updateHandler = (attr) => {
    // console.log(Items.length);

    setb(false);

    setInputList(attr.name);
    setupdate(attr);
  };

  const clickUpdateHandler = () => {
    // console.log(update);
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id === update.id) {
        Items[i].name = inputlist;
      }
    }
    set("TODO", Items);

    setInputList("");

    setb(true);
  };

  const itemEvent = (event) => {
    setInputList(event.target.value);
  };
  return (
    <div className="container text-center col-md-6 col-md-offset-6">
      <div className="card h-100 row align-items-center">
        <div className="card-header">TO DO TASK</div>
        <div className="card-body">
          <form action="submit">
            <div className="mb-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Add Your Work... "
                onChange={itemEvent}
                value={inputlist}
              ></textarea>
              <br />
              {b ? (
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => clickHandler()}
                >
                  Add
                </button>
              ) : (
                <button
                  type="button"
                  ng-hide="false"
                  className="btn btn-dark"
                  onClick={() => clickUpdateHandler()}
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="list">
          <ol class="list-group list-group-numbered">
            {Items.map((itemval) => (
              <li class="list-group-item">
                {itemval.name} &nbsp; &nbsp; &nbsp;{" "}
                <button type="button" class="btn">
                  <i
                    class="fa-solid fa-pencil"
                    onClick={() => updateHandler(itemval)}
                  ></i>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button type="button" class="btn">
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => deleteHandler(itemval)}
                  ></i>
                </button>
              </li>
            ))}
          </ol>
          <br />
        </div>
      </div>
    </div>
  );
}
