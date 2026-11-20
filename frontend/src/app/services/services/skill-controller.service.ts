/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addSkills } from '../fn/skill-controller/add-skills';
import { AddSkills$Params } from '../fn/skill-controller/add-skills';
import { deleteSkillById } from '../fn/skill-controller/delete-skill-by-id';
import { DeleteSkillById$Params } from '../fn/skill-controller/delete-skill-by-id';
import { getSkillsByCandidateId } from '../fn/skill-controller/get-skills-by-candidate-id';
import { GetSkillsByCandidateId$Params } from '../fn/skill-controller/get-skills-by-candidate-id';
import { Skill } from '../models/skill';

@Injectable({ providedIn: 'root' })
export class SkillControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addSkills()` */
  static readonly AddSkillsPath = '/api/skills/AddSkills/{idcandidate}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSkills()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSkills$Response(params: AddSkills$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Skill>>> {
    return addSkills(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addSkills$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSkills(params: AddSkills$Params, context?: HttpContext): Observable<Array<Skill>> {
    return this.addSkills$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Skill>>): Array<Skill> => r.body)
    );
  }

  /** Path part for operation `getSkillsByCandidateId()` */
  static readonly GetSkillsByCandidateIdPath = '/api/skills/getSkillsByCandidateId/{CandidateId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSkillsByCandidateId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillsByCandidateId$Response(params: GetSkillsByCandidateId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Skill>>> {
    return getSkillsByCandidateId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSkillsByCandidateId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillsByCandidateId(params: GetSkillsByCandidateId$Params, context?: HttpContext): Observable<Array<Skill>> {
    return this.getSkillsByCandidateId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Skill>>): Array<Skill> => r.body)
    );
  }

  /** Path part for operation `deleteSkillById()` */
  static readonly DeleteSkillByIdPath = '/api/skills/deleteSkillById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSkillById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSkillById$Response(params: DeleteSkillById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteSkillById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSkillById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSkillById(params: DeleteSkillById$Params, context?: HttpContext): Observable<void> {
    return this.deleteSkillById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
