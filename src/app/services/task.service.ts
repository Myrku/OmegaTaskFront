import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../model/Task';
import {SERVER_API_URL} from '../app-injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, @Inject(SERVER_API_URL) private apiUrl: string) {
  }

  GetCovidCountries(): Observable<any> {
    return this.http.get('https://covid19-api.org/api/countries').pipe();
  }

  AddTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl + '/api/task/add', task).pipe();
  }

  GetTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/task/get`).pipe();
  }

  DeleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/task/delete/${id}`).pipe();
  }

  UpdateTask(task: Task): Observable<any> {
    return this.http.put(this.apiUrl + '/api/task/update', task).pipe();
  }

  GetApis(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/task/getapis`).pipe();
  }

  GetForexPairList(): Observable<any> {
    return this.http.get(`https://api.twelvedata.com/forex_pairs`).pipe();
  }

  GetStat(): Observable<any> {
    return  this.http.get(`${this.apiUrl}/api/task/stat`).pipe();
  }
}
