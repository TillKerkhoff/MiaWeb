import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextInteractionService {
  // --- Text-Stream ---
  private loadTextSource = new Subject<string>();
  loadText$ = this.loadTextSource.asObservable();

  triggerLoadText(value: string) {
    this.loadTextSource.next(value);
  }

  // --- Foto-Stream ---
  // Neues Subject für den Ordnernamen
  private loadPhotosSource = new Subject<string>();
  // Observable, das die Ziel-Komponente abonnieren kann
  loadPhotos$ = this.loadPhotosSource.asObservable();

  // Methode, die von deiner ArchivComponent aufgerufen wird
  loadPhotos(foldername: string) {
    this.loadPhotosSource.next(foldername);
  }
}