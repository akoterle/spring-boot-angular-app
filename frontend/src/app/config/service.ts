import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Component } from '@angular/core/src/metadata/directives';

@Injectable()
export class AppConfig {
  environment: any;
  constructor() {
    this.environment = environment;
  }

  isProduction = () => this.environment.production;
  templatesUrl = () => this.environment.api.notifications.templates;
  uploadEndpoint = () => this.environment.api.notifications.uploadFiles;
  initiativesUrl = () => this.environment.api.notifications.initiatives;
  localesUrl = () => this.environment.api.notifications.locales;
}
