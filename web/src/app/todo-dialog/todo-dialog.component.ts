import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { Todo } from '../models/todo.model';
import { UtilService } from '../services/util.service';
import { MatSelectChange } from '@angular/material/select';
import { TodoItem } from '../models/todo-item.model';
import { RestService } from '../services/rest.service';



@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent {

  todo: Todo;
  newTodoText: string ="";
  isTitleInEditMode:boolean = false;
  labels: any[]= [];

  constructor( public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: RestService,
    public util: UtilService) { 
    this.todo = data.model;
    
    if (!this.todo.labels) {
      this.todo.labels = [];
    }
    this.labels = data.labels.filter((item: { id: number; value: string}) => !this.todo.labels?.includes(item.id));
  }

  addTodoItem(){
    if (!this.newTodoText.length || !this.newTodoText.trim().length) {
      return;
    }
    const todoItem:TodoItem = {
      completed: false,
      description: this.newTodoText,
      itemOrder: this.todo.items.length + 1
    }
    this.todo.items.push(todoItem);
    this.newTodoText = '';
  }

  drop(event: CdkDragDrop<TodoItem[]>): void {
    console.log('drop called');
    const start = event.previousIndex;
    const end = event.currentIndex;    
    console.log('start & end indices are ', start, end);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    if (start < end) {
      for (let i = start; i<=end; i++) {
        this.todo.items[i].itemOrder=i+1;
        console.log('updated item order for ' + this.todo.items[i].description +' to ' + this.todo.items[i].itemOrder);
      }
    }
    else {
      for (let i = start; i>=end; i--) {
        this.todo.items[i].itemOrder=i+1;
        console.log('updated item order for ' + this.todo.items[i].description +' to ' + this.todo.items[i].itemOrder);
      }
    }
    
  }

  closeDialog() {
    // this.dialogRef.close();
  }

  saveChanges() {
    this.service.saveTodo(this.todo).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close({reload: true, id: this.todo.id}); 
      }, 
      err => console.log
    );
  }

  saveTitle() {
    this.isTitleInEditMode = false;
  }



  something(event: KeyboardEvent, isTitle: boolean) {
    if(event.code !=='Enter') {
      return;
    }
    isTitle ? this.saveTitle() : this.addTodoItem();
  }

  addLabel(event: KeyboardEvent, arg2: any) {
    if(event.code !=='Enter') {
      return;
    }
    if (!arg2) {
      return;
    }
    if (!arg2.value || this.todo.labels?.includes(arg2.value)) {
      return;
    }
    this.todo.labels?.push(arg2.value);
  }

  labelSelected(event: MatSelectChange) {
    const selectedLabelIndex =  this.labels.indexOf(this.util.findElementByProp(this.labels, 'id', event.value));
    this.todo.labels?.push(event.value);
    this.labels.splice(selectedLabelIndex, 1);
    
  }

  addOptionBack(labelId: number) {
    if (!this.todo.labels) {
      this.todo.labels = [];
    }
    const labelIndex: number = this.todo.labels.indexOf(labelId);
    this.todo.labels?.splice(labelIndex, 1);
    this.labels.push(this.util.findElementByProp(this.data.labels, 'id', labelId));
  }

  priorityChanged(model: string, event: any) {
    console.log(model, event);
    this.dialogRef.removePanelClass(['CRITICAL','HIGH','MEDIUM','LOW']);
    this.dialogRef.addPanelClass(event);
  }

  statusChangedChanged(model: string, event: any) {
    console.log(model, event);
    // this.dialogRef.removePanelClass(['CRITICAL','HIGH','MEDIUM','LOW']);
    // this.dialogRef.addPanelClass(event);
  }

}
