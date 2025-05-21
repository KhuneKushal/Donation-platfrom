import React, { useState } from "react";
import Sidebar from "./components/navbar/navbar"; 
import MainPage from "./components/navbar/pages/MainPage/MainPage";
import DonationList from "./components/navbar/pages/DonationList/DonationList";
import AddNgo from "./components/navbar/pages/AddNgo/AddNgo";

const App = () => {
  // State to track which page is active
  const [currentPage, setCurrentPage] = useState("MainPage");

  // Function to render the selected component
  const renderPage = () => {
    switch (currentPage) {
      case "MainPage":
        return <MainPage />;
      case "DonationList":
        return <DonationList />;
      case "AddNgo":
        return <AddNgo />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Pass setCurrentPage function to Sidebar */}
      <Sidebar setCurrentPage={setCurrentPage} />

      <div className="content">
        {/* Conditionally render the selected page */}
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
