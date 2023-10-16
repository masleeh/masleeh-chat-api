import { Module, forwardRef } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversations } from './conversations.model';
import { User } from 'src/user/user.model';
import { Participants } from 'src/models/participants.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsService],
  imports: [
    SequelizeModule.forFeature([
      Conversations,
      User,
      Participants
    ]),
    forwardRef(() => AuthModule)
  ],
  exports: [

  ]
})
export class ConversationsModule {}
