import React from "react";
import "./Sidebar.css";
import Menu from "./Menu";
import Contacts from "./Contacts";

function Sidebar() {
  return (
    <div className="Sidebar">
      <Menu />
      <Contacts />
    </div>
  );
}

export default Sidebar;
