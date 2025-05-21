import React from "react";
import "./Navbar.css";

const CustomNavbar = ({ setShowLogin, setCurrentPage, isLoggedIn, handleLogout }) => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="navbar">
            {/* Logo */}
            <div className="logo">
                <p>
                    Sustainable Resource <br /> Redistribution Platform
                </p>
            </div>

            {/* Navigation Menu */}
            <div className="menu">
                {/* Discover NGOs */}
                <a href="#" onClick={() => setCurrentPage("discover")}>
                    Discover NGO's
                </a>

                {/* Donate */}
                <a
                    href="#"
                    onClick={() => {
                        if (!isLoggedIn) {
                            setShowLogin(true); // Open Login Popup if not logged in
                        } else {
                            setCurrentPage("donate"); // Navigate to Donate page if logged in
                        }
                    }}
                >
                    Donate
                </a>

                {/* Home */}
                <a href="#" onClick={() => setCurrentPage("home")}>Home</a>

                {/* About Us */}
                <a href="#" onClick={() => scrollToSection("about-us-section")}>
                    About Us
                </a>

                {/* Profile Dropdown */}
                <div className="profile-dropdown-container">
                    <button
                        className="profile-dropdown-button"
                        onClick={() => {
                            if (!isLoggedIn) {
                                setShowLogin(true); // Open Login Popup if not logged in
                            }
                        }}
                    >
                        Profile
                    </button>

                    {/* Show Dropdown Options if Logged In */}
                    {isLoggedIn && (
                        <div className="profile-dropdown-content">
                            {/* Your Donations Button */}
                            <button onClick={() => setCurrentPage("your-donations")}>
                                Your Donations
                            </button>

                            {/* Logout Button */}
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomNavbar;
