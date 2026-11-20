/* tslint:disable */
/* eslint-disable */
export interface ApplicationToCandidateDto {
  company?: string;
  id?: number;
  status?: 'IN_PROCESS' | 'ACCEPTED' | 'REFUSED';
  title?: string;
  type?: string;
}
