const {
  StatusCodes: { BAD_REQUEST, OK },
} = require("http-status-codes");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const { BACKEND_PORT = 3001, DB_PATH = "db.json" } = process.env;

const server = jsonServer.create();
const router = jsonServer.router(DB_PATH);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const areAnswersFormatIsInvalid = (answers) => {
  // We can also add yup library to validate.
  // In that case, library is to huge for this small piece of code.
  return answers.some((answer) => !(answer.id && answer.answer));
};

server.get("/questions/answers", (_req, res) => {
  const { questions = [] } = router.db.getState();
  const mappedQuestions = questions.map(({ id, correctValue }) => ({
    id,
    correctValue,
  }));
  return res.json(mappedQuestions).status(OK);
});

server.get("/questions", (_req, res) => {
  const { questions = [] } = router.db.getState();
  const mappedQuestions = questions.map(({ id, question, answers }) => ({
    id,
    question,
    answers,
  }));
  return res.json(mappedQuestions).status(OK);
});

server.post("/check-results", (req, res) => {
  const answers = req.body;

  // Additionally, we can add validaiton to check if answers length is the same as questions length.
  // In this case I didn't add this validation
  if (areAnswersFormatIsInvalid(answers)) {
    return res
      .json(
        "Answers format is wrong. Should contain collection of objects with id and answer property"
      )
      .status(BAD_REQUEST);
  }

  // Here I get state of db.json where we store our questions.
  // Assuming, that our db is read only, we can also store it outside function.
  const { questions = [] } = router.db.getState();
  const numberOfQuestions = questions.length;
  let points = 0;

  for (let currentAnswer of answers) {
    const { id, answer } = currentAnswer;
    const currentQuestion = questions.find(
      (question) => Number(question.id) === Number(id)
    );
    if (!currentQuestion) {
      return res.json(`Question with id ${id} not exists`).status(BAD_REQUEST);
    }
    if (
      currentQuestion &&
      Number(currentQuestion.correctValue) === Number(answer)
    ) {
      points++;
    }
  }

  return res.json(points / numberOfQuestions).status(OK);
});

server.use(router);

server.listen(BACKEND_PORT, () => {
  console.log(`JSON Server is running on port ${BACKEND_PORT}`);
});
