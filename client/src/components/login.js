import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login", // Remove extra slashes
        formData
      );
      if (response.data.token) {
        localStorage.setItem(
          "_token",
          JSON.stringify(response.data.token)
        );
        console.log("Login successful!");
        window.location = "/profile"; // Remove extra slashes
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
      height: "100vh", // Make the page take up the full viewport height
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "1px solid white", // White border
      borderRadius: "5px",
      boxShadow: "0px 0px 8px white", // White shadow background
      maxWidth: "400px",
      background: "#7CABA1", // Original background color
    },
    header: {
      display: "flex",
      flexDirection: "column", // Place logo and title in a column
      alignItems: "center", // Center elements horizontally
      marginBottom: "20px",
    },
    logo: {
      width: "50px", // Adjust the width of the logo as needed
      height: "auto",
    },
    input: {
      margin: "10px 0",
      padding: "10px 15px",
      borderRadius: "5px",
      width: "90%",
    },
    button: {
      padding: "10px 20px",
      background: "#333333",
      color: "#fff",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px", // Adjust the margin between buttons
      marginBottom: "10px", // Add margin at the bottom of the button
    },
    h2: {
      color: "white",
      fontWeight: "bold",
    },
  };


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          {/* Add your logo here */}
          <img src="/images/logo.png" alt="Logo" style={styles.logo} />
          <h2 style={styles.h2}>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit">
            Login
          </button>
          <button style={styles.button} type="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
