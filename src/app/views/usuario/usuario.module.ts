import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { UsuarioRouter } from './usuario.routing';
import { MaterialModule } from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsuarioRouter),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CadastroComponent, ListagemComponent]
})
export class UsuarioModule { }
