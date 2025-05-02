import { Component, inject } from '@angular/core';
import { SyService } from '../../Services/SyService';
import { Customer } from '../../Models/Database/Customer';
import { NotificationService } from '../../Services/NotificationService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
}
