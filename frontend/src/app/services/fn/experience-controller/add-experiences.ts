/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Experience } from '../../models/experience';

export interface AddExperiences$Params {
  idcandidate: number;
      body: Array<Experience>
}

export function addExperiences(http: HttpClient, rootUrl: string, params: AddExperiences$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Experience>>> {
  const rb = new RequestBuilder(rootUrl, addExperiences.PATH, 'post');
  if (params) {
    rb.path('idcandidate', params.idcandidate, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Experience>>;
    })
  );
}

addExperiences.PATH = '/api/experiences/AddExperiences/{idcandidate}';
