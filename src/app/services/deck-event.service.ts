import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { Card } from './card-service.service';
import { DeckComponent } from '../deck/deck.component';
import { CpuDeckComponent } from '../cpu-deck/cpu-deck.component';

@Injectable({
  providedIn: 'root'
})
export class DeckEventService {
  private playerDrawSource = new Subject<Card>();
  private cpuDrawSource = new Subject<Card>();

  private playerCard! : Card;
  private CPUCard! : Card;

  private playerDeckComponent! : DeckComponent;
  private CPUDeckComponent! : CpuDeckComponent;

  private prevCards: Card[] = [];

  playerDrawAnnounce = this.playerDrawSource.asObservable();
  cpuDrawAnnounce = this.cpuDrawSource.asObservable();

  announcePlayerDraw(card: Card) {
    this.playerDrawSource.next(card);
    this.playerCard = card;
  }

  announceCpuDraw(card: Card) {
    this.cpuDrawSource.next(card);
    this.CPUCard = card;
  }

  setPlayerDeckComponent(playerDeckComponent : DeckComponent){
    this.playerDeckComponent = playerDeckComponent;
  }

  setCpuDeckComponent(CpuDeckComponent : CpuDeckComponent){
    this.CPUDeckComponent = CpuDeckComponent;
  }

  constructor() {}

  compareDraw() : void {
    let cards : Card [] = [this.playerCard, this.CPUCard];
    if (this.playerCard.value == 1 && this.CPUCard.value != 1){
      this.playerWins(cards);
    }
    else if (this.playerCard.value > this.CPUCard.value){
      this.playerWins(cards);
    }
    else if (this.playerCard.value != 1 && this.CPUCard.value == 1) {
      this.cpuWins(cards);
    }
    else if (this.playerCard.value < this.CPUCard.value){
      this.cpuWins(cards);
    }
    else if (this.playerCard.value == this.CPUCard.value){
      console.log("WAR");
    }
  }

  private cpuWins(cards: Card[]) {
    console.log("CPU WINS");
    this.CPUDeckComponent.addToCpuDiscard(cards);
    this.prevCards.forEach(card => card.state = 'discarded');
    this.prevCards = cards;
  }

  private playerWins(cards: Card[]) {
    console.log("PLAYER WINS");
    this.playerDeckComponent.addToDiscard(cards);
    this.prevCards.forEach(card => card.state = 'discarded');
    this.prevCards = cards;
  }
}
