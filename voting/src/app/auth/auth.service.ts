import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  navChange:EventEmitter<boolean>=new EventEmitter();
  storeEmails(users: { user: string, votes_for: string }) {
    //put overide the existing data over database
    return this.http.post<{ error: string }>("http://localhost:8000/users", users)

  }
  fetchResult() {
    return this.http.get<{ results: [{ _id: number, candidates: string, counts: string }] }>("http://localhost:8000/results");

  }
}

