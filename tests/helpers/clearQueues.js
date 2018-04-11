const config = require('../config');

module.exports = async (amqpInstance) => {
    const channel = await amqpInstance.createChannel();
    channel.assertQueue(`app_${config.rabbit.serviceName}_test.balance`);
    await channel.purgeQueue(`app_${config.rabbit.serviceName}_test.balance`);
};