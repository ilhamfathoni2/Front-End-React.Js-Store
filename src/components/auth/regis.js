import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Container, Card } from "react-bootstrap";
import "./auth.css";

import { UserContext } from "../../context/userContext";

import { API } from "../../config/api";

function SignUp() {
  const [, dispatch] = useContext(UserContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(data);

      const response = await API.post("/register", body, config);
      setIsLoading(false);

      if (response.data.status === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        navigate("/items");
      } else {
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center mt-5">
          <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <h3 className="mt-3 mb-4">Sign Up</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("fullName", { required: true })}
                    />
                    <div className="text-danger mt-2">
                      {errors.fullName && "Your input is required"}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", { required: true })}
                    />
                    <div className="text-danger mt-2">
                      {errors.email && "Your input is required"}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      {...register("phone", {
                        required: true,
                        minLength: 12,
                      })}
                    />
                    <div className="text-danger mt-2">
                      {errors.phone?.type === "required" &&
                        "Your input is required"}
                      {errors.phone?.type === "minLength" &&
                        "Your input required to be more than 12"}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("address", { required: true })}
                    />
                    <div className="text-danger mt-2">
                      {errors.address && "Your input is required"}
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
                        "Min 5 characters"}
                    </div>
                  </Form.Group>
                  <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="primary" size="lg">
                      {isLoading ? "Sign Up..." : "Sign Up"}
                    </Button>
                  </div>
                  <hr />
                  <p className="text-center">
                    OR
                    <br />
                    If you have an account{" "}
                    <Link to="/">
                      <b> Sign In</b>
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

export default SignUp;
