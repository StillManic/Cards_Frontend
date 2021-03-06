import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardService } from './services/card-service.service';
import { DeckComponent } from './deck/deck.component';
import { BackgroundComponent } from './background/background.component';
import { CpuDeckComponent } from './cpu-deck/cpu-deck.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DeckComponent,
    BackgroundComponent,
    CpuDeckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    CardService
  ],
  bootstrap: [
    AppComponent,
    BackgroundComponent
  ]
})
export class AppModule { }
