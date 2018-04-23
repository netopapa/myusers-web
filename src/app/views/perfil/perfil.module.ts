import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { PerfilRouter } from './perfil.routing';
import { MaterialModule } from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PerfilRouter),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CadastroComponent, ListagemComponent]
})
export class PerfilModule { }
