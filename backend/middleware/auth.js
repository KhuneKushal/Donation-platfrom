import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized. Token missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    const errorMessage = error.name === "TokenExpiredError"
      ? "Session expired. Log in again."
      : "Invalid token.";
    return res.status(401).json({ message: errorMessage });
  }
};

export default authMiddleware;
