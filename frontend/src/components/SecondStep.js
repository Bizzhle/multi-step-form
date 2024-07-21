import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion"; // to add sliding animation
import { useNavigate } from "react-router-dom";

function SecondStep(props) {
  const navigate = useNavigate();
  const { user } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
    },
  });

  const onSubmit = (data) => {
    props.updateUser(data);

    navigate("/third");
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw " }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="first_name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email Address"
            autoComplete="off"
            {...register("userEmail", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
            // className={`${errors.user_email ? "input-error" : ""}`}
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
            autoComplete="off"
            {...register("userPassword", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password should have at-least 8 characters.",
              },
            })}
            // className={`${errors.user_password ? "input-error" : ""}`}
          />
          {/* {errors.user_password && (
            <p className="errorMsg">{errors.user_password.message}</p>
          )} */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
}

export default SecondStep;
