import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeckComponent } from '../deck/deck.component';
import { CardService } from '../services/card-service.service';
import { DeckEventService } from '../services/deck-event.service';

@Component({
  selector: 'app-cpu-deck',
  templateUrl: './cpu-deck.component.html',
  styleUrls: ['./cpu-deck.component.css']
})
export class CpuDeckComponent extends DeckComponent implements OnInit {
  subscription: Subscription;

  constructor(cardService: CardService, deckEventService: DeckEventService) {
    super(cardService, deckEventService);

    this.subscription = deckEventService.playerDrawAnnounce.subscribe(card => {
      console.log(`From Cpu-Deck: Player drew card: ${card.face} of ${card.suit}`);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  draw(event: Event): void {
    if (this.cardIdx < 52 && this.cardIdx > -1) {
      let card = this.cards[this.cardIdx];
      if (card.state === "default") {
        card.state = "flipped";
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
