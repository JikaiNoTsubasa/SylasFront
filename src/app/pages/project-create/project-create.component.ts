import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { Customer } from '../../Models/Database/Customer';
import { NotificationService } from '../../Services/NotificationService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-project-create',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './project-create.component.html',
    styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent {

    syService = inject(SyService);
    notService = inject(NotificationService);
    router = inject(Router);

    customers: Customer[] = [];

    formCreateProject = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        customer: new FormControl(''),
    });

    ngOnInit() {
        this.refreshCustomers();
    }

    refreshCustomers() {
        this.syService.fetchCustomers().subscribe({
            next: (customers) => {
                this.customers = customers;
            },
            error: (e) => {
                this.notService.error(e.message);
            },
            complete: () => {}
        });
    }

    createProject(){
        this.syService.createProject(this.formCreateProject.value.name ?? "Default", this.formCreateProject.value.description ?? "", parseInt(this.formCreateProject.value.customer ?? "0")).subscribe({
            next: (project) => {
                this.notService.info("Project created");
                this.router.navigate(['project', project.id]);
            },
            error: (e) => {
                this.notService.error(e.message);
            },
            complete: () => {}
        });
    }
}
