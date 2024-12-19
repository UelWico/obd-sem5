import { useEffect, useState } from "react";
import ActionButtons from "../components/action_buttons";
import * as requests from "../requests";
import * as objects from "../objects";

const table_name = "Должности";
const create_button_text = "Создать должность";
const update_button_text = "Cохранить";
const attribute_name_item_id = "job_id";

const headers = [
  {
    header_name: "Название должности",
    header_width: "150px",
  },
];

const action_header = {
  header_name: "Действия",
  header_width: "100px",
};
const actions_state = 0;

const get_items_func = requests.POST_get_jobs;
const get_item_func = requests.POST_get_job;
const create_item_func = requests.POST_create_job;
const update_item_func = requests.PUT_update_job;
const delete_item_func = null;

const new_create_form = function () {
  return {
    new_item: objects.NewCreateJob({
      job_name: "",
    }),
    is_create: true,
  };
};

export default function Job() {
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
      delete_item_func(obj).then(() => {
        delete_item(obj[attribute_name_item_id]);
      });
    };
  };
  const get_edit_func = function (obj) {
    return function () {
      get_item_func(obj).then((out) => {
        set_form({
          new_item: objects.NewUpdateJob(out),
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
      <div>
        <div>
          <input
            style={{
              fontFamily: "system-ui",
              fontSize: 16,
              borderRadius: "10px",
            }}
            name="job_name"
            type="text"
            placeholder=""
            value={form.new_item.job_name}
            onChange={(e) => set_form_attribute("job_name", e.target.value)}
          />
          {form.is_create ? (
            <button
              style={{
                width: 376,
              }}
              onClick={get_create_func()}
            >
              {create_button_text}
            </button>
          ) : (
            <>
              <button
                style={{
                  width: 376,
                }}
                onClick={get_update_func()}
              >
                {update_button_text}
              </button>
              <button onClick={clear_form}>R</button>
            </>
          )}
        </div>
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <h2 id="tableTitle">{table_name + ":"}</h2>
          <table>
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
                      <tr key={item[attribute_name_item_id]}>
                        <td>{item.job_name}</td>
                        <td>
                          <ActionButtons
                            delFunc={get_del_func({
                              job_id: item[attribute_name_item_id], ////
                            })}
                            editFunc={get_edit_func({
                              job_id: item[attribute_name_item_id], ////
                            })}
                            state={actions_state}
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
