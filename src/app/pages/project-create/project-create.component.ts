import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { Customer } from '../../Models/Database/Customer';
import { NotificationService } from '../../Services/NotificationService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ResponseCreateProject } from '../../Models/Requests/ResponseCreateProject';
import { XpGainedComponent } from "../../comps/xp-gained/xp-gained.component";
import { DropdownComponent, DropdownOption } from '../../comps/dropdown/dropdown.component';

@Component({
    selector: 'app-project-create',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule, XpGainedComponent, DropdownComponent],
    templateUrl: './project-create.component.html',
    styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent {

    syService = inject(SyService);
    notService = inject(NotificationService);
    router = inject(Router);

    customers: Customer[] = [];
    customersOptions: DropdownOption[] = [];

    formCreateProject = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        customer: new FormControl(''),
    });

    respProject: ResponseCreateProject | null = null;

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
            complete: () => {
                this.customersOptions = this.customers.map((customer) => {
                    return new DropdownOption(customer.id, customer.name);
                });
            }
        });
    }

    createProject(){
        this.syService.createProject(this.formCreateProject.value.name ?? "Default", this.formCreateProject.value.description ?? "", parseInt(this.formCreateProject.value.customer ?? "0")).subscribe({
            next: (project) => {
                this.notService.info("Project created");
                this.respProject = project;
            },
            error: (e) => {
                this.notService.error(e.message);
            },
            complete: () => {
            }
        });
    }

    reset() {
        this.respProject = null;
        this.formCreateProject.reset();
    }
}
