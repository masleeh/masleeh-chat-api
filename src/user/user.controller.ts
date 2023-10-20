import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { searchUsersDto, searchUsersDtoSchema } from './dto/searchUsers.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { User } from './user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadPicDto } from './dto/uploadPic.dto';

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

    @ApiOperation({ summary: 'Upload user profile pic' })
    @ApiResponse({ status: 201, type: 'Pic link' })
    @UseGuards(AuthGuard)
    @Post('/pic')
    @UseInterceptors(FileInterceptor('image'))
    async uploadProfilePic(
        @Body() dto: uploadPicDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'jpeg',
                })
                .addMaxSizeValidator({
                    maxSize: 1024*1024*5
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        ) image: Express.Multer.File
    ) {
        return await this.userService.uploadProfilePic(image, dto)
    }
}
