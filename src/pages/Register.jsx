import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  /* REDIRECT */

  useEffect(() => {

    if (isAuthenticated) {
      navigate("/home");
    }

  }, [isAuthenticated, navigate]);

  /* REGISTER LOGIC */

  const registerlogic = (userdata) => {

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    /* CHECK EXISTING USER */

    const userExists = users.some(
      (user) => user.email === userdata.email
    );

    if (userExists) {

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "An account with this email already exists!",
        confirmButtonColor: "#ff7300",
      });

      return;
    }

    users.push(userdata);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    Swal.fire({
      icon: "success",
      title: "Welcome to BiteBox 🍔",
      text: "Registration successful!",
      timer: 3000,
      showConfirmButton: false,
    });

    reset();

    navigate("/login");
  };

  return (

    <div className="bitebox-register-container">

      {/* =========================
          LEFT VIDEO SECTION
      ========================= */}

      <div className="bitebox-register-left-content">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="bitebox-register-food-video"
        >

          <source
            src="/nonVegItems/magicmp4.mp4"
            type="video/mp4"
          />

        </video>

        <div className="bitebox-register-overlay"></div>

        <div className="bitebox-register-content-text">

          <h1>BiteBOX</h1>

          <p>
            Delicious Burgers, Crispy Fries
            & Fast Delivery
          </p>

          <span>
            Create your food account and
            start ordering your favorite
            meals instantly 🍔
          </span>

        </div>

      </div>

      {/* =========================
          RIGHT REGISTER FORM
      ========================= */}

      <div className="bitebox-register-right-side">

        <form
          onSubmit={handleSubmit(registerlogic)}
          className="bitebox-register-food-form"
        >

          <h2>Signup</h2>

          <p>
            Create your tasty account
          </p>

          {/* NAME */}

          <div className="bitebox-register-input-box">

            <input
              type="text"
              placeholder="Enter Full Name"
              className={
                errors.name
                  ? "bitebox-register-error-input"
                  : ""
              }
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (

              <span className="bitebox-register-error-message">
                {errors.name.message}
              </span>

            )}

          </div>

          {/* EMAIL */}

          <div className="bitebox-register-input-box">

            <input
              type="email"
              placeholder="Enter Email"
              className={
                errors.email
                  ? "bitebox-register-error-input"
                  : ""
              }
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:
                    "Invalid email address",
                },
              })}
            />

            {errors.email && (

              <span className="bitebox-register-error-message">
                {errors.email.message}
              </span>

            )}

          </div>

          {/* PASSWORD */}

          <div className="bitebox-register-input-box">

            <input
              type="password"
              placeholder="Create Password"
              className={
                errors.password
                  ? "bitebox-register-error-input"
                  : ""
              }
              {...register("password", {
                required:
                  "Password is required",

                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (

              <span className="bitebox-register-error-message">
                {errors.password.message}
              </span>

            )}

          </div>

          {/* PHONE */}

          <div className="bitebox-register-input-box">

            <input
              type="number"
              placeholder="Phone Number"
              className={
                errors.phone
                  ? "bitebox-register-error-input"
                  : ""
              }
              {...register("phone", {
                required: "Phone is required",

                pattern: {
                  value: /^[0-9]{10}$/,

                  message:
                    "Phone number must be exactly 10 digits",
                },
              })}
            />

            {errors.phone && (

              <span className="bitebox-register-error-message">
                {errors.phone.message}
              </span>

            )}

          </div>

          {/* BUTTON */}

          <button type="submit">
            🍽️ Create Account
          </button>

          {/* LOGIN LINK */}

          <p className="bitebox-register-login-text">

            Already Registered?

            <Link
              to="/login"
              className="bitebox-register-login-link"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;