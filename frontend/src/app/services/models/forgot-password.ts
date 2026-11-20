/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface ForgotPassword {
  expiration?: string;
  id?: number;
  otp?: number;
  user?: User;
}
