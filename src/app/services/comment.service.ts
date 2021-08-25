import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

const baseUrl = 'http://localhost:8080/comment';


export class CommentService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/getCommentByAnime/${id}`);
  }

}
