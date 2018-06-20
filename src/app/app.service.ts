import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AppService {
  public baseUrl = 'https://chatapi.edwisor.com';

  constructor(private _http: HttpClient) {}

  // method to handle http calls
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
  }

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
  }

  public logout(): Observable<any> {
    const params = new HttpParams().set('authToken', Cookie.get('authToken'));

    return this._http.post(`${this.baseUrl}/api/v1/users/logout`, params);
  } // end logout function

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  } // end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = data => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  } // end setUserInfoFromLocalstorage
  public getChat(senderId, receiverId, skip): Observable<any> {
    return this._http
      .get(
        `${
          this.baseUrl
        }/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get(
          'authToken'
        )}`
      )
      .do(data => console.log('Chat Found'))
      .catch(this.handleError);
  } // end getChat function

  public getCount(userId, senderId): Observable<any> {
    return this._http
      .get(
        `${
          this.baseUrl
        }/api/v1/chat/count/unseen?userId=${userId}&senderId=${senderId}&authToken=${Cookie.get(
          'authToken'
        )}`
      )
      .do(data => console.log('Count Received'))
      .catch(this.handleError);
  } // end getCount function

  public unseenUserList(userId): Observable<any> {
    return this._http
      .get(
        `${
          this.baseUrl
        }/api/v1/chat/unseen/user/list?userId=${userId}&authToken=${Cookie.get(
          'authToken'
        )}`
      )
      .do(data => console.log('Unseen User List Found'))
      .catch(this.handleError);
  } // end getCount function
}
