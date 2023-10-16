import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { AddParticipant, Participants } from "src/models/participants.model";
import { User } from "src/user/user.model";

interface CreateConversation {
    title?: string;
    conv_id: string;
    type: string;
    participants?: AddParticipant[];
}

@Table({
    tableName: 'chat_conversations'
})
export class Conversations extends Model<Conversations, CreateConversation> {

    @ApiProperty({ example: '_zj9xDaTaHr5PyLTnqcU9TVUw', description: 'Id of conversation' })
    @Column({ type: DataType.STRING, unique: true, primaryKey: true, allowNull: false })
    conv_id: string
    
    @ApiProperty({ example: 'Cool guys chat', description: 'Title of group conversation' })
    @Column({ type: DataType.STRING })
    title: string
    
    @ApiProperty({ example: 'private', description: 'Type of conversation. Type: private | group' })
    @Column({ type: DataType.STRING })
    type: string
    
    @ApiProperty({ example: 'hahahaha', description: 'Last message' })
    @Column({ type: DataType.STRING })
    last_message: string
    
    @BelongsToMany(() => User, () => Participants)
    users: User[]
    
    @ApiProperty({ example: [{username: 'masleeh', user_id: 'aWqdVyzN-BT7', profile_pic: 'localhost:5000/pics/7p3YxyvZruvN'}], description: 'Last message' })
    @HasMany(() => Participants)
    participants: Participants[]
}