import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm!: FormGroup;
  private taskIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskSvc: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: [''],
      status: ['', [Validators.required]],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.taskIdToUpdate = val['id'];
      if (this.taskIdToUpdate) {
        this.isUpdateActive = true;
        this.taskSvc.getTaskId(this.taskIdToUpdate).subscribe({
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
    if (this.taskForm.valid) {
      this.taskSvc.addTask(this.taskForm.value).subscribe((res) => {
        this.toastr.success(' Task added successfully', 'ADD_TASK', {
          timeOut: 3000,
        });
        this.router.navigate(['list']);
        this.taskForm.reset();
      });
    }
  }

  fillFormToUpdate(user: Task) {
    this.taskForm.setValue({
      title: user.title,
      description: user.description,
      dueDate: user.dueDate,
      status: user.status,
    });
  }

  update() {
    this.taskSvc
      .updateTask(this.taskForm.value, this.taskIdToUpdate)
      .subscribe((res) => {
        this.toastr.success(' Task updated successfully', 'UPDATE_TASK', {
          timeOut: 3000,
        });
        this.router.navigate(['list']);
        this.taskForm.reset();
      });
  }

  cancel() {
    this.router.navigate(['list']);
  }
}
