const io = require("socket.io-client")

// export const socket = io('http://192.168.8.100:3000', {
//   transports: ['websocket'],
// });

export const socket = io('http://192.168.1.8:3000', {
  transports: ['websocket'],
});

export default socket;