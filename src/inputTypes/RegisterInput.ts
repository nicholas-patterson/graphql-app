import { InputType, Field } from "type-graphql";
import { User } from "../entity/User";

@InputType({ description: "new user data" })
export class RegisterInput implements Partial<User> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
