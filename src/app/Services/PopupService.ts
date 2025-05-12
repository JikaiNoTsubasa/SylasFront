import { Injectable, TemplateRef } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

interface PopupState {
    isOpen: boolean;
    context?: any;
    content?: TemplateRef<any>;
}

@Injectable({ providedIn: 'root' })
export class PopupService {
    private popupState = new BehaviorSubject<PopupState>({isOpen: false});

    popupState$ = this.popupState.asObservable();

    open(template: TemplateRef<any>, context: any = {}) {
        this.popupState.next({isOpen: true, context, content: template});
    }

    close() {
        this.popupState.next({isOpen: false});
    }
}