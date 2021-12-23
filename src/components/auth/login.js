import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import "./auth.css";

import { UserContext } from "../../context/userContext";

import { API } from "../../config/api";

function SignIn() {
  const [, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(data);

      const response = await API.post("/login", body, config);

      if (response.data.status === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        let userId = JSON.stringify(response.data.data.id);
        localStorage.setItem("id", userId);
        navigate("/items");
      } else {
        navigate("/sign-up");
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Worng Email or Password
        </Alert>
      );
      setMessage(alert);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center mt-5">
          <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <h3 className="mt-3 mb-4">Sign In</h3>
                {message && message}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", { required: true })}
                    />
                    <div className="text-danger mt-2">
                      {errors.email && "Your input is required"}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 5,
                      })}
                    />
                    <div className="text-danger mt-2">
                      {errors.password?.type === "required" &&
                        "Your input is required"}
                      {errors.password?.type === "minLength" &&
                        "Min 6 characters"}
                    </div>
                  </Form.Group>
                  <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="primary" size="lg">
                      Sign Up
                    </Button>
                  </div>
                  <hr />
                  <p className="text-center">
                    OR
                    <br />
                    If you don't have an account{" "}
                    <Link to="/sign-up">
                      <b>Sign Up</b>
                    </Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
