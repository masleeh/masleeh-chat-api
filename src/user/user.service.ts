import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { registerUserDTO } from 'src/auth/dto/registerUser.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepo: typeof User) {}

    async createUser(dto: registerUserDTO) {
        const user_id = nanoid(12)
        const user = await this.userRepo.create({
            ...dto,
            user_id
        })
        return user
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepo.findOne({ where: { username }, include: { all: true } })
        return user
    }
}
