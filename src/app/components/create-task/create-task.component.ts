import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskSvc: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: [''],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.taskSvc.getTaskId(this.userIdToUpdate).subscribe({
          next: (res) => {
            this.fillFormToUpdate(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  submit() {
    console.log(this.taskForm.value);
    this.taskSvc.addTask(this.taskForm.value).subscribe((res) => {
      this.router.navigate(['list']);
      this.taskForm.reset();
    });
  }

  fillFormToUpdate(user: User) {
    this.taskForm.setValue({
      title: user.title,
      description: user.description,
      dueDate: user.dueDate,
      status: user.status,
    });
  }

  update() {
    this.taskSvc
      .updateTask(this.taskForm.value, this.userIdToUpdate)
      .subscribe((res) => {
        this.router.navigate(['list']);
        this.taskForm.reset();
      });
  }

  cancel() {
    this.router.navigate(['list']);
  }
}
