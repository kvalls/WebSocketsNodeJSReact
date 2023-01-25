const express = require('express');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`Server started on port ${PORT}`);
});

let rooms = {};

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            switch (data.type) {
                case 'join':
                    if (!rooms[data.room]) {
                        rooms[data.room] = {
                            clients: [],
                            tasks: []
                        };
                    }
                    rooms[data.room].clients.push(ws);
                    rooms[data.room].tasks.forEach(task => ws.send(JSON.stringify(task)));
                    console.log(`Client joined room ${data.room}`);
                    break;
                case 'add':
                    if (rooms[data.room]) {
                        rooms[data.room].tasks.push(data.task);
                        rooms[data.room].clients.forEach((client) => {
                            if (client !== ws) {
                                client.send(JSON.stringify(data.task));
                            }
                        });
                    }
                    break;
                case 'remove':
                    if (rooms[data.room]) {
                        let taskIndex = rooms[data.room].tasks.findIndex(task => task.name === data.task.name);
                        if (taskIndex !== -1) {
                            rooms[data.room].tasks.splice(taskIndex, 1);
                            rooms[data.room].clients.forEach((client) => {
                                client.send(JSON.stringify({ type: 'remove', task: data.task }));
                            });
                        }
                    }
                    break;
            }
        } catch (e) {
            console.log('Invalid JSON: ', message);
        }
    });
    ws.on('close', () => {
        for (let room in rooms) {
            const index = rooms[room].clients.indexOf(ws);
            if (index !== -1) {
                rooms[room].clients.splice(index, 1);
                console.log(`Client disconnected from room ${room}`);
            }
        }
    });
});

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
