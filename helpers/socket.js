const io = require("socket.io-client")

export const socket = io('https://tetonggoapi.herokuapp.com/', {
  transports: ['websocket'],
});

export default socket;