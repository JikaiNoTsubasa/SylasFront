import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { SidePanelComponent } from "./comps/side-panel/side-panel.component";
import { PopupService } from './Services/PopupService';

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
    imports: [RouterOutlet, SidePanelComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [routeAnimations]
})
export class AppComponent {
  title = 'Sylas';

  isOpen = false;
  contentTemplate?: any;
  context: any = {};

  constructor(public popupService: PopupService) {
    this.popupService.popupState$.subscribe(state => {
      this.isOpen = state.isOpen;
      this.contentTemplate = state.content;
      this.context = state.context ?? {};
    });
  }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'];
  }

}
