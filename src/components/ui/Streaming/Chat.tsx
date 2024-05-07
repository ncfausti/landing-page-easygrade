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
      <button
        style={{ marginTop: '-35px' }}
        className="btn bg-white border-2 p-3 rounded-xl border-black"
        type="submit"
      >
        GenerateHomework
      </button>
      <p className="bg-white m-12 p-3 drop-shadow-lg">
        {completion &&
          `Name: _______________ Section : ________________  Date: ___________________`}
        <br className="leading-5"></br>
        {completion}
      </p>
      {completion && (
        <button className="hidden btn fixed left-3 bg-white border-2 p-3 rounded-xl border-black">
          Print Homework
        </button>
      )}
    </form>
  );
}
