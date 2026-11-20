/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApplicationToRecruiterDto } from '../../models/application-to-recruiter-dto';

export interface GetApplicationsByJobId$Params {
  JobId: number;
}

export function getApplicationsByJobId(http: HttpClient, rootUrl: string, params: GetApplicationsByJobId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApplicationToRecruiterDto>>> {
  const rb = new RequestBuilder(rootUrl, getApplicationsByJobId.PATH, 'get');
  if (params) {
    rb.path('JobId', params.JobId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApplicationToRecruiterDto>>;
    })
  );
}

getApplicationsByJobId.PATH = '/api/applications/getApplicationsByJobId/{JobId}';
