import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Link {
  @Field(type => ID)
  id: string;
  @Field()
  description: string;
  @Field()
  url: string;
}
