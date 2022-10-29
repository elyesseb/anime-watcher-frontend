import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../models/anime.model';

const baseUrl = 'https://snk-api.azurewebsites.net/anime';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${baseUrl}/list`, { params });
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/getAnimeById/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/getAnimeById/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/getAnimeById/${id}`);
  }

  findByTitle(title: any): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${baseUrl}/getAnimeByTitle/${title}`);
  }
}
