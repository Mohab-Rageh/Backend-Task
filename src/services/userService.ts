import { Repository } from "typeorm";
import { User } from "../models/User";
import { LoginInput, RegisterUserInput } from "../validators/userValidator";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async registerUser(data: RegisterUserInput) {
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
      return { code: 500, message: "Error registering user" };
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUserLogin(data: LoginInput) {
    const user = await this.findUserByEmail(data.email);
    console.log({ user });
    if (user) {
      bcrypt.compare(data.password, user.password);
      const token = generateToken({ ...user });
      return { token, code: 200, message: "Login successful" };
    }
    return { code: 401, message: "Invalid email or password" };
  }
}
