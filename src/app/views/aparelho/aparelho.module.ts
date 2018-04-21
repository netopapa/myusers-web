import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { MaterialModule } from '../../app.module';
import { AparelhoRouter } from './aparelho.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AparelhoRouter),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    CadastroComponent,
    ListagemComponent
  ]
})
export class AparelhoModule { }
