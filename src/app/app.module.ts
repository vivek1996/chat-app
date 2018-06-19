import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
