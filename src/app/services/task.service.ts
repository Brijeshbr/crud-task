import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  addTask(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  getTaskList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
