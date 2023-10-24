import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from "./user/user.model";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { UserTokens } from "./tokens/tokens.model";
import { ConversationsModule } from './conversations/conversations.module';
import { Conversations } from "./conversations/conversations.model";
import { Participants } from "./models/participants.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from "path";
import { MessagesModule } from './messages/messages.module';
import { Messages } from "./messages/messages.model";


@Module({
    controllers: [UserController, AuthController],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, '..', 'static', 'users'),
            serveRoot: '/users'
        }),
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
                Participants,
                Messages
            ],
            autoLoadModels: true,
            synchronize: true
        }),
        UserModule,
        AuthModule,
        TokensModule,
        ConversationsModule,
        FilesModule,
        MessagesModule
    ]
})
export class AppModule {}