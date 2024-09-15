import React, { useState } from "react";
import "./Sidebar.css";
import Submenu from "./Submenu";
import MotionComponent from "./MotionComponent";

const sidebarItems = [
  { name: "Motion", submenus: <MotionComponent />, color: '#4a95fe' },
  { name: "Looks", submenus: ["SubItem 2-1", "SubItem 2-2"], color: '#9669fc' },
  { name: "Sounds", submenus: ["SubItem 3-1", "SubItem 3-2"], color: '#d062cf' },
];

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(sidebarItems[0].name);
  const [selectedSubmenu, setSelectedSubmenu] = useState(sidebarItems[0].submenus);

  const handleItemClick = (item) => {
    setSelectedItem(item.name);
    setSelectedSubmenu(item.submenus);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`menu-items ${selectedItem === item.name ? "selected" : ""}`}
              onClick={() => handleItemClick(item)}
            >
              <div
                className="circle"
                style={{ backgroundColor: item?.color, outline: 'none' }}
              ></div>
              <li>
                {item.name}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <Submenu submenuItems={selectedSubmenu} />
    </div>
  );
};

export default Sidebar;