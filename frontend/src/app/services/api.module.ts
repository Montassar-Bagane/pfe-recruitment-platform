/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { SpecialityControllerService } from './services/speciality-controller.service';
import { SkillControllerService } from './services/skill-controller.service';
import { JobControllerService } from './services/job-controller.service';
import { ExperienceControllerService } from './services/experience-controller.service';
import { AuthenticationControllerService } from './services/authentication-controller.service';
import { ApplicationControllerService } from './services/application-controller.service';
import { ForgotPasswordControllerService } from './services/forgot-password-controller.service';
import { AccountManagementControllerService } from './services/account-management-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    SpecialityControllerService,
    SkillControllerService,
    JobControllerService,
    ExperienceControllerService,
    AuthenticationControllerService,
    ApplicationControllerService,
    ForgotPasswordControllerService,
    AccountManagementControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
