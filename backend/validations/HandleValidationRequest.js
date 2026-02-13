import { validationResult } from "express-validator";

const HandleValidationRequest = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.mapped() });
  } else {
    next();
  }
};

export default HandleValidationRequest;
