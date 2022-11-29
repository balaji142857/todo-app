import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Todo } from '../models/todo.model';
import { UtilService } from '../services/util.service';
import { MatSelectChange } from '@angular/material/select';
import { TodoItem } from '../models/todo-item.model';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-todo-history-dialog',
  templateUrl: './todo-history-dialog.component.html',
  styleUrls: ['./todo-history-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TodoHistoryDialogComponent {

  dataSource = [];
  columnsToDisplay = ['revision','revisionTime','type', 'title','priority','status'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Todo | null | undefined;

  constructor( public dialogRef: MatDialogRef<TodoHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: RestService,
    public util: UtilService) {
      this.dataSource = data.model;
    }

}
