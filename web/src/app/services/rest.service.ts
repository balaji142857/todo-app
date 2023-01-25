import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  todos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.basePath+'todos/list');
  }

  todosWithoutFilter(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.basePath+'todos/listAll');
  }

  labels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.basePath+'labels');
  }

  saveTodo(todo: Todo) {
    return this.http.post(this.basePath+'todos', todo, this.httpOptions);
  }

  deleteTodo(todoId: number | undefined) {
    let url = `${this.basePath}todos/${todoId}/delete`;
    return this.http.post(url, this.httpOptions);
  }

  history(todoId: number) {
    let url = `${this.basePath}todos/${todoId}/audit`;
    return this.http.get(url);
  }

  getTodo(todoId: number): Observable<Todo> {
    let url = `${this.basePath}todos/${todoId}`;
    return this.http.get<Todo>(url);
  }


}
