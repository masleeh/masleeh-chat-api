import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { getAllConversationsDto, getAllConversationsSchema } from './dto/getAllConversations.dto';
import { createConversationDto, createConversationDtoSchema } from './dto/createConversation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags, PickType } from '@nestjs/swagger';
import { Conversations } from './conversations.model';

@ApiTags('Conversations')
@Controller('/conversations')
export class ConversationsController {

    constructor(
        private convService: ConversationsService
    ) {}

    @ApiOperation({ summary: 'Get all user conversations' })
    @ApiResponse({ status: 200, type: Conversations })
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(getAllConversationsSchema))
    @Get()
    getAllConversations(@Query() dto: getAllConversationsDto) {
        return this.convService.getAllConversations(dto.user_id)
    }
    
    @ApiOperation({ summary: 'Create conversation' })
    @ApiResponse({ status: 201, type: PickType(Conversations, ['conv_id']) })
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(createConversationDtoSchema))
    @Post()
    createConversation(@Body() dto: createConversationDto) {
        return this.convService.createConversation(dto)
    }
}
