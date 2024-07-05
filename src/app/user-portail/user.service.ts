import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cours } from '../admin-dashbord/interfaces/cours';
import { selectdeCourse } from '../admin-dashbord/interfaces/selectedCourse';
import { quiz } from '../admin-dashbord/interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http:HttpClient
  ) { }
getAllCourse():Observable<cours[]>{
  return this.http.get('/api/v1/cours/all_courses') as Observable<cours[]> 
}
 
followCours(id):Observable<any>{
  console.log(id) 
  return this.http.post(`/api/v1/cours/user_add_course/${id}`,{}) as Observable<any> 
}

 followersCour():Observable<Array<selectdeCourse>>{ 
  return this.http.get(`/api/v1/cours/get_user_his_course`) as Observable<Array<selectdeCourse>>
 }

 getOneCourse(id):Observable<selectdeCourse>{
  return this.http.get(`/api/v1/cours/user_his_course_detail/${id}`) as Observable<selectdeCourse>
 }
 updateUserCourse(id,data):Observable<any>{
  return this.http.post(`/api/v1/cours/update_video/${id}`,{data:data}) as Observable<any>
 }

 getQuizForCourse(id):Observable<Array<quiz>>{
  return this.http.get(`/api/v1/quiz/get_all_quiz/${id}`)  as Observable<Array<quiz>>
 }

}
 