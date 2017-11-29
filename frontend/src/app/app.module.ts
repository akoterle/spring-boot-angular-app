import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'ng2-tree';
import { AngularSplitModule } from 'angular-split';

// used to create fake backend
// import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { TemplatesModule } from './templates/module';

import { HierarchiesComponent } from './hierarchies/hierarchies.component';
import { HierarchyTreeComponent } from './hierarchies/hierarchytree/hierarchytree.component';
// import { HierarchiesService } from './hierarchies/service/hierarchies.service';
import { AppConfigModule } from './config/module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    AngularSplitModule,
    routing,
    TemplatesModule,
    AppConfigModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    HierarchiesComponent,
    HierarchyTreeComponent,

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
//    HierarchiesService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
