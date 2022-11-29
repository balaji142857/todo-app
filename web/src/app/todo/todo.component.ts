import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';
import { Todo } from '../models/todo.model';
import { RestService } from '../services/rest.service';
import { UtilService } from '../services/util.service';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { TodoHistoryDialogComponent } from '../todo-history-dialog/todo-history-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  day = 24*60*60*1000;
  now = new Date();
  Number = Number;

  @Input()
  item!: Todo;

  @Input()
  priorities: string[] = [];

  @Input()
  labels: Label[] = [];

  @Input()
  statuses: string[] = [];
  
  constructor(public util: UtilService, public dialog: MatDialog,
    private service: RestService) { }

  ngOnInit(): void {
  }

  date(val: string): Date {
    return new Date(val);
  }

  between(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {
        model: JSON.parse(JSON.stringify(this.item)),
        priorities: this.priorities,
        labels: this.labels,
        statuses: this.statuses
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
      if (result && result.reload) {
        this.service.getTodo(result.id).subscribe(data => this.item = data);
      }
    });
  }

  openHistory() {
    if (!this.item.id) {
      return;
    }    
    this.service.history(this.item.id).subscribe(
      data => {
        const dialogRef = this.dialog.open(TodoHistoryDialogComponent, {
          data: {
            model: data,
            priorities: this.priorities,
            labels: this.labels,
            statuses: this.statuses
          },
          height: '80vh',
          width: '80vw',
          position : {
            left: '10vw',
            top: '10vh'
          }
        })
      },
      err => console.log
    );
  }

}

