import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskService} from '../../services/task.service';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-del-dialog-box',
  templateUrl: './del-dialog-box.component.html',
  styleUrls: ['./del-dialog-box.component.scss']
})
export class DelDialogBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DelDialogBoxComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: Task,
              private taskService: TaskService) {
    console.log(data);
  }

  ngOnInit(): void {
  }

  delTask(): any{
    this.taskService.DeleteTask(this.data.id).subscribe(res => {
      console.log(res);
      this.dialogRef.close({event: 'Delete'});
    }, error => {
      console.log(error);
    });
  }

  closeDel(): any {
    this.dialogRef.close({event: 'Cancel'});
  }
}
