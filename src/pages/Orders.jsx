import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../features/ordersSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import "./Orders.css";

function Orders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // Pick the latest order for real-time tracking
  const activeOrder = orders.length > 0 ? orders[orders.length - 1] : null;
  
  const [chatMessage, setChatMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeOrder?.chatHistory, isTyping]);

  // Real-time Status and Chat Simulation Agent
  useEffect(() => {
    if (!activeOrder) return;
    if (activeOrder.status === "Delivered") return;

    const orderId = activeOrder.orderId;
    let timer;

    // Helper to push chat messages and trigger toasts
    const pushSimulatedMessage = (sender, text, avatar, newStatus, newProgress) => {
      const updatedChat = [
        ...(activeOrder.chatHistory || []),
        { id: Date.now(), sender, text, avatar, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ];
      
      dispatch(updateOrderStatus({
        orderId,
        status: newStatus,
        deliveryProgress: newProgress,
        chatHistory: updatedChat
      }));

      // Trigger dynamic toast notification
      if (newStatus === "Preparing") {
        toast.info("👨‍🍳 Chef Sandy has started preparing your food!", { theme: "colored" });
      } else if (newStatus === "Dispatched") {
        toast.warn("🛵 Your order is out for delivery with Rahul!", { theme: "colored" });
      } else if (newStatus === "Delivered") {
        toast.success("🎉 Order delivered! Enjoy your meal!", { theme: "colored" });
        // Launch celebrate confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    };

    // Simulate real-time progress steps
    const currentStatus = activeOrder.status;

    if (currentStatus === "Placed") {
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          pushSimulatedMessage(
            "Chef Sandy 👨‍🍳",
            "Hey! I'm Chef Sandy. I just received your order and I'm prepping it right now with fresh ingredients! 🍳",
            "👨‍🍳",
            "Preparing",
            35
          );
        }, 3000);
      }, 5000);
    } else if (currentStatus === "Preparing") {
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          pushSimulatedMessage(
            "Chef Sandy 👨‍🍳",
            "Your food is cooked fresh, packaged piping hot, and handed over to Rahul for delivery! 📦🔥",
            "👨‍🍳",
            "Preparing",
            60
          );
        }, 3000);
      }, 12000);
    } else if (currentStatus === "Preparing" && activeOrder.deliveryProgress === 60) {
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          pushSimulatedMessage(
            "Rahul (Driver) 🛵",
            "Hi there! I'm Rahul, your delivery partner. I've picked up your warm package and I'm zooming towards you! 🛵💨",
            "🛵",
            "Dispatched",
            75
          );
        }, 3000);
      }, 10000);
    } else if (currentStatus === "Dispatched") {
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          pushSimulatedMessage(
            "Rahul (Driver) 🛵",
            "Passing through the main bypass street now! Traffic is light, estimated arrival is in 2 minutes. 🚦🚗",
            "🛵",
            "Dispatched",
            90
          );
        }, 3000);
      }, 12000);
    } else if (currentStatus === "Dispatched" && activeOrder.deliveryProgress === 90) {
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          pushSimulatedMessage(
            "Rahul (Driver) 🛵",
            "I've arrived outside your gate! Please collect your warm meal. Enjoy your delicious food! 🍔🍟✨",
            "🛵",
            "Delivered",
            100
          );
        }, 3000);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [activeOrder?.status, activeOrder?.deliveryProgress, dispatch]);

  // Handle customer typing and sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim() || !activeOrder) return;

    const customerMsg = {
      id: Date.now(),
      sender: "You 👤",
      text: chatMessage,
      avatar: "👤",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedChat = [...(activeOrder.chatHistory || []), customerMsg];
    dispatch(updateOrderStatus({
      orderId: activeOrder.orderId,
      chatHistory: updatedChat
    }));

    const textToSend = chatMessage;
    setChatMessage("");

    // Simulate realistic response from Rahul or Chef after a short delay
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let replyText = "Received! Let me know if you need anything else.";
        let senderName = "Rahul (Driver) 🛵";
        let senderAvatar = "🛵";

        if (activeOrder.status === "Preparing") {
          senderName = "Chef Sandy 👨‍🍳";
          senderAvatar = "👨‍🍳";
        }

        const lowerMsg = textToSend.toLowerCase();
        if (lowerMsg.includes("hot") || lowerMsg.includes("fresh")) {
          replyText = "Absolutely, cooking it fresh and keeping it insulated in my delivery bag! 🔥";
        } else if (lowerMsg.includes("gate") || lowerMsg.includes("door")) {
          replyText = "Got it! I will leave it at your gate/door as requested. 👍";
        } else if (lowerMsg.includes("ketchup") || lowerMsg.includes("sauce") || lowerMsg.includes("extra")) {
          replyText = "Sure, I'll make sure to get some extra condiments packed for you! 🍅🍟";
        } else if (lowerMsg.includes("hurry") || lowerMsg.includes("fast") || lowerMsg.includes("quick")) {
          replyText = "Navigating as fast and safely as possible. I'm on my way! ⚡🛵";
        } else {
          replyText = `Understood! I'm on it. Current order status is: ${activeOrder.status}.`;
        }

        const replyMsg = {
          id: Date.now(),
          sender: senderName,
          text: replyText,
          avatar: senderAvatar,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        dispatch(updateOrderStatus({
          orderId: activeOrder.orderId,
          chatHistory: [...updatedChat, replyMsg]
        }));
      }, 2000);
    }, 1500);
  };

  // Re-run the active order demo for testing
  const resetDemo = () => {
    if (!activeOrder) return;
    Swal.fire({
      title: "Restart Simulation?",
      text: "This will reset the real-time order tracking and chat log for this order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reset",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff7300",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateOrderStatus({
          orderId: activeOrder.orderId,
          status: "Placed",
          deliveryProgress: 10,
          chatHistory: []
        }));
        toast.info("Real-time simulation restarted!");
      }
    });
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <video autoPlay loop muted playsInline className="empty-orders-video">
            <source src="/nonVegItems/Sandy.mp4" type="video/mp4" />
          </video>
          <h2>No Orders Found 🍔</h2>
          <p>Go ahead, place a delicious food order to track it in real-time!</p>
        </div>
      ) : (
        <div className="orders-grid">
          {/* ACTIVE TRACKING INTERFACE */}
          {activeOrder && (
            <div className="tracking-section">
              <div className="card tracking-card">
                <div className="card-header-live">
                  <div className="live-pill">
                    <span className="live-dot"></span> Live Tracking
                  </div>
                  <span className="order-number">Order ID: {activeOrder.orderId}</span>
                  <button className="reset-demo-btn" onClick={resetDemo} title="Restart Tracking Demo">
                    🔄 Restart Demo
                  </button>
                </div>

                {/* VISUAL COUNTDOWN */}
                <div className="countdown-container">
                  <div className="time-remaining">
                    <h3>
                      {activeOrder.status === "Placed" && "⌛ Placing Order..."}
                      {activeOrder.status === "Preparing" && "🍳 Sandy is Cooking..."}
                      {activeOrder.status === "Dispatched" && "🛵 Rahul is Racing..."}
                      {activeOrder.status === "Delivered" && "🎉 Food has Arrived!"}
                    </h3>
                    <p className="est-arrival">
                      {activeOrder.status !== "Delivered" ? (
                        <>Est. Delivery: <strong>{Math.max(2, Math.ceil((100 - activeOrder.deliveryProgress) / 5))} mins</strong></>
                      ) : (
                        <strong>Delivered Successfully</strong>
                      )}
                    </p>
                  </div>
                  <div className="progress-percentage">{activeOrder.deliveryProgress}%</div>
                </div>

                {/* PREMIUM PROGRESS timeline */}
                <div className="timeline-container">
                  <div className="timeline-track">
                    <div 
                      className="timeline-progress-bar" 
                      style={{ width: `${activeOrder.deliveryProgress}%` }}
                    ></div>
                  </div>
                  <div className="timeline-milestones">
                    <div className={`milestone ${activeOrder.deliveryProgress >= 10 ? "active" : ""}`}>
                      <div className="milestone-icon">📝</div>
                      <span>Placed</span>
                    </div>
                    <div className={`milestone ${activeOrder.deliveryProgress >= 35 ? "active" : ""}`}>
                      <div className="milestone-icon">🍳</div>
                      <span>Preparing</span>
                    </div>
                    <div className={`milestone ${activeOrder.deliveryProgress >= 75 ? "active" : ""}`}>
                      <div className="milestone-icon">🛵</div>
                      <span>Dispatched</span>
                    </div>
                    <div className={`milestone ${activeOrder.deliveryProgress === 100 ? "active" : ""}`}>
                      <div className="milestone-icon">🎁</div>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* STREET MAP SVG SCOOTER ANIMATION */}
                <div className="map-simulation">
                  <svg className="map-svg" viewBox="0 0 500 120">
                    {/* Curly Delivery Path */}
                    <path 
                      id="delivery-path"
                      className="map-path-bg"
                      d="M 30,60 C 130,10 200,110 320,60 C 380,30 420,90 470,60"
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="6" 
                      strokeLinecap="round"
                    />
                    <path 
                      className="map-path-active"
                      d="M 30,60 C 130,10 200,110 320,60 C 380,30 420,90 470,60"
                      fill="none" 
                      stroke="#ff7300" 
                      strokeWidth="6" 
                      strokeDasharray="600"
                      strokeDashoffset={600 - (600 * activeOrder.deliveryProgress) / 100}
                      strokeLinecap="round"
                    />

                    {/* Restaurant Building Icon */}
                    <g transform="translate(15, 40)">
                      <circle cx="15" cy="20" r="18" fill="#7e22ce" />
                      <text x="15" y="24" fontSize="16" textAnchor="middle">🏪</text>
                    </g>

                    {/* Customer House Icon */}
                    <g transform="translate(450, 40)">
                      <circle cx="15" cy="20" r="18" fill="#10b981" />
                      <text x="15" y="24" fontSize="16" textAnchor="middle">🏠</text>
                    </g>

                    {/* Scooter Delivery Boy Moving along Path */}
                    <g className="scooter-rider" style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      offsetPath: "path('M 30,60 C 130,10 200,110 320,60 C 380,30 420,90 470,60')",
                      offsetDistance: `${activeOrder.deliveryProgress}%`,
                      transition: "offset-distance 0.8s linear"
                    }}>
                      <circle cx="0" cy="0" r="14" fill="#ff7300" stroke="white" strokeWidth="2" />
                      <text x="0" y="5" fontSize="13" textAnchor="middle">🛵</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* LIVE DRIVER/CHEF CHAT */}
              <div className="card chat-card">
                <div className="chat-header">
                  <div className="chat-title">
                    <span className="chat-dot"></span> Live Support Chat
                  </div>
                  <span className="chat-agent">Sandy & Rahul</span>
                </div>
                
                <div className="chat-body">
                  {(!activeOrder.chatHistory || activeOrder.chatHistory.length === 0) ? (
                    <div className="chat-empty">
                      <p>Connecting to kitchen and driver support... 🔌</p>
                    </div>
                  ) : (
                    activeOrder.chatHistory.map((msg) => (
                      <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender === "You 👤" ? "outgoing" : "incoming"}`}>
                        <div className="chat-avatar">{msg.avatar}</div>
                        <div className="chat-bubble">
                          <span className="sender">{msg.sender}</span>
                          <p>{msg.text}</p>
                          <span className="time">{msg.time}</span>
                        </div>
                      </div>
                    ))
                  )}

                  {isTyping && (
                    <div className="chat-bubble-wrapper incoming">
                      <div className="chat-avatar">💬</div>
                      <div className="chat-bubble typing-bubble">
                        <span className="typing-dots">
                          <span>.</span><span>.</span><span>.</span>
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="chat-footer">
                  <input 
                    type="text" 
                    placeholder="Type a message to Rahul..." 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    disabled={activeOrder.status === "Delivered"}
                  />
                  <button type="submit" disabled={!chatMessage.trim() || activeOrder.status === "Delivered"}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ORDERS HISTORY LIST */}
          <div className="history-section">
            <h3 className="section-title">Order History ({orders.length})</h3>
            <ol className="orders-list">
              {[...orders].reverse().map((order) => (
                <li key={order.orderId} className={`order-card ${order.orderId === activeOrder?.orderId ? "active-order-highlight" : ""}`}>
                  <div className="history-header">
                    <span className="hist-id">Order: #{order.orderId.split("-")[1] || order.orderId}</span>
                    <span className={`hist-status-badge ${order.status?.toLowerCase() || "placed"}`}>
                      {order.status || "Placed"}
                    </span>
                  </div>

                  <p className="order-date">
                    <strong>Date:</strong> {order.date}
                  </p>

                  <ul className="items-list">
                    {order.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="item">
                        🍽️ {item.name} - ₹{item.price} x {item.quantity}
                      </li>
                    ))}
                  </ul>

                  <p className="order-total">Total Price: ₹{order.totalPrice}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
