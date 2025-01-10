import { NextFunction, Request, Response } from "express";
import { loginSchema, registerUserSchema } from "../validators/userValidator";
import { validate } from "../utils/zodValidator";
import { UserService } from "../services/userService";

const userService = new UserService();

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = validate(registerUserSchema, req.body);

    const resp = await userService.registerUser(validatedData);
    const { code, ...rest } = resp;
    res.status(code).json(rest);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = validate(loginSchema, req.body);

    const resp = await userService.validateUserLogin(validatedData);
    const { code, ...rest } = resp;
    res.status(code).json(rest);
  } catch (error) {
    next(error);
  }
};
