import { Component, inject } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userService = inject(UserService);

  userName: string | null = null;

  ngOnInit() {
    this.userName = this.userService.userName;
  }
}
