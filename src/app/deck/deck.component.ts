import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CpuDeckComponent } from '../cpu-deck/cpu-deck.component';
import { Card, CardService } from '../services/card-service.service';
import { DeckEventService } from '../services/deck-event.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  subscription: Subscription;

  showNextCard: boolean = false;
  currentCardValue: number = 1;
  currentCardSuit: string = 'hearts';

  cards: Card[] = [];
  discard: Card[] = [];
  cardIdx!: number;

  constructor(private cardService: CardService, public deckEventService: DeckEventService) {
    this.deckEventService.setPlayerDeckComponent(this);
    
    this.cardService.splitDeck.subscribe(deck => {
      for (let i in deck[0]) {
        deck[0][i].state = 'default';
        deck[0][i].zIndex = 0;
      }
      this.cards = deck[0];
      this.cardIdx = deck[0].length - 1;
      console.log("----- PLAYER DECK -----");
      console.log(deck[0]);
    });

    this.subscription = deckEventService.cpuDrawAnnounce.subscribe(card => {
      // console.log(`From Deck Component: CPU drew card: ${card.value} of ${card.suit}`);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setFromDeck(fromDeck: 'player' | 'cpu') {
    for (let i in this.cards!) {
      this.cards[i].fromDeck = fromDeck;
    }
  }

  deckClicked(event: Event): void {
    if (this.cardIdx < this.cards.length && this.cardIdx > -1) {
      let card = this.cards[this.cardIdx];
      card.fromDeck = 'player';
      if (card.state === 'default') {
        card.state = this.deckEventService.inWar ? 'war' : 'flipped';
        card.zIndex = 100;

        this.deckEventService.announcePlayerDraw(card);

        if (this.cardIdx < this.cards.length - 1) {
          let prevCard = this.cards[this.cardIdx + 1];
          prevCard.zIndex = -this.cardIdx * 100;
        }
        this.cardIdx--;
      }
    } else {
      console.log(`PRINTING DISCARD ${this.discard.length}`)
      for (let card of this.discard) {
        console.log(card);
      }
    }
    this.deckEventService.compareDraw();
  }

  deckRightClicked(event: Event): void {
    event.preventDefault();
    if (this.cardIdx >= -1 && this.cardIdx < 51) {
      let prevCard = this.cards[this.cardIdx + 1];
      if (prevCard.state === "flipped") {
        prevCard.state = "default";
        prevCard.zIndex = 100;
        if (this.cardIdx > 0) {
          let card = this.cards[this.cardIdx];
          card.zIndex = 0;
        }
        this.cardIdx++;
      }
    }
  }

  getCurrentCard(): Card {
    return this.cards[this.cardIdx];
  }

  addToDiscard(card: Card) {
    this.discard = this.discard.concat(card);
  }
}
