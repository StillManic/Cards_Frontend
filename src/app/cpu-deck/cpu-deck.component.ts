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

    this.subscription = deckEventService.playerDrawAnnounce.subscribe(card => {
      // console.log(`From Cpu-Deck: Player drew card: ${card.face} of ${card.suit}`);
      this.draw();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCpuDiscard(cards : Card []): void{
    // for (let i in cards) {
    //   if (cards[i].fromDeck == 'player') cards[i].state = 'd_p_to_c';
    //   else if (cards[i].fromDeck == 'cpu') cards[i].state = 'd_c_to_c';

    //   console.log(`Discarding ${cards[i].face} of ${cards[i].suit} from ${cards[i].fromDeck} deck with state ${cards[i].state}`);
    // }
    this.discardPile = this.discardPile.concat(cards);
  }  

  draw(): void {
    if (this.cardIdx < 52 && this.cardIdx > -1) {
      let card = this.cards[this.cardIdx];
      card.fromDeck = 'cpu';
      if (card.state === 'default') {
        card.state = this.deckEventService.inWar ? 'war' : 'flipped';
        card.zIndex = 100;

        this.deckEventService.announceCpuDraw(card);

        if (this.cardIdx < 51) {
          let prevCard = this.cards[this.cardIdx + 1];
          prevCard.zIndex = -this.cardIdx * 100;
        }
        this.cardIdx--;
      }
    }
  }
}
