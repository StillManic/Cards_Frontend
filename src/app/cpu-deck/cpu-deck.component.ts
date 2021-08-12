import { Component, OnInit } from '@angular/core';
import { DeckComponent } from '../deck/deck.component';
import { CardService } from '../services/card-service.service';

@Component({
  selector: 'app-cpu-deck',
  templateUrl: './cpu-deck.component.html',
  styleUrls: ['./cpu-deck.component.css']
})
export class CpuDeckComponent extends DeckComponent implements OnInit {

  constructor(cardService: CardService) {
    super(cardService);
  }

  ngOnInit(): void {
  }

}
