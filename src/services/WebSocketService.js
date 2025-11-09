class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = {};

    this.reconnectInterval = 1000;
    this.isManuallyClosed = false;
  }

  connect(url) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.warn("WebSocket is already connected.");
      return;
    }

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      this.isManuallyClosed = false;
      this.notifyListeners({ type: "open" });
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // set cookie
        if (data.type === "me") {
          document.cookie = `user_id=${data.params.my_id}; path=/; SameSite=Strict; Max-Age=3600`;
        } 
        
        this.notifyListeners(data);
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    this.ws.onclose = (event) => {
      const wasManual = this.isManuallyClosed;
      console.log(wasManual ? "WebSocket closed manually" : "WebSocket closed");

      this.notifyListeners({
        type: "close",
        code: event.code,
        reason: event.reason,
      });

      if (!wasManual) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.notifyListeners({ type: "error", error });
    };
  }

  scheduleReconnect() {
    console.log("Reconnecting...");
    setTimeout(() => {
      this.connect(this.ws.url);
    }, this.reconnectInterval);
  }

  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) this.listeners[eventType] = [];
    this.listeners[eventType].push(callback);
  }

  unsubscribe(eventType, callback) {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter(
        (cb) => cb !== callback
      );
    }
  }

  notifyListeners(data) {
    const { type } = data;
    const callbacks = this.listeners[type] || [];
    callbacks.forEach((cb) => cb(data));
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Cannot send data.");
    }
  }

  close() {
    this.isManuallyClosed = true;
    this.ws?.close();
  }

  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketService();
