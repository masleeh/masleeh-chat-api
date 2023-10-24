import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Conversations } from "src/conversations/conversations.model";

interface IMessage {
    mes_id: string;
    user_id: string;
    conv_id: string;
    type?: string;
    body: string;
}

@Table({
    tableName: 'chat_messages'
})
export class Messages extends Model<Messages, IMessage> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false, primaryKey: true })
    mes_id: string;
    
    @Column({ type: DataType.STRING, allowNull: false })
    user_id: string;
    
    @ForeignKey(() => Conversations)
    @Column({ type: DataType.STRING, allowNull: false })
    conv_id: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'unread' })
    status: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'text' })
    type: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    body: string;

    @BelongsTo(() => Conversations)
    conversation: Conversations
}