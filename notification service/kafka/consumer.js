const { Kafka } = require('kafkajs')
const {addNewUser} = require('../controllers/notificationsController')
const { sendCustomNotification } = require('../helpers/push-notification')

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['kafka-service:9092'],
})
//new-user-topic
const consumer = kafka.consumer({ groupId: 'notification-service' })

const runAlways = async() => {

    await consumer.connect()
    await consumer.subscribe({
        topics: ['new-user-topic', 'notification-topic'],
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            let parsedMessage = JSON.parse(message.value.toString())
            switch(topic) {
                case 'new-user-topic': addNewUser(parsedMessage); break;
                case 'notification-topic': sendCustomNotification(parsedMessage); break;
            }
        },
    })
}
runAlways();