/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addSpeciality } from '../fn/speciality-controller/add-speciality';
import { AddSpeciality$Params } from '../fn/speciality-controller/add-speciality';
import { Speciality } from '../models/speciality';

@Injectable({ providedIn: 'root' })
export class SpecialityControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addSpeciality()` */
  static readonly AddSpecialityPath = '/api/specialities/addSpeciality/{idjob}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSpeciality()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSpeciality$Response(params: AddSpeciality$Params, context?: HttpContext): Observable<StrictHttpResponse<Speciality>> {
    return addSpeciality(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addSpeciality$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSpeciality(params: AddSpeciality$Params, context?: HttpContext): Observable<Speciality> {
    return this.addSpeciality$Response(params, context).pipe(
      map((r: StrictHttpResponse<Speciality>): Speciality => r.body)
    );
  }

}
