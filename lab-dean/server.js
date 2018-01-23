'use strict';

const net = require('net');
const Client = require('./model/client');
const cmd = require('./lib/cmd.js');

const server = module.exports = net.createServer();
const PORT = process.env.PORT || 3000;
let clientPool = [];

server.on('connection', function(socket) {
  let client = new Client(socket);
  clientPool.push(client);
  clientPool.map(c => c.socket.write(`\tWelcome to the Thunderdome, ${client.nick}.\n`));

  socket.on('data', function(data) {
    let message = cmd(data, clientPool);
    socket.emit(message.command, message);
  });

  socket.on('list', function () {
    client.socket.write('\n\tConnected Users:\n');
    clientPool.map(c => client.socket.write(`\n\t${c.nick}\n`));
  });

  socket.on('nickname', function(data) {
    clientPool.map(c => c.socket.write(`\n\t${client.nick} changed their name to ${data.name}\n`));
    client.nick = data.name;
  });

  socket.on('dm', function(data) {
    let target = clientPool.filter(c => c.nick === data.name);
    target[0].socket.write(`\nFrom ${client.nick}: ${data.said}\n`);
    client.socket.write(`\nTo ${data.name}: ${data.said}\n`);
  });

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user);
    clientPool.map(c => c.socket.write(`\n\t${client.nick} has left the cha\tn`));
  });
  
  socket.on('error', function(data) {
    client.socket.write(`\n\t\tERROR\t\n \t\t${data.err}\n`);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));