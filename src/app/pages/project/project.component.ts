import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { Project } from '../../Models/Database/Project';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NotificationService } from '../../Services/NotificationService';
import { ShrinkPipe } from "../../pipes/shrink.pipe";

@Component({
    selector: 'app-project',
    standalone: true,
    imports: [CommonModule, RouterModule, MarkdownModule, ShrinkPipe],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {

  syService = inject(SyService);
  notService = inject(NotificationService);

  projects: Project[] | null = null;

  testMarkdown: string = "# Test markdown\n\n## Test markdown\n\n### Test markdown\n\n#Test markdown\n\nThis is a **test** for _markdown_";

  ngOnInit(){
    this.syService.fetchMyProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    });
  }
}
