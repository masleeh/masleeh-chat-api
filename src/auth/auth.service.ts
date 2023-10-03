import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { registerUserDTO } from './dto/registerUser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { loginUserDto } from './dto/loginUser.dto';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private tokensService: TokensService
    ) {}

    async register(dto: registerUserDTO) {
        const checkUser = await this.userService.getUserByUsername(dto.username)
        if (checkUser) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)

        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(dto.password, salt)

        const user = await this.userService.createUser({ ...dto, password })
        const tokens = await this.tokensService.generateUserTokens(user.user_id)

        return { access_token: tokens.accessToken, refresh_token: tokens.refreshToken }
    }

    async login(dto: loginUserDto) {
        const user = await this.userService.getUserByUsername(dto.username)
        if (!user) throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST)

        const isPasswordCorrect = await bcrypt.compare(dto.password, user.password)
        if (!isPasswordCorrect) throw new HttpException("Incorrect password", HttpStatus.BAD_REQUEST)

        const tokens = await this.tokensService.generateUserTokens(user.user_id)

        return { access_token: tokens.accessToken, refresh_token: tokens.refreshToken }
    }
}
