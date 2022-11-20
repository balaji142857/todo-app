import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }


  list() : Observable<Todo[]> {
    return of([{
      title: 'first todo',
      description: 'some description',
      due: new Date(),
      id: 1,
      label: [1,3]
    }]);
  }

  get() {}

  save() {}

  delete() {}

}
