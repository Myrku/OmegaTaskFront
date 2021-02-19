import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-admin-stat',
  templateUrl: './admin-stat.component.html',
  styleUrls: ['./admin-stat.component.scss']
})
export class AdminStatComponent implements OnInit {

  displayedColumns: string[] = ['name', 'countTasks', 'countExecute'];
  stats: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.GetStat().subscribe(res => {
      this.stats = res.stat;
    });
  }

}
