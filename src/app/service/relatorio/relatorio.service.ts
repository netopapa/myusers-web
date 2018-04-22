import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { AparelhoList } from '../../model/relatorio/relatorio.model';
import { Usuario } from '../../model/usuario/usuario.model';
import { Aparelho } from '../../model/aparelho/aparelho.model';

@Injectable()
export class RelatorioService extends RestService {

  baseURL = Constant.BASE_URL + Constant.RELATORIO;

  constructor(http: Http) {
    super(http);
   }

  public pdfList(aparelhoData: Aparelho[], usuario: Usuario): Observable<any> {
    const request: AparelhoList = new AparelhoList();
    request.data = aparelhoData;
    request.nome_usuario = usuario === undefined ? 'Geral' : usuario.nome_usuario;
    const saveUrl = this.baseURL + '?f=pdfList';
    return this.post(saveUrl, request);
  }

  public txtList(aparelhoData: Aparelho[], usuario: Usuario): Observable<any> {
    const request: AparelhoList = new AparelhoList();
    request.data = aparelhoData;
    request.nome_usuario = usuario === undefined ? 'Geral' : usuario.nome_usuario;
    const saveUrl = this.baseURL + '?f=txtList';
    return this.post(saveUrl, request);
  }

  public csvList(aparelhoData: Aparelho[], usuario: Usuario): Observable<any> {
    const request: AparelhoList = new AparelhoList();
    request.data = aparelhoData;
    request.nome_usuario = usuario === undefined ? 'Geral' : usuario.nome_usuario;
    const saveUrl = this.baseURL + '?f=csvList';
    return this.post(saveUrl, request);
  }

}
