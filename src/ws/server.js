import {websocketServer,websocket} from './ws/server.js';

/**
 * Sends a JSON message on an open socket.
 * @param {WebSocket} socket - The socket to send the message through.
 * @param {*} payload - The value to serialize and send.
 */
function sendJson(socket, payload) {
    if(socket.readyState !== socket.OPEN) return;

    socket.send(JSON.stringify(payload));
}

/**
 * Broadcasts a JSON payload to connected WebSocket clients.
 * Stops when it encounters a client that is not open.
 * @param {WebSocketServer} wss - The WebSocket server instance.
 * @param {*} payload - The message payload to send.
 */
function broadcast(wss,payload) {
    for(const client of wss.clients){
        if(client.readyState !== websocket.OPEN) return;
        client.sendJson(client, payload);
    }
}
/**
 * Attaches a WebSocket server to an HTTP server.
 * @param {import('http').Server} server - The server to bind the WebSocket server to.
 * @return {{ broadcastMatchCreated(match: any): void }} An object with a method for broadcasting match creation events.
 */
export function attachWebSocketServer(server) {
    const wss = new websocketServer({ server,path:"/ws",maxPayload: 1024 * 1024 * 1});
    wss.on('connection', (socket) => {
        sendJson(socket, { type: 'welcome' });
        socket.on('error', console.error);
    });

    function broadcastMatchCreated(match) {
        broadcast(wss, { type: 'match_created', data: match });
    }
    return {broadcastMatchCreated};
}
