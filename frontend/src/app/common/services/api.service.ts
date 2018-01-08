import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  get(
    url: string,
    params?: string | URLSearchParams | { [key: string]: any | any[]; } | null
  ): Observable<Response> {
    var response: Observable<Response> =
    this.http.get(
      environment.apiUrlRoot + url,
      {
        params: params,
        headers: new Headers({
          'X-Requested-With': 'XMLHttpRequest'
        }),
        withCredentials: true
      }
    );

    return Observable.from(response).delay(environment.apiResponseDelay);
  }

  post(
    url: string,
    jsonObject: any,
    params?: string | URLSearchParams | { [key: string]: any | any[]; } | null
  ): Observable<Response> {
    var response: Observable<Response> =
    this.http.post(
      environment.apiUrlRoot + url,
      JSON.stringify(jsonObject),
      {
        params: params,
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }),
        withCredentials: true
      }
    );

    return Observable.from(response).delay(environment.apiResponseDelay);
  }

  put(
    url: string,
    jsonObject: any,
    params?: string | URLSearchParams | { [key: string]: any | any[]; } | null
  ): Observable<Response> {
    var response: Observable<Response> =
      this.http.put(
        environment.apiUrlRoot + url,
        JSON.stringify(jsonObject),
        {
          params: params,
          headers: new Headers({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }),
          withCredentials: true
        }
      );

    return Observable.from(response).delay(environment.apiResponseDelay);
  }

}
