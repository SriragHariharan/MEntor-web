const { Kafka } = require('kafkajs')
const { sendVerificationOTP } = require('./mailHelpers')
require('./nodemailer')
require('./mailHelpers')
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [`${process.env.KAFKA_HOST}:9092`],
})
const consumer = kafka.consumer({ groupId: 'email-group' })

const kafkaRun = async() => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'auth-otp-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            let parsedMessage = JSON.parse(message.value.toString());
            console.log("recieving call", parsedMessage, topic)
            switch (topic) {
                case 'auth-otp-topic': sendVerificationOTP(parsedMessage.email, parsedMessage.otp); break;
            }
        },
    })
}
kafkaRun();
