import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/login`, data);
      setSuccessMessage("User with the provided credentials found");
      setUserDetails(response.data);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
        setErrorMessage(error.response.data);
      }
    }
  };
  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 offset-md-3">
        {/* {errorMessage && <p className="errorMsg login-error">{errorMessage}</p>}
        {successMessage && <p className="successMsg">{successMessage}</p>} */}
        <Form.Group controlId="first_name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email address"
            {...register("userEmail", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
            // className={`${errors.user_email ? "input-error" : ""}`}∆ç
          />
          {/* {errors.user_email && (
            <p className="errorMsg">{errors.user_email.message}</p>
          )} */}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Choose a password"
            {...register("userPassword", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password should have at-least 6 characters.",
              },
            })}
            // className={`${errors.user_password ? "input-error" : ""}`}
          />
          {/* {errors.user_password && (
            <p className="errorMsg">{errors.user_password.message}</p>
          )} */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Check Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
