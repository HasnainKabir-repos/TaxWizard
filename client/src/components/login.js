import React, { useState } from "react";
import axios from "axios";
import logo from "../images/logo.png";
import backgroundImage from "../images/tax.png"; // Replace with your actual background image path


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      if (response.data.token) {
        localStorage.setItem("_token", JSON.stringify(response.data.token));
        console.log("Login successful!");
        window.location = "/profile";
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const styles = {
    pageWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      padding: '0 10%', // Adjust padding as needed
      boxSizing: 'border-box',
      background: '#7CABA1',
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "1px solid white",
      borderRadius: "5px",
      boxShadow: "0px 0px 8px white",
      maxWidth: "400px",
      width: '100%', // Make it responsive
      background: "#7CABA1",
    },
    imageContainer: {
      maxWidth: "50%", // Adjust the size as needed
      maxHeight: "100vh",
      width: '100%',
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    // ... other styles remain unchanged
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
    },
    logo: {
      width: "150px",
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
      marginTop: "10px",
      marginBottom: "10px",
    },
    h2: {
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.imageContainer}>
        {/* Background image is set via CSS in styles.imageContainer */}
      </div>
      <div style={styles.container}>
        <div style={styles.header}>
          <img src={logo} alt="Logo" style={styles.logo} />
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
