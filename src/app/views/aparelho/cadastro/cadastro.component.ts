import { Component, OnInit } from '@angular/core';
import { AparelhoService } from '../../../service/aparelho/aparelho.service';
import { Aparelho } from '../../../model/aparelho/aparelho.model';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    private aparelho: Aparelho;

    private txtBtnSubmit = '';
    private txtHeader = '';

  constructor(
    private service: AparelhoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.aparelho = new Aparelho();

    this.welcome();
  }

  welcome() {
    this.route.params.subscribe(
      (params: any) => {
          if (params['id'] != null) {
              this.txtBtnSubmit = 'editar';
              this.txtHeader = 'Edição';
              this.getAparelho(params['id']);
          } else {
              this.txtBtnSubmit = 'cadastrar';
              this.txtHeader = 'Cadastro';
          }
      }
    );
  }

  getAparelho(id: number): void {
    this.service.getOne(id).subscribe(
      success => {
        this.aparelho = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  save(aparelho: Aparelho): void {
    this.service.save(aparelho).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );
  }

}
