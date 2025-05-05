import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Project } from '../../Models/Database/Project';
import { NotificationService } from '../../Services/NotificationService';
import { MkFieldComponent } from "../../comps/mk-field/mk-field.component";

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, MkFieldComponent, RouterModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {

  syService = inject(SyService);
  route = inject(ActivatedRoute);
  notService = inject(NotificationService);
  router = inject(Router);

  project: Project | null = null;

  loading: boolean = false;

  ngOnInit(){
    this.refreshProject();
  }

  refreshProject(){
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.syService.fetchProject(parseInt(id ?? "0")).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  deleteProject(){
    if (this.project == null) return;
    this.syService.deleteProject(this.project.id).subscribe({
      next: () => {
        this.notService.info("Project deleted");
        this.router.navigate(["/myprojects"]);
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    });
  }

  newIssue(){
    
  }
}
