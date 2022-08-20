import canvasData from "../../canvasData";

const Menu = (props) => {
  const canvasNames = canvasData.map((item) => item.name);
  return (
    <section className={`menu${props.isActive ? " active" : ""}`}>
      <ul className="menu__list">
        {canvasNames.map((name, i) => (
          <li key={name} className="menu__item">
            <button onClick={props.onSelect.bind(null, name)}>{name}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Menu;
