import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Aparelho } from '../../model/aparelho/aparelho.model';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AparelhoService extends RestService {

  baseURL = Constant.BASE_URL + Constant.APARELHO;

  constructor(http: Http) {
    super(http);
   }

   public getAll(): Observable<Aparelho[]> {
    return this.get(this.baseURL);
  }

  public getOne(id: number): Observable<Aparelho> {
    const getOneUrl = `${this.baseURL}?id=${id}`;
    return this.get(getOneUrl);
  }

  public save(aparelho: Aparelho): Observable<any> {
    const saveUrl = this.baseURL;
    return this.post(saveUrl, aparelho);
  }

  public update(aparelho: Aparelho): Observable<any> {
    const updateUrl = this.baseURL;
    return this.put(updateUrl, aparelho);
  }

  public remove(id: number): Observable<any> {
    const deleteURL = this.baseURL;
    return this.deleteServiceWithId(deleteURL, id);
  }

}
