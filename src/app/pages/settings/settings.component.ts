import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { TabsComponent } from "../../comps/tabs/tabs.component";
import { TabComponent } from "../../comps/tab/tab.component";
import { User } from '../../Models/Database/User';
import { CommonModule } from '@angular/common';
import { XpBarComponent } from '../../comps/xp-bar/xp-bar.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TabsComponent, TabComponent, CommonModule, XpBarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  syService = inject(SyService);

  meUser: User | null = null;

  ngOnInit(){
    this.syService.fetchMyUser().subscribe({
      next: (user) => {
        this.meUser = user;
      }
    });
  }
}
