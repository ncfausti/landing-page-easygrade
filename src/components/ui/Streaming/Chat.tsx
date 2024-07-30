'use client';
import { useRef, useEffect } from 'react';
import { useCompletion } from 'ai/react';
import Loading from '@/components/Loading';
import { progress } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InsertQuestion, Question } from '@/types';
import { toast } from 'react-hot-toast';
import { insertQuestionsAction } from '@/data/user/questions';
import { useRouter } from 'next/navigation';

export default function Chat(props: {
  text: string;
  images: string[];
  setCompletion: (completionText: string, isLoading: boolean) => void;
  totalQuestions: number;
  setInsertedQuestions: (questions: Question[]) => void;
}) {
  const { text, images, setInsertedQuestions, totalQuestions } = props;
  const queryClient = useQueryClient();
  const toastRef = useRef<string | null>(null);
  const router = useRouter();

  const { mutate: insertQuestions } = useMutation(
    async (questions: InsertQuestion[]) => {
      return insertQuestionsAction(questions);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating question(s)');
        toastRef.current = toastId;
      },

      onSuccess: (questions: Question[]) => {
        toast.success('Questions created', { id: toastRef.current });
        toastRef.current = null;

        // call back to parent component to update state
        setInsertedQuestions(questions);

        router.refresh();
        queryClient.invalidateQueries(['questions']);
      },
      onError: () => {
        toast.error('Failed to create question', { id: toastRef.current });
        toastRef.current = null;
      },
    }
  );

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
    onFinish: (prompt, completion) => {
      console.log('Finished json completion.');
      const questions = JSON.parse(completion).map((q) => {
        return {
          question_text: q.question,
          correct_answer: q.answer,
          answer_choices: q.choices,
          question_type: q.type,
          hints: [],
        };
      });

      insertQuestions(questions);
    },
  });

  // test 2: are the images causing a problem simply by being in the page
  // (even if not sent, i.e. toDataURL causing issues)? <--- ITS THIS ONE
  // could also be that the constant re-rendering combined with toDataURL is causing the issue
  // in any case, should get rid of both
  // it is also because of the larger input size to the openai endpoint

  useEffect(() => {
    setInput(JSON.stringify({ text, images }));
  }, [text, images]);

  useEffect(() => {
    if (completion) {
      props.setCompletion(completion, isLoading);
    }
  }, [completion, isLoading]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          id="input"
        />
        <button
          disabled={isLoading}
          className={`${isLoading ? 'bg-gray-200' : 'bg-white'
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
