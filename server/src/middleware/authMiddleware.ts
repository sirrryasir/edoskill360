import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      );

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

export const agent = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === "agent" || req.user.role === "admin")) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as a agent" });
  }
};

export const employer = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === "employer" || req.user.role === "admin")) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an employer" });
  }
};
