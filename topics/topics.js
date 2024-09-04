const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "admin-client",
	brokers: ["kafka-service:9092"], // Replace with your Kafka broker addresses
});

const admin = kafka.admin();

const createTopic = async () => {
	await admin.connect();

	try {
		await admin.createTopics({
			topics: [
				{
					topic: "auth-otp-topic", // The topic name
					numPartitions: 1, // The number of partitions
					replicationFactor: 1, // The replication factor
				},
				{
					topic: "new-user-topic", // The topic name
					numPartitions: 1, // The number of partitions
					replicationFactor: 1, // The replication factor
				},
				{
					topic: "create-chat-topic", // The topic name
					numPartitions: 1, // The number of partitions
					replicationFactor: 1, // The replication factor
				},
				{
					topic: "notification-topic", // The topic name
					numPartitions: 1, // The number of partitions
					replicationFactor: 1, // The replication factor
				}
			],
		});

		console.log("Topic created successfully");
	} catch (e) {
		console.error("Failed to create topic", e);
	} finally {
		await admin.disconnect();
	}
};

createTopic().catch(console.error);
