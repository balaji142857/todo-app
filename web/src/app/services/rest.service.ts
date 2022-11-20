import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as env from '../..//environments/environment';
import { Todo } from '../models/todo.model';
import { Label } from '../models/label.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  basePath = env.environment.backendUrl;


  todos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.basePath+'todos');
  }

  labels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.basePath+'labels');
  }
}
