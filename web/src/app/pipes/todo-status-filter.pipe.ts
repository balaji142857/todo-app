import {Injectable, Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';
import { Todo } from '../models/todo.model';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'todoStatusFilter'
})
@Injectable()
export class TodoStatusFilterPipe implements PipeTransform {

  transform(value: Todo[] | null , status: string): Todo[] {
    if (!value || value.length == 0 || !status || status.trim().length == 0 ) {
        return [];
    }
    return value.filter(item => item.status === status);
  }

}