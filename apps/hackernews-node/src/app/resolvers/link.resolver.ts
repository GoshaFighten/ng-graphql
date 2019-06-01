import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Link } from '../models/link';

const links: Link[] = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];
let idCount = links.length;

@Resolver(of => Link)
export class AuthorResolver {
  constructor() {}

  @Query(returns => [Link])
  feed(): Link[] {
    return links;
  }

  @Mutation(returns => Link)
  post(@Args('url') url: string, @Args('description') description: string) {
    const link = {
      id: `link-${idCount++}`,
      description: description,
      url: url
    };
    links.push(link);
    return link;
  }
}
