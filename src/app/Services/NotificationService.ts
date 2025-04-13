import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Succès') {
    this.toastr.success(message, title);
  }

  error(message: string, title: string = 'Erreur') {
    this.toastr.error(message, title);
  }

  warning(message: string, title: string = 'Attention') {
    this.toastr.warning(message, title);
  }

  info(message: string, title: string = 'Info', duration: number = 5000) {
    this.toastr.info(message, title, { timeOut: duration, positionClass: 'toast-top-right' });
  }
}