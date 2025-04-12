import { animate, AnimationTriggerMetadata, style, transition, trigger } from "@angular/animations";

export function FadeIn(timingIn: number, height: boolean = false): AnimationTriggerMetadata  {
    return trigger('fadeIn', [
      transition(':enter', [
        style(height ? { opacity: 0 , height: 0, } : { opacity: 0, }),
        animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1, })),
      ]),
    ]);
  }