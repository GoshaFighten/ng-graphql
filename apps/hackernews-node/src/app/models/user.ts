import { Field, ID, ObjectType } from 'type-graphql';
import { Link } from './link';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(type => [Link])
  links: Link[];
}
