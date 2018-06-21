import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './/app-routing.module';

import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AppService } from './app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    UserModule,
    ChatModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
