import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';
import { Todo } from '../models/todo.model';
import { UtilService } from '../services/util.service';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input()
  item!: Todo;

  @Input()
  priorities: string[] = [];

  @Input()
  labels: Label[] = [];
  
  constructor(public util: UtilService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {
        model: this.item,
        priorities: this.priorities,
        labels: this.labels
      },
      height: '80vh',
      width: '80vw',
      position : {
        left: '10vw',
        top: '10vh'
      },
      panelClass: this.item.priority
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
