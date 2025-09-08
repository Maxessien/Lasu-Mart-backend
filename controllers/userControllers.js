import { findError } from "../../frontend/public/fbAuthErrors.js";
import { auth } from "../configs/fbConfigs.js";

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await auth.createUser(req.body);
    console.log(user);
    return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.log(err.code);
    const errorMessage = findError(err.code)
    return res.status(errorMessage.statusCode).json({message: errorMessage.customMessage});
  }
};

export { createUser };
