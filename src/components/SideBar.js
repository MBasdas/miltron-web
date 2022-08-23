import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";
import "../assets/SideBar.css";

import Logo from "../assets/img/logo.png";

const SideBar = () => {
  return (
    <div className="col-12 d-flex align-items-center sidebar">
      <div className="col-1 logo">
        <img src={Logo} className="logoimage" alt="Logo" />
      </div>
      <div className="col-11 links">
        <Link className="link" to="/rockets">
          Rockets
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
