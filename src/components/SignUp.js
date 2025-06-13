import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    doCreateUserWithEmailAndPassword
} from "../db";

import "../Form.css";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) return setError("Passwords do not match");

        try {
            setError(null);
            setLoading(true);

            await doCreateUserWithEmailAndPassword(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="info@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input 
                  password="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input 
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
                <button type="submit" disable={loading}>Sign Up</button>
            </form>
            <p className="form-link">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
};

export default SignUp;