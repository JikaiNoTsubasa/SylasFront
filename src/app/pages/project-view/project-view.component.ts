import { Component, inject, TemplateRef } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Project } from '../../Models/Database/Project';
import { NotificationService } from '../../Services/NotificationService';
import { MkFieldComponent } from "../../comps/mk-field/mk-field.component";
import { SidePanelComponent } from '../../comps/side-panel/side-panel.component';
import { PopupService } from '../../Services/PopupService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, MkFieldComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {

  syService = inject(SyService);
  route = inject(ActivatedRoute);
  notService = inject(NotificationService);
  router = inject(Router);
  popup = inject(PopupService);

  project: Project | null = null;

  loading: boolean = false;

  // Form new issue
  issueForm = new FormGroup({
    name: new FormControl(''),
  });

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

  openNewIssue(template: TemplateRef<any>, context = {}){
    if (this.project == null) return;
    this.popup.open(template, context);
  }

  closeNewIssue(){
    this.popup.close();
  }

  onAddIssue(){
    if (this.project == null) return;
    /*
    this.syService.createIssue(this.project.id, this.issueForm.value.name ?? "").subscribe({
      next: () => {
        this.notService.info("Issue created");
        this.refreshProject();
        this.closeNewIssue();
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    });
    */
   this.closeNewIssue();
  }
}
