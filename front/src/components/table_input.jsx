import PropTypes from "prop-types";

export default function TableInput({
  name,
  item,
  type,
  label,
  set_form_attribute_func,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontFamily: "system-ui",
          fontSize: 16,
          marginBottom: 6,
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <input
        style={{
          fontFamily: "system-ui",
          fontSize: 16,
          borderRadius: "10px",
          marginBottom: 12,
          width: "100%",
          marginRight: 0,
          paddingRight: 0,
        }}
        type={type}
        value={item[name]}
        onChange={(e) => set_form_attribute_func(name, e.target.value)}
      />
    </div>
  );
}

TableInput.propTypes = {
  name: PropTypes.string,
  item: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  set_form_attribute_func: PropTypes.func,
};
