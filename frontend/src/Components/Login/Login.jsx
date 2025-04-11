import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [signUp, setSignUp] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const url = signUp ? "http://localhost:8080/signup" : "http://localhost:8080/login";

        const payload = signUp
            ? { username: username.trim(), email: email.trim(), password }
            : { email: email.trim(), password };

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
                setUsername("");
                return;
            }

            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                navigate("/"); // Redirect to homepage or dashboard
            } else {
                setError("Login failed: token not received");
            }

        } catch (error) {
            console.error("Error:", error);
            // setError(error.message || "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">{signUp ? "Register" : "Welcome Back"}</p>
                <p className="message">
                    {signUp ? "Signup now and get full access to our app." : "Login to continue"}
                </p>

                {signUp && (
                    <div className="flex">
                        <label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError("");
                                }}
                                required
                                className="input"
                            />
                            <span>Username</span>
                        </label>
                    </div>
                )}

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
                            setPassword(e.target.value);
                            setError("");
                        }}
                        required
                        className="input"
                    />
                    <span>Password</span>
                </label>

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
