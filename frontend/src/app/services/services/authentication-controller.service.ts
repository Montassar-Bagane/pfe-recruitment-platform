/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication-controller/authenticate';
import { Authenticate$Params } from '../fn/authentication-controller/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { registerAdmin } from '../fn/authentication-controller/register-admin';
import { RegisterAdmin$Params } from '../fn/authentication-controller/register-admin';
import { registerCandidate } from '../fn/authentication-controller/register-candidate';
import { RegisterCandidate$Params } from '../fn/authentication-controller/register-candidate';
import { registerRecruiter } from '../fn/authentication-controller/register-recruiter';
import { RegisterRecruiter$Params } from '../fn/authentication-controller/register-recruiter';

@Injectable({ providedIn: 'root' })
export class AuthenticationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerRecruiter()` */
  static readonly RegisterRecruiterPath = '/api/auth/registerRecruiter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerRecruiter()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerRecruiter$Response(params: RegisterRecruiter$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return registerRecruiter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerRecruiter$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerRecruiter(params: RegisterRecruiter$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.registerRecruiter$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `registerCandidate()` */
  static readonly RegisterCandidatePath = '/api/auth/registerCandidate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerCandidate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerCandidate$Response(params: RegisterCandidate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return registerCandidate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerCandidate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerCandidate(params: RegisterCandidate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.registerCandidate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `registerAdmin()` */
  static readonly RegisterAdminPath = '/api/auth/registerAdmin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin$Response(params: RegisterAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return registerAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin(params: RegisterAdmin$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.registerAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/api/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

}
