import PropTypes from "prop-types";

export default function ActionButtons({ editFunc, delFunc, state, hidden }) {
  return (
    <div>
      {!hidden && <button onClick={editFunc}>Редактировать</button>}
      {state == 1 && <button onClick={delFunc}>Удалить</button>}
      {state == 2 && !hidden && <button onClick={delFunc}>Архивировать</button>}
      {state == 2 && hidden && <button onClick={delFunc}>Восстановить</button>}
    </div>
  );
}
ActionButtons.propTypes = {
  editFunc: PropTypes.func,
  delFunc: PropTypes.func,
  state: PropTypes.number,
  hidden: PropTypes.bool,
};
