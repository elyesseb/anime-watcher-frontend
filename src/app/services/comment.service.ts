import { HttpClient, HttpRequest } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/comment';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http: HttpClient) { }

  create(message: any, id:any): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('message', message);
    formData.append('anime_id', id);

    const req = new HttpRequest('POST', `${baseUrl}/add`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/getCommentByAnime/${id}`);
  }

}
