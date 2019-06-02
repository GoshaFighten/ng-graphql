import { Field, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;
  @Field(type => User)
  user: User;
}
