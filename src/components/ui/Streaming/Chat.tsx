'use client';
import { useEffect } from 'react';
import { useCompletion } from 'ai/react';
import Loading from '@/components/Loading';
import { progress } from '@/lib/utils';
export default function Chat(props: {
  text: string;
  images: string[];
  setCompletion: (completionText: string, isLoading: boolean) => void;
  totalQuestions: number;
}) {
  const { text, images, totalQuestions } = props;
  const {
    completion,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/completion',
    onResponse: (response: Response) => {
      console.log('Received response from server:', response);
    },
  });

  // test 1: are the images causing a problem because the POST is too large? <--- NO
  // test 2: are the images causing a problem simply by being in the page
  // (even if not sent, i.e. toDataURL causing issues)? <--- ITS THIS ONE
  // could also be that the constant re-rendering combined with toDataURL is causing the issue
  // in any case, should get rid of both
  // it is also because of the larger input size to the openai endpoint

  useEffect(() => {
    // if (images) {
    //   // console.log('useEffect: ', images.length);
    // }
    // setInput(JSON.stringify({ text, images: images }));
    setInput(JSON.stringify({ text, images }));
  }, [text, images]);

  // useEffect(() => {
  //   if (completion) {
  //     props.setCompletion(completion, isLoading);
  //   }
  // }, [completion, isLoading]);
  useEffect(() => {
    if (completion) {
      props.setCompletion(completion, isLoading);
    }
  }, [completion, isLoading]);

  console.log('rerendered');
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="prompt"
          value={input} // JSON.stringify({ text, images[] or pdf })
          onChange={handleInputChange}
          id="input"
        />
        <button
          disabled={isLoading}
          className={`${
            isLoading ? 'bg-gray-200' : 'bg-white'
          } w-full btn  border-2 p-3 mt-3 rounded-xl border-black`}
          type="submit"
        >
          {isLoading ? <Loading /> : 'Generate'}
        </button>
      </form>
      {isLoading && progress(completion, totalQuestions)}
    </div>
  );
}
