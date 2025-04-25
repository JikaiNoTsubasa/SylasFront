import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { TabsComponent } from "../../comps/tabs/tabs.component";
import { TabComponent } from "../../comps/tab/tab.component";
import { User } from '../../Models/Database/User';
import { CommonModule } from '@angular/common';
import { XpBarComponent } from '../../comps/xp-bar/xp-bar.component';
import { LiveTextComponent } from "../../comps/live-text/live-text.component";
import { NotificationService } from '../../Services/NotificationService';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TabsComponent, TabComponent, CommonModule, XpBarComponent, LiveTextComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  syService = inject(SyService);
  notService = inject(NotificationService);

  meUser: User | null = null;

  ngOnInit(){
    this.syService.fetchMyUser().subscribe({
      next: (user) => {
        this.meUser = user;
      }
    });
  }

  onMailChange(text: string){
    if (text == this.meUser?.email || text == "") return;
    this.syService.updateMyUser(text, undefined).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed mail: "+text);

      }
    });

  }

  onPasswordChange(text: string){
    if (text == "") return;
    this.syService.updateMyUser(undefined, text).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed password");
      }
    });
  }

  onStreetChange(text: string){
    if (text == this.meUser?.street || text == "") return;
    this.syService.updateMyUser(undefined, undefined, text).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed street: "+text);
      }
    });
  }
}
