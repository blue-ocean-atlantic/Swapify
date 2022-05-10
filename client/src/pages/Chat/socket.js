import { io } from 'socket.io-client';

const socket = io();

console.log('socket is imported')

export default socket;