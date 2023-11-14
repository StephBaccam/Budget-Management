import { TestBed } from '@angular/core/testing';

import { GestionDepenseService } from './gestion-depense.service';

describe('GestionDepenseService', () => {
  let service: GestionDepenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDepenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
