import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUser {
    user_id: string;
    username: string;
    password: string;
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, IUser> {
    @Column({ type: DataType.STRING, unique: true, primaryKey: true, allowNull: false })
    user_id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING })
    profile_pic: string;
}