// import OpenAI from 'openai';
// const openai = new OpenAI();

export async function GET() {
  // POST: Parse request body into string
  // const { body } = req;
  // const reader = body.getReader();
  // const decoder = new TextDecoder('utf-8');
  // let result = '';
  // let value;
  // // eslint-disable-next-line no-constant-condition
  // while (true) {
  //   value = await reader.read();
  //   if (value.done) {
  //     break;
  //   }
  //   result += decoder.decode(value.value, { stream: true });
  // }
  // result += decoder.decode();

  // if (!result) {
  //   return new Response(JSON.stringify(res), { status: 400 });
  // }

  // Convert PDF to image
  // Both HTTP and local paths are supported
  // const outputImages1 = pdf2img.convert(
  //   'http://www.example.com/pdf_online.pdf'
  // );
  // const outputImages1 = await pdf2img.convert(
  //   'http://localhost:3000/5_math_chapter1.pdf'
  // );

  // From here, the images can be used for other stuff or just saved if that's required:
  // console.log(outputImages1);
  // outputImages1.then(function (outputImages) {
  //   for (let i = 0; i < outputImages.length; i++)
  //     fs.writeFile('output' + i + '.png', outputImages[i], function (error) {
  //       if (error) {
  //         console.error('Error: ' + error);
  //       }
  //     });
  // });

  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4-turbo',
  //   messages: [
  //     {
  //       role: 'user',
  //       content: [
  //         {
  //           type: 'text',
  //           text: `You are a Math Teacher. Generate homework questions based on this image.`,
  //         },
  //         {
  //           type: 'image_url',
  //           image_url: {
  //             url: 'result',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // });

  const response = '';
  return new Response(JSON.stringify(response), { status: 200 });
}
