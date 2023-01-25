import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from 'src/app/models/label.model';
import { Todo } from 'src/app/models/todo.model';
import { RestService } from 'src/app/services/rest.service';
import { StaticDataService } from 'src/app/services/static-data.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class ArchivedComponent implements OnInit {

  todos$ : Observable<Todo[]>;
  status: string[] = [];
  priorities: string[] = [];
  labels: Label[] = [];

  constructor(private service: RestService,
    public staticData: StaticDataService) {  
    staticData.priorities().subscribe(data => this.priorities = data);
    staticData.status().subscribe(data => this.status = data);
    service.labels().subscribe(data => this.labels = data);
    this.todos$ = this.loadTodos();
  }

  ngOnInit(): void {
    
  }

  loadTodos() {
    return this.service.todosWithoutFilter();
  }

}

