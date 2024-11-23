import { TestBed } from '@angular/core/testing';

import { TipoCuentaService } from './Type-Accounts.service';

describe('TipoCuentaService', () => {
  let service: TipoCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
