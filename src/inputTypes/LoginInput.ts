import { InputType, Field } from "type-graphql";
import { User } from "../entity/User";

@InputType({ description: "login input data" })
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
