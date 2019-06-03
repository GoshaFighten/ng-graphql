import { Resolver, Mutation, Args } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import { AuthPayload } from '../models/auth-payload';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../generated/prisma-client';
import { AuthService } from '../auth.service';

@Resolver(of => AuthPayload)
export class AuthPayloadResolver {
  private prisma: Prisma;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  ) {
    this.prisma = prismaService.prisma;
  }

  @Mutation(returns => AuthPayload)
  async signup(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string
  ) {
    const pass = await bcrypt.hash(password, 10);
    const user = await this.prisma.createUser({ email, name, password: pass });
    const token = this.authService.signIn(user);

    return {
      token,
      user
    };
  }

  @Mutation(returns => AuthPayload)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.prisma.user({ email });
    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = this.authService.signIn(user);

    return {
      token,
      user
    };
  }
}
