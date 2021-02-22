import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DelDialogBoxComponent} from '../del-dialog-box/del-dialog-box.component';
import {AddDialogBoxComponent} from '../add-dialog-box/add-dialog-box.component';
import {UpdDialogBoxComponent} from '../upd-dialog-box/upd-dialog-box.component';
import {Task} from '../../model/Task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'laststart', 'update', 'delete'];

  constructor(public matDialog: MatDialog, private taskService: TaskService) {
  }

  tasks: Task[];

  ngOnInit(): void {
    this.GetTasks();
  }

  Update(task: Task): void {
    const dialogRef = this.matDialog.open(UpdDialogBoxComponent, {data: task});
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Upd') {
        this.GetTasks();
      }
    });
  }

  Delete(task: Task): void {
    const dialogRef = this.matDialog.open(DelDialogBoxComponent, {data: task});
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Delete') {
        this.tasks = this.tasks.filter((value, key) => {
          return value.id !== task.id;
        });
      }
    });
  }

  Add(): void {
    const dialogRef = this.matDialog.open(AddDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.GetTasks();
      }
    });
  }

  GetTasks(): void {
    this.taskService.GetTasks().subscribe(res => {
      this.tasks = res.tasks;
    });
  }
}
