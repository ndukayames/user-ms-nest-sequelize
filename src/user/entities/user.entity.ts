// src/users/user.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('user', 'admin'),
    defaultValue: 'user',
  })
  role: 'user' | 'admin';
}
