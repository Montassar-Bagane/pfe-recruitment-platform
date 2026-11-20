/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Skill } from '../../models/skill';

export interface AddSkills$Params {
  idcandidate: number;
      body: Array<Skill>
}

export function addSkills(http: HttpClient, rootUrl: string, params: AddSkills$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Skill>>> {
  const rb = new RequestBuilder(rootUrl, addSkills.PATH, 'post');
  if (params) {
    rb.path('idcandidate', params.idcandidate, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Skill>>;
    })
  );
}

addSkills.PATH = '/api/skills/AddSkills/{idcandidate}';
