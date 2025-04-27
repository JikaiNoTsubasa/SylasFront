import { Component, Input } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
    selector: 'tab',
    standalone: true,
    imports: [],
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss'
})
export class TabComponent {

  @Input() title: string = 'Default';
  @Input() icon: string | null = null;

  active: boolean = false;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}
