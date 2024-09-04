const { Kafka } = require('kafkajs')
const { createProfile } = require('../controllers/interviewController')

const kafka = new Kafka({
  clientId: 'interview-management-service',
  brokers: ['kafka-service:9092'],
})
//new-user-topic
const consumer = kafka.consumer({ groupId: 'interview-management-service' })

const runAlways = async() => {

    await consumer.connect()
    await consumer.subscribe({ topic: 'new-user-topic', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let parsedMessage = JSON.parse(message.value.toString())
      switch(topic) {
        case 'new-user-topic': createProfile(parsedMessage)
      }
        console.log("PMsg :::",parsedMessage, topic);
    },
    })
}
runAlways();