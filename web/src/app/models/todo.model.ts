import { Priority } from "./priority.model";

export interface Todo {

    id?: number;
    label?: number[];
    priority?: Priority;
    title: string;
    description?: string;
    due?: Date;

}