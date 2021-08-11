import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Card, CardService } from '../services/card-service.service';

export interface CardData{
  state: 'default' | 'flipped';
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardFlip',[
      state('default', style({
        transform: 'none'
      })),
      state('flipped',style({
        transform: ' translateX(150%) rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('300ms')
      ]),
      transition('flipped => default', [
        animate('150ms')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {
  front: string = "../assets/images/2D.png";
  back: string = "../assets/images/revature_back.png";

  @Input() cardValue: number = 1;
  @Input() suit: string = 'hearts';

  card: Card | null = null;
  cards: Card[] = [];
  data: CardData = {state: 'default'};

  constructor(private cardService: CardService) {
    
  }

  ngOnInit(): void {
    console.log(`cardValue=${this.cardValue}, suit=${this.suit}`);
    this.cardService.getCard(this.cardValue, this.suit).subscribe(card => {
      console.log(card);
      this.card = card
    });
    // this.cardService.getDeck().subscribe(cards => {
    //   console.log(cards);
    //   this.cards = cards;
    // });
  }
  flipCard(): void{
    if (this.data.state === 'default') this.data.state = 'flipped';
    else this.data.state = 'default';
  }
}
