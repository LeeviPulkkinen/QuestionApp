import * as optionService from "../../services/optionService.js";
import * as quizService from "../../services/quizService.js";

const randomGuestion = async ({ response }) => {
  const question = await quizService.getRandomQuestion();
  if (!question || question.lenght === 0) {
    response.body = {};
  }
  const options = await optionService.listQuestionOptions(question.id);
  const answerOptions = [];

  options.forEach((op) => {
    answerOptions.push({ optionId: op.id, optionText: op.option_text });
  });

  response.body = {
    questionId: question.id,
    questionTitle: question.title,
    questionText: question.question_text,
    answerOptions: answerOptions,
  };
};

const answerQuestion = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const option = await optionService.getOptionById(
    document.questionId,
    document.optionId,
  );

  response.body = { correct: option.is_correct };
};

export { answerQuestion, randomGuestion };
