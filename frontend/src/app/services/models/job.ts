/* tslint:disable */
/* eslint-disable */
import { Recruiter } from '../models/recruiter';
export interface Job {
  company?: string;
  description?: string;
  id?: number;
  recruiter?: Recruiter;
  salary?: string;
  timeType?: string;
  title?: string;
  type?: string;
  unit?: string;
}
