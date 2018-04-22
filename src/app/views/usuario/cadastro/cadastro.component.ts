import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { UsuarioService } from '../../../service/usuario/usuario.service';
import { FeedbackService } from '../../../service/feedback/feedback.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private usuario: Usuario;

    private edit: boolean;
    private txtBtnSubmit = '';
    private txtHeader = '';

  constructor(
    private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.usuario = new Usuario();

    this.welcome();
  }

  welcome() {
    this.route.params.subscribe(
      (params: any) => {
          if (params['id'] != null) {
              this.edit = true;
              this.txtBtnSubmit = 'editar';
              this.txtHeader = 'Edição';
              this.getusuario(params['id']);
            } else {
              this.edit = false;
              this.txtBtnSubmit = 'cadastrar';
              this.txtHeader = 'Cadastro';
          }
      }
    );
  }

  getusuario(id: number): void {
    this.service.getOne(id).subscribe(
      success => {
        this.usuario = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  save(usuario: Usuario): void {

    if (this.edit) {
      this.service.update(usuario).subscribe(
        success => {
          this.feedback.openSnackBar(success.msg);
          this.router.navigate(['/usuario']);
        },
        error => {
          this.feedback.openSnackBar(error);
        }
      );
    } else {
      this.service.save(usuario).subscribe(
        success => {
          this.feedback.openSnackBar(success.msg);
          this.router.navigate(['/usuario']);
        },
        error => {
          this.feedback.openSnackBar(error);
        }
      );
    }

  }

}
