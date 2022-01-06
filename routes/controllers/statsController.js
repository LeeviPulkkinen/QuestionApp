import * as userService from "../../services/userService.js";

const listStats = async ({ render, user }) => {
  const userId = user.id;
  const userAnswers = await userService.userAnswers(userId);
  const userCorrectAnswers = await userService.userCorrectAnswers(userId);
  const userQuestionAnswers = await userService.userQuestionAnswers(userId);
  const topFive = await userService.mostAnswers();

  render("stats.eta", {
    userAnswers: userAnswers.count,
    userCorrectAnswers: userCorrectAnswers.count,
    userQuestionAnswers: userQuestionAnswers.count,
    topFive: topFive,
  });
};

export { listStats };
