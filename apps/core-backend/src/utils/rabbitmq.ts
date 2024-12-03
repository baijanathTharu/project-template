import amqplib from 'amqplib';

const queue = 'template_queue';
const NEW_QUEUE = 'template_queue_2';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';

(async () => {
  const conn = await amqplib.connect(RABBITMQ_URL);

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('Received:', msg.content.toString());
      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });

  const ch2 = await conn.createChannel();

  await ch2.assertQueue(queue);
  ch2.sendToQueue(queue, Buffer.from('Task to do'));
})();
