import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, password)
        VALUES ($1, $2)`,
    email,
    password,
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $1",
    email,
  );

  return result.rows;
};

const userAnswers = async (userId) => {
  const result = await executeQuery(
    "select COUNT(*) from question_answers WHERE user_id = $1;",
    userId,
  );
  return result.rows[0];
};

const userCorrectAnswers = async (userId) => {
  const result = await executeQuery(
    "select COUNT(*) from question_answers WHERE user_id = $1 AND correct = true;",
    userId,
  );
  return result.rows[0];
};

const userQuestionAnswers = async (userId) => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM questions AS q, question_answers AS a WHERE q.id = a.question_id AND q.user_id = $1 ",
    userId,
  );
  return result.rows[0];
};

const mostAnswers = async () => {
  let result = [];
  const res = await executeQuery(
    "SELECT users.email as email, count(*) as count FROM users JOIN question_answers ON users.id = question_answers.user_id GROUP BY users.email ORDER BY count DESC LIMIT 5;",
  );
  if (res) {
    result = res.rows;
  }
  return result;
};

export {
  addUser,
  findUserByEmail,
  mostAnswers,
  userAnswers,
  userCorrectAnswers,
  userQuestionAnswers,
};
