import { executeQuery } from "../database/database.js";

const getRandomQuestion = async () => {
  let result = [];
  // This query excludes questions that have 0  answer options available
  const res = await executeQuery(
    "SELECT * FROM (SELECT DISTINCT u.* FROM questions u INNER JOIN question_answer_options o ON o.question_id = u.id) AS s ORDER BY random() LIMIT 1",
  );
  if (res && res.rows.length > 0) {
    result = res.rows[0];
  }
  return result;
};

const addAnswer = async (userId, questionId, optionId, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4);",
    userId,
    questionId,
    optionId,
    isCorrect,
  );
};

export { addAnswer, getRandomQuestion };
