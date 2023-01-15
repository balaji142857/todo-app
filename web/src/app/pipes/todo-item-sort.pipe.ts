import {Injectable, Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'todoItemSort'
})
@Injectable()
export class TodoItemSortPipe implements PipeTransform {

  transform(value: TodoItem[], sortOrder: SortOrder | string = 'asc'): TodoItem[] {
    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc'))  {
      return value; 
    }
    let numberArray = value.sort((a, b) => a.itemOrder - b.itemOrder);
    var result =  sortOrder === 'asc' ? numberArray : numberArray.reverse();
    return result;
  }

}