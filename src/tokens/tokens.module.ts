import { Module, forwardRef } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTokens } from './tokens.model';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [TokensService],
  exports: [TokensService],
  imports: [
    SequelizeModule.forFeature([UserTokens, User]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      global: true,
    }),
    forwardRef(() => UserModule)
  ]
})
export class TokensModule {}
