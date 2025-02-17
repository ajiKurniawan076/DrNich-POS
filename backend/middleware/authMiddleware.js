import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { admin } from "../models/admin/adminModels.js";

const protect = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    
    let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const foundAdmin = await admin.findById(decoded.id).select("-password");

      if (!foundAdmin) {
        return res.status(402).json({ message: "Admin not found" });
      }

      req.admin = foundAdmin;

      if (roles.length && !roles.includes(foundAdmin.level)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); 
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(404).json({ message: "Not authorized, token failed" });
    }
  });
};

export { protect };
