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
    
    this.cardService.getDeck().subscribe(cards => {
      for (let i in cards) {
        cards[i].state = 'default';
        cards[i].zIndex = 0;
      }
      this.cards = cards;
      this.cardIdx = cards.length - 1;
      console.log(cards);
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
    if (this.cardIdx < 52 && this.cardIdx > -1) {
      let card = this.cards[this.cardIdx];
      card.fromDeck = 'player';
      if (card.state === 'default') {
        card.state = this.deckEventService.inWar ? 'war' : 'flipped';
        card.zIndex = 100;

        this.deckEventService.announcePlayerDraw(card);

        if (this.cardIdx < 51) {
          let prevCard = this.cards[this.cardIdx + 1];
          prevCard.zIndex = -this.cardIdx * 100;
        }
        this.cardIdx--;
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

  addToDiscard(cards: Card[]): void {
    // for (let i in cards) {
    //   if (cards[i].fromDeck == 'player') cards[i].state = 'd_p_to_c';
    //   else if (cards[i].fromDeck == 'cpu') cards[i].state = 'd_c_to_c';

    //   console.log(`Discarding ${cards[i].face} of ${cards[i].suit} from ${cards[i].fromDeck} deck with state ${cards[i].state}`);
    // }
    this.discard = this.discard.concat(cards);
  }
}
