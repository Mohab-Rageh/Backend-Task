import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/User";

// Extend the Request interface to include `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export const authGuard = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Token missing" });
        return;
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      if (roles.length && !roles.includes((decoded as any).role)) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }

      req.user = decoded as User;
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
};
