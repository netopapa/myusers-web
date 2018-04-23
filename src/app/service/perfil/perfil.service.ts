import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Perfil} from '../../model/perfil/perfil.model';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PerfilService extends RestService {

  baseURL = Constant.BASE_URL + Constant.PERFIL;

  constructor(http: Http) {
    super(http);
   }

  public getAll(): Observable<Perfil[]> {
    return this.get(this.baseURL);
  }

  public getOne(id: number): Observable<Perfil> {
    const getOneUrl = `${this.baseURL}?id=${id}`;
    return this.get(getOneUrl);
  }

  public save(perfil: Perfil): Observable<any> {
    const saveUrl = this.baseURL;
    return this.post(saveUrl, perfil);
  }

  public update(perfil: Perfil): Observable<any> {
    const updateUrl = this.baseURL;
    return this.put(updateUrl, perfil);
  }

  public remove(id: number): Observable<any> {
    const deleteURL = this.baseURL;
    return this.deleteServiceWithId(deleteURL, id);
  }

}
