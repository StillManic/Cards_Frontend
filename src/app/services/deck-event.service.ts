import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Card } from './card-service.service';

@Injectable({
  providedIn: 'root'
})
export class DeckEventService {
  private playerDrawSource = new Subject<Card>();
  private cpuDrawSource = new Subject<Card>();

  playerDrawAnnounce = this.playerDrawSource.asObservable();
  cpuDrawAnnounce = this.cpuDrawSource.asObservable();

  announcePlayerDraw(card: Card) {
    this.playerDrawSource.next(card);
  }

  announceCpuDraw(card: Card) {
    this.cpuDrawSource.next(card);
  }

  constructor() { }
}
