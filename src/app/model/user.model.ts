import { Role } from "./token-model";

export interface IUser {
    id: number;
    name: string;
    skill: string;
    created: Date;
    email: string;
    is_active: boolean;
    is_deleted: boolean;
    lastname: string;
    picture: string;
    pushNotificationToken: string;
    updated: Date;
    role?: Role;

}
