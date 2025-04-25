import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { TabsComponent } from "../../comps/tabs/tabs.component";
import { TabComponent } from "../../comps/tab/tab.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TabsComponent, TabComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  syService = inject(SyService);
}
