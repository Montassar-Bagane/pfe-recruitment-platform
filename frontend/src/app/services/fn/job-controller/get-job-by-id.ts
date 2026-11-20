/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Job } from '../../models/job';

export interface GetJobById$Params {
  id: number;
}

export function getJobById(http: HttpClient, rootUrl: string, params: GetJobById$Params, context?: HttpContext): Observable<StrictHttpResponse<Job>> {
  const rb = new RequestBuilder(rootUrl, getJobById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Job>;
    })
  );
}

getJobById.PATH = '/api/jobs/getJobById/{id}';
