/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Candidate } from '../models/candidate';
import { deleteUser } from '../fn/account-management-controller/delete-user';
import { DeleteUser$Params } from '../fn/account-management-controller/delete-user';
import { getAllCandidates } from '../fn/account-management-controller/get-all-candidates';
import { GetAllCandidates$Params } from '../fn/account-management-controller/get-all-candidates';
import { getAllRecruiters } from '../fn/account-management-controller/get-all-recruiters';
import { GetAllRecruiters$Params } from '../fn/account-management-controller/get-all-recruiters';
import { getAllUsers } from '../fn/account-management-controller/get-all-users';
import { GetAllUsers$Params } from '../fn/account-management-controller/get-all-users';
import { getNumberOfCandidates } from '../fn/account-management-controller/get-number-of-candidates';
import { GetNumberOfCandidates$Params } from '../fn/account-management-controller/get-number-of-candidates';
import { getNumberOfRecruiters } from '../fn/account-management-controller/get-number-of-recruiters';
import { GetNumberOfRecruiters$Params } from '../fn/account-management-controller/get-number-of-recruiters';
import { getUserById } from '../fn/account-management-controller/get-user-by-id';
import { GetUserById$Params } from '../fn/account-management-controller/get-user-by-id';
import { Recruiter } from '../models/recruiter';
import { updateUser } from '../fn/account-management-controller/update-user';
import { UpdateUser$Params } from '../fn/account-management-controller/update-user';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountManagementControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/api/AccountsManagement/updateUser/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<User> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/api/AccountsManagement/getUser/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getNumberOfRecruiters()` */
  static readonly GetNumberOfRecruitersPath = '/api/AccountsManagement/getNumberOfRecruiters';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNumberOfRecruiters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfRecruiters$Response(params?: GetNumberOfRecruiters$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getNumberOfRecruiters(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNumberOfRecruiters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfRecruiters(params?: GetNumberOfRecruiters$Params, context?: HttpContext): Observable<number> {
    return this.getNumberOfRecruiters$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getNumberOfCandidates()` */
  static readonly GetNumberOfCandidatesPath = '/api/AccountsManagement/getNumberOfCandidates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNumberOfCandidates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfCandidates$Response(params?: GetNumberOfCandidates$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getNumberOfCandidates(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getNumberOfCandidates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberOfCandidates(params?: GetNumberOfCandidates$Params, context?: HttpContext): Observable<number> {
    return this.getNumberOfCandidates$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/api/AccountsManagement/getAllUsers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `getAllRecruiters()` */
  static readonly GetAllRecruitersPath = '/api/AccountsManagement/getAllRecruiters';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRecruiters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRecruiters$Response(params?: GetAllRecruiters$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Recruiter>>> {
    return getAllRecruiters(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRecruiters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRecruiters(params?: GetAllRecruiters$Params, context?: HttpContext): Observable<Array<Recruiter>> {
    return this.getAllRecruiters$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Recruiter>>): Array<Recruiter> => r.body)
    );
  }

  /** Path part for operation `getAllCandidates()` */
  static readonly GetAllCandidatesPath = '/api/AccountsManagement/getAllCandidates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCandidates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCandidates$Response(params?: GetAllCandidates$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Candidate>>> {
    return getAllCandidates(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCandidates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCandidates(params?: GetAllCandidates$Params, context?: HttpContext): Observable<Array<Candidate>> {
    return this.getAllCandidates$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Candidate>>): Array<Candidate> => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/api/AccountsManagement/deleteUser/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<void> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
