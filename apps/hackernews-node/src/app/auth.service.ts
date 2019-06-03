import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from './generated/prisma-client';
import { User } from './models/user';

@Injectable()
export class AuthService {
  private prisma: Prisma;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {
    this.prisma = prismaService.prisma;
  }

  signIn(user: User): string {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: User): Promise<User> {
    return await this.prisma.user({ email: payload.email });
  }
}
