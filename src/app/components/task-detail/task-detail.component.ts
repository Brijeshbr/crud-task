import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  userId!: number;
  userDetails!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksvc: TaskService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    });
  }

  fetchUserDetails(userId: number) {
    this.tasksvc.getTaskId(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.userDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
