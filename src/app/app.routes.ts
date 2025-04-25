import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './Services/AuthGuard';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
            {path: 'myprojects', component: ProjectComponent},
            {path: 'newproject', component: ProjectCreateComponent},
            {path: 'settings', component: SettingsComponent},
        ]
    },
    {path: '**', redirectTo: 'login'}
];
