import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTokens } from './tokens.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokensService],
  exports: [TokensService],
  imports: [
    SequelizeModule.forFeature([UserTokens]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      global: true
    })
  ]
})
export class TokensModule {}
