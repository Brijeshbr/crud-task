import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  addTask(data: User) {
    return this.http.post<User>(`${this.baseUrl}`, data);
  }

  updateTask(data: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, data);
  }

  getTaskList() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  deleteTask(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  getTaskId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
