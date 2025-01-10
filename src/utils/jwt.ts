import jwt from "jsonwebtoken";

export const generateToken = (payload: {
  name: string;
  roleId: number;
  email: string;
  id: number;
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
