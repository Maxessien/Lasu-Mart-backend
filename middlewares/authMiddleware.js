import { auth } from "../configs/fbConfigs.js";

const authMiddleware = (roleCheck) => async (req, res, next) => {
  const token = req.header.split("Bearer ")[1] || "";
  try {
    const decodedToken = await auth.verifyIdToken(token);
    if (roleCheck != decodedToken.role) {
      throw new Error();
    } else {
      req.auth = decodedToken;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Unauthorised access" });
  }
};

export { authMiddleware };
