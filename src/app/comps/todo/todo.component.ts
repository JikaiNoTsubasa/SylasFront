import { Component, inject, Input } from '@angular/core';
import { Todo } from '../../Models/Database/Todo';
import { SyService } from '../../Services/SyService';
import { CommonModule } from '@angular/common';
import { RequestUpdateTodo } from '../../Models/Requests/RequestUpdateTodo';
import { NotificationService } from '../../Services/NotificationService';

@Component({
  selector: 'todo',
  imports: [ CommonModule ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  syService = inject(SyService);
  notService = inject(NotificationService);

  @Input() todo: Todo | null = null;
  editMode: boolean = false;

  setToEdit(){
    this.editMode = true;
  }

  onNameChange(e:any){
    this.todo!.name = e.target.value;
    this.editMode = false;

    let req : RequestUpdateTodo = new RequestUpdateTodo();
    req.name = this.todo?.name ?? '';

    this.syService.updateTodo(this.todo?.id ?? 0, req).subscribe({
      next: (todo) => {
        this.notService.info("Updated todo "+this.todo?.id);
      },
      error: (e) => {
        this.notService.error(e.message);
      }
    });
  }
}
