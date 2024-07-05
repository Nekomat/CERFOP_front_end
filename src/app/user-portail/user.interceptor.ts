import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class userInterceptor implements HttpInterceptor {
 constructor() {}
 intercept(
   request: HttpRequest<any>,
   next: HttpHandler
 ): Observable<HttpEvent<any>> {
   // You can modify the request here before it is sent
   const modifiedRequest = request.clone({
     // Add headers or modify the URL 
     headers: request.headers.set('Authorization', `jwt ${localStorage.getItem('token')}`),
   });
   // Pass the modified request to the next interceptor or the HTTP handler
   return next.handle(modifiedRequest); 
 }
}