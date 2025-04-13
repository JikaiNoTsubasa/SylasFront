import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './Services/AuthGuard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {path: '', component: MainComponent},
        ]
    },
    {path: '**', redirectTo: 'login'}
];
