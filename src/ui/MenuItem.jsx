import React from "react";
import { NavLink } from "react-router-dom";

// Menu Item Component for displaying menu on header
function MenuItem({ to, icon, name }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `border-b-4  ${
            !isActive ? "border-transparent" : "border-[#f56d20]"
          } flex flex-col items-center text-[#3E3F45] ${
            icon ? "px-1 md:px-3 py-4 text-[11px]" : "px-5 py-6 "
          } tracking-widest  `
        }
      >
        {icon && <div className="pb-1">{icon}</div>}
        {name}
      </NavLink>
    </li>
  );
}

export default MenuItem;
