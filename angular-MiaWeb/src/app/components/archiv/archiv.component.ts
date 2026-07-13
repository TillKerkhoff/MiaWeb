import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextComponent } from '../text/text.component';
import { TextInteractionService } from '../../services/textInteractionService';

interface FileNode {
  name: string;
  children?: FileNode[];
}

@Component({
  selector: 'app-archiv',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, TextComponent],
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit {


  constructor(private interactionService: TextInteractionService) {

  }

  ngOnInit(): void {}

  buttonClick(name: string): void {
    console.log('Button clicked in ArchivComponent');
    console.log('Name of the clicked button:', name);
    this.interactionService.triggerLoadText(name);
  }
}