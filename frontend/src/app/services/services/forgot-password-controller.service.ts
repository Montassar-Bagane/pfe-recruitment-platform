/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changePassword } from '../fn/forgot-password-controller/change-password';
import { ChangePassword$Params } from '../fn/forgot-password-controller/change-password';
import { verifyEmail } from '../fn/forgot-password-controller/verify-email';
import { VerifyEmail$Params } from '../fn/forgot-password-controller/verify-email';
import { verifyOtp } from '../fn/forgot-password-controller/verify-otp';
import { VerifyOtp$Params } from '../fn/forgot-password-controller/verify-otp';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `verifyOtp()` */
  static readonly VerifyOtpPath = '/api/ForgotPassword/verifyOtp/{otp}/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyOtp()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyOtp$Response(params: VerifyOtp$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return verifyOtp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyOtp$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyOtp(params: VerifyOtp$Params, context?: HttpContext): Observable<void> {
    return this.verifyOtp$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `verifyEmail()` */
  static readonly VerifyEmailPath = '/api/ForgotPassword/verifyEmail/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyEmail$Response(params: VerifyEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return verifyEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyEmail(params: VerifyEmail$Params, context?: HttpContext): Observable<void> {
    return this.verifyEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/api/ForgotPassword/changePassword/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<void> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
