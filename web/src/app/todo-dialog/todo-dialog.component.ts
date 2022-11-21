import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Todo } from '../models/todo.model';
import { UtilService } from '../services/util.service';
import { MatSelectChange } from '@angular/material/select';



@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {

  todo: Todo;
  newTodoText: string ="";
  isTitleInEditMode:boolean = false;
  labels: any[]= [];

  constructor( public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilService) { 
    this.todo = data.model;
    if (!this.todo.labels) {
      this.todo.labels = [];
    }
    this.labels = data.labels.filter((item: { id: number; value: string}) => !this.todo.labels?.includes(item.id));
  }

  ngOnInit(): void {
  }

  someMethod(){
    if (!this.newTodoText.length || !this.newTodoText.trim().length) {
      return;
    }
    this.todo.items.push(this.newTodoText);
    this.newTodoText = '';
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    // else {
    //   transferArrayItem(event.previousContainer.data,
    //       event.container.data,
    //       event.previousIndex,
    //       event.currentIndex);
    //       console.log(event.container.data,'container data');
    // }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveChanges() {
    //TODO invoke the save call to the backend
  }

  saveTitle() {
    this.isTitleInEditMode = false;
  }



  something(event: KeyboardEvent, isTitle: boolean) {
    if(event.code !=='Enter') {
      return;
    }
    isTitle ? this.saveTitle() : this.someMethod();
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

}
