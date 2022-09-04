import canvasData from "../../canvasData";
import { NavLink } from "react-router-dom";

const Menu = (props) => {
  const canvasNames = canvasData.map((item) => item.name);
  const activeStyle = {
    fontWeight: "700",
  };
  return (
    <section className={`menu${props.isActive ? " active" : ""}`}>
      <ul className="menu__list">
        {canvasNames.map((name, i) => (
          <li key={name} className="menu__item">
            <NavLink
              onClick={props.onSelect}
              to={name.toLowerCase().replace(" ", "-")}
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Menu;
