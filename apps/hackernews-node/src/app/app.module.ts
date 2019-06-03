import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { LinkResolver } from './resolvers/link.resolver';
import { PrismaService } from './prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthPayloadResolver } from './resolvers/auth-payload.resolver';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'GraphQL-is-aw3some',
      signOptions: {
        expiresIn: 3600
      }
    })
  ],
  providers: [
    LinkResolver,
    AuthPayloadResolver,
    UserResolver,
    PrismaService,
    AuthService,
    JwtStrategy
  ]
})
export class AppModule {}
