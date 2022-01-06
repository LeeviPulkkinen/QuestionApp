import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as quizController from "./controllers/quizController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as statsController from "./controllers/statsController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/questions", questionController.listUsersQuestions);
router.post("/questions", questionController.addQuestion);
router.get("/questions/:id", optionController.listOptionsAndQuestion);
router.post("/questions/:id/options", optionController.addOption);
router.post(
  "/questions/:questionId/options/:optionId/delete",
  optionController.removeOption,
);
router.post("/questions/:id/delete", questionController.deleteQuestion);
router.get("/quiz", quizController.getRandomQuestion);
router.get("/quiz/:id", quizController.listQuestionAndOptions);
router.post("/quiz/:id/options/:optionId", quizController.addAnswer);
router.get("/quiz/:id/correct", quizController.listAnswer);
router.get("/quiz/:id/incorrect", quizController.listAnswer);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/statistics", statsController.listStats);

router.get("/api/questions/random", questionApi.randomGuestion);
router.post("/api/questions/answer", questionApi.answerQuestion);

export { router };
