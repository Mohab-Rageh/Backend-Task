import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Blog } from "../models/Blog";

export const createBlog = async (req: Request, res: Response) => {
  const { title, content, tags } = req.body;

  try {
    const blog = AppDataSource.getRepository(Blog).create({
      title,
      content,
      tags: tags.split(","),
      author: req.user,
    });
    await AppDataSource.getRepository(Blog).save(blog);

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// Similar for updateBlog, deleteBlog, and getBlogs
