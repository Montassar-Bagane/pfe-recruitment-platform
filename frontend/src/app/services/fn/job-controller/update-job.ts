/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Job } from '../../models/job';

export interface UpdateJob$Params {
  idrecruiter: number;
  idjob: number;
      body: Job
}

export function updateJob(http: HttpClient, rootUrl: string, params: UpdateJob$Params, context?: HttpContext): Observable<StrictHttpResponse<Job>> {
  const rb = new RequestBuilder(rootUrl, updateJob.PATH, 'post');
  if (params) {
    rb.path('idrecruiter', params.idrecruiter, {});
    rb.path('idjob', params.idjob, {});
    rb.body(params.body, 'application/json');
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

updateJob.PATH = '/api/jobs/updateJob/{idrecruiter}/{idjob}';
