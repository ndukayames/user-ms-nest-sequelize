import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}
