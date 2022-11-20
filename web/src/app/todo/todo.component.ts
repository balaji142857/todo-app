import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';
import { Todo } from '../models/todo.model';
import { UtilService } from '../services/util.service';

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
  
  constructor(public util: UtilService) { }

  ngOnInit(): void {
  }

}
