import { TodoItem } from "./todo-item.model";

export interface Todo {

    id?: number;
    labels?: number[];
    priority: string;
    title: string;
    description?: string;
    dueBy?: string;
    status: string;
    items: TodoItem[]

}