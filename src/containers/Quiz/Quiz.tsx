import { ReactElement, useContext, useEffect } from "react";
import { QuizContext } from "../../providers/QuizProvider";

export const Quiz = (): ReactElement => {
  const quizProvider = useContext(QuizContext);

  useEffect(() => {
    console.log("init", quizProvider);
  }, [quizProvider]);

  return <div>hehe</div>;
};
