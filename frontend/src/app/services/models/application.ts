/* tslint:disable */
/* eslint-disable */
import { Candidate } from '../models/candidate';
import { Job } from '../models/job';
export interface Application {
  candidate?: Candidate;
  cv?: string;
  description?: string;
  id?: number;
  job?: Job;
  status?: 'IN_PROCESS' | 'ACCEPTED' | 'REFUSED';
}
