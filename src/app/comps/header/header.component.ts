import { Component, inject } from '@angular/core';
import { UserService } from '../../Services/UserService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
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
