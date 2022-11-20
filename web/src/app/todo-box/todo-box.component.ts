import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { StaticDataService } from '../services/static-data.service';

@Component({
  selector: 'app-todo-box',
  templateUrl: './todo-box.component.html',
  styleUrls: ['./todo-box.component.scss'],
})
export class TodoBoxComponent {
  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];


  todo: Todo[] = [];
  done: Todo[]= [];
  status: string[] = [];

  constructor(public service: TodoService, public staticData: StaticDataService) {
    this.todo = service.list();
    this.done = service.list1();

    staticData.status().subscribe(data => this.status = data)
  }

  drop(event: CdkDragDrop<Todo[]>, dropStatus: string): void {
    console.log('drop triggered', event);
    console.log('item.data', JSON.stringify(event.item.data))
    console.log('container.data', JSON.stringify(event.container.data))
    if (event.previousContainer === event.container) {
      console.log('same')
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('different')
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          console.log(event.container.data,'container data');
    }
  }
}
