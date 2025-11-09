import WebSocketService from "./WebSocketService";

class WebSocketMessages {
  constructor(wsService) {
    this.wsService = wsService;
  }

  sendFindPartner(my_gender, my_age, companion_gender, companion_age) {
    this.wsService.send({
      type: "start_search",
      params: {
        my_gender,
        my_age,
        companion_gender,
        companion_age,
      },
    });
  }

  sendNewMessage(content) {
    this.wsService.send({
      type: "new_message",
      params: {
        content: content,
      },
    });
  }

  sendCall() {
    this.wsService.send({
      type: "webrtc",
      params: {
        action: "incoming_call_request",
      },
    });
  }

  acceptCall() {
    this.wsService.send({
      type: "webrtc",
      params: {
        action: "call_accept",
      },
    });
  }

  rejectCall() {
    this.wsService.send({
      type: "webrtc",
      params: {
        action: "call_decline",
      },
    });
  }

  endCall() {
    this.wsService.send({
      type: "webrtc",
      params: {
        action: "call_end",
      },
    });
  }

  endChat() {
    this.wsService.send({ type: "end" });
  }
}

export default new WebSocketMessages(WebSocketService);
