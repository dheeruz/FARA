import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });

      if (res.status === 200 && res.data) {
        const role = res.data.role || ""; // make sure backend sends 'admin' or 'user'

        // Save authentication & role
        setIsAuthenticated(true);
        if (typeof setUserRole === "function") {
          setUserRole(role);
        } else {
          console.warn("setUserRole was not passed to Login component");
        }

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", role);

        // ✅ Redirect based on role
        if (role === "admin") {
          navigate("/admin/contacts"); // admin dashboard or admin landing page
        } else {
          navigate("/"); // regular home
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error or invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", cursor: "pointer" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p>
          New user?{" "}
          <Link
            to="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
