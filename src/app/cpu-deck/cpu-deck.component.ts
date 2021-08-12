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
      console.log(`Player drew card: ${card.face} of ${card.suit}`);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  draw(): void {
    this.deckEventService.announceCpuDraw({id: 0, suit: 'spades', value: 1, image: '', face: 'A', state: 'default', zIndex: 0, isPrevious: false});
  }

}
