import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component: MainComponent},
        ]
        }
];
