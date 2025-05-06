import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { TabsComponent } from "../../comps/tabs/tabs.component";
import { TabComponent } from "../../comps/tab/tab.component";
import { User } from '../../Models/Database/User';
import { CommonModule } from '@angular/common';
import { XpBarComponent } from '../../comps/xp-bar/xp-bar.component';
import { LiveTextComponent } from "../../comps/live-text/live-text.component";
import { NotificationService } from '../../Services/NotificationService';
import { Preferences } from '../../Models/Database/Preferences';
import { GlobalParameter } from '../../Models/Database/GlobalParameter';
import { SidePanelComponent } from '../../comps/side-panel/side-panel.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [TabsComponent, TabComponent, CommonModule, XpBarComponent, LiveTextComponent, SidePanelComponent, ReactiveFormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  syService = inject(SyService);
  notService = inject(NotificationService);

  meUser: User | null = null;
  mePreference: Preferences | null = null;

  globalParams: GlobalParameter[] | null = null;

  userPage: number = 1;
  userLimit: number = 10;
  users: User[] | null = null;
  createUserOpen: boolean = false;

  formCreateUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(){
    this.syService.fetchMyUser().subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.refreshGlobalParameters();
      }
    });

    this.refreshUsers();
  }

  refreshGlobalParameters(){
    this.syService.fetchGlobalParameters().subscribe({
      next: (params) => {
        this.globalParams = params;
      },
      error: (e) => {
        this.notService.error(e.message);
      }
    });
  }

  refreshUsers(){
    this.syService.fetchUsers(this.userPage, this.userLimit).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (e) => {
        this.notService.error(e.message);
      }
    });
  }

  openCreateUserModal(){
    this.createUserOpen = true;
  }

  onSubmitCreateUser(){
    this.syService.createUser(this.formCreateUser.value.name ?? "Default", this.formCreateUser.value.email ?? "Default", this.formCreateUser.value.password ?? "Default").subscribe({
      next: () => {
        this.createUserOpen = false;
        this.refreshUsers();
      },
      error: (e) => {
        this.notService.error(e.message);
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

  onAvatarChange(text: string){
    if (text == "") return;
    this.syService.updateMyUser(undefined, undefined, undefined, undefined, undefined, undefined, text).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed avatar");
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

  onCityChange(text: string){
    if (text == this.meUser?.city || text == "") return;
    this.syService.updateMyUser(undefined, undefined, undefined, text).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed city: "+text);
      }
    });
  }

  onZipcodeChange(text: string){
    if (text == this.meUser?.zipcode || text == "") return;
    this.syService.updateMyUser(undefined, undefined, undefined, undefined, text).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed zipcode: "+text);
      }
    });
  }

  onCountryChange(text: string){
    if (text == this.meUser?.country || text == "") return;
    this.syService.updateMyUser(undefined, undefined, undefined, undefined, undefined, text).subscribe({
      next: (user) => {
        this.meUser = user;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Changed country: "+text);
      }
    });
  }

  addTime(text: string){
    if (text == "") return;
    console.log(text);
  }

  onGlobalParamChange(text: string, i: number){
    if (text == "") return;
    this.syService.updateGlobalParameter(i, text).subscribe({
      next: (params) => {
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.refreshGlobalParameters();
        this.notService.info("Changed parameter #"+i+": "+text);
      }
    });
  }
}
