import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { getConvMessagesDto, getConvMessagesSchema } from './dto/getConvMessages.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { createMessageDto, createMessageSchema } from './dto/createMessage.dto';

@Controller('/mes')
export class MessagesController {
    constructor (
        private messagesService: MessagesService
    ) {}

    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(getConvMessagesSchema))
    @Get()
    async getConvMessages(@Query() dto: getConvMessagesDto) {
        return await this.messagesService.getConvMessages(dto)
    }

    // @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(createMessageSchema))
    @Post()
    async createMessage(@Body() dto: createMessageDto) {
        return await this.messagesService.createMessage(dto)
    }
}
