import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../components/../LoginAndRegister/LoginAndRegister.scss";
import userManager from "../../services/UserManager";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value.trim());
    } else if (name === "password") {
      setPassword(value);
    }
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "username") {
      if (!value) {
        newErrors.username = "Username is required";
      } else {
        delete newErrors.username;
      }
    } else if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        await userManager.loginUser(username, password);
        navigate("/");
      } catch (error) {
        setAlert({ show: true, variant: "danger", message: "Invalid username or password." });
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="loginPage">
      <section className="pageHolder">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2 className="loginTitle">Login</h2>

          <Form.Group controlId="username">
            <div className="inputBox">
              <span className="icon"><ion-icon name="person"></ion-icon></span>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                required
              />
              <Form.Label>Username</Form.Label>
            
            </div>
          </Form.Group>

          <Form.Group controlId="password">
            <div className="inputBox">
              <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Form.Label>Password</Form.Label>
            </div>
          </Form.Group>

          <span className="btnHolder">
            {alert.show && <CustomAlert variant={alert.variant} message={alert.message} />}
            <Button type="submit" className={`submit-btn ${formValid ? "enabled" : ""}`}>
              Login
            </Button>
            <div className="registerLink">
              <p className="haveAnAcount">Don"t have an account?
                <Link to="/register"> <span className="registerHover">Sign up</span></Link></p>
            </div>
          </span>
        </form>
      </section>
    </div>
  );
}

export default LoginForm;