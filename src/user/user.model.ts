import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Conversations } from "src/conversations/conversations.model";
import { Participants } from "src/models/participants.model";


interface IUser {
    user_id: string;
    username: string;
    password: string;
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, IUser> {

    @ApiProperty({ example: 'aWqdVyzN-BT7', description: 'Unique user id' })
    @Column({ type: DataType.STRING, unique: true, primaryKey: true, allowNull: false })
    user_id: string;
    
    @ApiProperty({ example: 'masleeh', description: 'Unique username' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;
    
    @ApiProperty({ example: 'password', description: "User's password" })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
    
    @ApiProperty({ example: 'localhost:5000/pics/7p3YxyvZruvN', description: "User's profile pic link" })
    @Column({ type: DataType.STRING })
    profile_pic: string;
    
    @BelongsToMany(() => Conversations, () => Participants)
    conversations: Conversations[];
    
    @HasMany(() => Participants)
    participants: Participants[];
}