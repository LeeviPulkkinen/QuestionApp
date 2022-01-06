import { executeQuery } from "../database/database.js";

const addQuestion = async (userID, questionTitle, questionText) => {
  await executeQuery(
    "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3);",
    userID,
    questionTitle,
    questionText,
  );
};

const deleteQuestion = async (questionId) => {
  await executeQuery(
    "DELETE FROM questions WHERE id = $1;",
    questionId,
  );
};

const getUsersQuestions = async (userID) => {
  let result = [];
  const res = await executeQuery(
    "SELECT * FROM questions WHERE user_id = $1;",
    userID,
  );
  if (res) {
    result = res.rows;
  }

  return result;
};

const getQuestionById = async (questionId) => {
  let result = [];
  const res = await executeQuery(
    "SELECT * FROM questions WHERE id = $1;",
    questionId,
  );
  if (res && res.rows.length > 0) {
    result = res.rows[0];
  }

  return result;
};

export { addQuestion, deleteQuestion, getQuestionById, getUsersQuestions };
