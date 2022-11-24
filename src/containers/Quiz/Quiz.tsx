import { ReactElement, useContext, useState } from "react";
import { QuizQuestion } from "../../components/QuizQuestion";
import { paths } from "../../helpers/paths";
import { request } from "../../helpers/request";
import { QuizContext } from "../../providers/QuizProvider";

const PERCENTAGE: number = 100;

export const Quiz = (): ReactElement => {
  const { questions = [], answers } = useContext(QuizContext);
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  const onSubmit = async () => {
    try {
      const { data } = await request.post<number>(paths.checkResults, answers);
      alert(`Your score is ${data * PERCENTAGE}%`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="quiz__container h-100">
      {questions.length ? (
        <QuizQuestion
          question={questions[step]}
          isFirst={!step}
          isLast={step === questions.length - 1}
          nextStep={nextStep}
          prevStep={prevStep}
          sendForm={onSubmit}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
