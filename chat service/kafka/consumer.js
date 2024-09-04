const { Kafka } = require('kafkajs')
const { createNewChat } = require('../controllers/chatController')

const kafka = new Kafka({
  clientId: 'chat-management-service',
  brokers: ['kafka-service:9092'],
})
//new-user-topic
const consumer = kafka.consumer({ groupId: 'chat-management-service' })

const runAlways = async() => {

    await consumer.connect()
    await consumer.subscribe({ topic: 'create-chat-topic', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let parsedMessage = JSON.parse(message.value.toString())
      switch(topic) {
        case 'create-chat-topic': createNewChat(parsedMessage)
      }
        console.log("PMsg :::",parsedMessage, topic);
    },
    })
}
runAlways();