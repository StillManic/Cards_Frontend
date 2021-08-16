import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DeckComponent } from '../deck/deck.component';
import { CpuDeckComponent } from '../cpu-deck/cpu-deck.component';

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
  splitDeck!: Observable<Card[][]>;

  constructor(private http: HttpClient) {
    this.splitDeck = this.getSplitDeck();
  }

  getCard(value: number, suit: string): Observable<Card> {
    let url = this.path + `/suits/${suit}/${value}`;
    return this.http.get<Card>(url);
  }

  getDeck(): Observable<Card[]> {
    let url = this.path + `/shuffled`;
    return this.http.get<Card[]>(url);
  }

  getSplitDeck(): Observable<Card[][]> {
    let url = this.path + `/shuffled/war`;
    return this.http.get<Card[][]>(url);
  }
}
