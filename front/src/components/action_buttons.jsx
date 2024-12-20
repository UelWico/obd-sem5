import PropTypes from "prop-types";

export default function ActionButtons({ editFunc, delFunc, state, hidden }) {
  return (
    <div>
      {!hidden && (
        <button
          style={{ width: 36, height: 36, marginRight: 6 }}
          onClick={editFunc}
        >
          <img src="/edit.svg" />
        </button>
      )}
      {state == 1 && (
        <button style={{ width: 36, height: 36 }} onClick={delFunc}>
          <img src="/del.svg" />
        </button>
      )}
      {state == 2 && !hidden && (
        <button style={{ width: 36, height: 36 }} onClick={delFunc}>
          <img src="/arch.svg" />
        </button>
      )}
      {state == 2 && hidden && (
        <button style={{ width: 36, height: 36 }} onClick={delFunc}>
          <img src="/unarch.svg" />
        </button>
      )}
    </div>
  );
}
ActionButtons.propTypes = {
  editFunc: PropTypes.func,
  delFunc: PropTypes.func,
  state: PropTypes.number,
  hidden: PropTypes.bool,
};
