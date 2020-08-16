import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { length: 50 })
  firstName: string;

  @Field()
  @Column("varchar", { length: 50 })
  lastName: string;

  @Field()
  @Column("varchar", { length: 75, unique: true })
  email: string;

  @Column()
  password: string;
}
