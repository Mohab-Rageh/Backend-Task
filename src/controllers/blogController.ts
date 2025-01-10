import { NextFunction, Request, Response } from "express";
import {
  createBlogSchema,
  getBlogsSchema,
  updateBlogSchema,
} from "../validators/blogValidator";
import { validate } from "../utils/zodValidator";
import { BlogService } from "../services/blogService";

const blogService = new BlogService();

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = validate(createBlogSchema, req.body);

    const resp = await blogService.createBlog(validatedData);
    const { code, ...rest } = resp;
    res.status(code).json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = validate(updateBlogSchema, req.body);
    const { id } = req.params;

    const resp = await blogService.updateBlog(Number(id), validatedData);
    const { code, ...rest } = resp;
    res.status(code).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const resp = await blogService.deleteBlog(Number(id));

    const { code, ...rest } = resp;
    res.status(code).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = validate(getBlogsSchema, req.body);

    const resp = await blogService.getAllBlogs(validatedData);
    const { code, ...rest } = resp;
    res.status(code).json(rest);
  } catch (error) {
    next(error);
  }
};
