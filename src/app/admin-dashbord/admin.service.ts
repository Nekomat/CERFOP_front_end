import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retryWhen } from 'rxjs';
import { entity } from './interfaces/entity';
import { User } from './interfaces/user';
import { cours } from './interfaces/cours';
import { chapitre } from './interfaces/chapitres';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  getAllEntity(): Observable<Array<entity>> {
    return this.http.get('/api/v1/organisation/all_entity') as Observable<
      Array<entity>
    >;
  }
  createEntity(data): Observable<any> {
    return this.http.post(
      '/api/v1/organisation/create_entity',
      data
    ) as Observable<any>;
  }

  getUserByEntity(id): Observable<Array<User>> {
    return this.http.get(`/api/v1/user/get_user_by_entity/${id}`) as Observable<
      Array<User>
    >;
  }

  getAllUser(): Observable<Array<User>> {
    return this.http.get('/api/v1/user/all_users') as Observable<Array<User>>;
  }

  addUser(data): Observable<any> {
    return this.http.post('/api/v1/user/single_user', data) as Observable<any>;
  }

  bulkAddUser(data): Observable<any> {
    return this.http.post('/api/v1/user/bulk_save', { bulkCreate: data });
  }

  addCourse(data): Observable<cours> {
    return this.http.post(
      '/api/v1/cours/create_course',
      data
    ) as Observable<any>;
  }

  addChapter(data): Observable<any> {
    return this.http.post(
      '/api/v1/chapitre/add_chapiter',
      data
    ) as Observable<any>;
  }

  getAllChapiter(): Observable<chapitre[]> {
    return this.http.get('/api/v1/chapitre/get_all_chapiter') as Observable<
      chapitre[]
    >;
  }

  addVideo(data): Observable<any> {
    return this.http.post('/api/v1/video/add_video', data) as Observable<any>;
  }

  addQuiz(data): Observable<any> {
    return this.http.post('/api/v1/quiz/create_quiz', { data: data });
  }

  //  get all course

  allCourse(): Observable<cours[]> {
    return this.http.get('/api/v1/cours/all_courses') as Observable<cours[]>;
  }

  /* events */

  getAllEvents(): Observable<any[]> {
    return this.http.get('/api/v1/events/all_events') as Observable<any[]>;
  }

  createEvent(data): Observable<any> {
    return this.http.post(
      '/api/v1/events/create_event',
      data
    ) as Observable<any>;
  }

  updateEvent(id: string, data): Observable<any> {
    return this.http.put(
      `/api/v1/events/update_event/${id}`,
      data
    ) as Observable<any>;
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(
      `/api/v1/events/delete_event/${id}`
    ) as Observable<any>;
  }

  /* Biblio */

  getAllBiblio(): Observable<any[]> {
    return this.http.get<any[]>('/api/v1/biblio');
  }

  createBiblio(biblioData: any): Observable<any> {
    return this.http.post<any>('/api/v1/biblio', biblioData);
  }

  updateBiblio(biblioId: string, biblioData: any): Observable<any> {
    return this.http.put<any>(`/api/v1/biblio/${biblioId}`, biblioData);
  }

  deleteBiblio(biblioId: string): Observable<any> {
    return this.http.delete<any>(`/api/v1/biblio/${biblioId}`);
  }
}
