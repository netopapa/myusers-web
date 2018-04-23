import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Usuario } from '../../../model/usuario/usuario.model';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { FeedbackService } from '../../../service/feedback/feedback.service';
import { Perfil } from '../../../model/perfil/perfil.model';
import { PerfilService } from '../../../service/perfil/perfil.service';
import { RelatorioService } from '../../../service/relatorio/relatorio.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit, AfterViewInit {

  private displayedColumns = ['nome_usuario', 'login', 'email', 'cod_pessoa', 'aparelhosTxt', 'perfisTxt', 'acoes'];
  private dataSource: MatTableDataSource<Usuario>;
  private perfis: Perfil[];
  private perfilSelecionado: Perfil;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: UsuarioService,
    private perfilService: PerfilService,
    private relatorioService: RelatorioService,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Usuario>();
    this.dataSource.data = [];
    this.perfis = [];

    this.paginator.pageSize = 10;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';

    this.getPerfis();
    this.getUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsuarios(): void {
    this.service.getAll().subscribe(
      success => {
        this.dataSource.data = success;
        this.listAparelhos();
        this.listPerfis();
      },
      error => {
        console.log(error);
      }
    );
  }

  getPerfis(): void {
    this.perfilService.getAll().subscribe(
      success => {
        this.perfis = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  listAparelhos(): void {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      let aparelhos = '';
      for (let j = 0; j < this.dataSource.data[i].aparelhos.length; j++) {
        aparelhos += this.dataSource.data[i].aparelhos[j].descricao_aparelho;

        if (j < this.dataSource.data[i].aparelhos.length - 1) {
          aparelhos += ', ';
        }
      }
      this.dataSource.data[i].aparelhosTxt = aparelhos;
    }
  }


  listPerfis(): void {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      let perfis = '';
      for (let j = 0; j < this.dataSource.data[i].perfis.length; j++) {
        perfis += this.dataSource.data[i].perfis[j].nome_perfil;

        if (j < this.dataSource.data[i].perfis.length - 1) {
          perfis += ', ';
        }
      }
      this.dataSource.data[i].perfisTxt = perfis;
    }
  }

  filtraPorPerfil(): void {
    if (this.perfilSelecionado === undefined) {
      this.getUsuarios();
    } else {
      this.service.findByPerfil(this.perfilSelecionado).subscribe(
        success => {
          this.dataSource.data = success;
          this.listAparelhos();
          this.listPerfis();
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  sharePDF(): void {
    this.relatorioService.pdfListUser(this.dataSource.data).subscribe(
      success => {
        this.feedback.openSnackBar('PDF gerado na pasta do projeto');
      },
      error => {
        console.log(error);
        this.feedback.openSnackBar('PDF gerado na pasta do projeto');
      }
    );
  }

  deleteThis(id: number): void {
    this.service.remove(id).subscribe(
      success => {
        this.feedback.openSnackBar(success.msg);
        this.getUsuarios();
      },
      error => {
        this.feedback.openSnackBar(error);
      }
    );
  }

  editThis(id: string): void {
    this.router.navigate([`/usuario/form/${id}`]);
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
