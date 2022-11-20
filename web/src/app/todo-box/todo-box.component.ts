import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RestService } from '../services/rest.service';
import { Todo } from '../models/todo.model';
import { StaticDataService } from '../services/static-data.service';
import { Label } from '../models/label.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-box',
  templateUrl: './todo-box.component.html',
  styleUrls: ['./todo-box.component.scss'],
})
export class TodoBoxComponent {

  tbd: Todo[] = [];
  inProgress: Todo[]= [];
  hold: Todo[] =[];
  completed: Todo[] =[];

  statusToTodoMapping: any = {
    'TBD': this.tbd,
    'IN PROGRESS': this.inProgress,
    'COMPLETED': this.completed,
    'HOLD': this.hold
  }

  status: string[] = [];
  priorities: string[] = [];
  labels: Label[] = [];

  filteredPriorities: string[] = [];
  filteredStatus: string[] = [];
  filteredLabels: number[] =[];
  filteredDate : any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  constructor(public service: RestService, public staticData: StaticDataService) {

    staticData.priorities().subscribe(data => this.priorities = data);
    staticData.status().subscribe(data => this.status = data);
    service.labels().subscribe(data => this.labels = data);

    service.todos().subscribe(data => {
        let todoArr: Todo[] = <any>data;
        for(var i=0; i < todoArr.length; i ++) {
          this.statusToTodoMapping[todoArr[i].status].push(todoArr[i]);
        }
    });
  }

  getOtherStatus(curStatus:string) {
    return this.status.filter(curItem => curItem != curStatus)
  }

  // TODO  this is directly invoked from UI binding!!!!!!
  containsAny(arr1: number[], arr2: number[]) : boolean {
    return  arr1.some(it => arr2.includes(it));
  }

  //TODO - this is also getting invoked directly from UI binding!!
  dateInRange(dateStr: string,from: any, to: any) : boolean {
    
    if (!dateStr.length) {
      return false;
    }
    console.log('invoked',dateStr, from, to)
    var dueDate = new Date(dateStr);
    if (!from) {
        return dueDate <= to;
    }
    if(!to) {
      return dueDate >= from;
   }
    return dueDate >= from && dueDate <=to;
      
      
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
