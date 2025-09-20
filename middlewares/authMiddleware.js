import { auth } from "../configs/fbConfigs.js";

const authMiddleware =
  (roleCheck = "user") =>
  async (req, res, next) => {
    const token = req.header.split("Bearer ")[1] || "";
    if (!token) throw new Error("Unauthorised access");
    try {
      const decodedToken = await auth.verifyIdToken(token);
      if (roleCheck != decodedToken.role || !decodedToken) {
        throw new Error("Unauthorised access");
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
