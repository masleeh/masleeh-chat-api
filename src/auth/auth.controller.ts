import { Body, Controller, Get, Post, Req, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerUserDTO, registerUserDTOSchema } from './dto/registerUser.dto';
import { Request, Response } from 'express';
import { loginUserDto, loginUserDtoSchema } from './dto/loginUser.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Authorization')
@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokensService: TokensService
    ) {}

    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({ status: 201 })
    @UsePipes(new ZodValidationPipe(registerUserDTOSchema))
    @Post('/register')
    async registerUser(@Body() dto: registerUserDTO, @Res() res: Response) {
        const result = await this.authService.register(dto)
        res.cookie('refreshToken', result.refresh_token, { maxAge: 1000*60*60*24*15, httpOnly: true, secure: true })
        return res.status(201).json({ access_token: result.access_token, userData: result.userData })
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200 })
    @UsePipes(new ZodValidationPipe(loginUserDtoSchema))
    @Post('/login')
    async loginUser(@Body() dto: loginUserDto, @Res() res: Response) {
        const result = await this.authService.login(dto)
        res.cookie('refreshToken', result.refresh_token, { maxAge: 1000*60*60*24*15, httpOnly: true, secure: true })
        console.log(result)
        return res.status(200).json({ access_token: result.access_token, userData: result.userData })
    }

    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 200 })
    @Get('/refresh')
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const { refreshToken } = req.cookies
        const result = await this.tokensService.refreshToken(refreshToken)
        // res.cookie('refreshToken', result.refreshToken, { maxAge: 1000*60*60*24*15, httpOnly: true, secure: true })
        return res.status(200).json({ access_token: result.accessToken, userData: result.userData })
    }
}
