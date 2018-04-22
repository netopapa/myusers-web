import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class RestService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  get(url: string, params?: any[]): Observable<any> {
    if (params === undefined) {
      return this.http
        .get(url)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      const param = new URLSearchParams();

      params.forEach(element => {
        param.set(element.paramName, element.param);
      });

      return this.http
        .get(url, this.optionsHeader(param))
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  post(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .post(url, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  put(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    url += '?f=update';
    return this.http
      .post(url, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  patch(url: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http
      .patch(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // HTTP DELETE usando Observable com objeto complexo como parâmetro
  // O campo de pesquisa desse objeto pode ser usado para definir uma string ou um objeto URLSearchParams
  delete(url: string, param: any): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    this.options = new RequestOptions({ headers: this.headers, search: params });
    return this.http
      .delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // HTTP DELETE usando Observable com ID como parâmetro
  deleteServiceWithId(url: string, val: number): Observable<any> {
    return this.http
      .delete(url + '?id=' + val)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.msg;
    } else {
      errMsg = error.msg ? error.msg : error.toString();
    }

    if (errMsg === undefined) {
      errMsg = 'Error not identified';
    }
    return Observable.throw(errMsg);
  }

  private optionsHeader(params?: URLSearchParams): RequestOptions {
    if (params !== null) {
      this.options = new RequestOptions({ headers: this.headers, params: params });
    } else {
      this.options = new RequestOptions({ headers: this.headers });
    }
    return this.options;
  }
}
