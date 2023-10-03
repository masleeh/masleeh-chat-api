import { Column, Table, DataType, Model } from "sequelize-typescript";

interface IToken {
    refresh_token: string;
    user_id: string;
}

@Table({
    tableName: 'user_tokens',
    updatedAt: false
})
export class UserTokens extends Model<UserTokens, IToken> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true })
    id: number;
    
    @Column({ type: DataType.STRING, allowNull: false })
    refresh_token: string;

    @Column({ type: DataType.STRING, allowNull: false })
    user_id: string;
}