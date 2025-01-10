import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const generateToken = (payload: {
  name: string;
  roleId: number;
  email: string;
}): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "");
  } catch {
    return null;
  }
};
