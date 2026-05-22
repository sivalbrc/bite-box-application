import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const registerlogic = (userdata) => {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(userdata);

    localStorage.setItem("users", JSON.stringify(users));

    alert("🍔 BiteBOX Registration Successful!");

    reset();

    navigate("/login");
  };

  return (

    <div className="food-container">

      {/* LEFT CONTENT */}
      <div className="left-content">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="food-video"
        >
          <source src="/nonVegItems/magicmp4.mp4" type="video/mp4" />
        </video>

        <div className="overlay"></div>

        <div className="content-text">
          <h1>BiteBOX</h1>

          <p>
            Delicious Burgers, Crispy Fries & Fast Delivery
          </p>

          <span>
            Create your food account and start ordering
            your favorite meals instantly 🍔
          </span>
        </div>

      </div>

      {/* RIGHT REGISTER FORM */}
      <div className="right-side">

        <form
          onSubmit={handleSubmit(registerlogic)}
          className="food-form"
        >

          <h2>Signup</h2>

          <p>Create your tasty account</p>

          <div className="input-box">
            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("name", { required: true })}
            />
          </div>

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
              placeholder="Create Password"
              {...register("password", { required: true })}
            />
          </div>

          <div className="input-box">
            <input
              type="number"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
            />
          </div>

          <button type="submit">
            🍽️ Create Account
          </button>

          <p className="login-text">

            Already Registered?

            <Link to="/login" className="login-link">
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;