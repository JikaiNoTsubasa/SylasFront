import { TodoStatus } from "../Database/Todo";

export class RequestUpdateTodo {
    name: string | null;
    description: string | null;
    status: TodoStatus | null;
    dueDate: string | null;
}