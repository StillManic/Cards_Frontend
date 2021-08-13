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
  private prevState?: 'playerWon' | 'cpuWon' | 'war';
  inWar: boolean = false;
  private warCount: number = 0;
  private warDiscard: Card[] = [];

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
    console.log(`Comparing cards: player: ${this.playerCard.value}, cpu: ${this.CPUCard.value}`)
    if (!this.inWar) {
      if (this.playerCard.value == 1 && this.CPUCard.value != 1) { // Player drew an Ace but not war
        this.playerWins(cards);
      }
      else if (this.CPUCard.value == 1 && this.playerCard.value != 1) { // CPU drew an Ace but not war
        this.cpuWins(cards);
      }
      else if (this.playerCard.value > this.CPUCard.value) {
        this.playerWins(cards);
      }
      else if (this.playerCard.value < this.CPUCard.value) {
        this.cpuWins(cards);
      }
      else if (this.playerCard.value == this.CPUCard.value) {
        this.declareWar(cards);
      }
    } else {
      if (this.warCount == 2) {
        this.inWar = false;
        this.warCount = 0;
        this.prevCards.push(this.playerCard, this.CPUCard);
        console.log("Setting inWar false!!!");
      }
      else {
        this.warCount++;
        this.prevCards.push(this.playerCard, this.CPUCard);
      }
    }
  }

  private discardPrevCards() {
    console.log(`DISCARD PREVIOUS CARDS!!! ${this.prevCards} ${this.prevState}`);
    if (this.prevCards.length > 0) {
      // this.prevCards = this.prevCards.concat(this.warDiscard);
      if (this.prevState == 'playerWon') {
        for (let card of this.prevCards) {
          if (card.fromDeck == 'player') card.state = 'd_p_to_p';
          else if (card.fromDeck == 'cpu') card.state = 'd_c_to_p';

          console.log(`Discarding ${card.face} of ${card.suit} from ${card.fromDeck} deck with state ${card.state}`);
        }
      }
      else if (this.prevState == 'cpuWon') {
        for (let card of this.prevCards) {
          if (card.fromDeck == 'player') card.state = 'd_p_to_c';
          else if (card.fromDeck == 'cpu') card.state = 'd_c_to_c';

          console.log(`Discarding ${card.face} of ${card.suit} from ${card.fromDeck} deck with state ${card.state}`);
        }
      }
    }
  }

  private playerWins(cards: Card[]) {
    console.log("PLAYER WINS");
    this.playerDeckComponent.addToDiscard(cards);
    this.discardPrevCards();
    this.prevState = 'playerWon';
    this.prevCards = cards;
  }

  private cpuWins(cards: Card[]) {
    console.log("CPU WINS");
    this.CPUDeckComponent.addToCpuDiscard(cards);
    this.discardPrevCards();
    this.prevState = 'cpuWon';
    this.prevCards = cards;
  }

  private declareWar(cards: Card[]) {
    console.log("WAR");
    this.discardPrevCards();
    this.prevState = 'war';
    this.inWar = true;
    // this.warDiscard.push(cards[0], cards[1]);
  }
}
