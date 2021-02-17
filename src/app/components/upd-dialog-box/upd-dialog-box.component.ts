import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DelDialogBoxComponent} from '../del-dialog-box/del-dialog-box.component';
import {map, startWith} from 'rxjs/operators';
import {Country} from '../../model/Country';
import {Observable} from 'rxjs';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-upd-dialog-box',
  templateUrl: './upd-dialog-box.component.html',
  styleUrls: ['./upd-dialog-box.component.scss']
})
export class UpdDialogBoxComponent implements OnInit {

  name = new FormControl(this.data.taskname, [Validators.required, Validators.minLength(6)]);
  desc = new FormControl(this.data.description);
  api = new FormControl(`${this.data.apiid}`, Validators.required);
  apiparam = new FormControl(this.data.apiparam);
  starttime = new FormControl(this.data.starttime, Validators.required);
  period = new FormControl(this.data.period, Validators.required);
  disableSelect = new FormControl(this.data.apiparam !== '');

  countries: Country[] = [];
  filteredContries: Observable<Country[]>;

  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<DelDialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.taskService.GetCovidCountries().subscribe(res => {
      this.countries = res;
      console.log(this.data);
    });
  }

  ngOnInit(): void {

    this.filteredContries = this.apiparam.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    // this.apiparam.setValue(this.data.apiparam);
  }

  private _filter(value: any): Country[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  updTask(): any {
    this.dialogRef.close({event: 'Upd'});
  }

  closeUpd(): any {
    this.dialogRef.close({event: 'Cancel'});
  }
}
