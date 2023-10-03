import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserTokens } from './tokens.model';
import { saveTokenDto } from './dto/saveToken.dto';

@Injectable()
export class TokensService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(UserTokens) private userTokensRepo: typeof UserTokens
    ) {}

    async generateUserTokens(user_id: string) {
        const accessToken = await this.jwtService.signAsync(user_id, { expiresIn: '15m' } as JwtSignOptions )
        const refreshToken = await this.jwtService.signAsync(user_id, { 
            expiresIn: '15d', 
            secret: process.env.JWT_REFRESH_TOKEN_SECRET 
        } as JwtSignOptions)

        await this.saveRefreshToken({ user_id, refresh_token: refreshToken })
        return {accessToken, refreshToken}
    }

    private async saveRefreshToken(dto: saveTokenDto) {
        const token = await this.userTokensRepo.create(dto)
        return token
    }
}
