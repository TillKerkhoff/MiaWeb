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

  constructor(private interactionService: TextInteractionService) {}

  ngOnInit(): void {
    // this.loadDefaultText();
    this.loadPhotos();

    // Höre auf Events aus dem Service
    this.subscription = this.interactionService.loadText$.subscribe((uebergebenerText: string) => {
      // Ruft deine gewünschte Methode auf und übergibt die Variable
    this.loadText(uebergebenerText);
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

  loadPhotos() {
    this.currentView = 'photos';
    
    // Simuliertes Laden der Bildpfade
    this.images = [
      'assets/fotos/foto1.png',
      'assets/fotos/foto2.png',
      'assets/fotos/foto3.png'
    ];
  }

  ngOnDestroy() {
    // Wichtig: Abo kündigen, um Memory Leaks zu vermeiden
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}