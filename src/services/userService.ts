import { Repository } from "typeorm";
import { User } from "../models/User";
import { LoginInput, RegisterUserInput } from "../validators/userValidator";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { CustomError } from "../utils/CustomError";
import { Role } from "../models/Role";

export class UserService {
  private userRepository: Repository<User>;
  private roleRepository: Repository<Role>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async registerUser(data: RegisterUserInput) {
    const userExists = await this.findUserByEmail(data.email);
    if (userExists) {
      throw new CustomError("User already exists", 409);
    }

    if (data.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: data.roleId },
      });
      if (!role) {
        throw new CustomError("Role not found", 404);
      }
    }

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.userRepository.create({
        ...data,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      return { code: 201, message: "User registered successfully" };
    } catch (error) {
      console.log(error);
      throw new CustomError("User registration failed", 500);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUserLogin(data: LoginInput) {
    const user = await this.findUserByEmail(data.email);

    if (user) {
      bcrypt.compare(data.password, user.password);
      const token = generateToken({ ...user });
      return { token, code: 200, message: "Login successful" };
    }

    throw new CustomError("Invalid email or password", 401);
  }
}
