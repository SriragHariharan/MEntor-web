const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "my-app",
	brokers: ["kafka-service:9092"],
});
const producer = kafka.producer()

const publishMessage = async(message) => {
    await producer.connect()
    await producer.send({
        topic: "notification-topic",
        messages: [{ value: message }],
    });

    await producer.disconnect()
}


//produce otp on login and signup
const publishChatNotificationToNotificationService = ( recieverID, message) => {
    publishMessage(JSON.stringify({type:"message", title:"New Message recieved", message, recieverID}));
}

module.exports = {
    publishChatNotificationToNotificationService,
}
