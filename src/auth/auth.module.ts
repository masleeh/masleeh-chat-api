import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
    imports: [
        forwardRef(() => UserModule),
        TokensModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
