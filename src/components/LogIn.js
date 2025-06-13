import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    doSignInWithEmailAndPassword
} from "../db";

import "../Form.css";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError(null);
            setLoading(true);
            await doSignInWithEmailAndPassword(email, password);
            navigate("/")
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Log In</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit" disabled={loading}>
                Log In
                </button>
            </form>
            <p className="form-link">
                Need an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default LogIn;