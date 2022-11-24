import { ReactElement, useContext, ChangeEvent, useMemo } from "react";
import { IQuestion } from "../../interfaces";
import { QuizContext } from "../../providers/QuizProvider";

interface IQuizQuestion {
  question: IQuestion;
  isFirst: boolean;
  isLast: boolean;
  nextStep: () => void;
  prevStep: () => void;
  sendForm: () => void;
}

export const QuizQuestion = ({
  question,
  isFirst,
  isLast,
  nextStep,
  prevStep,
  sendForm,
}: IQuizQuestion): ReactElement => {
  const { setAnswers, answers } = useContext(QuizContext);

  const currentAnswer = useMemo(
    () => answers.find((answer) => answer.id === question.id),
    [answers, question.id]
  );

  const updateAnswers = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === question.id
        ? { id: question.id, answer: Number(e.target.value) }
        : answer
    );
    setAnswers(updatedAnswers);
  };
  return (
    <div>
      <label>{question.question}</label>
      {question.answers.map((answer) => (
        <div key={answer.value}>
          <input
            type="radio"
            name="answer"
            id={answer.label}
            checked={answer.value === currentAnswer?.answer}
            value={answer.value}
            onChange={updateAnswers}
          />
          <label htmlFor={answer.label}>{answer.label}</label>
        </div>
      ))}
      {!isLast && (
        <button disabled={!currentAnswer?.answer} onClick={nextStep}>
          Next
        </button>
      )}
      {/* It's additional button for moving around questions, can be remove after make a decision */}
      <button disabled={isFirst} onClick={prevStep}>
        Previous
      </button>
      {isLast && (
        <button disabled={!currentAnswer?.answer} onClick={sendForm}>
          Finish
        </button>
      )}
    </div>
  );
};
