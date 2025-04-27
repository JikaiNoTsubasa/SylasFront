import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { Project } from '../../Models/Database/Project';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {

  syService = inject(SyService);

  projects: Project[] | null = null;

  ngOnInit(){
    this.syService.fetchMyProjects().subscribe({
      next: (projects) => {

      }
    });
  }
}
