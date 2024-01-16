import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { User } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  dataSource!: MatTableDataSource<any>;
  public users!: User[];
  displayedColumns: string[] = ['id', 'title', 'dueDate', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private confirmService: NgConfirmService,
    private taskSvc: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskSvc.getTaskList().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log(err),
    });
  }

  editTask(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteTask(id: number) {
    alertify.confirm(
      'Delete Task',
      'do you want delete the task?',
      () => {
        this.taskSvc.deleteTask(id).subscribe({
          next: (res: any) => {
            this.toastr.success('Deleted task successfully', 'DELETE', {
              timeOut: 3000,
            });
            this.getTaskList();
          },
          error: (err: any) => {
            this.toastr.error('Error Deleting the task', ' ERROR', {
              timeOut: 3000,
            });
            console.log(err);
          },
        });
      },
      function () {}
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
