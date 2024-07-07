'use server';
import { Client } from '@upstash/qstash';

const qstashClient = new Client({
  token: process.env.UPSTASH_QSTASH_TOKEN!,
});

export default async function startBackgroundJob() {
  // this will be where we send the mass-create-users job to the queue
  await qstashClient.publishJSON({
    url: 'https://4e86-46-135-73-91.ngrok-free.app/api/batch-users/add',
    body: {
      hello: 'funciton startBackgroundJob has been called',
    },
  });
}
