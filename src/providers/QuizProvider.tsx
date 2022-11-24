import {
  createContext,
  ReactElement,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { request } from "../helpers/request";
import { TQuestion } from "../interfaces";

const DEFAULT_QUIZ_STATE: TQuestion[] = [
  { id: 1, question: "", answers: [] },
  { id: 2, question: "", answers: [] },
  { id: 3, question: "", answers: [] },
  { id: 4, question: "", answers: [] },
  { id: 5, question: "", answers: [] },
];

export const QuizContext = createContext<TQuestion[]>([]);

export const QuizProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [questions, setQuestions] = useState<TQuestion[]>(DEFAULT_QUIZ_STATE);
  const fetchQuestions = async () => {
    try {
      const { data } = await request.get<TQuestion[]>("/questions");
      setQuestions(data);
    } catch (err) {
      // Here we can use toast to show error to user
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider value={questions}>{children}</QuizContext.Provider>
  );
};
