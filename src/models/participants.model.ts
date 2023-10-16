import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Conversations } from "src/conversations/conversations.model";
import { User } from "src/user/user.model";

export interface AddParticipant {
    user_id: string;
    conv_id: string;
}

@Table({
    tableName: 'chat_participants',
    createdAt: false,
    updatedAt: false
})
export class Participants extends Model<Participants, AddParticipant> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false, unique: false })
    user_id: string

    @ForeignKey(() => Conversations)
    @Column({ type: DataType.STRING, allowNull: false, unique: false })
    conv_id: string

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Conversations)
    conversations: Conversations
}