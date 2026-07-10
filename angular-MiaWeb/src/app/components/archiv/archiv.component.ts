import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface FileNode {
  name: string;
  children?: FileNode[];
}

@Component({
  selector: 'app-archiv',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.scss']
})
export class ArchivComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {}
}
