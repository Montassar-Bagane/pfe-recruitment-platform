/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Recruiter } from '../../models/recruiter';

export interface GetAllRecruiters$Params {
}

export function getAllRecruiters(http: HttpClient, rootUrl: string, params?: GetAllRecruiters$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Recruiter>>> {
  const rb = new RequestBuilder(rootUrl, getAllRecruiters.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Recruiter>>;
    })
  );
}

getAllRecruiters.PATH = '/api/AccountsManagement/getAllRecruiters';
