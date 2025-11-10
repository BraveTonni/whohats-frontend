import { useEffect, useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import WebSocketMessages from "../../../services/WebSocketMessages";
import { toast } from "react-toastify";
import WebSocketService from "../../../services/WebSocketService";
import WebRTCService from "../../../services/WebRTCService";

export default function CommunicationCall({ setCallType }) {
  const [isMuted, setIsMuted] = useState(false);

  const endCall = () => {
    WebSocketMessages.endCall();
    WebRTCService.stop();
    setCallType("");
    toast("Звонок завершён", { type: "error", toastId: "call-ended" });
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (newMuted) {
      WebRTCService.mute()
    } else {
      WebRTCService.unmute()
    }

    toast(newMuted ? "Микрофон выключен" : "Микрофон включён", {
      type: newMuted ? "error" : "success",
    });
  };

  useEffect(() => {
    WebRTCService.start();
  }, []);

  return (
    <div className="flex fixed inset-0 bg-linear-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm items-center justify-center z-50">
      <audio id="localAudio" muted autoPlay playsInline></audio>
      {/* Local Audio */}
      <audio id="RemoteAudio" autoPlay playsInline></audio>
      {/* Remote Audio */}
      <div className="bg-linear-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center border border-white/20 shadow-2xl shadow-black/50 animate-float">
        <div className="mb-6">
          <div className="inset-0 w-24 h-24 mx-auto bg-linear-to-r from-green-400 to-emerald-500 rounded-full shadow-lg flex items-center justify-center">
            <PhoneIcon className="text-white text-4xl" />
          </div>
        </div>

        <h3 className="text-white text-2xl font-black mb-3 bg-linear-to-r from-white to-gray-200 bg-clip-text drop-shadow-lg">
          Звонок с анонимом
        </h3>
        <p className="text-gray-300 text-lg mb-8 font-medium leading-relaxed">
          Говорите, вы соединены!
        </p>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={endCall}
            className="group relative bg-linear-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-red-500/50 hover:shadow-red-500/75 transform hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer font-semibold text-lg flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <CallEndIcon className="text-xl" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={toggleMute}
            className={`group relative p-4 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isMuted
                ? "bg-red-600/80 shadow-red-500/50"
                : "bg-gray-700/80 shadow-gray-500/50"
            } shadow-lg hover:shadow-xl`}
          >
            {isMuted ? (
              <MicOffIcon className="text-white text-2xl" />
            ) : (
              <MicIcon className="text-white text-2xl" />
            )}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
