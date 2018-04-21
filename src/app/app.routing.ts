import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'aparelho',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'aparelho',
                loadChildren: './views/aparelho/aparelho.module#AparelhoModule'
            },
            {
                path: 'usuario',
                loadChildren: './views/usuario/usuario.module#UsuarioModule'
            }
        ]
    }
];
