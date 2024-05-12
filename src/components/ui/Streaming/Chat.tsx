'use client';
import { useEffect } from 'react';
import { useCompletion } from 'ai/react';
import FileUpload from '@/components/ui/FileUpload';

export default function Chat(props: {
  text: string;
  images: string;
  setCompletion: (completionText: string) => void;
}) {
  const { text, images } = props;
  const { completion, input, setInput, handleInputChange, handleSubmit } =
    useCompletion({
      api: '/api/completion',
    });

  useEffect(() => {
    setInput(JSON.stringify({ text, images: images }));
  }, [text, images]);

  useEffect(() => {
    if (completion) {
      // call the setCompletion function from the parent component
      props.setCompletion(completion);
    }
  }, [completion]);

  return (
    <form onSubmit={handleSubmit}>
      {/* {input} === the object of prompt and base 64imageurl */}
      {/* {input} */}
      <input
        type="hidden"
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      {/* <FileUpload /> */}
      <button
        style={{ marginTop: '-35px' }}
        className="btn bg-white border-2 p-3 rounded-xl border-black"
        type="submit"
      >
        GenHomework
      </button>
    </form>
  );
}

// the file upload is just a way to get the file location, right?
// what does handleInputChange do?
