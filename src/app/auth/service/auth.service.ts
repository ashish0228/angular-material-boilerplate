import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel, RegistrationModel } from 'src/app/model/authModel';
import { responseModel } from 'src/app/model/reponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * In service always give data type while sending data and for response also.
 */
export class AuthService {
  API_URL = environment.api_url

  isLogin =  new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  registration(data: RegistrationModel) {
    return this.http.post<responseModel>(this.API_URL + '/registration', data);
  }

  login(data: LoginModel) {
    return this.http.post<responseModel>(this.API_URL + '/registration', data);
  }

  setTokenInLocalStorage(data: any) {
    localStorage.setItem('access-token', data);
    console.log('0000000000', localStorage.getItem('access-token'));
  }
  clearLocalStorage() {
    localStorage.clear();
  }
  logout(data: any) {
    this.clearLocalStorage();
    return this.http.post<responseModel>(this.API_URL + '/logout', data);
  }

  setisLoginValue(value: boolean) {
    this.isLogin.next(value);
  }
}
