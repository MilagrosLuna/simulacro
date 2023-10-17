import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private actor = new BehaviorSubject<any>(null);
  actor$ = this.actor;

  constructor() { }

  setSelectedActor(actor: any) {
    this.actor$ = actor;
  }
}


