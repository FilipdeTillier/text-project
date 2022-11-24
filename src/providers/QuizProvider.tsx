import {
  createContext,
  ReactElement,
  PropsWithChildren,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { paths } from "../helpers/paths";
import { request } from "../helpers/request";
import { IQuestion, IQuizAnswer } from "../interfaces";

interface IQuizContext {
  questions: IQuestion[];
  answers: IQuizAnswer[];
  setAnswers: Dispatch<SetStateAction<IQuizAnswer[]>>;
}

export const QuizContext = createContext<IQuizContext>({
  questions: [],
  answers: [],
  setAnswers: () => {},
});

export const QuizProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<IQuizAnswer[]>([]);

  const fetchQuestions = async () => {
    try {
      const { data } = await request.get<IQuestion[]>(paths.questions);
      const defaultAnswers: IQuizAnswer[] = data.map((question) => ({
        id: question.id,
        answer: null,
      }));
      setQuestions(data);
      setAnswers(defaultAnswers);
    } catch (err) {
      // Here we can use toast to show error to user
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider value={{ questions, answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};
