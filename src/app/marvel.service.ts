import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCharacters(name: string) {
    return this.http.get(`${this.apiUrl}/characters`, {
      params: {
        apikey: environment.apiKey,
        hash: environment.hash,
        ts: '1699588428769',
        nameStartsWith: name,
      },
    });
  }
}
