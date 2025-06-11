import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [signUp, setSignUp] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordIssues, setPasswordIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        const issues = [];
        if (pwd.length < 8) issues.push("At least 8 characters");
        if (!/[A-Z]/.test(pwd)) issues.push("At least one uppercase letter");
        if (!/[a-z]/.test(pwd)) issues.push("At least one lowercase letter");
        if (!/[0-9]/.test(pwd)) issues.push("At least one number");
        if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd)) issues.push("At least one special character");
        return issues;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Run validation for sign up
        if (signUp) {
            const issues = validatePassword(password);
            setPasswordIssues(issues);
            if (issues.length > 0) {
                setLoading(false);
                return;
            }
        }

        const url = signUp
            ? `${process.env.REACT_APP_API_URL}/signup` : `${process.env.REACT_APP_API_URL}/login`;

        const payload = { email: email.trim(), password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errText = await response.text();
                setError(errText);
                throw new Error(errText);
            }

            const data = await response.json();

            if (signUp) {
                setSignUp(false);
                setEmail("");
                setPassword("");
                setPasswordIssues([]);
                return;
            }

            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                navigate("/");
            } else {
                setError("Login failed: token not received");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">{signUp ? "Register" : "Hey there"}</p>
                <p className="message">
                    {signUp ? "Signup now and get full access to our app." : "Login to continue"}
                </p>

                <label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        required
                        className="input"
                    />
                    <span>Email</span>
                </label>

                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            const val = e.target.value;
                            setPassword(val);
                            setError("");
                            if (signUp) {
                                setPasswordIssues(validatePassword(val));
                            }
                        }}
                        required
                        className="input"
                    />
                    <span>Password</span>
                </label>

                {/* Password rules */}
                {signUp && passwordIssues.length > 0 && (
                    <ul style={{ color: "red", fontSize: "14px", paddingLeft: "20px" }}>
                        {passwordIssues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                        ))}
                    </ul>
                )}

                {/* Server error message */}
                {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

                <button className="submit" disabled={loading}>
                    {loading ? "Please wait..." : signUp ? "Sign Up" : "Login"}
                </button>

                <p className="signin">
                    {signUp ? "Already have an account?" : "New User?"}{" "}
                    <button
                        type="button"
                        className="link-button"
                        onClick={(e) => {
                            e.preventDefault();
                            setSignUp(!signUp);
                            setError("");
                            setPasswordIssues([]);
                        }}
                    >
                        {signUp ? "Login" : "Sign Up"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;