import {Injectable, Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from './models/todo-item.model';

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


// @Pipe({
//   name: 'sort',
// })
// export class SortPipe implements PipeTransform {
//   transform(value: any[], sortOrder: SortOrder | string = 'asc', sortKey?: string): any {
//     sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

//     if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

//     let numberArray = [];
//     let stringArray = [];

//     if (!sortKey) {
//       numberArray = value.filter(item => typeof item === 'number').sort();
//       stringArray = value.filter(item => typeof item === 'string').sort();
//     } else {
//       numberArray = value.filter(item => typeof item[sortKey] === 'number').sort((a, b) => a[sortKey] - b[sortKey]);
//       stringArray = value
//         .filter(item => typeof item[sortKey] === 'string')
//         .sort((a, b) => {
//           if (a[sortKey] < b[sortKey]) return -1;
//           else if (a[sortKey] > b[sortKey]) return 1;
//           else return 0;
//         });
//     }
//     const sorted = numberArray.concat(stringArray);
//     return sortOrder === 'asc' ? sorted : sorted.reverse();
//   }
// }
