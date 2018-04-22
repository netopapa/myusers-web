import { Component, OnInit, ViewChild } from '@angular/core';
import { AparelhoService } from '../../../service/aparelho/aparelho.service';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Aparelho } from '../../../model/aparelho/aparelho.model';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FeedbackService } from '../../../service/feedback/feedback.service';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { Usuario } from '../../../model/usuario/usuario.model';
import { RelatorioService } from '../../../service/relatorio/relatorio.service';

declare var $: any;

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit, AfterViewInit {

    private displayedColumns = ['codigo_aparelho', 'descricao_aparelho', 'acoes'];
    private dataSource: MatTableDataSource<Aparelho>;

    private usuarios: Usuario[];
    private usuarioSelecionado: Usuario;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


  constructor(
    private service: AparelhoService,
    private usuarioService: UsuarioService,
    private relatorioService: RelatorioService,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Aparelho>();
    this.dataSource.data = new Array<Aparelho>();
    this.usuarios = [];
    this.usuarioSelecionado = new Usuario();

    this.paginator.pageSize = 10;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';

    this.getUsuarios();
    this.getAparelhos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsuarios(): void {
    this.usuarioService.getAll().subscribe(
      success => {
        this.usuarios = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  sharePDF(): void {
    this.relatorioService.pdfList(this.dataSource.data, this.usuarioSelecionado).subscribe(
      success => {
        this.feedback.openSnackBar('PDF gerado na pasta do projeto');
      },
      error => {
        console.log(error);
        this.feedback.openSnackBar('PDF gerado na pasta do projeto');
      }
    );
  }

  shareTXT(): void {
    this.relatorioService.txtList(this.dataSource.data, this.usuarioSelecionado).subscribe(
      success => {
        this.feedback.openSnackBar('TXT gerado na pasta do projeto');
      },
      error => {
        console.log(error);
        this.feedback.openSnackBar('TXT gerado na pasta do projeto');
      }
    );
  }

  shareCSV(): void {
    this.relatorioService.csvList(this.dataSource.data, this.usuarioSelecionado).subscribe(
      success => {
        this.feedback.openSnackBar('CSV gerado na pasta do projeto');
      },
      error => {
        console.log(error);
        this.feedback.openSnackBar('CSV gerado na pasta do projeto');
      }
    );
  }

  getAparelhos(): void {
    this.service.getAll().subscribe(
      success => {
        this.dataSource.data = success;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteThis(id: number): void {
    this.service.remove(id).subscribe(
      success => {
        this.feedback.openSnackBar(success.msg);
        this.getAparelhos();
      },
      error => {
        this.feedback.openSnackBar(error);
      }
    );
  }

  editThis(id: string): void {
      this.router.navigate([`/aparelho/form/${id}`]);
  }

  filtraPorUsuario(): void {
    if (this.usuarioSelecionado === undefined) {
      this.getAparelhos();
    } else {
      this.service.findByUser(this.usuarioSelecionado).subscribe(
        success => {
          this.dataSource.data = success;
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
}

}
