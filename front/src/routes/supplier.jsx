import { useEffect, useState } from "react";
import ActionButtons from "../components/action_buttons";
import * as requests from "../requests";
import * as objects from "../objects";
import TableInput from "../components/table_input";

const table_name = "Поставщики";
const create_button_text = "Добавить поставщика";
const create_title_text = "Добавление поставщика";
const update_button_text = "Cохранить";
const update_title_text = "Изменение поставщика";
const attribute_name_item_id = "supplier_id";

const headers = [
  {
    header_name: "Название компании",
    header_width: "150px",
  },
  {
    header_name: "Контактные данные",
    header_width: "150px",
  },
];

const action_header = {
  header_name: "Действия",
  header_width: "100px",
};
const action_state = 2;

const get_items_func = requests.POST_get_suppliers;
const get_item_func = requests.POST_get_supplier;
const create_item_func = requests.POST_create_supplier;
const update_item_func = requests.PUT_update_supplier;
const delete_item_func = requests.POST_delete_supplier;

const new_create_form = function () {
  return {
    new_item: objects.NewCreateSupplier({
      supplier_name: "",
      supplier_phone: "",
    }),
    is_create: true,
  };
};

export default function Supplier() {
  const [form, set_form] = useState(new_create_form());
  const clear_form = function () {
    set_form(new_create_form());
  };
  const set_form_attribute = function (attribute, value) {
    const new_form = JSON.parse(JSON.stringify(form));
    new_form.new_item[attribute] = value;
    set_form(new_form);
  };
  const [items, set_items] = useState([]);
  const delete_item = function (item_id) {
    let new_items = items.slice();
    for (let i = 0; i < new_items.length; i++) {
      if (new_items[i][attribute_name_item_id] == item_id) {
        new_items.splice(i, 1);
        break;
      }
    }
    set_items(new_items);
  };
  const set_item = function (obj) {
    let new_items = items.slice();
    for (let i = 0; i < new_items.length; i++) {
      if (new_items[i][attribute_name_item_id] == obj[attribute_name_item_id]) {
        new_items[i] = obj;
        break;
      }
    }
    set_items(new_items);
  };
  const add_item = function (obj) {
    let new_items = items.slice();
    new_items.unshift(obj);
    set_items(new_items);
  };

  useEffect(() => {
    get_items_func().then((items) => {
      set_items(items);
    });
  }, []);

  const get_del_func = function (obj) {
    return function () {
      delete_item_func(obj).then((out) => {
        if (action_state >= 2) {
          set_item(out);
        } else {
          delete_item(obj[attribute_name_item_id]);
        }
      });
    };
  };
  const get_edit_func = function (obj) {
    return function () {
      get_item_func(obj).then((out) => {
        set_form({
          new_item: objects.NewUpdateSupplier(out),
          is_create: false,
        });
      });
    };
  };
  const get_update_func = function () {
    return function () {
      update_item_func(form.new_item).then((out) => {
        set_item(out);
        clear_form();
      });
    };
  };
  const get_create_func = function () {
    return function () {
      create_item_func(form.new_item).then((out) => {
        add_item(out);
      });
    };
  };

  return (
    <>
      <div className="order-row">
        <div
          style={{ marginTop: "32px", marginLeft: 18 }}
          className="order-full-container"
        >
          <div className="order-headers">
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 28,
                marginBottom: "44px",
              }}
            >
              {form.is_create ? create_title_text : update_title_text}
            </span>
          </div>
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="supplier_name"
            label={"Название компании"}
          />
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="supplier_phone"
            label={"Контактные данные"}
          />
          <button
            style={{
              width: 376,
            }}
            onClick={form.is_create ? get_create_func() : get_update_func()}
          >
            {form.is_create ? create_button_text : update_button_text}
          </button>
          {!form.is_create && <button onClick={clear_form}>R</button>}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <p
            id="tableTitle"
            className="order-headers"
            style={{ fontSize: "28px", marginBottom: "16px" }}
          >
            {table_name}
          </p>
          <table width="96%">
            <thead>
              <tr id="tableHead">
                {headers
                  ? headers.map((header) => (
                      <th
                        key={header.header_name}
                        style={{
                          minWidth: header.header_width,
                          maxWidth: header.header_width,
                        }}
                      >
                        {header.header_name}
                      </th>
                    ))
                  : "Загрузка..."}
                {action_header ? (
                  <th
                    key={action_header.header_name}
                    style={{
                      minWidth: action_header.header_width,
                      maxWidth: action_header.header_width,
                    }}
                  >
                    {action_header.header_name}
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody id="table">
              {items
                ? items
                    .slice()
                    .reverse()
                    .map((item) => (
                      <tr
                        key={item[attribute_name_item_id]}
                        style={(() => {
                          if (item.supplier_hidden) {
                            return { color: "rgba(0,0,0,0.4)" };
                          }
                          return {};
                        })()}
                      >
                        <td>{item.supplier_name}</td>
                        <td>{item.supplier_phone}</td>

                        <td>
                          <ActionButtons
                            delFunc={get_del_func({
                              supplier_id: item[attribute_name_item_id], ////
                            })}
                            editFunc={get_edit_func({
                              supplier_id: item[attribute_name_item_id], ////
                            })}
                            state={action_state}
                            hidden={item.supplier_hidden}
                          ></ActionButtons>
                        </td>
                      </tr>
                    ))
                : "Загрузка..."}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
