import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TaskService} from '../../services/task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DelDialogBoxComponent} from '../del-dialog-box/del-dialog-box.component';
import {map, startWith} from 'rxjs/operators';
import {Country} from '../../model/Country';
import {Observable} from 'rxjs';
import {Task} from '../../model/Task';
import {ForexPairs} from '../../model/ForexPair';

@Component({
  selector: 'app-upd-dialog-box',
  templateUrl: './upd-dialog-box.component.html',
  styleUrls: ['./upd-dialog-box.component.scss']
})
export class UpdDialogBoxComponent implements OnInit {

  name = new FormControl(this.data.taskname, [Validators.required]);
  desc = new FormControl(this.data.description);
  api = new FormControl(`${this.data.apiid}`, Validators.required);
  apiparam = new FormControl(this.data.apiparam);
  period = new FormControl(this.data.period, Validators.required);
  disableSelect = new FormControl(this.data.apiparam !== '');

  countries: Country[] = [];
  filteredContries: Observable<Country[]>;
  showProgress = false;
  isError = false;
  apis: any;

  forexPairs: ForexPairs[] = [];
  filteredForexPairs: Observable<ForexPairs[]>;

  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<DelDialogBoxComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.taskService.GetCovidCountries().subscribe(res => {
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
    this.filteredContries = this.apiparam.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterCountry(value))
      );
    this.filteredForexPairs = this.apiparam.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterForexPairs(value))
      );
  }

  private filterCountry(value: any): Country[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
  }

  private filterForexPairs(value: any): ForexPairs[] {
    const filterValue = value.toLowerCase();
    return this.forexPairs.filter(pair => pair.symbol.toLowerCase().includes(filterValue));
  }


  updTask(): any {

    this.data.taskname = this.name.value;
    this.data.description = this.desc.value;
    const y: number = +this.api.value;
    this.data.apiid = y;
    this.data.apiparam = this.apiparam.value;
    this.data.period = this.period.value;
    this.showProgress = true;

    this.taskService.UpdateTask(this.data).subscribe(res => {
      this.showProgress = false;
      this.dialogRef.close({event: 'Upd'});
    }, error => {
      console.log(error);
      this.isError = true;
      this.showProgress = false;
    });
  }

  closeUpd(): any {
    this.dialogRef.close({event: 'Cancel'});
  }

  changeSelectedApi(): void {
    this.apiparam.setValue('');
  }
}
