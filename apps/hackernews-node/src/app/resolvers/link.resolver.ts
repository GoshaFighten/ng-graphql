import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Link } from '../models/link';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../generated/prisma-client';

@Resolver(of => Link)
export class AuthorResolver {
  prisma: Prisma;
  constructor(private readonly prismaService: PrismaService) {
    this.prisma = prismaService.prisma;
  }

  @Query(returns => [Link])
  feed() {
    return this.prisma.links();
  }

  @Mutation(returns => Link)
  post(@Args('url') url: string, @Args('description') description: string) {
    return this.prisma.createLink({
      url: url,
      description: description
    });
  }
}
