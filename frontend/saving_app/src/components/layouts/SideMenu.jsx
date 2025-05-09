import React, { useContext } from 'react';
import { SIDE_MENU_ITEMS } from "../../utils/data";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    onClose?.();
  };

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
      onClose?.();
    }
  };

  // define your active/inactive styles here
  const activeStyle = {
    backgroundColor: '#3B82F6',  // e.g. blue
    color: '#ffffff',
  };
  const inactiveStyle = {
    backgroundColor: 'transparent',
    color: '#111827',            // dark gray
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] p-5 sticky top-[61px]">
      <div className="flex flex-col items-center gap-3 mt-3 mb-7">
        <h5 className="font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_ITEMS.map((item, index) => {
        const isActive = activeMenu === item.label;
        return (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            style={isActive ? activeStyle : inactiveStyle}
            className="w-full flex items-center gap-4 py-3 px-6 rounded-lg mb-3 text-[15px]"
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
