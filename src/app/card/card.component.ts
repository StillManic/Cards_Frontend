import { Component, Input, OnInit } from '@angular/core';
import { Card, CardService } from '../services/card-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  front: string = "../assets/images/2D.png";
  back: string = "../assets/images/revature_back.png";

  @Input() cardValue: number = 1;
  @Input() suit: string = 'hearts';

  card: Card | null = null;
  cards: Card[] = [];

  constructor(private cardService: CardService) {
    
  }

  ngOnInit(): void {
    console.log(`cardValue=${this.cardValue}, suit=${this.suit}`);
    this.cardService.getCard(this.cardValue, this.suit).subscribe(card => {
      console.log(card);
      this.card = card
    });
    this.cardService.getDeck().subscribe(cards => {
      console.log(cards);
      this.cards = cards;
    });
  }
}
