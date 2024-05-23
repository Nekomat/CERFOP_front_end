import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http:HttpClient
  ) { } 
  decode:any
  login(loginData):Observable<any>{
   return this.http.post('/api/v1/user/login',loginData) as Observable<any>
  }
  resetPassword(resetData):Observable<any>{
    return this.http.post('/api/v1/user/reste-password',resetData) as Observable<any>
  } 
}
