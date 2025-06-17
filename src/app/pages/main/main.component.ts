import { Component, inject, TemplateRef } from '@angular/core';
import { NotificationService } from '../../Services/NotificationService';
import { UserService } from '../../Services/UserService';
import { User } from '../../Models/Database/User';
import { SyService } from '../../Services/SyService';
import { XpBarComponent } from "../../comps/xp-bar/xp-bar.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopupService } from '../../Services/PopupService';
import { Todo } from '../../Models/Database/Todo';
import { CommonModule } from '@angular/common';
import { TodoComponent } from "../../comps/todo/todo.component";
import { RequestUpdateTodo } from '../../Models/Requests/RequestUpdateTodo';
import { PlanningComponent } from "../../comps/planning/planning.component";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [ /*XpBarComponent,*/ RouterModule, ReactiveFormsModule, CommonModule, TodoComponent, PlanningComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent {

  notification = inject(NotificationService);
  syService = inject(SyService);
  userService = inject(UserService);
  authService = inject(AuthService);
  popupService = inject(PopupService);

  user: User | null = null;
  todos: Todo[] = [];

  loading: boolean = true;

  formCreateTodo = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    dueDate: new FormControl('')
  });

  formEditTodo = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    dueDate: new FormControl(''),
    id: new FormControl('')
  });

  ngOnInit(){
    this.refreshUser();
    this.refreshTodoList();
  }

  refreshUser(){
    this.syService.fetchMyUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error : (e) => {
        this.notification.error(e.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  refreshTodoList(){
    this.syService.fetchAllMyTodos().subscribe({
      next: (data) => {
        this.todos = data;
      },
      error: (e) => {
        this.notification.error(e.message);
      }
    });
  }

  logout(){
    this.authService.logout();
  }

  openAddTodoPopup(template: TemplateRef<any>, context: any = {}){
    this.popupService.open(template, context);
  }

  onAddTodo(){
    if (this.formCreateTodo.valid) {
      let todoName:string = this.formCreateTodo.value.name ?? "Default Name";
      let description: string | undefined = this.formCreateTodo.value.description ?? undefined;
      let dueDate: string | undefined = this.formCreateTodo.value.dueDate ?? undefined;
      this.syService.createTodo(todoName, description, dueDate).subscribe({
        next: () => {
          this.formCreateTodo.reset();
          this.refreshTodoList();
          this.popupService.close();
        },
        error: (e) => {
          this.notification.error(e.message);
        }
      });
    }else{
      this.notification.error("Invalid form");
    }
  }

  openEditTodoPopup(template: TemplateRef<any>, context: any = {}, todo: Todo){
    this.popupService.open(template, context);
    this.formEditTodo.controls['name'].setValue(todo.name);
    this.formEditTodo.controls['description'].setValue(todo.description);
    this.formEditTodo.controls['dueDate'].setValue(todo.dueDate.toString());
    this.formEditTodo.controls['id'].setValue(todo.id.toString());
  }

  onEditTodo(){
    if (this.formEditTodo.valid) {
      let req: RequestUpdateTodo = new RequestUpdateTodo();
      req.name = this.formEditTodo.value.name ?? "Default Name";
      req.description = this.formEditTodo.value.description ?? null;
      req.dueDate = this.formEditTodo.value.dueDate ?? null;

      let id = parseInt(this.formEditTodo.value.id ?? "0");

      this.syService.updateTodo(id, req).subscribe({
        next: () => {
          this.formEditTodo.reset();
          this.refreshTodoList();
          this.popupService.close();
        },
        error: (e) => {
          this.notification.error(e.message);
        }
      });
    }else{
      this.notification.error("Invalid form");
    }
  }
}
