import { Component, OnInit, inject, ChangeDetectorRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core'; // <-- PLATFORM_ID hinzugefügt
import { CommonModule, isPlatformBrowser } from '@angular/common'; // <-- isPlatformBrowser hinzugefügt
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { TextInteractionService } from '../../services/textInteractionService';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDialogModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy {
  fileName = '';
  content: String = '';
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID); // <-- Plattform-ID injiziert
  private subscription!: Subscription;
  currentView: 'text' | 'photos' = 'text';
  images: string[] = [];
  private photoSubscription!: Subscription;

  constructor(private interactionService: TextInteractionService) {}

  ngOnInit(): void {
    this.loadDefaultText();

    this.subscription = this.interactionService.loadText$.subscribe((uebergebenerText: string) => {
      this.loadText(uebergebenerText);
    });

    this.photoSubscription = this.interactionService.loadPhotos$.subscribe({
      next: (foldername: string) => {
        console.log('TextComponent hat den Ordnernamen empfangen:', foldername);
        this.loadPhotos(foldername);
      }
    });
  }

  private loadText(text: string): void {
    this.currentView = 'text';
    
    // Nur im Browser ausführen (verhindert Prerender-Fehler)
    if (isPlatformBrowser(this.platformId)) {
      this.http.get(`assets/texte/${text}.txt`, { responseType: 'text' })
        .subscribe({
          next: (data) => {
            this.fileName = text;
            this.content = data;
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Fehler beim Laden der Datei:', error);
          }
        });
    }
  }

  private loadDefaultText(): void {
    this.currentView = 'text';
    
    // Nur im Browser ausführen (verhindert Prerender-Fehler)
    if (isPlatformBrowser(this.platformId)) {
      this.http.get('assets/texte/Willkommen.txt', { responseType: 'text' })
        .subscribe({
          next: (data) => {
            this.fileName = 'Willkommen';
            this.content = data;
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Fehler beim Laden der Datei:', error);
          }
        });
    }
  }

  loadPhotos(foldername: string) {
    this.fileName = foldername;
    this.currentView = 'photos';
    this.images = []; 

    // Nur im Browser ausführen (verhindert Prerender-Fehler)
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<string[]>(`assets/fotos/${foldername}/images.json`).subscribe({
        next: (imageNames) => {
          this.images = [];
          this.cdr.detectChanges();

          const neuePfade = imageNames.map(name => `assets/fotos/${foldername}/${name}`);
          this.images = [...neuePfade];
          
          this.cdr.markForCheck(); 
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(`Konnte images.json für ${foldername} nicht laden:`, err);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
  }

  openImagePopup(imageUrl: string): void {
    this.dialog.open(ImagePopupComponent, {
      data: { url: imageUrl },
      panelClass: 'custom-dialog-container', 
      maxHeight: '90vh',
      maxWidth: '90vw'
    });
  }
}

@Component({
  selector: 'app-image-popup',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="popup-wrapper">
      <button class="close-btn" mat-dialog-close>&times;</button>
      <img [src]="data.url" alt="Großansicht Foto" class="popup-img">
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .mat-mdc-dialog-surface {
        background: transparent !important;
        box-shadow: none !important;
        border-radius: 12px !important;
      }
      .mat-mdc-dialog-container {
        --mdc-dialog-container-space: 0px !important;
      }
      .cdk-overlay-pane {
        background: transparent !important;
      }
    }

    :host {
      display: block;
      overflow: hidden; 
    }

    .popup-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e1e1e;
      padding: 4px; 
      border-radius: 12px;
      overflow: hidden; 
    }

    .popup-img {
      width: 100%;
      height: auto;
      max-height: 88vh; 
      object-fit: contain;
      display: block;
      border-radius: 10px; 
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: 1px solid rgba(200, 77, 255, 0.4);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 20px;
      line-height: 28px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      z-index: 10;

      &:hover {
        background: #c84dff;
        transform: scale(1.1);
      }
    }
  `]
})
export class ImagePopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) {}
}