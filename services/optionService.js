import { executeQuery } from "../database/database.js";

const addOption = async (questionId, optionText, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id , option_text, is_correct) VALUES ($1, $2, $3);",
    questionId,
    optionText,
    isCorrect,
  );
};

const removeOption = async (questionId, questionAswerOptionId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id = $1 AND question_id = $2;",
    questionAswerOptionId,
    questionId,
  );

  await executeQuery(
    "DELETE FROM question_answer_options WHERE id = $1 AND question_id = $2;",
    questionAswerOptionId,
    questionId,
  );
};

const listQuestionOptions = async (questionId) => {
  let result = [];
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1;",
    questionId,
  );

  if (res) {
    result = res.rows;
  }

  return result;
};

const getOptionById = async (questionId, optionId) => {
  let result = [];
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND id = $2;",
    questionId,
    optionId,
  );

  if (res) {
    result = res.rows[0];
  }

  return result;
};

const getCorrectOption = async (questionId) => {
  let result = [];
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true;",
    questionId,
  );

  if (res && res.rows.length > 0) {
    result = res.rows[0];
  } else {
    result = {
      id: 1,
      option_text: "This question didn't have any correct options",
    };
  }

  return result;
};

export {
  addOption,
  getCorrectOption,
  getOptionById,
  listQuestionOptions,
  removeOption,
};
