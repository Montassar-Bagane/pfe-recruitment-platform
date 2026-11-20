/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Job } from '../../models/job';

export interface GetAllJobs$Params {
}

export function getAllJobs(http: HttpClient, rootUrl: string, params?: GetAllJobs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Job>>> {
  const rb = new RequestBuilder(rootUrl, getAllJobs.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Job>>;
    })
  );
}

getAllJobs.PATH = '/api/jobs/getAllJobs';
