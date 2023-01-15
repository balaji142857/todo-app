import {Injectable, Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'todoItemSort',
  pure: false
})
@Injectable()
export class TodoItemSortPipe implements PipeTransform {

  transform(value: TodoItem[], sortOrder: SortOrder | string = 'asc'): TodoItem[] {
    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc'))  {
      return value; 
    }    
    let sorted = value.sort((a, b) => a.itemOrder - b.itemOrder);
    var soretedWithDir =  sortOrder === 'asc' ? sorted : sorted.reverse();
    return soretedWithDir;
  }

}