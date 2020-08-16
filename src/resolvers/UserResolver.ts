import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { RegisterInput } from "../inputTypes/RegisterInput";
import { LoginInput } from "../inputTypes/LoginInput";

@Resolver()
export class UserResolver {
  userRepository = getRepository(User);

  @Query(() => User)
  async getUser(@Arg("id") id: number): Promise<User | null> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return null;
    }

    return user;
  }
}
