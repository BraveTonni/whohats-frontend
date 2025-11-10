import WebSocketService from "../../../services/WebSocketService";
import WebRTCService from "../../../services/WebRTCService";
import CommunicationCall from "./CommunicationCall";
import IncomingCall from "./IncomingCall";
import OutgoingCall from "./OutgoingCall";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export default function Call({ callType, setCallType, isInitiator }) {
  useEffect(() => {
    const handleSignal = (data) => {
      if (data.params?.action === "incoming_call_request") {
        setCallType("incoming");
      } else if (data.params?.action === "call_accept") {
        setCallType("communication");
      } else if (data.params?.action === "call_decline") {
        setCallType("");
        toast("Звонок отклонён", { type: "error" });
      } else if (data.params?.action === "call_end") {
        setCallType("");
        WebRTCService.stop();
        toast("Звонок завершён", { type: "error" });
      }
    };

    // Устанавливаем обработчик состояния
    WebSocketService.subscribe("webrtc", handleSignal);

    // Отписываемся при размонтировании
    return () => {
      WebSocketService.unsubscribe(handleSignal);
    };
  }, []);

  if (callType === "incoming") {
    return <IncomingCall setCallType={setCallType} />;
  } else if (callType === "outgoing") {
    return <OutgoingCall setCallType={setCallType} />;
  } else if (callType === "communication") {
    return <CommunicationCall setCallType={setCallType} />;
  }

  return <></>;
}
