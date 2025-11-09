import Chatting from "../FindPartner/Chatting";
import FindPartner from "../FindPartner/FindPartner";

import WebSocketService from "../../services/WebSocketService";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export default function Root() {
  const [chattingComponent, setChattingComponent] = useState(false);

  WebSocketService.subscribe("partner_find", () => setChattingComponent(true));

  return chattingComponent ? (
    <Chatting setChattingComponent={setChattingComponent} />
  ) : (
    <FindPartner />
  );
}
