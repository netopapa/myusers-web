import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Perfil } from '../../../model/perfil/perfil.model';
import { PerfilService } from '../../../service/perfil/perfil.service';
import { FeedbackService } from '../../../service/feedback/feedback.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit, AfterViewInit {

  private displayedColumns = ['nome_perfil', 'acoes'];
  private dataSource: MatTableDataSource<Perfil>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: PerfilService,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Perfil>();
    this.dataSource.data = [];
    this.paginator.pageSize = 10;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.getperfils();


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getperfils(): void {
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
        this.getperfils();
      },
      error => {
        this.feedback.openSnackBar(error);
      }
    );
  }

  editThis(id: string): void {
      this.router.navigate([`/perfil/form/${id}`]);
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
