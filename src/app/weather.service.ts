import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.weatherapi.com/v1/current.json?key=6f3d7d1ad12e426ea1e105058222803&q=';
  
  constructor(private http:HttpClient) { }
  
  updateData(city: string) {
    return this.http.get(this.url + city);
  }
}
