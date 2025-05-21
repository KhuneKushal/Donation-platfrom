import React, { useState } from "react";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin, setShowRegister, handleLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const openRegisterPopup = (e) => {
        e.preventDefault();
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Login successful");
                handleLoginSuccess(result.token);
            } else {
                alert(result.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            alert("A network error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-popup">
            <span className="close" onClick={() => setShowLogin(false)}>×</span>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    minLength={6}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p>
                Don't have an account? <span className="hover-text" onClick={openRegisterPopup}>Register here</span>
            </p>
        </div>
    );
};

export default LoginPopup;