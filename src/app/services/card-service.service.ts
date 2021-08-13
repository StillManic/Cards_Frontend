import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Card {
  id: number,
  suit: string,
  value: number,
  image: string,
  face: string,
  state: 'default' | 'flipped' | 'war' | 'd_p_to_p' | 'd_p_to_c' | 'd_c_to_c' | 'd_c_to_p',
  zIndex: number,
  isPrevious: boolean,
  fromDeck: 'player' | 'cpu'
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
