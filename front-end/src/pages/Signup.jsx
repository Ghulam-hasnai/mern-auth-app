import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleForm(e) {
    e.preventDefault();

    console.log(signupInfo);

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8000/auth/signup";

      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const errorDetails = error?.details[0].message;
        handleError(errorDetails);
      } else if (!success) {
        return handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="container">
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <form className="form-signin" onSubmit={handleForm}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign Up</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
            name="name"
          />
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            onChange={handleChange}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus=""
            name="email"
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            name="password"
          />
          <button
            className="btn btn-lg btn-primary btn-block my-4"
            type="submit"
          >
            Sign in
          </button>
          <span>
            Already have an account ?<Link to="/login"> Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
