import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  constructor() { }

  indexX: number = 1;
  indexY: number = 1;

  private _startX: number = 8;
  private _startY: number = 8;
  private _offsetX: number = 92;
  private _offsetY: number = 134;
  private _x: number = 8;
  private _y: number = 8;

  public get startX() {
    return this._startX;
  }

  public get startY() {
    return this._startY;
  }

  public get offsetX() {
    return this._offsetX;
  }

  public get offsetY() {
    return this._offsetY;
  }

  public get x() {
    return (this._offsetX * (this.indexX - 1)) + this._startX;
  }

  public get y() {
    return (this._offsetY * (this.indexY - 1)) + this._startY;
  }

  ngOnInit(): void {
  }
}
