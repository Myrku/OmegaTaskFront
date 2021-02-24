import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {Country} from '../../model/Country';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DelDialogBoxComponent} from '../del-dialog-box/del-dialog-box.component';
import {Task} from '../../model/Task';
import {ForexPairs} from '../../model/ForexPair';
import {CronDialogBoxComponent} from '../cron-dialog-box/cron-dialog-box.component';

@Component({
  selector: 'app-add-dialog-box',
  templateUrl: './add-dialog-box.component.html',
  styleUrls: ['./add-dialog-box.component.scss']
})
export class AddDialogBoxComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  desc = new FormControl('');
  api = new FormControl('', Validators.required);
  apiParam = new FormControl('');
  startTime = new FormControl('', Validators.required);
  period = new FormControl('', Validators.required);


  disableSelect = new FormControl(false);
  countries: Country[] = [];
  filteredContries: Observable<Country[]>;
  showProgress = false;
  isError = false;
  apis: any;

  forexPairs: ForexPairs[] = [];
  filteredForexPairs: Observable<ForexPairs[]>;

  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<AddDialogBoxComponent>, public matDialog: MatDialog) {
    taskService.GetCovidCountries().subscribe(res => {
      this.countries = res;
    });

    taskService.GetApis().subscribe(res => {
      this.apis = res.apis;
    });

    taskService.GetForexPairList().subscribe(res => {
      this.forexPairs = res.data;
    });
  }

  ngOnInit(): void {
    this.filteredContries = this.apiParam.valueChanges
      .pipe(
        startWith(''),
        map(value => this.FilterCountry(value))
      );
    this.filteredForexPairs = this.apiParam.valueChanges
      .pipe(
        startWith(''),
        map(value => this.FilterForexPairs(value))
      );
  }

  private FilterCountry(value: any): Country[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  private FilterForexPairs(value: any): ForexPairs[] {
    const filterValue = value.toLowerCase();
    return this.forexPairs.filter(pair => pair.symbol.toLowerCase().includes(filterValue));
  }

  AddTask(): any {
    let task;
    task = new Task();
    task.id = 0;
    task.userId = 0;
    task.taskName = this.name.value;
    task.description = this.desc.value;
    const y: number = +this.api.value;
    task.apiId = y;
    task.apiParam = this.apiParam.value;
    task.startTime = new Date(this.startTime.value).toLocaleDateString();
    task.period = this.period.value;
    task.lastStart = '';
    this.showProgress = true;

    this.taskService.AddTask(task).subscribe(res => {
      this.showProgress = false;
      this.dialogRef.close({event: 'Add', newtask: task});
    }, error => {
      this.isError = true;
      this.showProgress = false;
    });
  }

  OpenCronDialog(): any {
    const dialogRef = this.matDialog.open(CronDialogBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'CronSelected') {
        this.period.setValue(result.cron);
      }
    });
  }

  CloseAdd(): any {
    this.dialogRef.close();
  }
}
