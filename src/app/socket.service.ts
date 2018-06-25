import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() {}
}
