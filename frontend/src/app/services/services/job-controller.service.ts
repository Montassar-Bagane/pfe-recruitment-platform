/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addJob } from '../fn/job-controller/add-job';
import { AddJob$Params } from '../fn/job-controller/add-job';
import { deleteJob } from '../fn/job-controller/delete-job';
import { DeleteJob$Params } from '../fn/job-controller/delete-job';
import { getAllJobs } from '../fn/job-controller/get-all-jobs';
import { GetAllJobs$Params } from '../fn/job-controller/get-all-jobs';
import { getJobById } from '../fn/job-controller/get-job-by-id';
import { GetJobById$Params } from '../fn/job-controller/get-job-by-id';
import { getJobsByRecruiterId } from '../fn/job-controller/get-jobs-by-recruiter-id';
import { GetJobsByRecruiterId$Params } from '../fn/job-controller/get-jobs-by-recruiter-id';
import { getNumberOfJobs } from '../fn/job-controller/get-number-of-jobs';
import { GetNumberOfJobs$Params } from '../fn/job-controller/get-number-of-jobs';
import { Job } from '../models/job';
import { JobDto } from '../models/job-dto';
import { updateJob } from '../fn/job-controller/update-job';
import { UpdateJob$Params } from '../fn/job-controller/update-job';

@Injectable({ providedIn: 'root' })
export class JobControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateJob()` */
  static readonly UpdateJobPath = '/api/jobs/updateJob/{idrecruiter}/{idjob}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateJob$Response(params: UpdateJob$Params, context?: HttpContext): Observable<StrictHttpResponse<Job>> {
    return updateJob(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateJob(params: UpdateJob$Params, context?: HttpContext): Observable<Job> {
    return this.updateJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<Job>): Job => r.body)
    );
  }

  /** Path part for operation `addJob()` */
  static readonly AddJobPath = '/api/jobs/addJob/{idrecruiter}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addJob()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJob$Response(params: AddJob$Params, context?: HttpContext): Observable<StrictHttpResponse<Job>> {
    return addJob(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addJob$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJob(params: AddJob$Params, context?: HttpContext): Observable<Job> {
    return this.addJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<Job>): Job => r.body)
    );
  }

  /** Path part for operation `getNumberOfJobs()` */
  static readonly GetNumberOfJobsPath = '/api/jobs/getNumberOfJobs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNumberOfJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfJobs$Response(params?: GetNumberOfJobs$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getNumberOfJobs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNumberOfJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfJobs(params?: GetNumberOfJobs$Params, context?: HttpContext): Observable<number> {
    return this.getNumberOfJobs$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getJobsByRecruiterId()` */
  static readonly GetJobsByRecruiterIdPath = '/api/jobs/getJobsByRecruiterId/{idrecruiter}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobsByRecruiterId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobsByRecruiterId$Response(params: GetJobsByRecruiterId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JobDto>>> {
    return getJobsByRecruiterId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getJobsByRecruiterId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobsByRecruiterId(params: GetJobsByRecruiterId$Params, context?: HttpContext): Observable<Array<JobDto>> {
    return this.getJobsByRecruiterId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<JobDto>>): Array<JobDto> => r.body)
    );
  }

  /** Path part for operation `getJobById()` */
  static readonly GetJobByIdPath = '/api/jobs/getJobById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobById$Response(params: GetJobById$Params, context?: HttpContext): Observable<StrictHttpResponse<Job>> {
    return getJobById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getJobById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobById(params: GetJobById$Params, context?: HttpContext): Observable<Job> {
    return this.getJobById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Job>): Job => r.body)
    );
  }

  /** Path part for operation `getAllJobs()` */
  static readonly GetAllJobsPath = '/api/jobs/getAllJobs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllJobs$Response(params?: GetAllJobs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Job>>> {
    return getAllJobs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllJobs(params?: GetAllJobs$Params, context?: HttpContext): Observable<Array<Job>> {
    return this.getAllJobs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Job>>): Array<Job> => r.body)
    );
  }

  /** Path part for operation `deleteJob()` */
  static readonly DeleteJobPath = '/api/jobs/deleteJob/{idjob}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob$Response(params: DeleteJob$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteJob(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob(params: DeleteJob$Params, context?: HttpContext): Observable<void> {
    return this.deleteJob$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
