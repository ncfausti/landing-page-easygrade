'use client';
import { useEffect } from 'react';
import { useCompletion } from 'ai/react';

export default function Chat(props: { text: string; images: string }) {
  const { text, images } = props;
  const { completion, input, setInput, handleInputChange, handleSubmit } =
    useCompletion({
      api: '/api/completion',
    });

  useEffect(() => {
    setInput(JSON.stringify({ text, images: images }));
    console.log('chat: text:', text);
    console.log('chat: images:', images);
  }, [text, images]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <input
        type="hidden"
        name="image"
        value={images}
        onChange={handleInputChange}
        id="image"
      />
      <button
        className="btn bg-white border-2 p-3 rounded-xl border-black"
        type="submit"
      >
        GenerateHomework
      </button>
      <code className="bg-white p-3 m-3">{completion}</code>
    </form>
  );
}
