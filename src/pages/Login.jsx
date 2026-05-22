import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const loginlogics = (loginData) => {

    const registeredUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const validUser = registeredUsers.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (validUser) {

      alert("🍔 Login Successful!");

      navigate("/home");

    } else {

      alert("Invalid email or password");

    }

    reset();
  };

  return (

    <div className="login-container">

      {/* LEFT VIDEO SECTION */}
      <div className="left-content">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="food-video"
        >
          <source
            src="/nonVegItems/cookingmp4.mp4"
            type="video/mp4"
          />
        </video>

        <div className="overlay"></div>

        <div className="content-text">

          <h1>BiteBOX</h1>

          <p>
            Fresh Burgers,
            Hot Pizza &
            Fast Delivery
          </p>

          <span>
            Login and order your favorite
            delicious food instantly 🍔
          </span>

        </div>

      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="right-side">

        <form
          className="food-form"
          onSubmit={handleSubmit(loginlogics)}
        >

          <h2>Login</h2>

          <p>Welcome back foodie 🍟</p>

          <div className="input-box">

            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />

          </div>

          <div className="input-box">

            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />

          </div>

          <button type="submit">
            🍽️ Login Now
          </button>

          <p className="login-text">

            Don't have account?

            <Link
              to="/register"
              className="login-link"
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