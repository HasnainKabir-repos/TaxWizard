import React, { useState } from 'react';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import logo from "/Users/shadmansakib/Desktop/TaxWizard/client/src/images/logo.png";
import backgroundImage from "/Users/shadmansakib/Desktop/TaxWizard/client/src/images/tax.png";



function Signup() {
    const [formData, setFormData] = useState({ name: '',dob: '', email: '', password: '' });
    const [emailValid, setEmailValid] = useState(true);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            setEmailValid(emailRegex.test(e.target.value));
        }
    }

    const handleLoginRedirect = () => {
        // Redirect to login page
        window.location = "/"; // Use your routing mechanism here
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailValid) {
            console.error("Invalid email format");
            return;
        }
        try {
            const response = await axios.post('http://localhost:9000/api/authsignup', formData);
            console.log(response.data);
            if (response.data.token) {
                console.log("Signup successful!");
                window.location = "//login";
            } else {
                console.log("Signup failed!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    const styles = {
        pageWrapper: {
            display: 'flex',
            height: '100vh',
            width: '100vw',
            background: '#7CABA1',
        },
        imageSide: {
            display: 'flex',
            width: '50%',
            height: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        formSide: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '100%',
            padding: '0 5%', // Adjust padding to move the form more to the center-right
        },

        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px", // Reduced padding
            border: "1px solid white",
            borderRadius: "5px",
            boxShadow: "0px 0px 8px green",
            maxWidth: "400px",
            width: '100%', // Make it responsive
            background: "#e9edeb",
          },
        
          input: {
            margin: '5px 0', // Reduced margin
            padding: '5px 10px', // Reduced padding
            borderRadius: '5px',
            width: '93%', // Make the input full-width
          },
        logo: {
            width: '150px', // Adjust as needed
            marginBottom: '20px', // Space between logo and sign up text
        },
        // input: {
        //     margin: '10px 0',
        //     padding: '10px 15px',
        //     borderRadius: '5px',
        //     width: '90%'
        // },
        button1: {
            padding: "5px 10px", // Adjusted padding
            background: "transparent",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem", // Reduced font size
            borderRadius: "5px",
            border: "2px solid white",
            cursor: "pointer",
            marginTop: "5px",
            marginBottom: "5px",
            width: "100%", // Make the button full-width
            backgroundColor: "#0A7B79",
          },
        
          button2: {
            padding: "5px 10px", // Adjusted padding
            background: "transparent",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem", // Reduced font size
            borderRadius: "5px",
            border: "2px solid white",
            cursor: "pointer",
            marginTop: "5px",
            marginBottom: "5px",
            width: "100%", // Make the button full-width
            backgroundColor: "#0A7B79",
          },
           
        h2: {
            color: 'white',
            fontWeight: 'bold'
        },

        // Add these media queries at the bottom of your styles object

//... rest of your styles

// Responsive Styles
'@media (max-width: 768px)': {
    imageSide: {
      display: 'none', // Hide the image side on small screens
    },
    formSide: {
      width: '100%', // Have the form take the full width on small screens
    },
    container: {
      margin: '0 auto', // Center the form container on small screens
      padding: '20px', // Reduce padding on small screens
      boxShadow: 'none', // Optionally remove the box shadow on small screens
    },
    input: {
      width: 'calc(100% - 30px)', // Adjust width for smaller screens
    },
    button1: {
      width: 'calc(100% - 30px)', // Adjust button width for smaller screens
    },
    button2: {
      width: 'calc(100% - 30px)', // Adjust button width for smaller screens
    },
  },
  
    }

    return (
        <div style={styles.pageWrapper}>

            <div style={styles.imageSide}>
                {/* Background image is set via CSS in styles.imageSide */}
            </div>
            <div style={styles.formSide}>
                <div style={styles.container}>
                    <img src={logo} alt="Logo" style={styles.logo} />
                    <h2 style={styles.h2}> Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                <input style={styles.input} type="text" name="name" placeholder="Name" onChange={handleChange} required />
                                {/* <input
                    style={styles.input}
                    type="date"
                    name="dob" // Use "dob" as the name for the date of birth field
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    onChange={handleChange}
                    required
                /> */}
                                <input
                style={styles.input}
                type="date"
                name="dob"
                placeholder="Date of Birth (YYYY-MM-DD)"
                onChange={handleChange}
                value={formData.dob}
                required
                />

                <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                {!emailValid && <p style={{ color: 'red' }}>Invalid email format</p>}
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <PasswordStrengthBar password={formData.password} />
                <button style={styles.button1} type="submit">Signup</button>
                <button style={styles.button2} type="button" onClick={handleLoginRedirect}>
                            Login
                        </button>
                
            </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;