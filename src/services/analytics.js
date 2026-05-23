// Analytics and Logging Service
class AnalyticsService {
  constructor() {
    this.logs = [];
    this.maxLogs = 100;
    this.initializeLogs();
  }

  initializeLogs() {
    try {
      const savedLogs = localStorage.getItem("bitebox_logs");
      this.logs = savedLogs ? JSON.parse(savedLogs) : [];
    } catch (error) {
      console.error("Failed to load logs:", error);
      this.logs = [];
    }
  }

  log(event, data = {}, level = "info") {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      level,
      userAgent: navigator.userAgent,
    };

    this.logs.push(logEntry);

    // Keep only last 100 logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    this.persistLogs();

    if (level === "error") {
      console.error(`[${event}]`, data);
    } else if (level === "warn") {
      console.warn(`[${event}]`, data);
    } else {
      console.log(`[${event}]`, data);
    }
  }

  trackEvent(eventName, eventData = {}) {
    this.log(`EVENT: ${eventName}`, eventData, "info");
  }

  trackError(errorName, errorData = {}) {
    this.log(`ERROR: ${errorName}`, errorData, "error");
  }

  trackPageView(pageName) {
    this.log(`PAGE_VIEW: ${pageName}`, { page: pageName }, "info");
  }

  trackCartAction(action, data = {}) {
    this.log(`CART: ${action}`, data, "info");
  }

  trackOrderAction(action, data = {}) {
    this.log(`ORDER: ${action}`, data, "info");
  }

  trackPaymentAction(action, data = {}) {
    this.log(`PAYMENT: ${action}`, { ...data, status: "processing" }, "info");
  }

  persistLogs() {
    try {
      localStorage.setItem("bitebox_logs", JSON.stringify(this.logs));
    } catch (error) {
      console.error("Failed to persist logs:", error);
    }
  }

  getLogs(filter = null) {
    if (!filter) {
      return this.logs;
    }

    return this.logs.filter(
      (log) =>
        log.event.includes(filter) ||
        log.level === filter
    );
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem("bitebox_logs");
  }

  getStats() {
    return {
      totalLogs: this.logs.length,
      errorCount: this.logs.filter((l) => l.level === "error").length,
      warningCount: this.logs.filter((l) => l.level === "warn").length,
      infoCount: this.logs.filter((l) => l.level === "info").length,
      lastLog: this.logs[this.logs.length - 1],
    };
  }

  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bitebox_logs_${new Date().toISOString()}.json`;
    link.click();
  }
}

export const analytics = new AnalyticsService();
export default AnalyticsService;
