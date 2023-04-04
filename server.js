const net = require('net');
const http = require('http');
const socketIO = require('socket.io');

const server = net.createServer((socket) => {
  console.log('Client connected');
  
  socket.on('data', (data) => {
    const { bpm, spo2 } = JSON.parse(data.toString());
    console.log(`Received data: BPM ${bpm}, SPO2 ${spo2}`);

    // Emitir dados para o cliente
    io.emit('data', { bpm, spo2 });
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});

// Criar servidor HTTP para o socket.io
const httpServer = http.createServer();
const io = socketIO(httpServer);

io.on('connection', (socket) => {
  console.log('Client connected to WebSocket');

  socket.on('disconnect', () => {
    console.log('Client disconnected from WebSocket');
  });
});

httpServer.listen(5001, () => {
  console.log('WebSocket server listening on port 5001');
});
