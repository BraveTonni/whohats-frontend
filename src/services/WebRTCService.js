import WebSocketService from "./WebSocketService";

class WebRTCService {
  constructor() {
    this.pc = null;
    this.localStream = null;
    this.localAudio = null;
    this.remoteAudio = null;
    this.audioTracks = [];

    WebSocketService.subscribe(
      "webrtc",
      async (event) => await this.handleMessage(JSON.parse(event.data))
    );
  }

  async waitForAudioElements() {
    return new Promise((resolve) => {
      const checkElements = () => {
        this.localAudio = document.getElementById("localAudio");
        this.remoteAudio = document.getElementById("remoteAudio");

        if (this.localAudio && this.remoteAudio) {
          resolve();
        } else {
          setTimeout(checkElements, 100);
        }
      };
      checkElements();
    });
  }

  async initializePeerConnection() {
    if (!this.pc) {
      this.pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302"
          }
        ]
      });

      // ICE кандидаты
      this.pc.onicecandidate = (event) => {
        if (event.candidate) {
          WebSocketService.send({
            type: "webrtc",
            params: { ice: event.candidate },
          });
        }
      };

      // Получение удаленного потока
      this.pc.ontrack = (event) => {
        if (this.remoteAudio) {
          this.remoteAudio.srcObject = event.streams[0];
        }
      };
    }
  }

  async handleMessage(data) {
    if (data.type === "webrtc") {
      const params = data.params || {};

      if (params.sdp) {
        await this.handleSDP(params.sdp);
      } else if (params.ice) {
        await this.handleICE(params.ice);
      }
    }
  }

  async handleSDP(sdp) {
    await this.initializePeerConnection();

    await this.pc.setRemoteDescription(sdp);
    if (sdp.type === "offer") {
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);
      WebSocketService.send({
        type: "webrtc",
        params: { sdp: this.pc.localDescription },
      });
    }
  }

  async handleICE(ice) {
    if (!this.pc) {
      await this.initializePeerConnection();
    }

    try {
      await this.pc.addIceCandidate(ice);
    } catch (e) {
      console.error("Error adding received ice candidate", e);
    }
  }

  async start() {
    await this.waitForAudioElements();

    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    
    // Сохраняем аудио треки для управления
    this.audioTracks = this.localStream.getAudioTracks();
    
    this.localAudio.srcObject = this.localStream;

    await this.initializePeerConnection();

    // Добавляем локальный аудио-трек
    this.localStream
      .getTracks()
      .forEach((track) => this.pc.addTrack(track, this.localStream));

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    WebSocketService.send({
      type: "webrtc",
      params: { sdp: this.pc.localDescription },
    });
  }

  mute() {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = false;
      });
    }
    console.log("muted");
  }

  unmute() {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = true;
      });
    }
    console.log("unmuted");
  }

  stop() {
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
      this.audioTracks = [];
    }
  }
}

export default new WebRTCService();