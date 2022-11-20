import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as env from '../..//environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(private http: HttpClient) { }

  basePath = env.environment.backendUrl;


  priorities() : Observable<string[]> {
    return this.http.get<string[]>(this.basePath+'static/priorities');
  }

  status(): Observable<string[]> {
    return this.http.get<string[]>(this.basePath+'static/status');
  }
}
