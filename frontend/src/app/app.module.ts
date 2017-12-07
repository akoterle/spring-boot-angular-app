// ng modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from 'ng2-tree';
import { AngularSplitModule } from 'angular-split';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { Http } from '@angular/http';

// app modules
import { AppConfigModule } from './config/module';
import { TemplatesModule } from './notifications/templates/templates.module';
//import { HierarchiesModule } from './hierarchies/hierarchies.module';
// used to create fake backend
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

import { HierarchiesComponent } from './hierarchies/hierarchies.component';
import { HierarchyTreeComponent } from './hierarchies/hierarchytree/hierarchytree.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TreeModule,
    AngularSplitModule,
    routing,
    TemplatesModule,
    AppConfigModule,
    AppRoutingModule,
    ButtonsModule
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
