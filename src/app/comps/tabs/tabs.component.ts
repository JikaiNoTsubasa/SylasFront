import { Component } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  tabs: TabComponent[] = [];

  activeIdx = 0;

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:TabComponent){ {
    this.tabs.forEach((tab) => {
      tab.active = false;
      });
      tab.active = true;
      this.activeIdx = this.tabs.indexOf(tab);
    }
  }
}
