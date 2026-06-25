import {websocketServer,websocket} from './ws/server.js';

function sendJson(socket, payload) {
    if(socket.readyState !== socket.OPEN) return;

    socket.send(JSON.stringify(payload));
}

function broadcast(wss,payload) {
    for(const client of wss.clients){
        if(client.readyState !== websocket.OPEN) return;
        client.sendJson(client, payload);
    }
}
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
