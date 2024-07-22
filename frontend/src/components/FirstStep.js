import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion"; // to add sliding animation
import { Outlet, useNavigate } from "react-router-dom";
import Progress from "./Progress";

function FirstStep(props) {
  const { user = {} } = props;
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      firstName: user.firstNamee || "",
      lastName: user.lastName || "",
    },
  });

  const onSubmit = (data) => {
    props.updateUser(data);
    navigate("/registration/2"); // history comes with router and allows to use the next button to move to next page
  };

  return (
    <>
      <Progress />
      <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          className="col-md-6 offset-md-3"
          initial={{ x: "-100vw " }}
          animate={{ x: 0 }}
          transition={{ stiffness: 150 }}
        >
          <Form.Group controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              autoComplete="off"
              {...register("firstName", {
                required: "First name is required.",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "First name should contain only characters",
                },
              })}
              // className={`${errors.first_name ? "input-error" : ""}`}
            />
            {/* {errors.first_name && (
            <p className="errorMsg">{errors.first_name.message}</p>
          )} */}
          </Form.Group>

          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              autoComplete="off"
              {...register("lastName", {
                required: "Last name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Last name should contain only characters.",
                },
              })}
              // className={`${errors.last_name ? "input-error" : ""}`}
            />
            {/* {errors.last_name && (
            <p className="errorMsg">{errors.last_name.message}</p>
          )} */}
          </Form.Group>

          <Button variant="primary" type="submit">
            Next
          </Button>
        </motion.div>
      </Form>
      <Outlet />
    </>
  );
}

export default FirstStep;
