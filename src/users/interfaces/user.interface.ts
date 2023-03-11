export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  address?: string;
  website?: string;
  bankName?: string;
  bankAccount?: string;
}
