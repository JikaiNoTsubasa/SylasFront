import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component: AppComponent},
        ]
        }
];
