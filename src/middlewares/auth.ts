import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export const authGuard = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token is missing" });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = decoded as User;

    const hasPermission = req.user.role?.permissions.some(
      (perm) => perm.name === requiredPermission
    );

    if (!hasPermission) {
      res.status(403).json({ message: "Permission denied" });
      return;
    }

    next();
  };
};
