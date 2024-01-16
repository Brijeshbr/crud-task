import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  addTask(data: Task) {
    return this.http.post<Task>(`${this.baseUrl}`, data);
  }

  updateTask(data: Task, id: number) {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, data);
  }

  getTaskList() {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  deleteTask(id: number) {
    return this.http.delete<Task>(`${this.baseUrl}/${id}`);
  }

  getTaskId(id: number) {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }
}
