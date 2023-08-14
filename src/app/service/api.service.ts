import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../model/reponseModel';

@Injectable({
  providedIn: 'root'
})

/**
 * If you want to use one common service in which you can pass API URL and data then you can use
 * this api service
 */
export class ApiService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = environment.api_url;

  get(request: Request) {
    return this.http.get(this.BASE_URL + request["path"]);
  }

  post(request: Request) {
    return this.http.post(this.BASE_URL + request["path"], request["data"])
  }

  patch(request: Request) {
    return this.http.patch(this.BASE_URL + request["path"], request["data"]);
  }

  delete(request: Request) {
    return this.http.delete(this.BASE_URL + request["path"]);
  }

}
