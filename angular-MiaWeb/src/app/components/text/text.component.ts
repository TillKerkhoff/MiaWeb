import { Component, OnInit, Inject, PLATFORM_ID, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { TextInteractionService } from '../../services/textInteractionService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy {
    fileName = '';
    content: String = '';
    private http = inject(HttpClient);
    private cdr = inject(ChangeDetectorRef);
    private subscription!: Subscription;
    currentView: 'text' | 'photos' = 'text';
    images: string[] = [];
    private photoSubscription!: Subscription;

  constructor(private interactionService: TextInteractionService) {}

  ngOnInit(): void {
    this.loadDefaultText();
    //this.loadPhotos();

    // Höre auf Events aus dem Service
    this.subscription = this.interactionService.loadText$.subscribe((uebergebenerText: string) => {
      // Ruft deine gewünschte Methode auf und übergibt die Variable
    this.loadText(uebergebenerText);
    });

    this.photoSubscription = this.interactionService.loadPhotos$.subscribe({
      next: (foldername: string) => {
        console.log('TextComponent hat den Ordnernamen empfangen:', foldername);
        // Wenn ein Event kommt, rufen wir die Logik auf
        this.loadPhotos(foldername);
      }
    });
  }

  private loadText(text: string): void {
    this.currentView = 'text';
    this.http.get(`assets/texte/${text}.txt`, { responseType: 'text' })
      .subscribe({
        next: (data) => {
            this.fileName = text;
            this.content = data;
            console.log('data: ', this.content);
            this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Fehler beim Laden der Datei:', error);
        }
      });
  }

  private loadDefaultText(): void {
    this.currentView = 'text';
    this.http.get('assets/texte/Willkommen.txt', { responseType: 'text' })
      .subscribe({
        next: (data) => {
            this.fileName = 'Willkommen';
            this.content = data;
            console.log('data: ', this.content);
            this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Fehler beim Laden der Datei:', error);
        }
      });
  }

loadPhotos(foldername: string) {
  this.fileName = foldername;
  this.currentView = 'photos';
  this.images = []; // Vorherige Bilder leeren

  // Wir laden die JSON-Packliste für den spezifischen Ordner
this.http.get<string[]>(`assets/fotos/${foldername}/images.json`).subscribe({
  next: (imageNames) => {
    // 1. Erst das Array komplett leeren, um das Template zurückzusetzen
    this.images = [];
    this.cdr.detectChanges();

    // 2. Pfade sauber zusammenbauen
    const neuePfade = imageNames.map(name => `assets/fotos/${foldername}/${name}`);
    
    // 3. Mit dem Spread-Operator ein brandneues Array zuweisen
    this.images = [...neuePfade];
    
    console.log('Aktueller Inhalt von this.images:', this.images);
    
    // 4. Der Change Detection explizit sagen, dass sie JETZT prüfen soll
    this.cdr.markForCheck(); 
    this.cdr.detectChanges();
  },
  error: (err) => {
    console.error(`Konnte images.json für ${foldername} nicht laden:`, err);
  }
});
}

  ngOnDestroy() {
    // Wichtig: Abo kündigen, um Memory Leaks zu vermeiden
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
  }
}