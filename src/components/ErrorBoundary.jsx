import React from "react";
import { toast } from "react-toastify";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    toast.error("Something went wrong. Please try again.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#ff7300",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <h2>Oops! Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() =>
              this.setState({ hasError: false, error: null })
            }
            style={{
              padding: "10px 20px",
              background: "#ff7300",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
