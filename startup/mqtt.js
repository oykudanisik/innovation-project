const { Mqtt } = require('../models/mqtt');
const { Plant } = require('../models/plant');

var pubTopic = "controller/plant";
var subTopic = "controller/moisture";

var mqtt    = require('mqtt');
var mqttClient  = mqtt.connect("mqtt://broker.emqx.io:1883",{clientId:subTopic});

mqttClient.on("connect",function(){ 	        
    mqttClient.subscribe(subTopic);
    console.log('Mqtt connected successfuly...');
});

mqttClient.on('message',async function(topic, message, packet){
    var msg = message.toString();
    var x = JSON.parse(msg);
    let plant = await new Plant({
        name: "x",
        type: "xyz",
        moisture: x.moisture,
    });
    console.log(plant)
    await plant.save();
    broadcastMessage(JSON.stringify({
        moisture: plant.moisture, 
  }));
});

var sendSettings = ( settings ) => {
    mqttClient.publish(pubTopic,settings);
}
//WEB SOCKET
const  {WebSocket, WebSocketServer} = require('ws');
//const {sendSettings} = require("./mqtt");

const wss =  new WebSocketServer({port:3001});
console.log("WebSockets created...");

wss.on('connection', async (ws) => {
    console.log("Client connected...");
    ws.on('message', async (message) => {
        // TODO: Send config message to MQTT topic
        console.log(`Received message: ${message}`);
        sendSettings(message);
        //broadcastMessage(message);
    });
  });

const broadcastMessage = (message) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    })
}