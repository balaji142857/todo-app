import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Label } from '../../models/label.model';
import { Todo } from '../../models/todo.model';
import { RestService } from '../../services/rest.service';
import { UtilService } from '../../services/util.service';
import { TodoDialogComponent } from '../../dialogs/todo-dialog/todo-dialog.component';
import { TodoHistoryDialogComponent } from '../../dialogs/todo-history-dialog/todo-history-dialog.component';

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

  @Output()
  itemPurged: EventEmitter<string>  = new EventEmitter<string>();
  
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

  saveTodo() {
    this.service.saveTodo(this.item).subscribe(console.log, console.log);
  }

  deleteTodo() {
    if(confirm("Are you sure to delete ")) {
      this.service.deleteTodo(this.item.id).subscribe(data => {
        this.itemPurged.emit("deleted");
      }, console.log);
    }
    
  }

  getOpenItemCount(): string {
    if (!this.item || !this.item.items) {
      return '';
    }
    var openItems = this.item.items.reduce( (acc, obj) =>  acc + (obj.completed ? 0: 1), 0);
    return openItems == 0 ? '' : openItems+'';
  }

}

