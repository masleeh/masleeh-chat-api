import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conversations } from './conversations.model';
import { User } from 'src/user/user.model';
import { createConversationDto } from './dto/createConversation.dto';
import { nanoid } from 'nanoid';
import { Participants } from 'src/models/participants.model';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectModel(Conversations) private convRepo: typeof Conversations,
        @InjectModel(Participants) private partRepo: typeof Participants
    ) {}

    async getAllConversations(user_id: string) {
        
        const userConvs = await this.convRepo.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_id', 'username', 'profile_pic'],
                    required: true,
                },
                {
                    model: Participants,
                    attributes: [],
                    required: true,
                    where: {
                        '$participants.user_id$': user_id
                    }
                }
            ],
            order: [
                ['updatedAt', 'DESC']
            ],
        })
        return userConvs
    }

    async createConversation(dto: createConversationDto) {
        const checkConv = await this.partRepo.findOne({
            attributes: [
                'conv_id',
                [sequelize.fn('COUNT', dto.user_ids.length), 'conv_count']
            ],
            group: 'conv_id',
            where: {
                user_id: {
                    [Op.in]: dto.user_ids
                }
            },
            having: {
                $conv_count$: {
                    [Op.gte]: dto.user_ids.length
                }
            }
        })

        if (checkConv) {
            return { conv_id: checkConv.conv_id }
        }

        const conv_id = nanoid(25)
        const participants = dto.user_ids.map(item => ({
            conv_id: conv_id,
            user_id: item
        }))

        const userConv = await this.convRepo.create({
            title: dto.title ?? '',
            type: dto.type ?? 'private',
            conv_id: conv_id,
            participants: participants
        }, {
            include: [ Participants ]
        })
        
        return {conv_id: userConv.conv_id}
    }

    
}
