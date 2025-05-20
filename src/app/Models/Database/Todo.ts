export interface Todo{
    id: number;
    name: string;
    description: string;
    dueDate: Date;
    status: TodoStatus;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
    createdBy: number;
    updatedBy: number;
    deletedBy: number;
    isDeleted: boolean;
}

export enum TodoStatus{
    TODO = 'TODO',
    DONE = 'DONE'
}