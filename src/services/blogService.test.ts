import { BlogService } from "../services/blogService";
import { Blog } from "../models/Blog";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

jest.mock("../data-source");

describe("BlogService", () => {
  let blogService: BlogService;
  let blogRepository: jest.Mocked<Repository<Blog>>;

  beforeEach(() => {
    blogRepository = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<Repository<Blog>>;

    AppDataSource.getRepository = jest.fn().mockReturnValue(blogRepository);
    blogService = new BlogService();
  });

  it("should create a blog", async () => {
    const blogData = { title: "Test Blog", content: "Content here", tags: [] };
    const createdBlog = { ...blogData, id: 1 };

    blogRepository.create.mockReturnValue(createdBlog);
    blogRepository.save.mockResolvedValue(createdBlog);

    const response = await blogService.createBlog(blogData);
    expect(response.code).toBe(201);
    expect(response.blog).toEqual(createdBlog);
  });

  it("should fail to create a blog", async () => {
    const blogData = { title: "Test Blog", content: "Content here", tags: [] };

    blogRepository.save.mockRejectedValue(new Error("Failed to create blog"));

    await expect(blogService.createBlog(blogData)).rejects.toThrow(
      "Failed to create blog"
    );
  });
});
