/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface VerifyOtp$Params {
  otp: number;
  email: string;
}

export function verifyOtp(http: HttpClient, rootUrl: string, params: VerifyOtp$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, verifyOtp.PATH, 'post');
  if (params) {
    rb.path('otp', params.otp, {});
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

verifyOtp.PATH = '/api/ForgotPassword/verifyOtp/{otp}/{email}';
