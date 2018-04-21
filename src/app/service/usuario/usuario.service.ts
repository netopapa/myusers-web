import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Usuario} from '../../model/usuario/usuario.model';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService extends RestService {

  baseURL = Constant.BASE_URL + Constant.USUARIO;

  constructor(http: Http) {
    super(http);
   }

   public getAll(): Observable<Usuario[]> {
    return this.get(this.baseURL);
  }

  public getOne(id: number): Observable<Usuario> {
    const getOneUrl = `${this.baseURL}?id=${id}`;
    return this.get(getOneUrl);
  }

  public save(usuario: Usuario): Observable<any> {
    const saveUrl = this.baseURL;
    return this.post(saveUrl, usuario);
  }

  public update(usuario: Usuario): Observable<any> {
    const updateUrl = this.baseURL;
    return this.put(updateUrl, usuario);
  }

  public deleteLocal(id: number): Observable<any> {
    const deleteURL = this.baseURL;
    return this.deleteServiceWithId(deleteURL, id);
  }

}

