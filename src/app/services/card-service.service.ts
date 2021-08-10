import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Card {
  id: number,
  suit: string,
  value: number,
  imagePath: string,
  face: string
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  path: string = "http://localhost:8080/cards";

  constructor(private http: HttpClient) {}

  getCard(value: number, suit: string): Observable<Card> {
    let url = this.path + `/suits/${suit}/${value}`;
    return this.http.get<Card>(url);
  }

  getDeck(): Observable<Card[]> {
    let url = this.path + `/shuffled`;
    return this.http.get<Card[]>(url);
  }
}
