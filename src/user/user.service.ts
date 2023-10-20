import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { registerUserDTO } from 'src/auth/dto/registerUser.dto';
import { nanoid } from 'nanoid';
import { searchUsersDto } from './dto/searchUsers.dto';
import { Op } from 'sequelize';
import { uploadPicDto } from './dto/uploadPic.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User) private userRepo: typeof User,
        private filesService: FilesService
    ) {}

    async createUser(dto: registerUserDTO) {
        const user_id = nanoid(12)
        const user = await this.userRepo.create({
            ...dto,
            user_id
        })
        return user
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepo.findOne({ 
            where: { username },
            // attributes: ['username', 'user_id', 'profile_pic']
        })
        return user
    }

    async searchUsersByUsername(dto: searchUsersDto) {
        const users = await this.userRepo.findAll({
            attributes: ['username', 'user_id', 'profile_pic'], 
            where: {
                username: {
                    [Op.substring]: dto.username
                }
        }})

        return users
    }

    safeFilterUser(userObj: User) {
        return {
            username: userObj.username,
            user_id: userObj.user_id,
            profile_pic: userObj.profile_pic
        }
    }

    async uploadProfilePic(image: Express.Multer.File, dto: uploadPicDto ) {
        if (!dto.user_id) throw new HttpException('User_id is not specified', HttpStatus.BAD_REQUEST)
        const fileName = await this.filesService.createFile(image, ['users'])

        const user = await this.userRepo.findOne({
            where: {
                user_id: dto.user_id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        await this.filesService.deleteFile(user.profile_pic)
        user.update({
            profile_pic: fileName
        })
        await user.save()
        
        return { profile_pic: fileName }
    }
}
