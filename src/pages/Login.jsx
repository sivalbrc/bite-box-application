import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import "./login.css";

function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {

    if (isAuthenticated) {
      navigate("/home");
    }

  }, [isAuthenticated, navigate]);

  const loginlogics = (loginData) => {

    const registeredUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const validUser = registeredUsers.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (validUser) {

      const success = login(
        validUser,
        "mock-bitebox-jwt-token"
      );

      if (success) {

        Swal.fire({
          icon: "success",
          title: "Login Successful 🍔",
          text: `Welcome back ${validUser.name}`,
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/home");

      }

    } else {

      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Invalid email or password",
        confirmButtonColor: "#ff7300",
      });

    }

    reset();
  };

  return (

    <div className="bitebox-login-container">

      {/* LEFT SECTION */}

      <div className="bitebox-left-content">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="bitebox-food-video"
        >
          <source
            src="/nonVegItems/cookingmp4.mp4"
            type="video/mp4"
          />
        </video>

        <div className="bitebox-overlay"></div>

        <div className="bitebox-content-text">

          <h1>BiteBOX</h1>

          <p>
            Fresh Burgers, Hot Pizza &
            Fast Delivery
          </p>

          <span>
            Login and order your favorite
            delicious food instantly 🍔
          </span>

        </div>

      </div>

      {/* RIGHT LOGIN SECTION */}

      <div className="bitebox-right-side">

        <form
          className="bitebox-food-form"
          onSubmit={handleSubmit(loginlogics)}
        >

          <h2>Login</h2>

          <p>
            Welcome back foodie 🍟
          </p>

          {/* EMAIL */}

          <div className="bitebox-input-box">

            <input
              type="email"
              placeholder="Enter Email"
              className={
                errors.email
                  ? "bitebox-error-input"
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

              <span className="bitebox-error-message">
                {errors.email.message}
              </span>

            )}

          </div>

          {/* PASSWORD */}

          <div className="bitebox-input-box">

            <input
              type="password"
              placeholder="Enter Password"
              className={
                errors.password
                  ? "bitebox-error-input"
                  : ""
              }
              {...register("password", {
                required:
                  "Password is required",
              })}
            />

            {errors.password && (

              <span className="bitebox-error-message">
                {errors.password.message}
              </span>

            )}

          </div>

          <button type="submit">
            🍽️ Login Now
          </button>

          <p className="bitebox-login-text">

            Don't have account?

            <Link
              to="/register"
              className="bitebox-login-link"
            >
              Signup
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;