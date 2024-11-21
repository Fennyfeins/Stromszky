import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  api_url = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) { }

  getMessage(){
    return this.http.get(this.api_url);
  }
}
