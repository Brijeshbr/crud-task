import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: [''],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  submit() {
    console.log(this.taskForm.value);
    this.taskSvc.addTask(this.taskForm.value).subscribe((res) => {
      this.router.navigate(['list']);
      this.taskForm.reset();
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
