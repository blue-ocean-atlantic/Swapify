import { io } from 'socket.io-client';

const socket = io({ autoConnect: false });

console.log('socket is imported')

export default socket;