import { Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const AparelhoRouter: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'form',
                component: CadastroComponent
            },
            {
                path: 'form/:id',
                component: CadastroComponent
            }
        ]
    }
];
