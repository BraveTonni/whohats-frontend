import PhoneIcon from "@mui/icons-material/Phone";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { toast } from "react-toastify";
import WebSocketService from "../../../services/WebSocketService";
import { useEffect, useRef } from "react";

export default function OutgoingCall({ setCallType }) {
  const audioRef = useRef(null);

  const stopRingtone = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = "";
      audioRef.current = null;
    }
  };

  const cancelCall = () => {
    WebSocketService.send({
      type: "webrtc",
      params: { action: "call_end" }
    });
    setCallType("");
    stopRingtone();
    toast("Звонок отменён", { type: "error" });
  };

  useEffect(() => {
    let unsubscribeWebrtc = null;

    const audio = new Audio("/request_call.mp3");
    audio.loop = true;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("Не удалось воспроизвести исходящий звонок:", err);
        }
      });
    }

    return () => {
      stopRingtone();
    };
  }, [setCallType]);

  return (
    <div className="flex fixed inset-0 bg-linear-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm items-center justify-center z-50">
      <div className="bg-linear-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center border border-white/20 shadow-2xl shadow-black/50 animate-float">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full animate-pulse [animation-duration:2s]"></div>
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-linear-to-r from-green-400 to-emerald-500 rounded-full shadow-lg flex items-center justify-center animate-bounce">
            <PhoneIcon className="text-white text-4xl" />
          </div>
        </div>

        <h3 className="text-white text-2xl font-black mb-3 bg-linear-to-r from-white to-gray-200 bg-clip-text drop-shadow-lg">
          Звоним анониму
        </h3>

        <p className="text-gray-300 text-lg mb-8 font-medium leading-relaxed">
          Ожидайте, пока он примет звонок
        </p>

        <div className="flex items-center justify-center gap-8">
          <button
            className="group relative bg-linear-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-red-500/50 hover:shadow-red-500/75 transform hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer font-semibold text-lg flex items-center gap-3 overflow-hidden"
            onClick={cancelCall}
          >
            <span className="relative z-10 flex items-center gap-2">
              Отменить
              <CallEndIcon className="text-xl" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}