import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SyService } from '../../Services/SyService';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  syService = inject(SyService);
  authService = inject(AuthService);
  router = inject(Router);

  error = '';

  isLoginInProgress = false;

  protected loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  async onSubmit() {
    this.isLoginInProgress = true;
    try{
      let result : boolean = await this.authService.login(this.loginForm.value.login ?? '', this.loginForm.value.password ?? '').then(() => this.router.navigate(['']));
      this.isLoginInProgress = false;
      if (result) this.router.navigate(['']);

    }catch(e){
      this.isLoginInProgress = false;
      this.error = (e as Error).message;
    }
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }
}
