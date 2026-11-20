/* tslint:disable */
/* eslint-disable */
export interface ApplicationToRecruiterDto {
  cv?: string;
  description?: string;
  email?: string;
  firstname?: string;
  id?: number;
  lastname?: string;
  phone?: string;
  status?: 'IN_PROCESS' | 'ACCEPTED' | 'REFUSED';
}
