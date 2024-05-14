const amqplib = require("amqplib");
let channel = null;

const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  BINDING_KEY,
} = require("../config/server_config");

exports.createChannel = async () => {
  if (channel) {
    return channel;
  }
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

exports.subscribeMessage = async (service, BINDING_KEY, queue_name) => {
  try {
    const channel = await exports.createChannel();
    const applicationQueue = await channel.assertQueue(queue_name);

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, BINDING_KEY);

    channel.consume(applicationQueue.queue, (msg) => {
      
      const payload = JSON.parse(msg.content.toString());
      console.log(payload)
      service(payload.annotations,payload.id);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

exports.publishMessage = async (BINDING_KEY, message, queue_name) => {
  try {
    const channel = await exports.createChannel();
    await channel.assertQueue(queue_name);
    await channel.publish(EXCHANGE_NAME, BINDING_KEY, Buffer.from(message));
    // console.log("running")
  } catch (error) {
    throw error;
  }
};

exports.getChannel = async () => {
  if (!channel) {
    throw new Error(
      "Channel is not created yet. Please call createChannel first."
    );
  }
  return channel;
};
