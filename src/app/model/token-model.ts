export interface ITokenData {
  user?: User
  token?: Token
}

export interface User {
  id: number;
  name: string;
  fullName: string;
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
export enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher'
}

export interface Token {
  access_token: string
  refresh_token: string
}