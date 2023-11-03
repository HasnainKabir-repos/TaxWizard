import React, { useState } from "react";

import axios from "axios";
import logo from "../images/logo.png";
import backgroundImage from "../images/tax.png";


function Login() {
  const [formData, setFormData] = useState({ Email: "", Password: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesignupRedirect = () => {
    window.location = "/signup";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        formData,
      );
      console.log(response);
      if (response.data) {

        console.log("Login successful!");
        window.location = "/dashboard";
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const styles = {
    pageWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      padding: "0 10%", // Adjust padding as needed
      boxSizing: "border-box",
      background: "#7CABA1",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "1px solid white",
      borderRadius: "5px",
      boxShadow: "0px 0px 8px green",
      maxWidth: "400px",
      width: "100%", // Make it responsive
      background: "#e9edeb",
    },
    imageContainer: {
      maxWidth: "100%%", // Adjust the size as needed
      maxHeight: "100vh",
      width: "100%",
      height: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
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
    button1: {
      padding: "8px 16px", // Adjusted padding
      background: "transparent", // Transparent background
      color: "white", // Text color
      fontWeight: "bold", // Bold text
      fontSize: "1.1rem", // Slightly larger font size
      borderRadius: "5px",
      border: "2px solid white", // White border
      cursor: "pointer",
      marginTop: "10px",
      marginBottom: "10px",
      width: "99%", // Make the button a little smaller than the inputs
      backgroundColor: "#0A7B79", // Button color
    },
    button2: {
      padding: "8px 16px", // Adjusted padding
      background: "transparent", // Transparent background
      color: "white", // Text color
      fontWeight: "bold", // Bold text
      fontSize: "1.1rem", // Slightly larger font size
      borderRadius: "5px",
      border: "2px solid white", // White border
      cursor: "pointer",
      marginTop: "10px",
      marginBottom: "10px",
      width: "99%", // Make the button a little smaller than the inputs
      backgroundColor: "#0A7B79", // Button color
    },

    h2: {
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.imageContainer}></div>
      <div style={styles.container}>
        <div style={styles.header}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.h2}>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            name="Email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="Password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button style={styles.button1} type="submit">
            Login
          </button>
          <button
            style={styles.button2}
            type="button"
            onClick={handlesignupRedirect}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
