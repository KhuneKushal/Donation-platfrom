import React from "react";
import { FaPlus, FaList, FaCheckSquare } from "react-icons/fa";
import "./navbar.css";

const Sidebar = ({ setCurrentPage }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SRRM</h2>
        <p>Admin Panel</p>
      </div>
      <nav className="sidebar-menu">
        <ul>
          <li onClick={() => setCurrentPage("MainPage")}>
            <FaCheckSquare className="icon" />
            <span>Main Page</span>
          </li>
          <li onClick={() => setCurrentPage("DonationList")}>
            <FaList className="icon" />
            <span>Donation List</span>
          </li>
          <li onClick={() => setCurrentPage("AddNgo")}>
            <FaPlus className="icon" />
            <span>Add NGO</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
