import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/AuthService';
import { UserService } from './Services/UserService';
import { NotificationService } from './Services/NotificationService';
import { trigger, transition, query, style, animate } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // Fade
  transition('Fade => *', [
    query(':enter', [
      style({ opacity: 0 }),
      animate('400ms ease-out', style({ opacity: 1 }))
    ], { optional: true })
  ]),
  transition('* => Fade', [
    query(':leave', [
      animate('400ms ease-out', style({ opacity: 0 }))
    ], { optional: true })
  ]),

  // SlideLeft
  transition('SlideLeft => *', [
    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ], { optional: true })
  ]),
  transition('* => SlideLeft', [
    query(':leave', [
      animate('400ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ], { optional: true })
  ]),

  // SlideRight
  transition('SlideRight => *', [
    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ], { optional: true })
  ]),
  transition('* => SlideRight', [
    query(':leave', [
      animate('400ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
    ], { optional: true })
  ]),
]);

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [routeAnimations]
})
export class AppComponent {
  title = 'SylasFront';

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'];
  }

}
