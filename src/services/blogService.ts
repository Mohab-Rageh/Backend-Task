import { Repository } from "typeorm";
import { Blog } from "../models/Blog";
import { AppDataSource } from "../data-source";
import { CustomError } from "../utils/CustomError";
import {
  CreateBlogInput,
  createBlogSchema,
  GetBlogsInput,
  UpdateBlogInput,
  updateBlogSchema,
} from "../validators/blogValidator";
import { z } from "zod";

export class BlogService {
  private blogRepository: Repository<Blog>;

  constructor() {
    this.blogRepository = AppDataSource.getRepository(Blog);
  }

  async createBlog(data: CreateBlogInput) {
    try {
      const blog = this.blogRepository.create(data);
      await this.blogRepository.save(data);

      return { code: 201, message: "Blog created successfully", blog };
    } catch (error) {
      throw new CustomError("Failed to create blog", 500);
    }
  }

  async getAllBlogs(filters: GetBlogsInput) {
    try {
      const { page = 1, limit = 10, tags } = filters;
      const data = await this.blogRepository.find({
        where: tags
          ? {
              tags: tags,
            }
          : undefined,
        take: limit,
        skip: (page - 1) * limit,
      });

      return { code: 200, message: "Blogs fetched successfully", data };
    } catch (error) {
      throw new CustomError("Failed to fetch blogs", 500);
    }
  }

  async updateBlog(id: number, data: UpdateBlogInput) {
    try {
      const blog = await this.blogRepository.findOneBy({ id });

      if (!blog) {
        throw new CustomError("Blog not found", 404);
      }

      await this.blogRepository.update(id, data);
      const updatedBlog = await this.blogRepository.findOneBy({ id });
      return { code: 200, message: "Blog updated successfully", updatedBlog };
    } catch (error) {
      throw new CustomError("Failed to update blog", 500);
    }
  }

  async deleteBlog(id: number) {
    try {
      const blog = await this.blogRepository.findOneBy({ id });
      if (!blog) {
        throw new CustomError("Blog not found", 404);
      }

      await this.blogRepository.delete(id);
      return { code: 200, message: "Blog deleted successfully" };
    } catch (error) {
      throw new CustomError("Failed to delete blog", 500);
    }
  }
}
