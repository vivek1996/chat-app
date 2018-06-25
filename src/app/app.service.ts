import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  public baseUrl = 'https://chatapi.edwisor.com';

  constructor(private _http: HttpClient) {}
  private handleError(err: HttpErrorResponse) {
    console.log('Handle error HTTP calls');
    console.log(err.message);
    return Observable.throw(err.message);
  }

  // method to SignUp the User
  public signUp = (data): Observable<any> => {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey);

    const response = this._http.post(
      `${this.baseUrl}/api/v1/users/signup`,
      params
    );
    return response;
  };

  // method to SignIn the User
  public signIn = (data): Observable<any> => {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    const response = this._http.post(
      `${this.baseUrl}/api/v1/users/login`,
      params
    );
    return response;
  };

  public logout(): Observable<any> {
    const params = new HttpParams().set('authToken', Cookie.get('authToken'));

    return this._http.post(`${this.baseUrl}/api/v1/users/logout`, params);
  }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  };

  public setUserInfoInLocalStorage = data => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
}
