import { CanDeactivateFn } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { inject } from '@angular/core';

export const logueadoDeactiGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return  inject(AuthService).log;
};



