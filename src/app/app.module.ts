import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { OverviewComponent } from './overview/overview.component';
import { DetailsService } from './services/details.service';
import { InsuranceAPIService } from './services/insuranceAPI.service';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path : 'main', component: MainComponent },
  { path : 'test', component: TestComponent },
  { path : 'overview', component: OverviewComponent },
  { path : 'about', component: AboutComponent },
  { path : '', redirectTo: 'main', pathMatch: 'full' },
  { path : '**', redirectTo: 'main' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TestComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CollapseModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
    DetailsService,
    InsuranceAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
