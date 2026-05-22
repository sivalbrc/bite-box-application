import React from "react";
import {QRCode} from "react-qr-code";
import "./Payment.css";
function Payment({
  netAmount,
  paymentMethod,
  setPaymentMethod,
  timeLeft,
  paymentSuccess,
  setPaymentSuccess,
  completeOrder,
}) {
  return (
    <div className="payment-method">
      <h3>💳 Select Payment Method:</h3>

      <button onClick={() => setPaymentMethod("qr")}>
        📱 QR Code
      </button>

      <button onClick={() => setPaymentMethod("card")}>
        💳 Card
      </button>

      {paymentMethod === "qr" && (
        <div className="qr-section">
          <h4>Scan UPI QR to Pay ₹{netAmount.toFixed(2)}</h4>

          <p style={{ color: timeLeft <= 10 ? "red" : "green" }}>
            ⏱ Time Left: {timeLeft}s
          </p>

          {timeLeft > 0 ? (
            <QRCode
              value={`upi://pay?pa=vedurusivaprasadreddy@ibl&pn=BiteBOx&am=${netAmount.toFixed(
                2
              )}&cu=INR`}
            />
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>
              QR Expired. Please retry payment.
            </p>
          )}

          <button
            onClick={() => {
              setPaymentSuccess(true);
              completeOrder();
            }}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            I have Paid
          </button>

          {paymentSuccess && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✅ Payment Successfully Done!
            </p>
          )}

          <p>UPI ID: vedurusivaprasadreddy@ibl</p>
        </div>
      )}
    </div>
  );
}

export default Payment;