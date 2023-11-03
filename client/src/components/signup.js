import React, { useState } from 'react';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import logo from "../images/logo.png";
import backgroundImage from "../images/tax.png";


function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [emailValid, setEmailValid] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            setEmailValid(emailRegex.test(e.target.value));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailValid) {
            console.error("Invalid email format");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000//signup', formData);
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            border: '1px solid white',
            borderRadius: '5px',
            boxShadow: '0px 0px 8px white',
            maxWidth: '400px',
            width: '100%',
            background: '#7CABA1',
        },
        logo: {
            width: '150px', // Adjust as needed
            marginBottom: '20px', // Space between logo and sign up text
        },
        input: {
            margin: '10px 0',
            padding: '10px 15px',
            borderRadius: '5px',
            width: '90%'
        },
        button: {
            padding: '10px 20px',
            background: '#333333',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px'
        },
        h2: {
            color: 'white',
            fontWeight: 'bold'
        }
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
                <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                {!emailValid && <p style={{ color: 'red' }}>Invalid email format</p>}
                <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <PasswordStrengthBar password={formData.password} />
                <button style={styles.button} type="submit">Signup</button>
                
            </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;