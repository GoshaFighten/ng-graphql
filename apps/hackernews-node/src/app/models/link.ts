import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Link {
  @Field(type => ID)
  id: string;
  @Field()
  description: string;
  @Field()
  url: string;
  @Field(type => User, { nullable: true })
  postedBy: User;
}
