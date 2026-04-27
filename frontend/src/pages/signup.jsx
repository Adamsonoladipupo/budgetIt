import React from "react";
import styles from './signin.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Signup successful");

                setTimeout(() => {
                    navigate("/signin");
                }, 2000);

            } else {
                setMessage(data.message || "Signup failed ");
            }

        } catch (error) {
            console.error(error);
            setMessage("Server error ");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.overlay}>
                    <h1>
                        Beware of <span> little expenses; a small leak</span> will sink <br />
                        <span>a great ship.</span>
                    </h1>
                    <p className={styles.author}>– Benjamin Franklin</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.form_box}>
                    <h2>Sign Up</h2>

                    <form onSubmit={handleSubmit}>
                         <div className={styles.input_group}>
                        <input type="text" name="name" placeholder="Your full name" onChange={handleChange} required />
                        </div>

                        <div className={styles.input_group}>
                        <input type="email" name="email" placeholder="Your email" onChange={handleChange} required />
                        </div>

                        <div className={styles.input_group}>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        </div>

                        <div className={styles.input_group}>
                            <input type="password" name="confirmPassword" placeholder="Repeat Password" onChange={handleChange} required/>
                        </div>

                        <button type="submit" name="submit" className={styles.btn}>Sign Up</button>
                    </form>

                    {message && <p style={{ marginTop: "10px" }} className={styles.frontendMessages}>{message}</p>}

                    <div className={styles.divider}>or</div>

                    <div className={styles.socials}>
                        <button className={`${styles.social} ${styles.google}`}>Google</button>
                        <button className={`${styles.social} ${styles.facebook}`}>Facebook</button>
                    </div>

                    <p className={styles.login_text}>
                        Already have an account? <Link to="/signin">Log In</Link>
                    </p>
                    </div>
                </div>

                </div>

        </>
    )
}
export default SignUp;