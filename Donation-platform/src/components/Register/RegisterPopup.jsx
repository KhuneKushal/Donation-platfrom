// RegisterPopup Component
import React, { useState } from "react";
import "./RegisterPopup.css";

const RegisterPopup = ({ closePopup }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneno, setPhoneno] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { username, email, password, phoneno };

        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.status === 201) {
                alert("Registration successful");
                closePopup(); // Close popup on success
            } else {
                alert(result.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="register-popup">
            <span className="close" onClick={closePopup}>×</span>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="tel"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    placeholder="Phone No."
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterPopup;
