import React from "react"
import styles from './signup.module.css'
import { Link , useNavigate} from "react-router-dom"
import { useState} from "react"

const SignIn = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
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

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.text();

            if (response.ok) {
                setMessage("Login successful");
                localStorage.setItem("userEmail", form.email);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);

            } else {
                setMessage(data || "Login failed");
            }

        } catch (error) {
            console.error(error);
            setMessage("Server error");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.formBox}>
                    <h2>Log In</h2>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                        <input type="email" placeholder="Your email" name="email" onChange={handleChange} required />
                        </div>

                        <div className={styles.inputGroup}>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
                        </div>

                        <button className={styles.btn}>Log In</button>
                    </form>
                    {message && <p style={{ marginTop: "10px" }}>{message}</p>}

                    <p className={styles.forgot}>Forgot password?</p>

                    <div className={styles.divider}>or</div>

                    <div className={styles.socials}>
                        <button className={styles.social}>Google</button>
                        <button className={styles.social}>Facebook</button>
                    </div>

                    <p className={styles.signupText}>
                        Don’t have an account? <Link to="/">Sign Up</Link>
                        
                    </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.overlay}>
                    <h1>
                        The future belongs to those who <br />
                        <span>believe</span> in the <span>beauty of their dreams.</span>
                    </h1>
                    <p>– Eleanor Roosevelt</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignIn