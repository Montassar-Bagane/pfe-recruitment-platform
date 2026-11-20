/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetNumberApplicationsByJobId$Params {
  JobId: number;
}

export function getNumberApplicationsByJobId(http: HttpClient, rootUrl: string, params: GetNumberApplicationsByJobId$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, getNumberApplicationsByJobId.PATH, 'get');
  if (params) {
    rb.path('JobId', params.JobId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

getNumberApplicationsByJobId.PATH = '/api/applications/getNumberApplicationsByJobId/{JobId}';
