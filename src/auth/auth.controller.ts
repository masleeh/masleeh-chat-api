import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDTO } from './dto/registerUser.dto';
import { Response } from 'express';
import { loginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    async registerUser(@Body() dto: registerUserDTO, @Res() res: Response) {
        const tokens = await this.authService.register(dto)
        res.cookie('refreshToken', tokens.refresh_token, { maxAge: 1000*60*60*24*15, httpOnly: true, secure: true })
        return { access_token: tokens.access_token }
    }

    @Post('/login')
    async loginUser(@Body() dto: loginUserDto, @Res() res: Response) {
        const tokens = await this.authService.login(dto)
        res.cookie('refreshToken', tokens.refresh_token, { maxAge: 1000*60*60*24*15, httpOnly: true, secure: true })
        return { access_token: tokens.access_token }
    }
}
