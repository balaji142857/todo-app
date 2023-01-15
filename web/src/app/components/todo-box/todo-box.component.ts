import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RestService } from '../../services/rest.service';
import { Todo } from '../../models/todo.model';
import { StaticDataService } from '../../services/static-data.service';
import { Label } from '../../models/label.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../../dialogs/todo-dialog/todo-dialog.component';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

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
    'HOLD': this. hold,
    'COMPLETED': this.completed
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
        labels: this.labels,
        statuses: this.status
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
      title: '',
      labels: [],
      description: '',
      dueBy: new Date().toISOString().split('T')[0]
    }
  }

  draggingIndex: number = -1;
  dragginFromList: Todo[] = [];
  dragDestStatus: string| undefined;

  onDragStart(fromIndex: number, todoList: Todo[]): void {
    this.draggingIndex = fromIndex;
    this.dragginFromList = todoList;
  }

  onDragEnd(): void {
    if (!this.dragginFromList || this.draggingIndex == -1 || !this.dragDestStatus) {
      return;
    }
    const todo = this.dragginFromList.splice(this.draggingIndex, 1)[0];
    todo.status = this.dragDestStatus;    
    this.service.saveTodo(todo).subscribe(console.log, console.log);
    this.statusToTodoMapping[this.dragDestStatus].push(todo);
    this.draggingIndex = -1;
    this.dragginFromList = [];
    this.dragDestStatus = undefined;
  } 

  onDragEnter(status: string) {
    this.dragDestStatus = status;
  }

}
