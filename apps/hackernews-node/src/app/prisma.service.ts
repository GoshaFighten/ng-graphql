import { Injectable } from '@nestjs/common';
import { prisma } from './generated/prisma-client';

@Injectable()
export class PrismaService {
  prisma = prisma;
}
