import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { logueadoDeactiGuard } from './logueado-deacti.guard';

describe('logueadoDeactiGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logueadoDeactiGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
