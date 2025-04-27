import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FadeIn } from '../../animations';
import { HeaderComponent } from '../../comps/header/header.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterModule, HeaderComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    animations: [FadeIn(1000, false)]
})
export class LayoutComponent {

}
