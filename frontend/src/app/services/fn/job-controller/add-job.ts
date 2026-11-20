/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Job } from '../../models/job';

export interface AddJob$Params {
  idrecruiter: number;
      body: Job
}

export function addJob(http: HttpClient, rootUrl: string, params: AddJob$Params, context?: HttpContext): Observable<StrictHttpResponse<Job>> {
  const rb = new RequestBuilder(rootUrl, addJob.PATH, 'post');
  if (params) {
    rb.path('idrecruiter', params.idrecruiter, {});
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

addJob.PATH = '/api/jobs/addJob/{idrecruiter}';
