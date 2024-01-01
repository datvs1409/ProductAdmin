import React from "react";
import { useHistory, Link } from "react-router-dom";

import "./topnav.css";
import Dropdown from "../dropdown/Dropdown";
import ThemeMenu from "../thememenu/ThemeMenu";
import notifications from "../../assets/JsonData/notification.json";
import user_image from "../../assets/images/Dat.jpg";
import user_menu from "../../assets/JsonData/user_menus.json";

const Topnav = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  );

  const renderUserToggle = (user) => (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img src={user.image} alt={user.display_name} />
      </div>
      <div className="topnav__right-user__name">{user.display_name}</div>
    </div>
  );

  const renderUserMenu = (item, index) => {
    const isLogout = item.content === "Logout";
    return (
      <Link
        to={isLogout ? "#" : "/"}
        key={index}
        onClick={isLogout ? handleLogout : null}
      >
        <div className="notification-item">
          <i className={item.icon}></i>
          <span>{item.content}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() =>
              renderUserToggle({ display_name: "Tran Dat", image: user_image })
            }
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
