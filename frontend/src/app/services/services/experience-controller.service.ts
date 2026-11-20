/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addExperiences } from '../fn/experience-controller/add-experiences';
import { AddExperiences$Params } from '../fn/experience-controller/add-experiences';
import { deleteExperience } from '../fn/experience-controller/delete-experience';
import { DeleteExperience$Params } from '../fn/experience-controller/delete-experience';
import { Experience } from '../models/experience';
import { getExperiencesByCandidateId } from '../fn/experience-controller/get-experiences-by-candidate-id';
import { GetExperiencesByCandidateId$Params } from '../fn/experience-controller/get-experiences-by-candidate-id';
import { updateExperience } from '../fn/experience-controller/update-experience';
import { UpdateExperience$Params } from '../fn/experience-controller/update-experience';

@Injectable({ providedIn: 'root' })
export class ExperienceControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateExperience()` */
  static readonly UpdateExperiencePath = '/api/experiences/updateExperience/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateExperience()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateExperience$Response(params: UpdateExperience$Params, context?: HttpContext): Observable<StrictHttpResponse<Experience>> {
    return updateExperience(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateExperience$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateExperience(params: UpdateExperience$Params, context?: HttpContext): Observable<Experience> {
    return this.updateExperience$Response(params, context).pipe(
      map((r: StrictHttpResponse<Experience>): Experience => r.body)
    );
  }

  /** Path part for operation `addExperiences()` */
  static readonly AddExperiencesPath = '/api/experiences/AddExperiences/{idcandidate}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addExperiences()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addExperiences$Response(params: AddExperiences$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Experience>>> {
    return addExperiences(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addExperiences$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addExperiences(params: AddExperiences$Params, context?: HttpContext): Observable<Array<Experience>> {
    return this.addExperiences$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Experience>>): Array<Experience> => r.body)
    );
  }

  /** Path part for operation `getExperiencesByCandidateId()` */
  static readonly GetExperiencesByCandidateIdPath = '/api/experiences/getExperiencesByCandidateId/{CandidateId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExperiencesByCandidateId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExperiencesByCandidateId$Response(params: GetExperiencesByCandidateId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Experience>>> {
    return getExperiencesByCandidateId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getExperiencesByCandidateId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExperiencesByCandidateId(params: GetExperiencesByCandidateId$Params, context?: HttpContext): Observable<Array<Experience>> {
    return this.getExperiencesByCandidateId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Experience>>): Array<Experience> => r.body)
    );
  }

  /** Path part for operation `deleteExperience()` */
  static readonly DeleteExperiencePath = '/api/experiences/deleteExperience/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteExperience()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExperience$Response(params: DeleteExperience$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteExperience(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteExperience$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExperience(params: DeleteExperience$Params, context?: HttpContext): Observable<void> {
    return this.deleteExperience$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
