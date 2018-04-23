import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Perfil } from '../../../model/perfil/perfil.model';
import { PerfilService } from '../../../service/perfil/perfil.service';
import { FeedbackService } from '../../../service/feedback/feedback.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  private perfil: Perfil;

    private edit: boolean;
    private txtBtnSubmit = '';
    private txtHeader = '';

  constructor(
    private service: PerfilService,
    private route: ActivatedRoute,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.perfil = new Perfil();

    this.welcome();
  }

  welcome() {
    this.route.params.subscribe(
      (params: any) => {
          if (params['id'] != null) {
              this.edit = true;
              this.txtBtnSubmit = 'editar';
              this.txtHeader = 'Edição';
              this.getPerfil(params['id']);
            } else {
              this.edit = false;
              this.txtBtnSubmit = 'cadastrar';
              this.txtHeader = 'Cadastro';
          }
      }
    );
  }

  getPerfil(id: number): void {
    this.service.getOne(id).subscribe(
      success => {
        this.perfil = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  save(perfil: Perfil): void {

    if (this.edit) {
      this.service.update(perfil).subscribe(
        success => {
          this.feedback.openSnackBar(success.msg);
          this.router.navigate(['/perfil']);
        },
        error => {
          this.feedback.openSnackBar(error);
        }
      );
    } else {
      this.service.save(perfil).subscribe(
        success => {
          this.feedback.openSnackBar(success.msg);
          this.router.navigate(['/perfil']);
        },
        error => {
          this.feedback.openSnackBar(error);
        }
      );
    }

  }

}
