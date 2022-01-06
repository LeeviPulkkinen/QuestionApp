import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  questionText: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request, user) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    title: params.get("title"),
    questionText: params.get("question_text"),
    questions: await questionService.getUsersQuestions(user.id),
  };
};

const addQuestion = async ({ request, response, render, user }) => {
  const questionData = await getQuestionData(request, user);

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;

    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.title,
      questionData.questionText,
    );

    response.redirect("/questions");
  }
};

const deleteQuestion = async ({ response, params }) => {
  await questionService.deleteQuestion(params.id);

  response.redirect("/questions");
};

const listUsersQuestions = async ({ render, user }) => {
  render("questions.eta", {
    questions: await questionService.getUsersQuestions(user.id),
  });
};

export { addQuestion, deleteQuestion, listUsersQuestions };
