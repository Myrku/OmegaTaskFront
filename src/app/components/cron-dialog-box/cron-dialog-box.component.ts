import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CronGenComponent, CronOptions} from 'ngx-cron-editor';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cron-dialog-box',
  templateUrl: './cron-dialog-box.component.html',
  styleUrls: ['./cron-dialog-box.component.scss']
})
export class CronDialogBoxComponent implements OnInit {

  @ViewChild('cronEditorDemo') cronEditorDemo: CronGenComponent;
  public cronExpression = '* * * * * *';
  public cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',

    defaultTime: '',

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: true,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,

    use24HourTime: true,
    hideSeconds: false,

    cronFlavor: 'quartz' // standard or quartz
  };


  constructor(public dialogRef: MatDialogRef<CronDialogBoxComponent>) {
  }

  ngOnInit(): void {
  }

  AddCron(): void {
    // @ts-ignore
    this.dialogRef.close({event: 'CronSelected', cron: this.cronEditorDemo.localCron});
  }

}
