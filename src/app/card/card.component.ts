import { animate, state, style, transition, trigger } from '@angular/animations';
import { compileDeclareDirectiveFromMetadata, NONE_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { Card, CardService } from '../services/card-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'translateY(-115%) rotateX(180deg)'
      })),
      state('war', style({
        transform: 'translateY(-115%)'
      })),
      transition('default => flipped', [
        animate('300ms')
      ]),
      transition('flipped => default', [
        animate('150ms')
      ]),
      transition('default => war', [
        animate('300ms')
      ])
    ]),
    trigger('cardDiscard', [
      state('d_p_to_p', style({ // discard from player to player
        transform: 'translateX(115%) rotateX(180deg)'
      })),
      state('d_p_to_c', style({ // discard from player to cpu
        transform: 'translate(115%, -145vh) rotateX(180deg)'
      })),
      state('d_c_to_c', style({ // discard from cpu to cpu
        transform: 'translateX(-115%) rotateX(180deg)'
      })),
      state('d_c_to_p', style({ // discard from cpu to player
        transform: 'translate(-115%, -145vh) rotateX(180deg)'
      })),
      transition('flipped => d_p_to_p', [
        animate('300ms')
      ]),
      transition('flipped => d_p_to_c', [
        animate('300ms')
      ]),
      transition('flipped => d_c_to_c', [
        animate('300ms')
      ]),
      transition('flipped => d_c_to_p', [
        animate('300ms')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {
  front: string = "../assets/images/2D.png";
  back: string = "../assets/images/revature_back.png";

  @Input() card: Card | null = null;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  getZIndex(): number {
    return this.card!.zIndex;
  }
}
