/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Experience } from '../../models/experience';

export interface GetExperiencesByCandidateId$Params {
  CandidateId: number;
}

export function getExperiencesByCandidateId(http: HttpClient, rootUrl: string, params: GetExperiencesByCandidateId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Experience>>> {
  const rb = new RequestBuilder(rootUrl, getExperiencesByCandidateId.PATH, 'get');
  if (params) {
    rb.path('CandidateId', params.CandidateId, {});
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

getExperiencesByCandidateId.PATH = '/api/experiences/getExperiencesByCandidateId/{CandidateId}';
