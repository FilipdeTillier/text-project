import { ReactElement, useContext, useState } from "react";
import { QuizQuestion } from "../../components/QuizQuestion";
import { paths } from "../../helpers/paths";
import { request } from "../../helpers/request";
import { QuizContext } from "../../providers/QuizProvider";

enum SCORE_RATING_BREAKPOINTS {
  "Excellent" = 91,
  "Very good" = 81,
  "Good" = 61,
  "Failed" = 41,
  "Diligent failure" = 0,
}

const PERCENTAGE: number = 100;

export const Quiz = (): ReactElement => {
  const { questions = [], answers } = useContext(QuizContext);
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(step + 1);

  const prevStep = () => setStep(step - 1);

  const resultMessage = (scoreInPercent: number) => {
    if (scoreInPercent >= SCORE_RATING_BREAKPOINTS.Excellent) {
      return SCORE_RATING_BREAKPOINTS[SCORE_RATING_BREAKPOINTS.Excellent];
    } else if (scoreInPercent >= SCORE_RATING_BREAKPOINTS["Very good"]) {
      return SCORE_RATING_BREAKPOINTS[SCORE_RATING_BREAKPOINTS["Very good"]];
    } else if (scoreInPercent >= SCORE_RATING_BREAKPOINTS.Good) {
      return SCORE_RATING_BREAKPOINTS[SCORE_RATING_BREAKPOINTS.Good];
    } else if (scoreInPercent >= SCORE_RATING_BREAKPOINTS.Failed) {
      return SCORE_RATING_BREAKPOINTS[SCORE_RATING_BREAKPOINTS.Failed];
    } else {
      return SCORE_RATING_BREAKPOINTS["Diligent failure"];
    }
  };

  const onSubmit = async () => {
    try {
      const { data } = await request.post<number>(paths.checkResults, answers);
      alert(resultMessage(data * PERCENTAGE));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div data-testid="quiz-container" className="quiz__container h-100">
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
