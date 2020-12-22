const io = require("socket.io-client")

export const socket = io('http://192.168.43.38:3000', {
  transports: ['websocket'],
});

export default socket;