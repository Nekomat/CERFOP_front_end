import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { entity } from './interfaces/entity';
import { User } from './interfaces/user';
import { cours } from './interfaces/cours';
import { chapitre } from './interfaces/chapitres';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http:HttpClient
  ) { }
  getAllEntity():Observable<Array<entity>>{
    return this.http.get('/api/v1/organisation/all_entity') as Observable<Array<entity>>
  }
  createEntity(data):Observable<any> { 
    return this.http.post('/api/v1/organisation/create_entity',data) as Observable<any> 
  } 

  getUserByEntity(id):Observable<Array<User>>{
    return this.http.get(`/api/v1/user/get_user_by_entity/${id}`) as Observable<Array<User>> 
  } 
 
  getAllUser():Observable<Array<User>> {
    return this.http.get('/api/v1/user/all_users') as Observable<Array<User>> 
  }
  
  addUser(data):Observable<any> {
    return this.http.post('/api/v1/user/single_user',data)  as Observable<any> 
  }

  bulkAddUser(data):Observable<any>{ 
   return this.http.post('/api/v1/user/bulk_save',{bulkCreate:data})
  } 

 addCourse(data):Observable<cours>{ 
   return this.http.post('/api/v1/cours/create_course',data) as Observable<any>
 }

 addChapter(data):Observable<any>{ 
  return this.http.post('/api/v1/chapitre/add_chapiter',data) as Observable<any>
 }

 getAllChapiter():Observable<chapitre[]>{ 
  return this.http.get('/api/v1/chapitre/get_all_chapiter') as Observable<chapitre[]>
 }

 addVideo(data):Observable<any>{
   return this.http.post('/api/v1/video/add_video',data) as Observable<any>
 }
}
