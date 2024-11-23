import { TestBed } from '@angular/core/testing';

import { TipoPrestamoService } from './Type-Loan.service';

describe('TipoPrestamoService', () => {
  let service: TipoPrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPrestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
