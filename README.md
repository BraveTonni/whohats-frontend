# WhoHats frontend

React client for WhoHats — random text and video chat with a partner.

## Stack

- React 19, Vite, Tailwind CSS
- WebSocket for messages, WebRTC for audio and video calls

## Run

```
npm install
npm run dev     # dev server
npm run build   # production build
npm run lint    # eslint
```

## Layout

```
src/services   # websocket and webrtc clients
src/components # layout, chat and call ui
src/pages      # partner search, rules, root
src/features   # settings controls and theme toggle
```
