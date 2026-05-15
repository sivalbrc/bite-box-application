import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  incrementQty,
  decrementQty,
  clearCart,
  removeCart,
} from "../features/cartSlice";

import { applyCoupon, resetCoupon } from "../features/couponSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import Payment from "./Payment";

import "./Cart.css";

function Cart() {
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cart = useSelector((state) => state.cart);

  const {
    applied,
    message,
    discount: couponDiscount,
  } = useSelector((state) => state.coupon);

  const dispatch = useDispatch();

  /* ===== TOTAL ===== */
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* =========================
      SEPARATE DISCOUNTS
     ========================= */

  const buttonDiscount = discount; // local state
  const couponDisc = applied ? couponDiscount || 0 : 0;

  /*  COMBINE BOTH (NO RELATION, JUST ADD) */
  const totalDiscountPercent = buttonDiscount + couponDisc;

  const discountAmount = (total * totalDiscountPercent) / 100;
  const afterDiscount = total - discountAmount;

  const taxAmount = (afterDiscount * 18) / 100;
  const netAmount = afterDiscount + taxAmount;

  let notification = () => {
    Swal.fire({
      icon: "warning",
      title: "Clear Cart?",
      text: "Are you sure you want to remove all items?",
      showCancelButton: true,

      confirmButtonText: "Yes, Clear",
      cancelButtonText: "No, Cancel",

      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      // ONLY CLEAR WHEN CONFIRMED
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

      // CANCEL = DO NOTHING
    });
  };

  function balloonsU(duration = 5000) {
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 20,
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
  //----------------------------------------------------
  //Timer logic for payment popup
  //----------------------------------------------------
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
  //---------------------------------------------------
  //payemt auto close logic
  /////----------------------------------------------
  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        setShowPaymentPopup(false);
        setPaymentMethod("");
      }, 2000);
    }
  }, [paymentSuccess]);

  return (
    <div className="main-cart-page">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* HEADER */}
      <div className="cart-top">
        {/* <button
  className="clear-btn"
  onClick={() => {
    dispatch(clearCart());
    notification();
  }}
>
  Clear Cart
</button> */}
        <button className="clear-btn" onClick={notification}>
          Clear Cart
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <div className="cart-layout">
          {/* LEFT */}
          <div className="cart-left">
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-card">
                  <img src={item.image} alt={item.name} className="cart-img" />

                  <div className="cart-center">
                    <h3>{item.name}</h3>
                    <p className="cart-weight">
                      1 pack ({item.quantity * 100} g)
                    </p>
                  </div>

                  <div className="cart-right-section">
                    <div className="qty-box">
                      <button onClick={() => dispatch(decrementQty(item))}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(incrementQty(item))}>
                        +
                      </button>
                    </div>

                    <div className="price-section">
                      <span className="old-price">
                        ₹{(item.price + 20).toFixed(2)}
                      </span>
                      <span className="new-price">
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => {
                        dispatch(removeCart(item));
                        toast.error("Item removed from cart!");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
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

              {/* BUTTON DISCOUNT (ONLY UI) */}
              {/* <div className="discount-buttons">
                <button onClick={() => setDiscount(10)}>10%</button>
                <button onClick={() => setDiscount(20)}>20%</button>
                <button onClick={() => setDiscount(30)}>30%</button>
              </div> */}
              <div className="discount-buttons">
                <button
                  onClick={() => {
                    setDiscount(10);
                    toast.success("10% Discount Applied!");
                    balloonsU(5000);
                  }}
                >
                  10%
                </button>
                <button
                  onClick={() => {
                    setDiscount(20);
                    toast.success("20% Discount Applied!");
                    balloonsU(5000);
                  }}
                >
                  20%
                </button>
                <button
                  onClick={() => {
                    setDiscount(30);
                    toast.success("30% Discount Applied!");
                    balloonsU(5000);
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

              {/* <button onClick={() => {dispatch(applyCoupon(coupon));toast.success("Coupon applied successfully!");}}>
                Apply Coupon
             </button> */}
              <button
                onClick={() => {
                  dispatch(applyCoupon(coupon));

                  toast.success("Coupon applied successfully!");

                  balloonsU(5000);
                }}
              >
                Apply Coupon
              </button>

              {applied && (
                <button
                  onClick={() => {
                    dispatch(resetCoupon());
                    toast.error("Coupon removed!");
                  }}
                >
                  Remove Coupon
                </button>
              )}

              <p>{message}</p>

              {/* DISCOUNT BREAKDOWN */}
              <div className="summary-row">
                <span>Button Discount</span>
                <span>{buttonDiscount}%</span>
              </div>

              <div className="summary-row">
                <span>Coupon Discount</span>
                <span>{couponDisc}%</span>
              </div>

              <div className="summary-row">
                <span>Total Discount</span>
                <span>{totalDiscountPercent}%</span>
              </div>

              <div className="summary-row">
                <span>Discount Amount</span>
                <span>₹{discountAmount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>After Discount</span>
                <span>₹{afterDiscount.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (18%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>

              <div className="net-amount">
                <span>Net Amount</span>
                <h2>₹{netAmount.toFixed(2)}</h2>
              </div>

              {/* <button className="checkout-btn">Proceed to Checkout</button>
              <Payment
  netAmount={netAmount}
  paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}
/> */}
              <button
                className="checkout-btn"
                onClick={() => {
                  setShowPaymentPopup(true);
                  setPaymentMethod("");
                  setPaymentSuccess(false);
                  setTimeLeft(120);
                  balloonsU(5000);
                }}
              >
                Proceed to Checkout
              </button>
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
