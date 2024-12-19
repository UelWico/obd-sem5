import { useEffect, useState } from "react";
import ActionButtons from "../components/action_buttons";
import * as requests from "../requests";
import * as objects from "../objects";
import TableInput from "../components/table_input";

const table_name = "Должности";
const create_button_text = "Создать должность";
const update_button_text = "Cохранить";
const attribute_name_item_id = "staff_id";

const headers = [
  {
    header_name: "ФИО",
    header_width: "150px",
  },
  {
    header_name: "Номер телефона",
    header_width: "150px",
  },
  {
    header_name: "Никнейм",
    header_width: "150px",
  },
  {
    header_name: "Пароль",
    header_width: "150px",
  },

  {
    header_name: "Должность",
    header_width: "150px",
  },
];

const action_header = {
  header_name: "Действия",
  header_width: "100px",
};
const action_state = 2;

const get_items_func = requests.POST_get_staffs;
const get_item_func = requests.POST_get_staff;
const create_item_func = requests.POST_create_staff;
const update_item_func = requests.PUT_update_staff;
const delete_item_func = requests.POST_delete_staff;

const new_create_form = function () {
  return {
    new_item: objects.NewCreateStaff({
      staff_sur: "",
      staff_name: "",
      staff_mid_name: "",
      staff_phone: "",
      staff_username: "",
      staff_pass: "",
      job_id: 1,
    }),
    is_create: true,
  };
};

export default function Staff() {
  const [jobs, set_jobs] = useState([]);
  useEffect(() => {
    requests.POST_get_jobs().then((job_list) => {
      set_jobs(job_list);
    });
  }, []);

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
          new_item: objects.NewUpdateStaff(out),
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
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="staff_sur"
            label={"Фамилия"}
          />
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="staff_name"
            label={"Имя"}
          />
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="staff_mid_name"
            label={"Отчество"}
          />
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="staff_phone"
            label={"Номер телефона"}
          />
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="staff_username"
            label={"Никнейм"}
          />
          <TableInput
            type="text"
            item={form.new_item}
            set_form_attribute_func={set_form_attribute}
            name="staff_pass"
            label={"Пароль"}
          />
          <select
            style={{
              fontFamily: "system-ui",
              fontSize: 16,
              border: 0,
              borderRight: "1px solid black",
              outline: "none",
              width: "278px",
              backgroundColor: "transparent",
            }}
            name="job_id"
            placeholder="Job"
            value={form.new_item.job_id}
            onChange={(e) => set_form_attribute("job_id", e.target.value)}
          >
            {jobs
              ? jobs.map((db) => (
                  <option
                    key={db.job_id}
                    value={db.job_id}
                    label={db.job_name}
                  ></option>
                ))
              : "Загрузка..."}
          </select>
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
                      <tr
                        key={item[attribute_name_item_id]}
                        style={(() => {
                          if (item.staff_hidden) {
                            return { color: "rgba(0,0,0,0.4)" };
                          }
                          return {};
                        })()}
                      >
                        <td>
                          {item.staff_sur +
                            " " +
                            item.staff_name +
                            " " +
                            item.staff_mid_name}
                        </td>
                        <td>{item.staff_phone}</td>
                        <td>{item.staff_username}</td>
                        <td>{item.staff_pass}</td>
                        <td>{item.job.job_name}</td>
                        <td>
                          <ActionButtons
                            delFunc={get_del_func({
                              staff_id: item[attribute_name_item_id], ////
                            })}
                            editFunc={get_edit_func({
                              staff_id: item[attribute_name_item_id], ////
                            })}
                            state={action_state}
                            hidden={item.staff_hidden}
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
