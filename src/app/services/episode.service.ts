import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode.model';

const baseUrl = 'https://snk-api.azurewebsites.net/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  getAll(id: any): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${baseUrl}/list?anime_id=${id}`);
  }

  add(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add?anime_id=${id}`, data);
  }
}
