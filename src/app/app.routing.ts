import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'aparelho',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
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
