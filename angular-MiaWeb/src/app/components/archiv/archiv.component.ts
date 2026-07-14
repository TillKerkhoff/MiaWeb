import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core'; // <-- PLATFORM_ID hinzugefügt
import { CommonModule, isPlatformBrowser } from '@angular/common'; // <-- isPlatformBrowser hinzugefügt
import { MatCardModule } from '@angular/material/card'; 
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
  private platformId = inject(PLATFORM_ID);
  expandedStates: { [key: string]: boolean } = {};

  isMobile = false;
  showMobileMenu = false; 
  private breakpointSub!: Subscription;

  ngOnInit(): void {
    // Führt den Code NUR im echten Browser aus, blockiert den Absturz beim Bauen!
    if (isPlatformBrowser(this.platformId)) {
      this.breakpointSub = this.breakpointObserver
        .observe([Breakpoints.Handset, '(max-width: 768px)'])
        .subscribe(result => {
          this.isMobile = result.matches;
          this.cdr.detectChanges();
        });
    }
  }

  buttonClick(storyName: string): void {
    this.interactionService.triggerLoadText(storyName);
    this.showMobileMenu = false; 
  }

  buttonClickPhotos(folderName: string): void {
    this.interactionService.loadPhotos(folderName);
    this.showMobileMenu = false; 
  }

  toggle(key: string) {
  // Kehrt den aktuellen Zustand um (falls undefined/false -> true, falls true -> false)
  this.expandedStates[key] = !this.expandedStates[key];
  }

  isExpanded(key: string): boolean {
    return !!this.expandedStates[key];
  }

  ngOnDestroy(): void {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}