import { Component, OnInit } from '@angular/core';
import { AparelhoService } from '../../../service/aparelho/aparelho.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  constructor(
    private service: AparelhoService
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
      }
    );
  }

}
