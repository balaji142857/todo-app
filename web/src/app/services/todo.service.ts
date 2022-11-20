import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }


  list() : Todo[] {
    return [{
      title: 'first list first todo',
      description: 'some description',      
      id: 1,
      labels: [1,3],
      priority: 'high'
    },{
      title: 'first list second todo',
      description: 'some other description',      
      id: 1,
      labels: [1,3],
      priority: 'medium'
    }];
  }

  list1() : Todo[] {
    return [{
      title: 'second list first todo',
      description: 'another description',      
      id: 1,
      labels: [1,3],
      priority: 'critical'
    }];
  }

  get() {}

  save() {}

  delete() {}

}
