import * as optionService from "../../services/optionService.js";
import * as questionservice from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
  optionText: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request, questionId) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    optionText: params.get("option_text"),
    isCorrect: params.has("is_correct"),
    options: await optionService.listQuestionOptions(questionId),
  };
};

const addOption = async ({ request, response, render, params, user }) => {
  const question = await questionservice.getQuestionById(params.id);

  if (question.user_id !== user.id) {
    return;
  }

  const optionData = await getOptionData(request, params.id);

  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );
  if (!passes) {
    console.log(errors);
    optionData.validationErrors = errors;
    optionData.question = question;

    render("question.eta", optionData);
  } else {
    await optionService.addOption(
      params.id,
      optionData.optionText,
      optionData.isCorrect,
    );

    response.redirect(`/questions/${params.id}`);
  }
};

const listOptionsAndQuestion = async ({ render, params, user }) => {
  const question = await questionservice.getQuestionById(params.id);

  if (question.user_id !== user.id) {
    return;
  }

  render("question.eta", {
    question: question,
    options: await optionService.listQuestionOptions(params.id),
  });
};

const removeOption = async ({ params, response }) => {
  await optionService.removeOption(params.questionId, params.optionId);

  response.redirect(`/questions/${params.questionId}`);
};

export { addOption, listOptionsAndQuestion, removeOption };
