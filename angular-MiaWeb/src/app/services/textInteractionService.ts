import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextInteractionService {
  // Das Subject transportiert deine Variable (z. B. vom Typ string)
  private loadTextSource = new Subject<string>();
  
  // Observable, das die TextComponent abonnieren kann
  loadText$ = this.loadTextSource.asObservable();

  // Methode, die von der ArchivComponent aufgerufen wird
  triggerLoadText(value: string) {
    this.loadTextSource.next(value);
  }
}
