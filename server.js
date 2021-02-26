const Websocket = require('ws');

const wss = new Websocket.Server({
    port: 8230,
});

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({
        type: 'welcome',
        message : 'welcome to server'
    }));
    console.log('client connection');

    ws.on('message', (data) => {
        /*
        let payload;

        try {
            payload = JSON.parse(data);
        } catch (e) {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === Websocket.OPEN) {
                    client.send(data);
                }
            });
            sendError(ws, e.message);
        }
        */

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === Websocket.OPEN) {
                client.send(data);
            }
        });

    })

});

const sendError = (ws, message) => {
    const messageObj = {
        type: 'error',
        message: message,
    };
    ws.send(JSON.stringify(messageObj));
    console.log(`[error] ${message} `);
}

console.log('server running in port 8230 ....');