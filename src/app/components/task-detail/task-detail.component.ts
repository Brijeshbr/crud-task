import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  taskId!: number;
  taskDetails!: Task;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksvc: TaskService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.taskId = val['id'];
      this.fetchUserDetails(this.taskId);
    });
  }

  fetchUserDetails(userId: number) {
    this.tasksvc.getTaskId(userId).subscribe({
      next: (res) => {
        this.taskDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
