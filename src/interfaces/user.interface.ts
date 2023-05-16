export interface IUser {
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILogin {
  username: string;
  password: string;
}
