import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthorResolver } from './resolvers/link.resolver';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    })
  ],
  providers: [AuthorResolver, PrismaService]
})
export class AppModule {}
