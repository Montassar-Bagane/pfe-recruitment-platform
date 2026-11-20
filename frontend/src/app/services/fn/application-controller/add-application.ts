/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Application } from '../../models/application';

export interface AddApplication$Params {
  description: string;
  idcandidate: number;
  idjob: number;
      body?: {
'file': File;
}
}

export function addApplication(http: HttpClient, rootUrl: string, params: AddApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<Application>> {
  const rb = new RequestBuilder(rootUrl, addApplication.PATH, 'post');
  if (params) {
    rb.query('description', params.description, {});
    rb.path('idcandidate', params.idcandidate, {});
    rb.path('idjob', params.idjob, {});
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Application>;
    })
  );
}

addApplication.PATH = '/api/applications/addApplication/{idcandidate}/{idjob}';
