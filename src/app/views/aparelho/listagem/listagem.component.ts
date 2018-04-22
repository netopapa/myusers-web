import { Component, OnInit, ViewChild } from '@angular/core';
import { AparelhoService } from '../../../service/aparelho/aparelho.service';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Aparelho } from '../../../model/aparelho/aparelho.model';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FeedbackService } from '../../../service/feedback/feedback.service';

declare var $: any;

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit, AfterViewInit {

    private displayedColumns = ['codigo_aparelho', 'descricao_aparelho', 'acoes'];
    private dataSource: MatTableDataSource<Aparelho>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: AparelhoService,
    private router: Router,
    private feedback: FeedbackService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Aparelho>();
    this.dataSource.data = new Array<Aparelho>();
    this.paginator.pageSize = 10;
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.getAparelhos();


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
}

}
