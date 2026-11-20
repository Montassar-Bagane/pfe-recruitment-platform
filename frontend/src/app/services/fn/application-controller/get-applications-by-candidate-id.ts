/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ApplicationToCandidateDto } from '../../models/application-to-candidate-dto';

export interface GetApplicationsByCandidateId$Params {
  CandidateId: number;
}

export function getApplicationsByCandidateId(http: HttpClient, rootUrl: string, params: GetApplicationsByCandidateId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ApplicationToCandidateDto>>> {
  const rb = new RequestBuilder(rootUrl, getApplicationsByCandidateId.PATH, 'get');
  if (params) {
    rb.path('CandidateId', params.CandidateId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ApplicationToCandidateDto>>;
    })
  );
}

getApplicationsByCandidateId.PATH = '/api/applications/getApplicationsByCandidateId/{CandidateId}';
