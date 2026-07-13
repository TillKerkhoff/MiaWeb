import { Component, OnInit, Inject, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  fileName = 'test';
  content: String = '';
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  constructor(

  ) {}

  ngOnInit(): void {
    this.loadText();
  }

  private loadText(): void {
    this.http.get('assets/texte/test.txt', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.content = data;
          console.log('data: ', this.content);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Fehler beim Laden der Datei:', error);
        }
      });
  }
}
