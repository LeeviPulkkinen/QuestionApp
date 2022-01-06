import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getRegisterationData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const registerData = await getRegisterationData(request);

  const [passes, errors] = await validasaur.validate(
    registerData,
    registrationValidationRules,
  );

  if (!passes) {
    console.log(errors);
    registerData.validationErrors = errors;
    render("register.eta", registerData);
  } else {
    await userService.addUser(
      registerData.email,
      await bcrypt.hash(registerData.password),
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm };
