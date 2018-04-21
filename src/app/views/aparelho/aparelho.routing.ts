import { Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const AparelhoRouter: Routes = [
    {
        path: '',
        children: [{
            path: 'registros',
            component: ListagemComponent
        },
        {
            path: 'cadastro',
            component: CadastroComponent
        },
        {
            path: 'cadastro/:id',
            component: CadastroComponent
        }
        ]
    }
];
