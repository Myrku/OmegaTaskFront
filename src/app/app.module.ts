import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {MatButtonModule} from '@angular/material/button';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {SERVER_API_URL} from './app-injection-tokens';
import {JwtModule} from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import {MatTableModule} from '@angular/material/table';
import { AddDialogBoxComponent } from './components/add-dialog-box/add-dialog-box.component';
import { DelDialogBoxComponent } from './components/del-dialog-box/del-dialog-box.component';
import { UpdDialogBoxComponent } from './components/upd-dialog-box/upd-dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AdminStatComponent } from './components/admin-stat/admin-stat.component';
import { CronDialogBoxComponent } from './components/cron-dialog-box/cron-dialog-box.component';
import {CronEditorModule} from 'ngx-cron-editor';

export function tokenGetter(): string {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    MyTasksComponent,
    AddDialogBoxComponent,
    DelDialogBoxComponent,
    UpdDialogBoxComponent,
    AdminStatComponent,
    CronDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CronEditorModule,


    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains,
      }
    })
  ],
  providers: [
    {provide: SERVER_API_URL, useValue: environment.urlApiServer},
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
