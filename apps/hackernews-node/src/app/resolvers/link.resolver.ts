import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
  Subscription
} from '@nestjs/graphql';
import { Link } from '../models/link';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../generated/prisma-client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../gql-auth.guard';
import { User as CurrentUser } from '../user.decorator';
import { User } from '../models/user';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(of => Link)
export class LinkResolver {
  prisma: Prisma;
  constructor(private readonly prismaService: PrismaService) {
    this.prisma = prismaService.prisma;
  }

  @Query(returns => [Link])
  async feed() {
    return await this.prisma.links();
  }

  @ResolveProperty()
  async postedBy(@Parent() parent: Link) {
    return await this.prisma.link({ id: parent.id }).postedBy();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Link)
  async post(
    @Args('url') url: string,
    @Args('description') description: string,
    @CurrentUser() user: User
  ) {
    return await this.prisma.createLink({
      url,
      description,
      postedBy: { connect: { id: user.id } }
    });
  }

  @Subscription(returns => Link)
  newLink() {
    return pubSub.asyncIterator('newLink');
  }
}
