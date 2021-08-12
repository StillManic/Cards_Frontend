import { TestBed } from '@angular/core/testing';

import { DeckEventService } from './deck-event.service';

describe('DeckEventService', () => {
  let service: DeckEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
