import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RestService } from '../services/rest.service';
import { Todo } from '../models/todo.model';
import { StaticDataService } from '../services/static-data.service';
import { Label } from '../models/label.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

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
  allSelected = false;

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
  
  constructor(public service: RestService,
    public staticData: StaticDataService,
    public dialog: MatDialog) {
      staticData.priorities().subscribe(data => this.priorities = data);
      staticData.status().subscribe(data => this.status = data);
      service.labels().subscribe(data => this.labels = data);
      this.service.todos().subscribe(data => this.reloadTodos(data), err => console.log);
  }

  reloadTodos(data: Todo[]) {
    for (let key in this.statusToTodoMapping) {
      this.statusToTodoMapping[key].splice(0,this.statusToTodoMapping[key].length);
    }
    //load the list
    for(var i=0; i < data.length; i ++) {
      this.statusToTodoMapping[data[i].status].push(data[i]);
    }
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

  // TODO -- this is purely related to checkbox.. why bloat this component with checkbox logic
  toggleAllSelection(selectBox: MatSelect) {
    let op : MatOption;
    if (this.allSelected) {
      selectBox.options.forEach((item: MatOption) => item.select());
    } else {
      selectBox.options.forEach((item: MatOption) => item.deselect());
    }
  }

  newTodo() {
    const todoItem = this.getDefaultTodo();
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {
        model: todoItem,
        priorities: this.priorities,
        labels: this.labels
      },
      height: '80vh',
      width: '80vw',
      position : {
        left: '10vw',
        top: '10vh'
      },
      panelClass: todoItem.priority
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reload) {
        this.service.todos().subscribe(data => this.reloadTodos(data), err => console.log);
      }
    });
  }

  //TODO get this from backend -- and fetch it from user preference
  getDefaultTodo(): Todo {
    return {
      items: [],
      priority: 'LOW',
      status: 'TBD',
      title: 'Todo List title',
      labels: [],
      description: '',
      dueBy: new Date().toISOString().split('T')[0]
    }
  }

}
