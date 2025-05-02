import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { Project } from '../../Models/Database/Project';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule, RouterModule, MarkdownModule],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {

  syService = inject(SyService);

  projects: Project[] | null = null;

  testMarkdown: string = "# Test markdown\n\n## Test markdown\n\n### Test markdown\n\n#Test markdown\n\nThis is a **test** for _markdown_";

  ngOnInit(){
    this.syService.fetchMyProjects().subscribe({
      next: (projects) => {

      }
    });
  }
}
