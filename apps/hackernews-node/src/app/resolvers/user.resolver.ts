import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../generated/prisma-client';
import { User } from '../models/user';

@Resolver(of => User)
export class UserResolver {
  prisma: Prisma;
  constructor(private readonly prismaService: PrismaService) {
    this.prisma = prismaService.prisma;
  }

  @ResolveProperty()
  async links(@Parent() parent: User) {
    return await this.prisma.user({ id: parent.id }).links();
  }
}
