'use server';
import { Client } from '@upstash/qstash';

const qstashClient = new Client({
  token: process.env.UPSTASH_QSTASH_TOKEN!,
});

type UserSubmission = {
  name: string;
  email: string;
};

// TODO: this should be function and payload agnostic
// and should be able to send any job to the queue
// with the appropriate payload
export default async function startBackgroundJob(users: UserSubmission[]) {
  // this will be where we send the mass-create-users job to the queue
  // await qstashClient.publishJSON({
  //   url: 'https://4e86-46-135-73-91.ngrok-free.app/api/batch-users/add',
  //   body: {
  //     hello:
  //       'funciton startBackgroundJob has been called at ' +
  //       new Date().toISOString(),
  //   },
  // });
  // instead of sending one job as we are doing above, send multiple jobs
  // to the queue to create multiple users useing qstashClient.batchJson
  const qstashClient = new Client({
    token: process.env.UPSTASH_QSTASH_TOKEN!,
  });
  const batch = users.map((user, i) => ({
    url: 'https://4e86-46-135-73-91.ngrok-free.app/api/batch-users/add',
    delay: i * 5,
    body: {
      hello: `User #${i} scheduled at: ${new Date().toISOString()}, called at: `,
      user,
    },
  }));

  const res = await qstashClient.batchJSON(batch);

  return res;
}
