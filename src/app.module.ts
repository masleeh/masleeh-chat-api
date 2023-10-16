import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from "./user/user.model";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { UserTokens } from "./tokens/tokens.model";
import { ConversationsModule } from './conversations/conversations.module';
import { Conversations } from "./conversations/conversations.model";
import { Participants } from "./models/participants.model";


@Module({
    controllers: [UserController, AuthController],
    providers: [AuthService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            models: [
                User,
                UserTokens,
                Conversations,
                Participants
            ],
            autoLoadModels: true,
            synchronize: true
        }),
        UserModule,
        AuthModule,
        TokensModule,
        ConversationsModule
    ]
})
export class AppModule {}