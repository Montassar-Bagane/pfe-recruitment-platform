/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addApplication } from '../fn/application-controller/add-application';
import { AddApplication$Params } from '../fn/application-controller/add-application';
import { Application } from '../models/application';
import { ApplicationToCandidateDto } from '../models/application-to-candidate-dto';
import { ApplicationToRecruiterDto } from '../models/application-to-recruiter-dto';
import { deleteApplication } from '../fn/application-controller/delete-application';
import { DeleteApplication$Params } from '../fn/application-controller/delete-application';
import { getAllApplications } from '../fn/application-controller/get-all-applications';
import { GetAllApplications$Params } from '../fn/application-controller/get-all-applications';
import { getApplicationsByCandidateId } from '../fn/application-controller/get-applications-by-candidate-id';
import { GetApplicationsByCandidateId$Params } from '../fn/application-controller/get-applications-by-candidate-id';
import { getApplicationsByJobId } from '../fn/application-controller/get-applications-by-job-id';
import { GetApplicationsByJobId$Params } from '../fn/application-controller/get-applications-by-job-id';
import { getCv } from '../fn/application-controller/get-cv';
import { GetCv$Params } from '../fn/application-controller/get-cv';
import { getNumberApplicationsByJobId } from '../fn/application-controller/get-number-applications-by-job-id';
import { GetNumberApplicationsByJobId$Params } from '../fn/application-controller/get-number-applications-by-job-id';
import { getNumberOfApplications } from '../fn/application-controller/get-number-of-applications';
import { GetNumberOfApplications$Params } from '../fn/application-controller/get-number-of-applications';
import { updateApplicationToAccepted } from '../fn/application-controller/update-application-to-accepted';
import { UpdateApplicationToAccepted$Params } from '../fn/application-controller/update-application-to-accepted';
import { updateApplicationToRefused } from '../fn/application-controller/update-application-to-refused';
import { UpdateApplicationToRefused$Params } from '../fn/application-controller/update-application-to-refused';

@Injectable({ providedIn: 'root' })
export class ApplicationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateApplicationToRefused()` */
  static readonly UpdateApplicationToRefusedPath = '/api/applications/updateApplicationToRefused/{idapplication}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateApplicationToRefused()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateApplicationToRefused$Response(params: UpdateApplicationToRefused$Params, context?: HttpContext): Observable<StrictHttpResponse<Application>> {
    return updateApplicationToRefused(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateApplicationToRefused$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateApplicationToRefused(params: UpdateApplicationToRefused$Params, context?: HttpContext): Observable<Application> {
    return this.updateApplicationToRefused$Response(params, context).pipe(
      map((r: StrictHttpResponse<Application>): Application => r.body)
    );
  }

  /** Path part for operation `updateApplicationToAccepted()` */
  static readonly UpdateApplicationToAcceptedPath = '/api/applications/updateApplicationToAccepted/{idapplication}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateApplicationToAccepted()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateApplicationToAccepted$Response(params: UpdateApplicationToAccepted$Params, context?: HttpContext): Observable<StrictHttpResponse<Application>> {
    return updateApplicationToAccepted(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateApplicationToAccepted$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateApplicationToAccepted(params: UpdateApplicationToAccepted$Params, context?: HttpContext): Observable<Application> {
    return this.updateApplicationToAccepted$Response(params, context).pipe(
      map((r: StrictHttpResponse<Application>): Application => r.body)
    );
  }

  /** Path part for operation `addApplication()` */
  static readonly AddApplicationPath = '/api/applications/addApplication/{idcandidate}/{idjob}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addApplication()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addApplication$Response(params: AddApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<Application>> {
    return addApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addApplication$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  addApplication(params: AddApplication$Params, context?: HttpContext): Observable<Application> {
    return this.addApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<Application>): Application => r.body)
    );
  }

  /** Path part for operation `getNumberOfApplications()` */
  static readonly GetNumberOfApplicationsPath = '/api/applications/getNumberOfApplications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNumberOfApplications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfApplications$Response(params?: GetNumberOfApplications$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getNumberOfApplications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNumberOfApplications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfApplications(params?: GetNumberOfApplications$Params, context?: HttpContext): Observable<number> {
    return this.getNumberOfApplications$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getNumberApplicationsByJobId()` */
  static readonly GetNumberApplicationsByJobIdPath = '/api/applications/getNumberApplicationsByJobId/{JobId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNumberApplicationsByJobId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberApplicationsByJobId$Response(params: GetNumberApplicationsByJobId$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getNumberApplicationsByJobId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNumberApplicationsByJobId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberApplicationsByJobId(params: GetNumberApplicationsByJobId$Params, context?: HttpContext): Observable<number> {
    return this.getNumberApplicationsByJobId$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getCv()` */
  static readonly GetCvPath = '/api/applications/getCV/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCv()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCv$Response(params: GetCv$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getCv(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCv$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCv(params: GetCv$Params, context?: HttpContext): Observable<Blob> {
    return this.getCv$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /** Path part for operation `getApplicationsByJobId()` */
  static readonly GetApplicationsByJobIdPath = '/api/applications/getApplicationsByJobId/{JobId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationsByJobId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationsByJobId$Response(params: GetApplicationsByJobId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApplicationToRecruiterDto>>> {
    return getApplicationsByJobId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationsByJobId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationsByJobId(params: GetApplicationsByJobId$Params, context?: HttpContext): Observable<Array<ApplicationToRecruiterDto>> {
    return this.getApplicationsByJobId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApplicationToRecruiterDto>>): Array<ApplicationToRecruiterDto> => r.body)
    );
  }

  /** Path part for operation `getApplicationsByCandidateId()` */
  static readonly GetApplicationsByCandidateIdPath = '/api/applications/getApplicationsByCandidateId/{CandidateId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApplicationsByCandidateId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationsByCandidateId$Response(params: GetApplicationsByCandidateId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApplicationToCandidateDto>>> {
    return getApplicationsByCandidateId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getApplicationsByCandidateId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApplicationsByCandidateId(params: GetApplicationsByCandidateId$Params, context?: HttpContext): Observable<Array<ApplicationToCandidateDto>> {
    return this.getApplicationsByCandidateId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ApplicationToCandidateDto>>): Array<ApplicationToCandidateDto> => r.body)
    );
  }

  /** Path part for operation `getAllApplications()` */
  static readonly GetAllApplicationsPath = '/api/applications/getAllApplications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllApplications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllApplications$Response(params?: GetAllApplications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Application>>> {
    return getAllApplications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllApplications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllApplications(params?: GetAllApplications$Params, context?: HttpContext): Observable<Array<Application>> {
    return this.getAllApplications$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Application>>): Array<Application> => r.body)
    );
  }

  /** Path part for operation `deleteApplication()` */
  static readonly DeleteApplicationPath = '/api/applications/deleteApplication/{idcandidate}/{idapplication}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteApplication()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplication$Response(params: DeleteApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteApplication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteApplication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteApplication(params: DeleteApplication$Params, context?: HttpContext): Observable<void> {
    return this.deleteApplication$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
