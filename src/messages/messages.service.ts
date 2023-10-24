import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from './messages.model';
import { getConvMessagesDto } from './dto/getConvMessages.dto';
import { createMessageDto } from './dto/createMessage.dto';
import { nanoid } from 'nanoid';
import { ConversationsService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagesService {
    constructor (
        @InjectModel(Messages) private messagesRepo: typeof Messages,
        private conversationsService: ConversationsService
    ) {}

    async getConvMessages(dto: getConvMessagesDto) {
        const messages = await this.messagesRepo.findAll({
            where: {
                conv_id: dto.conv_id
            }
        })
        return messages
    }

    async createMessage(dto: createMessageDto) {
        const mes_id = nanoid(35)
        const message = await this.messagesRepo.create({
            ...dto, mes_id
        })
        await this.conversationsService.updateLastMessage({
            conv_id: dto.conv_id,
            mes_id: mes_id
        })        
        return message
    }
}
