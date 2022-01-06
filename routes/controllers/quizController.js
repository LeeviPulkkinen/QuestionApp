import * as quizService from "../../services/quizService.js";
import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";

const getRandomQuestion = async ({ response, render }) => {
  const question = await quizService.getRandomQuestion();

  if (question && question.id) {
    response.redirect(`/quiz/${question.id}`);
  }

  render("quiz.eta");
};

const listQuestionAndOptions = async ({ params, render }) => {
  const question = await questionService.getQuestionById(params.id);
  const options = await optionService.listQuestionOptions(params.id);

  render("quiz.eta", {
    question: question,
    options: options,
  });
};

const addAnswer = async ({ response, params, user }) => {
  const answerOption = await optionService.getOptionById(
    params.id,
    params.optionId,
  );

  await quizService.addAnswer(
    user.id,
    params.id,
    params.optionId,
    answerOption.is_correct,
  );

  if (answerOption.is_correct) {
    response.redirect(`/quiz/${params.id}/correct`);
  } else {
    response.redirect(`/quiz/${params.id}/incorrect`);
  }
};

const listAnswer = async ({ render, params, request }) => {
  const url = new URL(request.url);
  if (url.pathname.endsWith("incorrect")) {
    const correctAnswer = await optionService.getCorrectOption(params.id);
    render("quizAnswer.eta", correctAnswer);
  } else {
    render("quizAnswer.eta");
  }
};

export { addAnswer, getRandomQuestion, listAnswer, listQuestionAndOptions };
