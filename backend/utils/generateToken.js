import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.log("Token generated and cookie set successfully.");
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ message: "Failed to generate token" });
  }
};

export default generateToken;
