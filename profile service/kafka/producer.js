const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "user-app",
	brokers: ["kafka-service:9092"],
});
const producer = kafka.producer()

const publishMessage = async(topic, message) => {
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [{ value: message }],
    });

    await producer.disconnect()
}


//produce new chat details to chat service
const publishNewChat = (id1, id2) => {
    const sortedIds = [id1, id2].sort();
    const mergedIds = sortedIds.join('-');
    
    console.log("roomID :::",mergedIds)
    publishMessage("create-chat-topic", JSON.stringify(mergedIds));
}

module.exports = {
    publishNewChat
}