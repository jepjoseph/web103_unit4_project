import { NavLink } from "react-router-dom";

import "../css/Navigation.css";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <h1>SmartSwitch Configurator</h1>
        </li>
      </ul>

      <ul>
        <li>
          <NavLink to="/" role="button">
            Customize
          </NavLink>
        </li>

        <li>
          <NavLink to="/switches" role="button">
            My Switches
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
