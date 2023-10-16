import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserTokens } from './tokens.model';
import { saveTokenDto } from './dto/saveToken.dto';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokensService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        @InjectModel(UserTokens) private userTokensRepo: typeof UserTokens,
        @InjectModel(User) private userRepo: typeof User
    ) {}

    async generateUserTokens(user_id: string) {
        const accessToken = await this.generateAuthToken(user_id)
        const refreshToken = await this.jwtService.signAsync({user_id}, { 
            expiresIn: '15d', 
            secret: process.env.JWT_REFRESH_TOKEN_SECRET 
        } as JwtSignOptions)

        await this.saveRefreshToken({ user_id, refresh_token: refreshToken })
        return {accessToken, refreshToken}
    }

    async refreshToken(token: string) {
        if (!token) throw new HttpException('Token is not provided', HttpStatus.BAD_REQUEST)
        const payload: string = await this.validateRefreshToken(token)
        const user = await this.userRepo.findOne({ where: { user_id: payload } })
        if (!user) throw new HttpException('Unknown error', HttpStatus.INTERNAL_SERVER_ERROR)

        const accessToken = await this.generateAuthToken(user.user_id)
        return {accessToken, userData: this.userService.safeFilterUser(user)}
    }

    private async saveRefreshToken(dto: saveTokenDto) {
        const token = await this.userTokensRepo.create(dto)
        return token
    }

    private async validateRefreshToken(token: string) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET as string
        })
        if (!payload) throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
        const dbToken = await this.userTokensRepo.findOne({ where: { refresh_token: token, user_id: payload.user_id }})
        if (!dbToken) throw new HttpException('User is not Authorized', HttpStatus.UNAUTHORIZED)
        return payload.user_id
    }

    private async generateAuthToken(user_id: string) {
        const accessToken = await this.jwtService.signAsync({user_id}, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: '15m'
        } as JwtSignOptions)

        return accessToken
    }
}
