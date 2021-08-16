import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeckComponent } from '../deck/deck.component';
import { Card, CardService } from '../services/card-service.service';
import { DeckEventService } from '../services/deck-event.service';

@Component({
  selector: 'app-cpu-deck',
  templateUrl: './cpu-deck.component.html',
  styleUrls: ['./cpu-deck.component.css']
})
export class CpuDeckComponent extends DeckComponent implements OnInit {
  subscription: Subscription;
  discardPile: Card[] = [];

  constructor(cardService: CardService, deckEventService: DeckEventService) {
    super(cardService, deckEventService);
    deckEventService.setCpuDeckComponent(this);

    cardService.splitDeck.subscribe(deck => {
      for (let i in deck[1]) {
        deck[1][i].state = 'default';
        deck[1][i].zIndex = 0;
      }
      this.cards = deck[1];
      this.cardIdx = deck[1].length - 1;
      console.log("----- CPU DECK -----");
      console.log(deck[1]);
    })

    this.subscription = deckEventService.playerDrawAnnounce.subscribe(card => {
      // console.log(`From Cpu-Deck: Player drew card: ${card.face} of ${card.suit}`);
      this.draw();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCpuDiscard(card: Card) {
    this.discardPile.push(card);
  }

  draw(): void {
    if (this.cardIdx < 52 && this.cardIdx > -1) {
      let card = this.cards[this.cardIdx];
      card.fromDeck = 'cpu';
      if (card.state === 'default') {
        card.state = this.deckEventService.inWar ? 'war' : 'flipped';
        card.zIndex = 100;

        this.deckEventService.announceCpuDraw(card);

        if (this.cardIdx < this.cards.length - 1) {
          let prevCard = this.cards[this.cardIdx + 1];
          prevCard.zIndex = -this.cardIdx * 100;
        }
        
        this.cardIdx--;
      }
    }
  }
}
