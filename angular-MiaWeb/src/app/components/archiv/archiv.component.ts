import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import repariert!
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { TextComponent } from '../text/text.component'; 
import { TextInteractionService } from '../../services/textInteractionService';

@Component({
  selector: 'app-archiv',
  standalone: true,
  imports: [CommonModule, MatCardModule, TextComponent],
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private interactionService = inject(TextInteractionService);
  private cdr = inject(ChangeDetectorRef);

  isMobile = false;
  showMobileMenu = false; // Steuert das Handy-Overlay
  private breakpointSub!: Subscription;

  ngOnInit(): void {
    // Erkennt automatisch, ob die App auf einem Smartphone läuft (< 768px)
    this.breakpointSub = this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 768px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.cdr.detectChanges();
      });
  }

  // Wird aufgerufen, wenn du auf eine Story klickst
  buttonClick(storyName: string): void {
    // LÖSUNG: Nutzt jetzt die korrekte Methode aus deinem Service!
    this.interactionService.triggerLoadText(storyName);
    this.showMobileMenu = false; 
  }

  // Wird aufgerufen, wenn du auf ein Foto-Thema klickst
  buttonClickPhotos(folderName: string): void {
    // LÖSUNG: Nutzt jetzt die korrekte Methode aus deinem Service!
    this.interactionService.loadPhotos(folderName);
    this.showMobileMenu = false; 
  }

  ngOnDestroy(): void {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}