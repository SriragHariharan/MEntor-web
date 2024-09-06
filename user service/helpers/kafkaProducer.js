const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "user-service",
	brokers: [`${process.env.KAFKA_HOST}:9092`],
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


//produce otp on login and signup
const publishLoginOTP = (email, otp) => {
    console.log("producer otp :::",otp)
    publishMessage("auth-otp-topic", JSON.stringify({email, otp}));
}

const publishNewUser = (userID, username, email, role) => {
    publishMessage("new-user-topic", JSON.stringify({userID, username, email, role}));
    console.log("new user loggedin message published");
}

module.exports = {
    publishLoginOTP, 
    publishNewUser
}
