/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Speciality } from '../../models/speciality';

export interface AddSpeciality$Params {
  idjob: number;
      body: Speciality
}

export function addSpeciality(http: HttpClient, rootUrl: string, params: AddSpeciality$Params, context?: HttpContext): Observable<StrictHttpResponse<Speciality>> {
  const rb = new RequestBuilder(rootUrl, addSpeciality.PATH, 'post');
  if (params) {
    rb.path('idjob', params.idjob, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Speciality>;
    })
  );
}

addSpeciality.PATH = '/api/specialities/addSpeciality/{idjob}';
