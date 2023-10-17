import { CanActivateFn } from '@angular/router';
import { CanDeactivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const logueadoGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).log;
};

