/* tslint:disable */
/* eslint-disable */
import { ForgotPassword } from '../models/forgot-password';
import { GrantedAuthority } from '../models/granted-authority';
export interface Candidate {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  forgotPassword?: ForgotPassword;
  id?: number;
  lastname?: string;
  password?: string;
  phone?: string;
  role?: 'ADMIN' | 'RECRUITER' | 'CANDIDATE';
  username?: string;
}
