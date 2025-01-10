import * as bcryptt from "bcrypt";
import { UserService } from "../services/userService";
import { User } from "../models/User";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { generateToken } from "../utils/jwt";
import { CustomError } from "../utils/CustomError";
import { Role } from "../models/Role";

jest.mock("../data-source");
jest.mock("../utils/jwt", () => ({
  generateToken: jest.fn().mockReturnValue("mockToken"),
}));

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Repository<User>>;
  let roleRepository: jest.Mocked<Repository<Role>>;
  let bcrypt: jest.Mocked<typeof bcryptt>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    roleRepository = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<Role>>;

    AppDataSource.getRepository = jest.fn().mockImplementation((entity) => {
      if (entity === User) return userRepository;
      if (entity === Role) return roleRepository;
    });

    userService = new UserService();

    bcrypt = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as unknown as jest.Mocked<typeof bcrypt>;
  });

  it("should register a new user successfully", async () => {
    const registerData = {
      email: "test@example.com",
      password: "password123",
      roleId: 1,
      name: "John Doe",
    };
    const hashedPassword = "hashedPassword123";
    const createdUser = { ...registerData, password: hashedPassword, id: 1 };

    roleRepository.findOne.mockResolvedValue({
      id: 1,
      name: "admin",
      permissions: [],
    });
    bcrypt.hash.mockResolvedValue(hashedPassword as never);
    userRepository.create.mockReturnValue(createdUser);
    userRepository.save.mockResolvedValue(createdUser);

    const response = await userService.registerUser(registerData);

    expect(response.code).toBe(201);
    expect(response.message).toBe("User registered successfully");
    expect(userRepository.save).toHaveBeenCalledWith(createdUser);
  });

  it("should throw error if user already exists", async () => {
    const registerData = {
      email: "test@example.com",
      password: "password123",
      roleId: 1,
      name: "John Doe",
    };

    userRepository.findOne.mockResolvedValue({ ...registerData, id: 1 });

    await expect(userService.registerUser(registerData)).rejects.toThrowError(
      new CustomError("User already exists", 409)
    );
  });

  it("should throw error if role not found during registration", async () => {
    const registerData = {
      email: "test@example.com",
      password: "password123",
      roleId: 999,
      name: "John Doe",
    };

    roleRepository.findOne.mockResolvedValue(null);

    await expect(userService.registerUser(registerData)).rejects.toThrowError(
      new CustomError("Role not found", 404)
    );
  });

  it("should throw error for invalid email or password during login", async () => {
    const loginData = { email: "test@example.com", password: "wrongPassword" };
    userRepository.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedPassword123",
      name: "John Doe",
      roleId: 1,
      id: 1,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(userService.validateUserLogin(loginData)).rejects.toThrowError(
      new CustomError("Invalid email or password", 401)
    );
  });
});
