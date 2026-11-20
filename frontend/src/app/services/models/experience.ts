/* tslint:disable */
/* eslint-disable */
import { Candidate } from '../models/candidate';
export interface Experience {
  candidate?: Candidate;
  city?: string;
  description?: string;
  end_date?: string;
  id?: number;
  organization?: string;
  start_date?: string;
  title?: string;
}
