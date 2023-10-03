import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const [type, token] = req.headers.authorization.split(' ')
        if (type !== 'Bearer' || !token) throw new UnauthorizedException('User is not authorized')
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_TOKEN_SECRET })
            req['user'] = payload
        } catch (error) {
            throw new UnauthorizedException('User is not authorized')
        }
        return true
    }
}