import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { searchUsersDto, searchUsersDtoSchema } from './dto/searchUsers.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('Users')
@Controller('/user')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Search user by query string' })
    @ApiResponse({ status: 200, type: OmitType(User, ['password'])})
    @UseGuards(AuthGuard)
    @UsePipes(new ZodValidationPipe(searchUsersDtoSchema))
    @Post('/search')
    async searchUsersByUsername(@Body() dto: searchUsersDto) {
        return await this.userService.searchUsersByUsername(dto)
    }
}
