import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  incrementQty,
  decrementQty,
  clearCart,
  removeCart,
} from "../features/cartslice";

import { applyCoupon, resetCoupon } from "../features/couponSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

import Payment from "./Payment";
import { addOrder } from "../features/ordersSlice";

import "./Cart.css";

function Cart() {
  /* =========================
      LOCAL STATES
  ========================= */

  const [discount, setDiscount] = useState(0);

  const [coupon, setCoupon] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const [timeLeft, setTimeLeft] = useState(120);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [customerEmail, setCustomerEmail] = useState("");

  /* =========================
      REDUX STORE
  ========================= */

  const cart = useSelector((state) => state.cart);

  const {
    applied,
    message,
    discount: couponDiscount,
  } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();

  /* =========================
      CALCULATIONS
  ========================= */

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const buttonDiscount = discount;

  const couponDisc = applied ? couponDiscount || 0 : 0;

  const totalDiscountPercent = buttonDiscount + couponDisc;

  const discountAmount = (total * totalDiscountPercent) / 100;

  const afterDiscount = total - discountAmount;

  const taxAmount = (afterDiscount * 18) / 100;

  const netAmount = afterDiscount + taxAmount;

  /* =========================
      CLEAR CART
  ========================= */

  const notification = () => {
    Swal.fire({
      icon: "warning",
      title: "Clear Cart?",
      text: "Are you sure you want to remove all items?",
      showCancelButton: true,
      confirmButtonText: "Yes, Clear",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());

        Swal.fire({
          icon: "success",
          title: "Cart Cleared!",
          text: "All items removed successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  /* =========================
      CONFETTI
  ========================= */

  function balloonsU(duration = 5000) {
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 90,
        spread: 25,
        startVelocity: 20,
        origin: { x: Math.random(), y: 1.2 },
        gravity: -0.3,
        shapes: ["circle"],
        colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF69B4"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  /* =========================
      PAYMENT TIMER
  ========================= */

  useEffect(() => {
    if (!showPaymentPopup) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showPaymentPopup]);

  /* =========================
      CHECKOUT
  ========================= */

  const handleCheckout = () => {
    if (!customerEmail) {
      toast.error("Please enter your email");
      return;
    }

    setShowPaymentPopup(true);

    setPaymentMethod("");

    setPaymentSuccess(false);

    setTimeLeft(120);

    balloonsU();
  };

  /* =========================
      COMPLETE ORDER
  ========================= */

  const completeOrder = () => {
    const orderId = `ORD-${Date.now()}`;

    const purchaseDetails = {
      orderId,
      date: new Date().toLocaleString(),
      items: [...cart],
      totalPrice: netAmount.toFixed(2),
    };

    dispatch(addOrder(purchaseDetails));

    dispatch(clearCart());

    setPaymentSuccess(true);

    balloonsU();

    const templateParams = {
      order_id: orderId,

      orders: cart.map((item) => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
      })),

      cost: {
        shipping: 50,
        tax: taxAmount.toFixed(2),
        total: netAmount.toFixed(2),
      },

      email: customerEmail,
    };

    emailjs
      .send(
        "service_tv1ygb9",
        "template_seztccr",
        templateParams,
        "eAyVrUuiV7K1BqtOi",
      )
      .then(() => {
        toast.success("Payment Successful! Email sent.");
      })
      .catch((error) => {
        console.log(error);

        toast.error("Email sending failed");
      });
  };

  /* =========================
      JSX
  ========================= */

  return (
    <div className="main-cart-page">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* TOP HEADER */}

      <div className="cart-top">
        <button className="clear-btn" onClick={notification}>
          Clear Cart
        </button>
      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart-container">
            <video autoPlay loop muted playsInline className="empty-cart-video">
              <source src="/nonVegItems/3DChefDancing.mp4" type="video/mp4" />
            </video>

            <h2>Your Cart is Empty 🍔</h2>

            <p>Add delicious food items to continue shopping</p>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          {/* LEFT SECTION */}

          <div className="cart-left">
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-card">
                  {/* IMAGE */}

                  <img src={item.image} alt={item.name} className="cart-img" />

                  {/* CENTER */}

                  <div className="cart-center">
                    <h3>{item.name}</h3>

                    <p className="cart-weight">
                      1 pack ({item.quantity * 100} g)
                    </p>
                  </div>

                  {/* RIGHT */}

                  <div className="cart-right-section">
                    {/* QUANTITY */}

                    <div className="qty-box">
                      <button onClick={() => dispatch(decrementQty(item))}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => dispatch(incrementQty(item))}>
                        +
                      </button>
                    </div>

                    {/* PRICE */}

                    <div className="price-section">
                      <span className="old-price">
                        ₹{(item.price + 20).toFixed(2)}
                      </span>

                      <span className="new-price">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* REMOVE */}

                    <button
                      className="remove-btn"
                      onClick={() => {
                        dispatch(removeCart(item));

                        toast.error("Item removed!");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SUMMARY */}

          <div className="cart-summary">
            <div className="summary-box">
              <h3>Cart Summary</h3>

              <div className="summary-row">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="summary-row">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* DISCOUNT BUTTONS */}

              <div className="discount-buttons">
                <button
                  onClick={() => {
                    setDiscount(10);

                    toast.success("10% Discount Applied!");

                    balloonsU();
                  }}
                >
                  10%
                </button>

                <button
                  onClick={() => {
                    setDiscount(20);

                    toast.success("20% Discount Applied!");

                    balloonsU();
                  }}
                >
                  20%
                </button>

                <button
                  onClick={() => {
                    setDiscount(30);

                    toast.success("30% Discount Applied!");

                    balloonsU();
                  }}
                >
                  30%
                </button>
              </div>

              {/* COUPON */}

              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button
                className="apply-btn"
                onClick={() => {
                  dispatch(applyCoupon(coupon));

                  toast.success("Coupon Applied!");

                  balloonsU();
                }}
              >
                Apply Coupon
              </button>

              {/* REMOVE COUPON */}

              {applied && (
                <button
                  className="remove-coupon-btn"
                  onClick={() => {
                    dispatch(resetCoupon());

                    toast.error("Coupon Removed!");
                  }}
                >
                  Remove Coupon
                </button>
              )}

              <p className="coupon-message">{message}</p>

              {/* SUMMARY */}

              <div className="summary-row">
                <span>Total Discount</span>
                <span>{totalDiscountPercent}%</span>
              </div>

              <div className="summary-row">
                <span>Discount Amount</span>

                <span>₹{discountAmount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (18%)</span>

                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              {/* NET AMOUNT */}

              <div className="net-amount">
                <span>Net Amount</span>

                <h2>₹{netAmount.toFixed(2)}</h2>
              </div>

              {/* EMAIL */}

              <label className="email-label">📧 Enter your Gmail</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />

              {/* CHECKOUT */}

              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>

              {/* PAYMENT POPUP */}

              {showPaymentPopup && (
                <div className="payment-popup-overlay">
                  <div className="payment-popup">
                    <button
                      className="close-popup"
                      onClick={() => {
                        setShowPaymentPopup(false);

                        setPaymentMethod("");
                      }}
                    >
                      ✖
                    </button>

                    <Payment
                      netAmount={netAmount}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      timeLeft={timeLeft}
                      paymentSuccess={paymentSuccess}
                      setPaymentSuccess={setPaymentSuccess}
                      completeOrder={completeOrder}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
