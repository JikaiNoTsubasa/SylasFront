import { Component, inject, TemplateRef } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DevelopmentTime, Issue, Priority, Project } from '../../Models/Database/Project';
import { NotificationService } from '../../Services/NotificationService';
import { MkFieldComponent } from "../../comps/mk-field/mk-field.component";
import { PopupService } from '../../Services/PopupService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestUpdateProject } from '../../Models/Requests/RequestUpdateProject';
import { MarkdownModule } from 'ngx-markdown';
import { UserService } from '../../Services/UserService';
import { TabComponent } from "../../comps/tab/tab.component";
import { TabsComponent } from '../../comps/tabs/tabs.component';
import { Document } from '../../Models/Database/Document';
import { DocumentComponent } from "../../comps/document/document.component";
import { GalleryImage, ImgGalleryComponent } from "../../comps/img-gallery/img-gallery.component";

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, MkFieldComponent, RouterModule, ReactiveFormsModule, MarkdownModule, TabsComponent, TabComponent, DocumentComponent, ImgGalleryComponent],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {

  syService = inject(SyService);
  route = inject(ActivatedRoute);
  notService = inject(NotificationService);
  router = inject(Router);
  popup = inject(PopupService);
  userService = inject(UserService);

  project: Project | null = null;

  loading: boolean = false;
  canCreateQuest: boolean = false;

  priorities = Object.values(Priority).filter(v => typeof v != 'number');
  devTimes = Object.values(DevelopmentTime).filter(v => typeof v != 'number');
  complexities = Array.from({ length: 10 }, (_, i) => i + 1);

  selectedIssue: Issue | null = null;

  // Form new issue
  issueForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    priority: new FormControl(this.priorities[1], Validators.required),
    devTime: new FormControl(this.devTimes[1], Validators.required),
    complexity: new FormControl(this.complexities[0], Validators.required),
    gitlab: new FormControl(''),
    duedate: new FormControl(''),
    labels: new FormControl([]),
    milestone: new FormControl(''),
  });

  questForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  // Form project
  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  // Document variables
  fileName = 'No file selected';
  fileData: any = null;
  documents: Document[] | null = null;
  uploadingDocument: boolean = false;

  // Form add document
  addDocumentForm = new FormGroup({
    file: new FormControl('', Validators.required),
  });

  // Gallery
  galleryItems: GalleryImage[] = [
    {
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-icon.png',
      alt: 'Sylas'
    },{
      src: '/images/sy-iconkkk.png',
      alt: 'Sylas'
    },
  ];

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
        this.calculateCanCreateQuest();
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

  onAddIssue(){
    if (this.project == null) return;
    if (!this.issueForm.valid){
      this.notService.error("Form is not valid");
      return;
    }

    let devTime: DevelopmentTime = Object.values(DevelopmentTime).find(e => e === this.issueForm.value.devTime) as DevelopmentTime;
    let priority: Priority = Object.values(Priority).find(e => e === this.issueForm.value.priority) as Priority;
    let milestoneId = undefined;
    if (this.issueForm.value.milestone) milestoneId = parseInt(this.issueForm.value.milestone ?? "0");

    this.syService.createIssue(
      this.project.id, 
      this.issueForm.value.name ?? "", 
      devTime, 
      this.issueForm.value.complexity ?? 1, 
      priority,
      this.issueForm.value.description ?? undefined,
      this.issueForm.value.gitlab ?? undefined,
      this.issueForm.value.duedate ?? undefined,
      milestoneId
    ).subscribe({
      next: () => {
        this.notService.info("Issue created");
        this.refreshProject();
        this.popup.close();
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    })
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
   this.popup.close();
  }

  selectIssue(id: number){
    this.syService.fetchIssue(id).subscribe({
      next: (issue) => {
        this.selectedIssue = issue;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
      }
    });
  }

  updateProjectDescription(text: string){
    let req = new RequestUpdateProject();
    req.description = text;

    this.syService.updateProject(this.project?.id ?? 0, req).subscribe({
      next: (project) => {
        this.refreshProject();
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
        this.notService.info("Updated description");
      }
    });
  }

  openNewQuest(template: TemplateRef<any>, context = {}){
    if (this.project == null) return;
    this.popup.open(template, context);
  }

  onAddQuest(){
    this.syService.createQuest(this.questForm.value.name ?? "", this.questForm.value.description ?? "", this.selectedIssue?.id ?? 0, 1).subscribe({
      next: () => {
        this.notService.info("Quest created");
        this.refreshProject();
        this.popup.close();
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    })
  }

  calculateCanCreateQuest(){
    this.canCreateQuest = this.project?.owner.id == this.userService.userId;
    // console.log('Owner: ', this.project?.owner.id, 'User: ', this.userService.userId, 'Username: ', this.userService.userName, 'Can create quest: ', this.canCreateQuest);
  }

  openEditProject(template: TemplateRef<any>, context = {}){
    if (this.project == null) return;
    this.projectForm.controls['name'].setValue(this.project.name);
    this.projectForm.controls['description'].setValue(this.project.description);
    this.popup.open(template, context);
  }

  onEditProject(){
    let req: RequestUpdateProject = new RequestUpdateProject();
    req.name = this.projectForm.value.name ?? null;
    req.description = this.projectForm.value.description ?? null;
    this.syService.updateProject(this.project?.id ?? 0, req).subscribe({
      next: () => {
        this.notService.info("Project updated");
        this.refreshProject();
        this.popup.close();
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    })
  }

  openAddDocument(template: TemplateRef<any>, context = {}){
    if (this.project == null) return;
    this.popup.open(template, context);
  }

  onSubmitAddDocument(){
    this.uploadingDocument = true;
    this.syService.createDocument(this.fileName, this.fileData, this.project?.id).subscribe({
      next: () => {
        this.notService.info("Document added");
        this.refreshDocuments();
        this.popup.close();
        this.uploadingDocument = false;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {
      }
    })
  }

  onFileChange(event: any) {
    this.fileName = event.target.files[0].name;
    this.fileData = event.target.files[0];
  }

  refreshDocuments(){
    this.syService.fetchDocumentsForEntity(this.project?.id ?? 0).subscribe({
      next: (documents) => {
        this.documents = documents;
      },
      error: (e) => {
        this.notService.error(e.message);
      },
      complete: () => {}
    });
  }

  onTabChange(name: string){
    switch (name){
      case 'Documents':
        this.refreshDocuments();
        break;
      case 'Project':
        this.refreshProject();
        break;
    }
  }
}
